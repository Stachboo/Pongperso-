import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'riddims.json');

function readRiddims() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeRiddims(data: unknown[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const riddims = readRiddims();
  return NextResponse.json(riddims);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  const riddims = readRiddims();

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

      writeRiddims(riddims);
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
      writeRiddims(riddims);
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

      writeRiddims(riddims);
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
      writeRiddims(riddims);
      return NextResponse.json({ success: true, createdRiddim: newRiddim });
    }

    default:
      return NextResponse.json({ error: `Action inconnue: ${action}` }, { status: 400 });
  }
}
