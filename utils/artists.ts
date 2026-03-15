/* ══════════════════════════════════════════════════════════════════════════════
   WMC — UTILITAIRES ARTISTES
   Fonctions pures pour construire, rechercher et afficher les artistes
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Riddim } from '@/types/riddim';
import { toArtistSlug, BASE_URL } from '@/utils/seo';


/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ArtistRiddim {
  riddimId: number;
  riddimName: string;
  riddimYear: number;
  riddimStyle: string;
  rank: number;
  title: string;
  views: number;
}

export interface Artist {
  name: string;
  slug: string;
  riddimCount: number;
  totalVoicings: number;
  topRiddim: string;
  topRank: number;
  styles: string[];
  decades: string[];
  riddims: ArtistRiddim[];
}


/* ═══════════════════════════════════════════════════════════════════════════
   FONCTIONS PRINCIPALES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Construit la liste complète des artistes depuis les données riddims.
 * Triée par totalVoicings décroissant.
 */
export function buildArtistList(riddims: Riddim[]): Artist[] {
  const artistMap = new Map<string, {
    name: string;
    riddimEntries: ArtistRiddim[];
    riddimIds: Set<number>;
    genreSet: Set<string>;
    decadeSet: Set<string>;
  }>();

  for (const riddim of riddims) {
    const sorted = [...riddim.voicings].sort((a, b) => b.views - a.views);

    for (let i = 0; i < sorted.length; i++) {
      const v = sorted[i];
      const key = v.artist.toLowerCase().trim();

      let entry = artistMap.get(key);
      if (!entry) {
        entry = {
          name: v.artist,
          riddimEntries: [],
          riddimIds: new Set(),
          genreSet: new Set(),
          decadeSet: new Set(),
        };
        artistMap.set(key, entry);
      }

      entry.riddimEntries.push({
        riddimId: riddim.id,
        riddimName: riddim.name,
        riddimYear: riddim.year,
        riddimStyle: riddim.genre,
        rank: i + 1,
        title: v.title,
        views: v.views,
      });

      entry.riddimIds.add(riddim.id);
      entry.genreSet.add(riddim.genre);
      entry.decadeSet.add(`${Math.floor(riddim.year / 10) * 10}s`);
    }
  }

  const artists: Artist[] = [];

  for (const entry of artistMap.values()) {
    const sortedByRank = [...entry.riddimEntries].sort((a, b) => a.rank - b.rank);
    const best = sortedByRank[0];

    artists.push({
      name: entry.name,
      slug: toArtistSlug(entry.name),
      riddimCount: entry.riddimIds.size,
      totalVoicings: entry.riddimEntries.length,
      topRiddim: best?.riddimName ?? '',
      topRank: best?.rank ?? 0,
      styles: Array.from(entry.genreSet),
      decades: Array.from(entry.decadeSet).sort(),
      riddims: sortedByRank,
    });
  }

  return artists.sort((a, b) => b.totalVoicings - a.totalVoicings);
}


/**
 * Récupère un artiste par son slug.
 * Retourne undefined si non trouvé.
 */
export function getArtistBySlug(
  slug: string,
  riddims: Riddim[]
): Artist | undefined {
  const all = buildArtistList(riddims);
  return all.find((a) => a.slug === slug);
}


/**
 * Récupère les artistes qui apparaissent sur les mêmes riddims.
 * Exclut l'artiste courant, limite à 6 résultats.
 */
export function getRelatedArtists(
  artist: Artist,
  allArtists: Artist[]
): Artist[] {
  const artistRiddimIds = new Set(artist.riddims.map((r) => r.riddimId));

  const scored = allArtists
    .filter((a) => a.slug !== artist.slug)
    .map((a) => {
      const overlap = a.riddims.filter((r) => artistRiddimIds.has(r.riddimId)).length;
      return { artist: a, overlap };
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  return scored.slice(0, 6).map((s) => s.artist);
}


/**
 * Génère un texte contextuel SEO pour un artiste.
 * Fonction pure, testable.
 */
export function generateArtistContextText(artist: Artist): string {
  const mainStyle = artist.styles[0] ?? 'dancehall';
  const decadesStr = artist.decades.join(', ');
  const topEntry = artist.riddims[0];
  const topTitle = topEntry?.title ?? '';

  let text =
    `${artist.name} est un artiste jamaïcain de ${mainStyle} ` +
    `actif dans les années ${decadesStr}. `;

  text +=
    `Il apparaît sur ${artist.riddimCount} riddim${artist.riddimCount > 1 ? 's' : ''} ` +
    `documenté${artist.riddimCount > 1 ? 's' : ''} dans la base WMC`;

  if (artist.topRiddim) {
    text += `, dont ${artist.topRiddim} où il occupe la position #${artist.topRank}`;
  }

  text += '.';

  if (topTitle) {
    text += ` Parmi ses titres les plus notables : ${topTitle}.`;
  }

  return text;
}


/**
 * Génère le JSON-LD Person/MusicGroup pour un artiste.
 */
export function generateArtistJsonLd(
  artist: Artist,
  lang: string,
  baseUrl: string
): object {
  const isGroup = /&|ft\.|feat\./i.test(artist.name);
  const canonicalUrl = `${baseUrl}/${lang}/artistes/${artist.slug}`;
  const spotifySearch = `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`;
  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(artist.name)}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isGroup ? 'MusicGroup' : 'Person',
        name: artist.name,
        genre: artist.styles,
        url: canonicalUrl,
        sameAs: [spotifySearch, youtubeSearch],
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
            name: 'Artistes',
            item: `${baseUrl}/${lang}/artistes`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: artist.name,
          },
        ],
      },
    ],
  };
}
