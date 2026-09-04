/* ══════════════════════════════════════════════════════════════════════════════
   WMC — TYPES RIDDIM
   World Music Contest — Jamaican Riddim Database
   ══════════════════════════════════════════════════════════════════════════════ */

export interface Voicing {
  /**
   * Identifiant stable et immuable d'un voicing. Optionnel dans le type pour
   * rester compatible avec les anciennes données (rétro-rempli au chargement
   * côté admin). Toutes les opérations CRUD ciblent un voicing par cet id, et
   * non plus par (artiste, titre) — ce qui évitait de toucher la mauvaise ligne
   * en cas de doublon exact au sein d'un riddim.
   */
  id?: string;
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
