'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { Riddim, FilterState } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
import { getTotalViews } from '@/lib/data';
import FilterBar from '@/components/FilterBar';
import RiddimGrid from '@/components/RiddimGrid';
import styles from './RiddimExplorer.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM EXPLORER
   Composant client réutilisable : filtres + grille de riddims
   Utilisé sur la page d'accueil et la page /riddims
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimExplorerProps {
  riddims: Riddim[];
  lang: string;
  dict: Dictionary;
}

export default function RiddimExplorer({ riddims, lang, dict }: RiddimExplorerProps) {
  const [filters, setFilters] = useState<FilterState>({
    genre: '',
    decade: '',
    producer: '',
    search: '',
    sortBy: 'popularity',
  });

  /* ── Filtrage + tri ── */
  const filtered = useMemo(() => {
    let result = [...riddims];

    /* Genre */
    if (filters.genre) {
      result = result.filter(
        (r) => r.genre.toLowerCase() === filters.genre.toLowerCase(),
      );
    }

    /* Décennie */
    if (filters.decade) {
      const d = parseInt(filters.decade, 10);
      result = result.filter((r) => r.year >= d && r.year < d + 10);
    }

    /* Producteur */
    if (filters.producer) {
      result = result.filter((r) => r.producer === filters.producer);
    }

    /* Recherche textuelle */
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.producer.toLowerCase().includes(q) ||
          r.label.toLowerCase().includes(q) ||
          r.voicings.some(
            (v) =>
              v.artist.toLowerCase().includes(q) ||
              v.title.toLowerCase().includes(q),
          ),
      );
    }

    /* Tri */
    switch (filters.sortBy) {
      case 'popularity':
        result.sort((a, b) => getTotalViews(b) - getTotalViews(a));
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [riddims, filters]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className={styles.explorer}>
      <FilterBar
        riddims={riddims}
        onFilterChange={handleFilterChange}
        dict={dict}
      />
      <div className={styles.gridWrap}>
        <RiddimGrid riddims={filtered} lang={lang} dict={dict} />
      </div>
    </div>
  );
}
