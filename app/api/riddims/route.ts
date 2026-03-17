import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const BLOB_NAME = 'riddims.json';
const DEPLOY_HOOK_URL = process.env.DEPLOY_HOOK_URL;

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
    });
    return data;
  }

  const response = await fetch(blobs[0].url, { cache: 'no-store' });
  return response.json();
}

async function writeRiddims(data: unknown[]) {
  await put(BLOB_NAME, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });

  // Déclencher un redeploy pour mettre à jour les pages statiques
  if (DEPLOY_HOOK_URL) {
    fetch(DEPLOY_HOOK_URL, { method: 'POST' }).catch(() => {});
  }
}

export async function GET() {
  const riddims = await readRiddims();
  return NextResponse.json(riddims);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  const riddims = await readRiddims();

  switch (action) {
    // ─── Déplacer un voicing d'un riddim à un autre ──────────────────────
    case 'move-voicing': {
      const { fromRiddimId, toRiddimId, voicingIndex } = body;
      const fromRiddim = riddims.find((r: { id: number }) => r.id === fromRiddimId);
      const toRiddim = riddims.find((r: { id: number }) => r.id === toRiddimId);

      if (!fromRiddim || !toRiddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }
      if (voicingIndex < 0 || voicingIndex >= fromRiddim.voicings.length) {
        return NextResponse.json({ error: 'Index voicing invalide' }, { status: 400 });
      }

      const [voicing] = fromRiddim.voicings.splice(voicingIndex, 1);
      toRiddim.voicings.push(voicing);
      toRiddim.voicings.sort((a: { views: number }, b: { views: number }) => b.views - a.views);

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, movedVoicing: voicing });
    }

    // ─── Supprimer un voicing ────────────────────────────────────────────
    case 'delete-voicing': {
      const { riddimId, voicingIndex } = body;
      const riddim = riddims.find((r: { id: number }) => r.id === riddimId);

      if (!riddim) {
        return NextResponse.json({ error: 'Riddim introuvable' }, { status: 404 });
      }
      if (voicingIndex < 0 || voicingIndex >= riddim.voicings.length) {
        return NextResponse.json({ error: 'Index voicing invalide' }, { status: 400 });
      }

      const [deleted] = riddim.voicings.splice(voicingIndex, 1);
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
      if (!artist || !title) {
        return NextResponse.json({ error: 'Artiste et titre requis' }, { status: 400 });
      }

      const newVoicing = { artist, title, views: views || 0 };
      riddim.voicings.push(newVoicing);
      riddim.voicings.sort((a: { views: number }, b: { views: number }) => b.views - a.views);

      await writeRiddims(riddims);
      return NextResponse.json({ success: true, addedVoicing: newVoicing });
    }

    // ─── Créer un nouveau riddim ─────────────────────────────────────────
    case 'create-riddim': {
      const { name, year, producer, label, type, genre, bpm, description, voicings } = body;

      if (!name || !producer) {
        return NextResponse.json({ error: 'Nom et producteur requis' }, { status: 400 });
      }

      const maxId = riddims.reduce((max: number, r: { id: number }) => Math.max(max, r.id), 0);
      const newRiddim = {
        id: maxId + 1,
        name,
        year: year || 2024,
        producer,
        label: label || '',
        type: type || 'digital',
        genre: genre || 'dancehall',
        bpm: bpm || 0,
        description: description || '',
        voicings: (voicings || []).sort((a: { views: number }, b: { views: number }) => b.views - a.views),
      };

      riddims.push(newRiddim);
      await writeRiddims(riddims);
      return NextResponse.json({ success: true, createdRiddim: newRiddim });
    }

    default:
      return NextResponse.json({ error: `Action inconnue: ${action}` }, { status: 400 });
  }
}
