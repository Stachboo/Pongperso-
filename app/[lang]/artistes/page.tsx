import React from 'react';
import type { Metadata } from 'next';
import { isValidLocale, getDictionary, type Locale } from '@/lib/i18n';
import { getAllRiddims } from '@/lib/data';
import { generateHreflang } from '@/utils/seo';
import { buildArtistList } from '@/utils/artists';
import ArtistSearchBar from '@/components/ArtistSearchBar';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE ARTISTES (LISTE)
   Répertoire complet des artistes avec recherche côté client
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  headerTitle: string;
  headerSubtitle: string;
  documentedSuffix: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Artistes — Tous les voicings de riddims jamaïcains | WMC',
    metaDescription:
      'Découvrez les artistes qui ont enregistré sur des riddims jamaïcains. ' +
      'Vybz Kartel, Sean Paul, Mavado, Chronixx et bien d’autres artistes documentés avec leurs voicings.',
    headerTitle: 'Artistes',
    headerSubtitle: 'tous les voicings',
    documentedSuffix: 'artistes documentés',
  },
  en: {
    metaTitle: 'Artists — Every voicing on Jamaican riddims | WMC',
    metaDescription:
      'Discover the artists who recorded on Jamaican riddims. ' +
      'Vybz Kartel, Sean Paul, Mavado, Chronixx and many more artists documented with their voicings.',
    headerTitle: 'Artists',
    headerSubtitle: 'all the voicings',
    documentedSuffix: 'documented artists',
  },
  es: {
    metaTitle: 'Artistas — Todos los voicings de riddims jamaicanos | WMC',
    metaDescription:
      'Descubre a los artistas que grabaron sobre riddims jamaicanos. ' +
      'Vybz Kartel, Sean Paul, Mavado, Chronixx y muchos más artistas documentados con sus voicings.',
    headerTitle: 'Artistas',
    headerSubtitle: 'todos los voicings',
    documentedSuffix: 'artistas documentados',
  },
  pt: {
    metaTitle: 'Artistas — Todos os voicings de riddims jamaicanos | WMC',
    metaDescription:
      'Conheça os artistas que gravaram sobre riddims jamaicanos. ' +
      'Vybz Kartel, Sean Paul, Mavado, Chronixx e muitos outros artistas documentados com seus voicings.',
    headerTitle: 'Artistas',
    headerSubtitle: 'todos os voicings',
    documentedSuffix: 'artistas documentados',
  },
  ja: {
    metaTitle: 'アーティスト — ジャマイカン riddim のすべての voicing | WMC',
    metaDescription:
      'ジャマイカン riddim にレコーディングしたアーティストを紹介します。' +
      'Vybz Kartel、Sean Paul、Mavado、Chronixx など、voicing とともに記録された多数のアーティスト。',
    headerTitle: 'アーティスト',
    headerSubtitle: 'すべての voicing',
    documentedSuffix: '組の記録されたアーティスト',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/artistes', locale);

  const title = CONTENT[locale].metaTitle;
  const description = CONTENT[locale].metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/artistes`,
      languages: hreflang,
    },
  };
}

export default async function ArtistesPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const allArtists = buildArtistList(await getAllRiddims());
  const dict = getDictionary(locale);
  const c = CONTENT[locale];

  return (
    <div className={styles.container}>
      {/* En-tête */}
      <header className={styles.header}>
        <h1 className={styles.title}>{c.headerTitle}</h1>
        <span className={styles.titleScript}>{c.headerSubtitle}</span>
        <svg className={styles.brushStroke} viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 8 Q75 0 150 6 Q225 12 300 4" stroke="var(--color-brand-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        <p className={styles.counter}>{allArtists.length} {c.documentedSuffix}</p>
      </header>

      {/* Recherche + Grille (composant client) */}
      <ArtistSearchBar artists={allArtists} lang={locale} dict={dict} />
    </div>
  );
}
