'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Riddim, FilterState } from '../types/riddim';
import styles from './FilterBar.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FILTER BAR
   Barre de filtres sticky pour la liste des riddims
   ══════════════════════════════════════════════════════════════════════════════ */

interface FilterBarProps {
  /** Liste complète des riddims (pour extraire les producteurs dynamiquement) */
  riddims: Riddim[];
  /** Callback déclenché à chaque changement de filtre */
  onFilterChange: (filters: FilterState) => void;
}

/* ── Options fixes ── */
const GENRE_OPTIONS = [
  { value: '', label: 'Tous les genres' },
  { value: 'dancehall', label: 'Dancehall' },
  { value: 'reggae', label: 'Reggae' },
  { value: 'lovers rock', label: 'Lovers Rock' },
  { value: 'roots', label: 'Roots' },
  { value: 'soca', label: 'Soca' },
];

const DECADE_OPTIONS = [
  { value: '', label: 'Toutes les décennies' },
  { value: '1960', label: '1960s' },
  { value: '1970', label: '1970s' },
  { value: '1980', label: '1980s' },
  { value: '1990', label: '1990s' },
  { value: '2000', label: '2000s' },
  { value: '2010', label: '2010s' },
  { value: '2020', label: '2020s' },
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'year-desc', label: 'Année ↓' },
  { value: 'year-asc', label: 'Année ↑' },
  { value: 'name-az', label: 'Nom A–Z' },
];


/* ═══════════════════════════════════════════════════════════════════════════
   Icônes SVG inline
   ═══════════════════════════════════════════════════════════════════════════ */

/** Chevron down pour les selects */
function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/** Loupe pour la recherche */
function SearchIcon() {
  return (
    <svg
      className={styles.searchIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function FilterBar({ riddims, onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    genre: '',
    decade: '',
    producer: '',
    search: '',
    sortBy: 'popularity',
  });

  const [scrolled, setScrolled] = useState(false);

  /* ── Détecte le scroll pour l'ombre ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Producteurs uniques (options dynamiques) ── */
  const producerOptions = useMemo(() => {
    const producers = [...new Set(riddims.map((r) => r.producer))].sort();
    return [
      { value: '', label: 'Tous les producteurs' },
      ...producers.map((p) => ({ value: p, label: p })),
    ];
  }, [riddims]);

  /* ── Handler générique de changement ── */
  const handleChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };
        onFilterChange(next);
        return next;
      });
    },
    [onFilterChange],
  );


  return (
    <div className={`${styles.bar} ${scrolled ? styles.barScrolled : ''}`}>
      <div className={styles.inner}>

        {/* ── Groupe de filtres (scroll horizontal sur mobile) ── */}
        <div className={styles.filters}>

          {/* Filtre 1 — Genre */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-genre" className={styles.srOnly}>
              Filtrer par genre
            </label>
            <select
              id="filter-genre"
              className={`${styles.select} ${filters.genre ? styles.selectActive : ''}`}
              value={filters.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
            >
              {GENRE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronIcon />
          </div>

          {/* Filtre 2 — Décennie */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-decade" className={styles.srOnly}>
              Filtrer par décennie
            </label>
            <select
              id="filter-decade"
              className={`${styles.select} ${filters.decade ? styles.selectActive : ''}`}
              value={filters.decade}
              onChange={(e) => handleChange('decade', e.target.value)}
            >
              {DECADE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronIcon />
          </div>

          {/* Filtre 3 — Producteur */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-producer" className={styles.srOnly}>
              Filtrer par producteur
            </label>
            <select
              id="filter-producer"
              className={`${styles.select} ${filters.producer ? styles.selectActive : ''}`}
              value={filters.producer}
              onChange={(e) => handleChange('producer', e.target.value)}
            >
              {producerOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronIcon />
          </div>

          {/* Filtre 4 — Recherche textuelle */}
          <div className={styles.searchWrap}>
            <label htmlFor="filter-search" className={styles.srOnly}>
              Rechercher un riddim ou artiste
            </label>
            <SearchIcon />
            <input
              id="filter-search"
              type="text"
              className={`${styles.searchInput} ${filters.search ? styles.searchActive : ''}`}
              placeholder="Riddim ou artiste..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* ── Spacer ── */}
        <div className={styles.spacer} />

        {/* ── Tri ── */}
        <div className={styles.selectWrap}>
          <label htmlFor="filter-sort" className={styles.srOnly}>
            Trier par
          </label>
          <select
            id="filter-sort"
            className={`${styles.select} ${filters.sortBy !== 'popularity' ? styles.selectActive : ''}`}
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      </div>
    </div>
  );
}
