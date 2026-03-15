'use client';

import React, { useState, useMemo } from 'react';
import type { Artist } from '@/utils/artists';
import ArtistCard from '@/components/ArtistCard';
import styles from './ArtistSearchBar.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ARTIST SEARCH BAR + GRID
   Composant client pour la recherche et l'affichage filtré des artistes
   ══════════════════════════════════════════════════════════════════════════════ */

interface ArtistSearchBarProps {
  artists: Artist[];
  lang: string;
}

export default function ArtistSearchBar({ artists, lang }: ArtistSearchBarProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return artists;
    return artists.filter((a) => a.name.toLowerCase().includes(q));
  }, [artists, query]);

  return (
    <>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un artiste..."
          className={styles.searchInput}
          aria-label="Rechercher un artiste"
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.noResults}>Aucun artiste trouvé pour « {query} »</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((a) => (
            <ArtistCard
              key={a.slug}
              artist={a}
              href={`/${lang}/artistes/${a.slug}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
