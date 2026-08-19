/* ══════════════════════════════════════════════════════════════════════════════
   WMC — DATA LAYER
   Lecture des riddims depuis Vercel Blob (source de vérité runtime), mise en
   cache et taguée 'riddims'. Les pages sont servies depuis le cache (rapides) et
   se régénèrent en live quand l'admin appelle revalidateTag('riddims') — sans
   redéploiement. Repli sur le JSON du repo au build ou si le Blob est indisponible.
   ══════════════════════════════════════════════════════════════════════════════ */

import { unstable_cache } from 'next/cache';
import { list } from '@vercel/blob';
import type { Riddim } from '@/types/riddim';
import seedData from '@/data/riddims.json';

const BLOB_NAME = 'riddims.json';

/** Données embarquées dans le build — repli si le Blob n'est pas disponible. */
const seed: Riddim[] = seedData as Riddim[];

/** Tag de cache partagé — invalidé par l'API après chaque écriture admin. */
export const RIDDIMS_TAG = 'riddims';

/** Lecture brute depuis le Blob, avec cache-busting par uploadedAt. */
async function readRiddimsFromBlob(): Promise<Riddim[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_NAME });
    if (blobs.length === 0) return seed;
    // La query ?v=<uploadedAt> change à chaque écriture → jamais de CDN périmé.
    const url = `${blobs[0].url}?v=${blobs[0].uploadedAt.getTime()}`;
    const res = await fetch(url);
    if (!res.ok) return seed;
    return (await res.json()) as Riddim[];
  } catch {
    return seed;
  }
}

/**
 * Tous les riddims — mis en cache et tagués 'riddims'.
 * Servis depuis le cache jusqu'à une invalidation via revalidateTag('riddims').
 */
export const getAllRiddims = unstable_cache(readRiddimsFromBlob, ['all-riddims'], {
  tags: [RIDDIMS_TAG],
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
