/* ══════════════════════════════════════════════════════════════════════════════
   WMC — GÉNÉRATION TEXTE CONTEXTUEL
   Produit un paragraphe descriptif (résumé extractible) à partir des données
   réelles d'un riddim, dans la langue de la page. Aucune donnée inventée : tout
   est dérivé du catalogue (producteur, label, année, voicings, vues).
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Riddim } from '@/types/riddim';

type Locale = 'fr' | 'en' | 'es' | 'pt' | 'ja';

/** Décennie depuis une année (ex : 1985 → "1980"). */
function getDecade(year: number): string {
  return `${Math.floor(year / 10) * 10}`;
}

/** Formatage compact et non ambigu des vues (K / M / B — usage streaming). */
function compactViews(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

/** Joint une liste avec le bon séparateur final selon la langue. */
function joinList(items: string[], locale: Locale): string {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const head = items.slice(0, -1).join(', ');
  const and =
    locale === 'fr' ? ' et ' :
    locale === 'es' ? ' y ' :
    locale === 'pt' ? ' e ' :
    locale === 'ja' ? '、' :
    ' and ';
  return locale === 'ja' ? `${head}${and}${last}` : `${head}${and}${last}`;
}

interface Facts {
  name: string;
  genre: string;
  producer: string;
  label: string;
  year: number;
  decade: string;
  count: number;
  totalViews: string;
  topTitle: string;
  topArtist: string;
  otherArtists: string[];
  bpm: number;
}

/* Un constructeur de phrases par langue — pyramide inversée : la réponse
   (nature, producteur, année) dans les premiers mots. */
const BUILDERS: Record<Locale, (f: Facts) => string> = {
  fr: (f) => {
    const lead = `Le ${f.name} est un riddim ${f.genre} jamaïcain produit par ${f.producer}${f.label ? ` pour le label ${f.label}` : ''} en ${f.year}.`;
    const scale = f.count > 0
      ? ` Il réunit ${f.count} voicing${f.count > 1 ? 's' : ''} totalisant environ ${f.totalViews} vues, le plus écouté étant « ${f.topTitle} » de ${f.topArtist}.`
      : '';
    const others = f.otherArtists.length
      ? ` On y retrouve également ${joinList(f.otherArtists, 'fr')}.`
      : '';
    const era = ` Sorti dans les années ${f.decade}, il s'inscrit dans le catalogue du ${f.genre} jamaïcain de cette période.`;
    const tempo = f.bpm > 0 ? ` Son tempo se situe autour de ${f.bpm} BPM.` : '';
    return lead + scale + others + era + tempo;
  },
  en: (f) => {
    const lead = `${f.name} is a Jamaican ${f.genre} riddim produced by ${f.producer}${f.label ? ` for the ${f.label} label` : ''} in ${f.year}.`;
    const scale = f.count > 0
      ? ` It brings together ${f.count} voicing${f.count > 1 ? 's' : ''} totalling roughly ${f.totalViews} views, the most played being “${f.topTitle}” by ${f.topArtist}.`
      : '';
    const others = f.otherArtists.length
      ? ` It also features ${joinList(f.otherArtists, 'en')}.`
      : '';
    const era = ` Released in the ${f.decade}s, it belongs to the Jamaican ${f.genre} catalogue of that era.`;
    const tempo = f.bpm > 0 ? ` Its tempo sits around ${f.bpm} BPM.` : '';
    return lead + scale + others + era + tempo;
  },
  es: (f) => {
    const lead = `${f.name} es un riddim ${f.genre} jamaicano producido por ${f.producer}${f.label ? ` para el sello ${f.label}` : ''} en ${f.year}.`;
    const scale = f.count > 0
      ? ` Reúne ${f.count} voicing${f.count > 1 ? 's' : ''} que suman alrededor de ${f.totalViews} reproducciones, siendo el más escuchado «${f.topTitle}» de ${f.topArtist}.`
      : '';
    const others = f.otherArtists.length
      ? ` También cuenta con ${joinList(f.otherArtists, 'es')}.`
      : '';
    const era = ` Publicado en los años ${f.decade}, forma parte del catálogo del ${f.genre} jamaicano de esa época.`;
    const tempo = f.bpm > 0 ? ` Su tempo ronda los ${f.bpm} BPM.` : '';
    return lead + scale + others + era + tempo;
  },
  pt: (f) => {
    const lead = `${f.name} é um riddim ${f.genre} jamaicano produzido por ${f.producer}${f.label ? ` para o selo ${f.label}` : ''} em ${f.year}.`;
    const scale = f.count > 0
      ? ` Reúne ${f.count} voicing${f.count > 1 ? 's' : ''} que somam cerca de ${f.totalViews} visualizações, sendo o mais ouvido «${f.topTitle}» de ${f.topArtist}.`
      : '';
    const others = f.otherArtists.length
      ? ` Conta também com ${joinList(f.otherArtists, 'pt')}.`
      : '';
    const era = ` Lançado nos anos ${f.decade}, faz parte do catálogo do ${f.genre} jamaicano dessa época.`;
    const tempo = f.bpm > 0 ? ` Seu tempo gira em torno de ${f.bpm} BPM.` : '';
    return lead + scale + others + era + tempo;
  },
  ja: (f) => {
    const lead = `${f.name}は、${f.producer}が${f.year}年に${f.label ? `${f.label}レーベル向けに` : ''}制作したジャマイカの${f.genre}リディムです。`;
    const scale = f.count > 0
      ? `${f.count}のボイシングを収録し、総再生回数は約${f.totalViews}回、最も再生されているのは${f.topArtist}の「${f.topTitle}」です。`
      : '';
    const others = f.otherArtists.length
      ? `${joinList(f.otherArtists, 'ja')}なども参加しています。`
      : '';
    const era = `${f.decade}年代にリリースされ、この時代のジャマイカの${f.genre}カタログを代表する一曲です。`;
    const tempo = f.bpm > 0 ? `テンポは約${f.bpm} BPMです。` : '';
    return lead + scale + others + era + tempo;
  },
};

/**
 * Génère un texte contextuel (résumé extractible) pour un riddim, dans la langue
 * demandée. Fonction pure, sans effet de bord ni donnée inventée.
 * @param riddim - Le riddim
 * @param locale - Langue de la page (défaut : 'fr')
 */
export function generateContextText(riddim: Riddim, locale: string = 'fr'): string {
  const { name, genre, producer, label, year, bpm, voicings } = riddim;
  const sorted = [...voicings].sort((a, b) => b.views - a.views);
  const totalViews = sorted.reduce((s, v) => s + v.views, 0);
  const top = sorted[0];
  const otherArtists = sorted.slice(1, 3).map((v) => v.artist);

  const facts: Facts = {
    name,
    genre,
    producer,
    label,
    year,
    decade: getDecade(year),
    count: sorted.length,
    totalViews: compactViews(totalViews),
    topTitle: top ? top.title : '',
    topArtist: top ? top.artist : '',
    otherArtists,
    bpm: bpm ?? 0,
  };

  const build = BUILDERS[(locale as Locale)] ?? BUILDERS.fr;
  return build(facts);
}
