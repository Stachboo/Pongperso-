/* ══════════════════════════════════════════════════════════════════════════════
   WMC — UTILITAIRES ARTISTES
   Fonctions pures pour construire, rechercher et afficher les artistes
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Riddim } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
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
      // Clé = slug d'URL (et non nom brut) pour fusionner les variantes d'un
      // même artiste qui produisent la même URL (ex: "Mr. Vegas" / "Mr Vegas"
      // → "mr-vegas"). Évite fiches scindées et pages partiellement vides.
      const key = toArtistSlug(v.artist);

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
type CtxLocale = 'fr' | 'en' | 'es' | 'pt' | 'ja';

/** Formatage compact des vues (K / M / B). */
function compactViews(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

interface ArtistFacts {
  name: string;
  mainStyle: string;
  decades: string;
  riddimCount: number;
  totalVoicings: number;
  totalViews: string;
  topRiddim: string;
  topRank: number;
  topTitle: string;
  otherRiddims: string;
}

const ARTIST_BUILDERS: Record<CtxLocale, (f: ArtistFacts) => string> = {
  fr: (f) => {
    const lead = `${f.name} est un artiste jamaïcain de ${f.mainStyle}${f.decades ? ` actif dans les années ${f.decades}` : ''}.`;
    const scale = ` Il figure sur ${f.riddimCount} riddim${f.riddimCount > 1 ? 's' : ''} documenté${f.riddimCount > 1 ? 's' : ''} dans la base WMC, pour ${f.totalVoicings} voicing${f.totalVoicings > 1 ? 's' : ''} totalisant environ ${f.totalViews} vues.`;
    const top = f.topRiddim ? ` Son apparition la plus marquante est « ${f.topTitle} » sur le ${f.topRiddim}, où il occupe la position #${f.topRank}.` : '';
    const others = f.otherRiddims ? ` On le retrouve aussi sur ${f.otherRiddims}.` : '';
    return lead + scale + top + others;
  },
  en: (f) => {
    const lead = `${f.name} is a Jamaican ${f.mainStyle} artist${f.decades ? ` active in the ${f.decades}` : ''}.`;
    const scale = ` They appear on ${f.riddimCount} riddim${f.riddimCount > 1 ? 's' : ''} documented in the WMC database, across ${f.totalVoicings} voicing${f.totalVoicings > 1 ? 's' : ''} totalling roughly ${f.totalViews} views.`;
    const top = f.topRiddim ? ` Their most notable appearance is “${f.topTitle}” on the ${f.topRiddim}, where they rank #${f.topRank}.` : '';
    const others = f.otherRiddims ? ` They also feature on ${f.otherRiddims}.` : '';
    return lead + scale + top + others;
  },
  es: (f) => {
    const lead = `${f.name} es un artista jamaicano de ${f.mainStyle}${f.decades ? `, activo en los años ${f.decades}` : ''}.`;
    const scale = ` Aparece en ${f.riddimCount} riddim${f.riddimCount > 1 ? 's' : ''} documentado${f.riddimCount > 1 ? 's' : ''} en la base WMC, con ${f.totalVoicings} voicing${f.totalVoicings > 1 ? 's' : ''} que suman alrededor de ${f.totalViews} reproducciones.`;
    const top = f.topRiddim ? ` Su aparición más destacada es «${f.topTitle}» en el ${f.topRiddim}, donde ocupa la posición #${f.topRank}.` : '';
    const others = f.otherRiddims ? ` También figura en ${f.otherRiddims}.` : '';
    return lead + scale + top + others;
  },
  pt: (f) => {
    const lead = `${f.name} é um artista jamaicano de ${f.mainStyle}${f.decades ? `, ativo nos anos ${f.decades}` : ''}.`;
    const scale = ` Aparece em ${f.riddimCount} riddim${f.riddimCount > 1 ? 's' : ''} documentado${f.riddimCount > 1 ? 's' : ''} na base WMC, com ${f.totalVoicings} voicing${f.totalVoicings > 1 ? 's' : ''} que somam cerca de ${f.totalViews} visualizações.`;
    const top = f.topRiddim ? ` Sua aparição mais marcante é «${f.topTitle}» no ${f.topRiddim}, onde ocupa a posição #${f.topRank}.` : '';
    const others = f.otherRiddims ? ` Também figura em ${f.otherRiddims}.` : '';
    return lead + scale + top + others;
  },
  ja: (f) => {
    const lead = `${f.name}は、ジャマイカの${f.mainStyle}アーティスト${f.decades ? `で、${f.decades}に活動しています` : ''}。`;
    const scale = `WMCデータベースには${f.riddimCount}のリディムに登場し、${f.totalVoicings}のボイシングで総再生回数は約${f.totalViews}回にのぼります。`;
    const top = f.topRiddim ? `最も代表的なのは${f.topRiddim}の「${f.topTitle}」で、ランキング#${f.topRank}に位置しています。` : '';
    const others = f.otherRiddims ? `${f.otherRiddims}にも参加しています。` : '';
    return lead + scale + top + others;
  },
};

/**
 * Génère un texte contextuel (résumé extractible) pour un artiste, dans la
 * langue de la page. Fonction pure, sans donnée inventée : tout est dérivé du
 * catalogue (riddims, voicings, vues, positions).
 */
export function generateArtistContextText(artist: Artist, locale: string = 'fr'): string {
  const mainStyle = artist.styles[0] ?? 'dancehall';
  const totalViews = artist.riddims.reduce((s, r) => s + r.views, 0);
  const topEntry = artist.riddims[0];
  const otherRiddims = artist.riddims.slice(1, 3).map((r) => r.riddimName).join(', ');

  const facts: ArtistFacts = {
    name: artist.name,
    mainStyle,
    decades: artist.decades.join(', '),
    riddimCount: artist.riddimCount,
    totalVoicings: artist.totalVoicings,
    totalViews: compactViews(totalViews),
    topRiddim: artist.topRiddim ?? '',
    topRank: artist.topRank ?? 0,
    topTitle: topEntry?.title ?? '',
    otherRiddims,
  };

  const build = ARTIST_BUILDERS[(locale as CtxLocale)] ?? ARTIST_BUILDERS.fr;
  return build(facts);
}


/**
 * Génère le JSON-LD Person/MusicGroup pour un artiste.
 */
export function generateArtistJsonLd(
  artist: Artist,
  lang: string,
  baseUrl: string,
  dict: Dictionary
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
        '@id': `${canonicalUrl}#artist`,
        name: artist.name,
        genre: artist.styles,
        url: canonicalUrl,
        sameAs: [spotifySearch, youtubeSearch],
        mainEntityOfPage: canonicalUrl,
        subjectOf: { '@id': `${baseUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: dict.navHome,
            item: `${baseUrl}/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: dict.navArtists,
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
