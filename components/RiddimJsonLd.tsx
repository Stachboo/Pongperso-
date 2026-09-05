import React from 'react';
import type { Riddim } from '@/types/riddim';
import type { Artist } from '@/utils/artists';
import { generateRiddimJsonLd, BASE_URL, jsonLdString } from '@/utils/seo';
import { generateArtistJsonLd } from '@/utils/artists';
import { getDictionary, isValidLocale } from '@/lib/i18n';

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
      dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
    />
  );
}

/**
 * Injecte le JSON-LD Schema.org pour une page artiste.
 * Server Component — aucune hydratation côté client.
 */
export function ArtistJsonLd({ artist, lang }: ArtistJsonLdProps) {
  const dict = getDictionary(isValidLocale(lang) ? lang : 'fr');
  const jsonLd = generateArtistJsonLd(artist, lang, BASE_URL, dict);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
    />
  );
}
