/* ══════════════════════════════════════════════════════════════════════════════
   WMC — UTILITAIRES SEO
   Fonctions pures et testables pour le SEO technique du site
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import type { Riddim } from '@/types/riddim';

/** URL de base du site — source unique de vérité */
export const BASE_URL = 'https://wmc-iota.vercel.app';

/** Langues supportées */
const LANGS = ['fr', 'en', 'es', 'pt', 'ja'] as const;

/** Langue par défaut pour x-default */
const DEFAULT_LANG = 'en';


/* ═══════════════════════════════════════════════════════════════════════════
   SLUGS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Convertit un nom de riddim en slug URL propre.
 * @example toRiddimSlug("Military Riddim") → "military-riddim"
 */
export function toRiddimSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convertit un nom d'artiste en slug URL propre.
 * @example toArtistSlug("Vybz Kartel") → "vybz-kartel"
 */
export function toArtistSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}


/* ═══════════════════════════════════════════════════════════════════════════
   HREFLANG
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Génère les balises hreflang pour n'importe quelle page.
 * @param path - Chemin relatif sans la langue, ex: '/riddim/42'
 * @param _currentLang - Langue courante (pour contexte, toutes les langues sont générées)
 * @returns Objet mapping lang → URL absolue, incluant x-default
 */
export function generateHreflang(
  path: string,
  _currentLang: string
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const lang of LANGS) {
    result[lang] = `${BASE_URL}/${lang}${path}`;
  }

  result['x-default'] = `${BASE_URL}/${DEFAULT_LANG}${path}`;

  return result;
}


/* ═══════════════════════════════════════════════════════════════════════════
   MÉTADONNÉES RIDDIM
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Génère les métadonnées complètes pour une page riddim.
 * @param riddim - Le riddim à documenter
 * @param lang - Code langue courante
 * @returns Objet Metadata Next.js complet
 */
export function generateRiddimMetadata(
  riddim: Riddim,
  lang: string
): Metadata {
  const canonicalUrl = `${BASE_URL}/${lang}/riddim/${riddim.id}`;
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);
  const topArtist = sortedVoicings[0]?.artist ?? '';

  const title = `${riddim.name} Riddim (${riddim.year}) — Voicings & Artistes | WMC`;

  const descParts = [
    `${riddim.name} (${riddim.year})`,
    `produit par ${riddim.producer} (${riddim.label}).`,
    `${riddim.voicings.length} voicings`,
  ];
  if (topArtist) {
    descParts.push(`dont ${topArtist}.`);
  }
  const description = descParts.join(' ').slice(0, 155);

  const hreflang = generateHreflang(`/riddim/${riddim.id}`, lang);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'music.album',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflang,
    },
  };
}


/* ═══════════════════════════════════════════════════════════════════════════
   JSON-LD SCHEMA.ORG
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Génère le JSON-LD complet pour un riddim :
 * MusicComposition + ItemList (voicings) + BreadcrumbList.
 * @param riddim - Le riddim
 * @param lang - Code langue
 * @param baseUrl - URL de base du site
 * @returns Objet JSON-LD @graph prêt à être sérialisé
 */
export function generateRiddimJsonLd(
  riddim: Riddim,
  lang: string,
  baseUrl: string
): object {
  const canonicalUrl = `${baseUrl}/${lang}/riddim/${riddim.id}`;
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicComposition',
        name: riddim.name,
        dateCreated: String(riddim.year),
        producer: {
          '@type': 'Person',
          name: riddim.producer,
        },
        recordLabel: {
          '@type': 'Organization',
          name: riddim.label,
        },
        genre: riddim.genre,
        inLanguage: 'en',
        url: canonicalUrl,
      },
      {
        '@type': 'ItemList',
        name: `Voicings du ${riddim.name}`,
        numberOfItems: riddim.voicings.length,
        itemListElement: sortedVoicings.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'MusicRecording',
            name: v.title,
            byArtist: {
              '@type': 'MusicGroup',
              name: v.artist,
            },
            inAlbum: {
              '@type': 'MusicAlbum',
              name: riddim.name,
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${baseUrl}/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Riddims',
            item: `${baseUrl}/${lang}/explorer`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: riddim.name,
          },
        ],
      },
    ],
  };
}


/* ═══════════════════════════════════════════════════════════════════════════
   ARTISTES UNIQUES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Extrait les artistes uniques de tous les riddims,
 * triés par nombre d'apparitions décroissant.
 * @param riddims - Tableau de tous les riddims
 * @returns Liste dédupliquée { name, slug, riddimCount }
 */
export function extractUniqueArtists(
  riddims: Riddim[]
): { name: string; slug: string; riddimCount: number }[] {
  const artistMap = new Map<string, { name: string; count: number }>();

  for (const riddim of riddims) {
    for (const voicing of riddim.voicings) {
      const key = voicing.artist.toLowerCase().trim();
      const existing = artistMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        artistMap.set(key, { name: voicing.artist, count: 1 });
      }
    }
  }

  return Array.from(artistMap.values())
    .map((a) => ({
      name: a.name,
      slug: toArtistSlug(a.name),
      riddimCount: a.count,
    }))
    .sort((a, b) => b.riddimCount - a.riddimCount);
}
