/* ══════════════════════════════════════════════════════════════════════════════
   WMC — DATA LAYER
   Chargement et typage des données riddims
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Riddim } from '@/types/riddim';
import riddimsData from '@/data/riddims.json';

/** Tous les riddims, typés */
export const allRiddims: Riddim[] = riddimsData as Riddim[];

/** Un riddim par ID */
export function getRiddimById(id: number): Riddim | undefined {
  return allRiddims.find((r) => r.id === id);
}

/** Total des vues d'un riddim */
export function getTotalViews(riddim: Riddim): number {
  return riddim.voicings.reduce((sum, v) => sum + v.views, 0);
}

/** Formate un nombre de vues (B, M, K) */
export function formatViews(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/** Statistiques globales du catalogue */
export function getCatalogStats() {
  const totalRiddims = allRiddims.length;
  const totalVoicings = allRiddims.reduce((s, r) => s + r.voicings.length, 0);
  const totalViews = allRiddims.reduce((s, r) => s + getTotalViews(r), 0);
  const genres = new Set(allRiddims.map((r) => r.genre));
  const decades = new Set(allRiddims.map((r) => Math.floor(r.year / 10) * 10));

  return {
    totalRiddims,
    totalVoicings,
    totalViews,
    totalGenres: genres.size,
    totalDecades: decades.size,
  };
}

/** Riddims triés par popularité (nombre total de vues) */
export function getRiddimsByPopularity(): Riddim[] {
  return [...allRiddims].sort((a, b) => getTotalViews(b) - getTotalViews(a));
}

/** URL de recherche YouTube */
export function getYoutubeSearchUrl(artist: string, title: string): string {
  const q = encodeURIComponent(`${artist} ${title}`);
  return `https://www.youtube.com/results?search_query=${q}`;
}
