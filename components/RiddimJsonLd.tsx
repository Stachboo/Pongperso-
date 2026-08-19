import React from 'react';
import type { Riddim } from '@/types/riddim';
import type { Artist } from '@/utils/artists';
import { generateRiddimJsonLd, BASE_URL } from '@/utils/seo';
import { generateArtistJsonLd } from '@/utils/artists';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM JSON-LD
   Composant serveur pour injecter les données structurées Schema.org
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimJsonLdProps {
  riddim: Riddim;
  lang: string;
}

interface ArtistJsonLdProps {
  artist: Artist;
  lang: string;
}

/**
 * Injecte le JSON-LD Schema.org pour une page riddim.
 * Server Component — aucune hydratation côté client.
 */
export function RiddimJsonLd({ riddim, lang }: RiddimJsonLdProps) {
  const jsonLd = generateRiddimJsonLd(riddim, lang, BASE_URL);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Injecte le JSON-LD Schema.org pour une page artiste.
 * Server Component — aucune hydratation côté client.
 */
export function ArtistJsonLd({ artist, lang }: ArtistJsonLdProps) {
  const jsonLd = generateArtistJsonLd(artist, lang, BASE_URL);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
