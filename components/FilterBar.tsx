'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Riddim, FilterState } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
import styles from './FilterBar.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FILTER BAR
   Barre de filtres sticky pour la liste des riddims
   ══════════════════════════════════════════════════════════════════════════════ */

interface FilterBarProps {
  riddims: Riddim[];
  onFilterChange: (filters: FilterState) => void;
  dict: Dictionary;
}

/* ── Icônes SVG ── */

function ChevronIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── Composant ── */

export default function FilterBar({ riddims, onFilterChange, dict }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    genre: '', decade: '', producer: '', search: '', sortBy: 'popularity',
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const genreOptions = useMemo(() => [
    { value: '', label: dict.allGenres },
    { value: 'dancehall', label: 'Dancehall' },
    { value: 'reggae', label: 'Reggae' },
    { value: 'lovers rock', label: 'Lovers Rock' },
    { value: 'roots', label: 'Roots' },
    { value: 'soca', label: 'Soca' },
  ], [dict]);

  const decadeOptions = useMemo(() => [
    { value: '', label: dict.allDecades },
    { value: '1960', label: dict.decade1960 },
    { value: '1970', label: dict.decade1970 },
    { value: '1980', label: dict.decade1980 },
    { value: '1990', label: dict.decade1990 },
    { value: '2000', label: dict.decade2000 },
    { value: '2010', label: dict.decade2010 },
    { value: '2020', label: '2020s' },
  ], [dict]);

  const sortOptions = useMemo(() => [
    { value: 'popularity', label: dict.sortPopularity },
    { value: 'year-desc', label: dict.sortYearDesc },
    { value: 'year-asc', label: dict.sortYearAsc },
    { value: 'name-az', label: dict.sortNameAz },
  ], [dict]);

  const producerOptions = useMemo(() => {
    const producers = [...new Set(riddims.map((r) => r.producer))].sort();
    return [
      { value: '', label: dict.allProducers },
      ...producers.map((p) => ({ value: p, label: p })),
    ];
  }, [riddims, dict]);

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
        <div className={styles.filters}>
          {/* Genre */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-genre" className={styles.srOnly}>{dict.filterByGenre}</label>
            <select id="filter-genre" className={`${styles.select} ${filters.genre ? styles.selectActive : ''}`} value={filters.genre} onChange={(e) => handleChange('genre', e.target.value)}>
              {genreOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronIcon />
          </div>

          {/* Décennie */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-decade" className={styles.srOnly}>{dict.filterByDecade}</label>
            <select id="filter-decade" className={`${styles.select} ${filters.decade ? styles.selectActive : ''}`} value={filters.decade} onChange={(e) => handleChange('decade', e.target.value)}>
              {decadeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronIcon />
          </div>

          {/* Producteur */}
          <div className={styles.selectWrap}>
            <label htmlFor="filter-producer" className={styles.srOnly}>{dict.filterByProducer}</label>
            <select id="filter-producer" className={`${styles.select} ${filters.producer ? styles.selectActive : ''}`} value={filters.producer} onChange={(e) => handleChange('producer', e.target.value)}>
              {producerOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronIcon />
          </div>

          {/* Recherche */}
          <div className={styles.searchWrap}>
            <label htmlFor="filter-search" className={styles.srOnly}>{dict.searchPlaceholder}</label>
            <SearchIcon />
            <input id="filter-search" type="text" className={`${styles.searchInput} ${filters.search ? styles.searchActive : ''}`} placeholder={dict.searchRiddimArtist} value={filters.search} onChange={(e) => handleChange('search', e.target.value)} />
          </div>
        </div>

        <div className={styles.spacer} />

        {/* Tri */}
        <div className={styles.selectWrap}>
          <label htmlFor="filter-sort" className={styles.srOnly}>{dict.sortByLabel}</label>
          <select id="filter-sort" className={`${styles.select} ${filters.sortBy !== 'popularity' ? styles.selectActive : ''}`} value={filters.sortBy} onChange={(e) => handleChange('sortBy', e.target.value)}>
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronIcon />
        </div>
      </div>
    </div>
  );
}
