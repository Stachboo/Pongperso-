import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { put, list } from '@vercel/blob';
import { RIDDIMS_TAG } from '@/lib/data';

const BLOB_NAME = 'riddims.json';

/** Coerce une valeur de vues en entier fini >= 0 (null si invalide). */
function normalizeViews(value: unknown): number | null {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

/** Nettoie une chaîne : trim, ou null si vide/non-string. */
function cleanString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const s = value.trim();
  return s.length > 0 ? s : null;
}

/** Génère un identifiant de voicing unique et stable. */
function newVoicingId(): string {
  return `v_${crypto.randomUUID()}`;
}

/**
 * Rétro-remplit un `id` stable sur chaque voicing qui n'en a pas.
 * Renvoie true si au moins un id a été ajouté (→ persistance nécessaire).
 * Migration douce : au premier accès admin, les anciennes données reçoivent
 * un id immuable, après quoi toutes les opérations ciblent par id.
 */
function ensureVoicingIds(riddims: { voicings: { id?: string }[] }[]): boolean {
  let changed = false;
  for (const r of riddims) {
    if (!Array.isArray(r.voicings)) continue;
    for (const v of r.voicings) {
      if (!v.id) {
        v.id = newVoicingId();
        changed = true;
      }
    }
  }
  return changed;
}

async function readRiddims() {
  const { blobs } = await list({ prefix: BLOB_NAME });

  if (blobs.length === 0) {
    // Premier lancement : seed depuis le fichier local embarqué dans le build
    const localData = await import('@/data/riddims.json');
    const data = (localData as { default: unknown[] }).default;
    // Upload initial dans le Blob pour les prochaines lectures
    await put(BLOB_NAME, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
    });
    return data;
  }

  // Cache-busting par uploadedAt : jamais de version CDN périmée
  const url = `${blobs[0].url}?v=${blobs[0].uploadedAt.getTime()}`;
  const response = await fetch(url, { cache: 'no-store' });
  return response.json();
}

async function writeRiddims(data: unknown[]) {
  await put(BLOB_NAME, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });

  // Régénérer en live les pages publiques qui lisent les riddims (ISR à la
  // demande) — pas de redéploiement, mise à jour quasi-instantanée.
  revalidateTag(RIDDIMS_TAG);
}

export async function GET() {
  const riddims = await readRiddims();
  // Migration douce : garantit un id stable sur chaque voicing, et le persiste
  // une seule fois pour que le client dispose toujours d'identifiants fiables.
  if (Array.isArray(riddims) && ensureVoicingIds(riddims)) {
    await writeRiddims(riddims);
  }
  return NextResponse.json(riddims);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  const riddims = await readRiddims();
  // Auto-réparation : toute donnée sans id est complétée avant mutation.
  ensureVoicingIds(riddims);

  switch (action) {
    // ─── Déplacer un voicing d'un riddim à un autre ──────────────────────
    case 'move-voicing': {
      const { fromRiddimId, toRiddimId, voicingId } = body;
      const fromRiddim = riddims.find((r: { id: number }) => r.id === fromRiddimId);
      const toRiddim = riddims.find((r: { id: number }) => r.id === toRiddimId);

      if (!fromRiddim || !toRiddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }

      const idx = fromRiddim.voicings.findIndex((v: { id?: string }) => v.id === voicingId);
      if (idx === -1) {
        return NextResponse.json({ error: 'Voicing introuvable (rechargez la page)' }, { status: 409 });
      }

      const [voicing] = fromRiddim.voicings.splice(idx, 1);
      toRiddim.voicings.push(voicing);
      toRiddim.voicings.sort((a: { views: number }, b: { views: number }) => b.views - a.views);

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, movedVoicing: voicing });
    }

    // ─── Supprimer un voicing ────────────────────────────────────────────
    case 'delete-voicing': {
      const { riddimId, voicingId } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }

      const idx = riddim.voicings.findIndex((v: { id?: string }) => v.id === voicingId);
      if (idx === -1) {
        return NextResponse.json({ error: 'Voicing introuvable (rechargez la page)' }, { status: 409 });
      }

      const [deleted] = riddim.voicings.splice(idx, 1);
      await writeRiddims(riddims);
      return NextResponse.json({ success: true, deletedVoicing: deleted });
    }

    // ─── Ajouter un voicing à un riddim existant ─────────────────────────
    case 'add-voicing': {
      const { riddimId, artist, title, views } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }
      const cleanArtist = cleanString(artist);
      const cleanTitle = cleanString(title);
      if (!cleanArtist || !cleanTitle) {
        return NextResponse.json({ error: 'Artiste et titre requis' }, { status: 400 });
      }
      const normViews = views === undefined ? 0 : normalizeViews(views);
      if (normViews === null) {
        return NextResponse.json({ error: 'Vues invalides (entier positif attendu)' }, { status: 400 });
      }

      const newVoicing = { id: newVoicingId(), artist: cleanArtist, title: cleanTitle, views: normViews };
      riddim.voicings.push(newVoicing);
      riddim.voicings.sort((a: { views: number }, b: { views: number }) => b.views - a.views);

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, addedVoicing: newVoicing });
    }

    // ─── Modifier un voicing existant ─────────────────────────────────────
    case 'edit-voicing': {
      const { riddimId, voicingId, artist, title, views } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }
      const editArtist = cleanString(artist);
      const editTitle = cleanString(title);
      if (!editArtist || !editTitle) {
        return NextResponse.json({ error: 'Artiste et titre requis' }, { status: 400 });
      }

      const idx = riddim.voicings.findIndex((v: { id?: string }) => v.id === voicingId);
      if (idx === -1) {
        return NextResponse.json({ error: 'Voicing introuvable (rechargez la page)' }, { status: 409 });
      }

      // Vues absentes → on conserve l'ancienne valeur
      const editViews = views === undefined ? riddim.voicings[idx].views : normalizeViews(views);
      if (editViews === null) {
        return NextResponse.json({ error: 'Vues invalides (entier positif attendu)' }, { status: 400 });
      }

      riddim.voicings[idx] = {
        id: riddim.voicings[idx].id,
        artist: editArtist,
        title: editTitle,
        views: editViews,
      };

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, updatedVoicing: riddim.voicings[idx] });
    }

    // ─── Réordonner un voicing (monter/descendre) ───────────────────────
    case 'reorder-voicing': {
      const { riddimId, voicingId, direction } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }

      const voicingIndex = riddim.voicings.findIndex((v: { id?: string }) => v.id === voicingId);
      if (voicingIndex === -1) {
        return NextResponse.json({ error: 'Voicing introuvable (rechargez la page)' }, { status: 409 });
      }

      const targetIndex = direction === 'up' ? voicingIndex - 1 : voicingIndex + 1;
      if (targetIndex < 0 || targetIndex >= riddim.voicings.length) {
        return NextResponse.json({ error: 'Déplacement impossible' }, { status: 400 });
      }

      // Swap
      const temp = riddim.voicings[voicingIndex];
      riddim.voicings[voicingIndex] = riddim.voicings[targetIndex];
      riddim.voicings[targetIndex] = temp;

      await writeRiddims(riddims);
      return NextResponse.json({ success: true });
    }

    // ─── Créer un nouveau riddim ─────────────────────────────────────────
    case 'create-riddim': {
      const { name, year, producer, label, type, genre, bpm, description, voicings } = body;

      const cleanName = cleanString(name);
      const cleanProducer = cleanString(producer);
      if (!cleanName || !cleanProducer) {
        return NextResponse.json({ error: 'Nom et producteur requis' }, { status: 400 });
      }

      // Valider et normaliser les voicings fournis
      const rawVoicings = Array.isArray(voicings) ? voicings : [];
      const cleanVoicings: { id: string; artist: string; title: string; views: number }[] = [];
      for (const v of rawVoicings) {
        const a = cleanString(v?.artist);
        const t = cleanString(v?.title);
        const vw = v?.views === undefined ? 0 : normalizeViews(v?.views);
        if (!a || !t || vw === null) {
          return NextResponse.json({ error: 'Voicing invalide (artiste, titre et vues positives requis)' }, { status: 400 });
        }
        cleanVoicings.push({ id: newVoicingId(), artist: a, title: t, views: vw });
      }

      const normYear = normalizeViews(year);
      const normBpm = normalizeViews(bpm);
      const maxId = riddims.reduce((max: number, r: { id: number }) => Math.max(max, r.id), 0);
      const newRiddim = {
        id: maxId + 1,
        name: cleanName,
        year: normYear ?? 2024,
        producer: cleanProducer,
        label: cleanString(label) || '',
        type: cleanString(type) || 'digital',
        genre: cleanString(genre) || 'dancehall',
        bpm: normBpm ?? 0,
        description: typeof description === 'string' ? description : '',
        voicings: cleanVoicings.sort((a, b) => b.views - a.views),
      };

      riddims.push(newRiddim);
      await writeRiddims(riddims);
      return NextResponse.json({ success: true, createdRiddim: newRiddim });
    }

    // ─── Modifier les métadonnées d'un riddim ────────────────────────────
    case 'edit-riddim': {
      const { riddimId, name, year, producer, label, type, genre, bpm, description } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }
      const cleanName = cleanString(name);
      const cleanProducer = cleanString(producer);
      if (!cleanName || !cleanProducer) {
        return NextResponse.json({ error: 'Nom et producteur requis' }, { status: 400 });
      }
      const normYear = normalizeViews(year);
      const normBpm = normalizeViews(bpm);

      riddim.name = cleanName;
      riddim.producer = cleanProducer;
      riddim.year = normYear ?? riddim.year;
      riddim.label = cleanString(label) ?? '';
      riddim.type = cleanString(type) ?? riddim.type;
      riddim.genre = cleanString(genre) ?? riddim.genre;
      riddim.bpm = normBpm ?? 0;
      if (typeof description === 'string') riddim.description = description;

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, updatedRiddim: riddim });
    }

    default:
      return NextResponse.json({ error: `Action inconnue: ${action}` }, { status: 400 });
  }
}
