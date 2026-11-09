/* ══════════════════════════════════════════════════════════════════════════════
   WMC — DATA LAYER
   Lecture des riddims depuis Vercel Blob (source de vérité runtime), mise en
   cache et taguée 'riddims'. Les pages sont servies depuis le cache (rapides) et
   se régénèrent en live quand l'admin appelle revalidateTag('riddims') — sans
   redéploiement. Repli sur le JSON du repo pour un magasin vide ou un build local sans accès Blob.
   ══════════════════════════════════════════════════════════════════════════════ */

import { unstable_cache } from 'next/cache';
import { list } from '@vercel/blob';
import type { Riddim } from '@/types/riddim';
import seedData from '@/data/riddims.json';

const BLOB_NAME = 'riddims.json';

/** Données embarquées — utilisées pour initialiser un magasin vide. */
const seed: Riddim[] = seedData as Riddim[];

/** Tag de cache partagé — invalidé par l'API après chaque écriture admin. */
export const RIDDIMS_TAG = 'riddims';

/** Ne met jamais une erreur ou une ancienne version CDN en cache comme catalogue actuel. */
async function readRiddimsFromBlob(): Promise<Riddim[]> {
  const hasBlobCredentials = Boolean(process.env.BLOB_READ_WRITE_TOKEN ||
    (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID));
  if (process.env.NEXT_PHASE === 'phase-production-build' && !process.env.VERCEL && !hasBlobCredentials) {
    return seed;
  }

  const { blobs } = await list({ prefix: BLOB_NAME });
  if (blobs.length === 0) return seed;
  const blob = blobs.find((item) => item.pathname === BLOB_NAME);
  if (!blob || !blob.etag) throw new Error('Métadonnées du catalogue Blob indisponibles');
  const res = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Lecture du catalogue Blob impossible (HTTP ${res.status})`);
  // La compression HTTP peut ajouter le préfixe faible W/ au même ETag.
  const responseEtag = res.headers.get('etag');
  if (!responseEtag || responseEtag.replace(/^W\//, '') !== blob.etag) {
    throw new Error('Catalogue Blob temporairement périmé');
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new Error('Catalogue Blob invalide');
  return data as Riddim[];
}

/**
 * Tous les riddims — mis en cache et tagués 'riddims'.
 * Revalidés au plus tard après 60 secondes ou via revalidateTag('riddims').
 */
export const getAllRiddims = unstable_cache(readRiddimsFromBlob, ['all-riddims'], {
  tags: [RIDDIMS_TAG],
  revalidate: 60,
});

/** Un riddim par ID. */
export async function getRiddimById(id: number): Promise<Riddim | undefined> {
  return (await getAllRiddims()).find((r) => r.id === id);
}

/** Total des vues d'un riddim (pur). */
export function getTotalViews(riddim: Riddim): number {
  return riddim.voicings.reduce((sum, v) => sum + v.views, 0);
}

/** Formate un nombre de vues (B, M, K) (pur). */
export function formatViews(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Statistiques globales du catalogue. */
export async function getCatalogStats() {
  const riddims = await getAllRiddims();
  const totalRiddims = riddims.length;
  const totalVoicings = riddims.reduce((s, r) => s + r.voicings.length, 0);
  const totalViews = riddims.reduce((s, r) => s + getTotalViews(r), 0);
  const genres = new Set(riddims.map((r) => r.genre));
  const decades = new Set(riddims.map((r) => Math.floor(r.year / 10) * 10));

  return {
    totalRiddims,
    totalVoicings,
    totalViews,
    totalGenres: genres.size,
    totalDecades: decades.size,
  };
}

/** Riddims triés par popularité (nombre total de vues). */
export async function getRiddimsByPopularity(): Promise<Riddim[]> {
  return [...(await getAllRiddims())].sort((a, b) => getTotalViews(b) - getTotalViews(a));
}

/** URL de recherche YouTube (pur). */
export function getYoutubeSearchUrl(artist: string, title: string): string {
  const q = encodeURIComponent(`${artist} ${title}`);
  return `https://www.youtube.com/results?search_query=${q}`;
}

/** URL de recherche Deezer (pur). */
export function getDeezerSearchUrl(artist: string, title: string): string {
  const q = encodeURIComponent(`${artist} ${title}`);
  return `https://www.deezer.com/search/${q}`;
}
