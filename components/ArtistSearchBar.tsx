'use client';

import React, { useState, useMemo } from 'react';
import type { Artist } from '@/utils/artists';
import type { Dictionary } from '@/lib/i18n';
import ArtistCard from '@/components/ArtistCard';
import styles from './ArtistSearchBar.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ARTIST SEARCH BAR + GRID
   Composant client pour la recherche et l'affichage filtré des artistes
   ══════════════════════════════════════════════════════════════════════════════ */

interface ArtistSearchBarProps {
  artists: Artist[];
  lang: string;
  dict: Dictionary;
}

export default function ArtistSearchBar({ artists, lang, dict }: ArtistSearchBarProps) {
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
          placeholder={dict.searchArtistPlaceholder}
          className={styles.searchInput}
          aria-label={dict.searchArtistPlaceholder}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.noResults}>{dict.noArtistFoundFor.replace('{x}', query)}</p>
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
