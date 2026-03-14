/* ══════════════════════════════════════════════════════════════════════════════
   WMC — TYPES RIDDIM
   World Music Contest — Jamaican Riddim Database
   ══════════════════════════════════════════════════════════════════════════════ */

export interface Voicing {
  artist: string;
  title: string;
  views: number;
}

export interface Riddim {
  id: number;
  name: string;
  year: number;
  producer: string;
  label: string;
  type: string;
  genre: string;
  bpm: number;
  description: string;
  voicings: Voicing[];
}

/** Genres reconnus pour la couleur des cartes */
export type RiddimGenre = 'dancehall' | 'reggae' | 'lovers rock' | 'soca' | 'roots';

/** Options de tri */
export type SortOption = 'popularity' | 'year-desc' | 'year-asc' | 'name-az';

/** État des filtres */
export interface FilterState {
  genre: string;
  decade: string;
  producer: string;
  search: string;
  sortBy: string;
}
