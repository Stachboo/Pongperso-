import React from 'react';
import type { Metadata } from 'next';
import { getDictionary, isValidLocale, type Locale } from '@/lib/i18n';
import { getRiddimsByPopularity, getAllRiddims } from '@/lib/data';
import { BASE_URL } from '@/utils/seo';
import RiddimExplorer from '@/components/RiddimExplorer';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE RIDDIMS
   Page dédiée à l'exploration de tous les riddims avec filtres
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: (totalRiddims: number) => string;
  title: string;
  subtitle: string;
  documentedSuffix: string;
  ariaExplore: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Explorer les Riddims Jamaïcains — Base de données | WMC',
    metaDescription: (totalRiddims) =>
      `Parcourez les ${totalRiddims} riddims jamaïcains documentés sur WMC. ` +
      `Filtrez par genre (Dancehall, Reggae, Lovers Rock), décennie et producteur. ` +
      `Classés par popularité de streaming.`,
    title: 'Explorer les Riddims',
    subtitle: 'La base de données ultime',
    documentedSuffix: 'riddims documentés',
    ariaExplore: 'Explorer les riddims',
  },
  en: {
    metaTitle: 'Explore Jamaican Riddims — Database | WMC',
    metaDescription: (totalRiddims) =>
      `Browse the ${totalRiddims} Jamaican riddims documented on WMC. ` +
      `Filter by genre (Dancehall, Reggae, Lovers Rock), decade and producer. ` +
      `Ranked by streaming popularity.`,
    title: 'Explore Riddims',
    subtitle: 'The ultimate database',
    documentedSuffix: 'documented riddims',
    ariaExplore: 'Explore riddims',
  },
  es: {
    metaTitle: 'Explora los Riddims Jamaicanos — Base de datos | WMC',
    metaDescription: (totalRiddims) =>
      `Explora los ${totalRiddims} riddims jamaicanos documentados en WMC. ` +
      `Filtra por género (Dancehall, Reggae, Lovers Rock), década y productor. ` +
      `Clasificados por popularidad de streaming.`,
    title: 'Explora los Riddims',
    subtitle: 'La base de datos definitiva',
    documentedSuffix: 'riddims documentados',
    ariaExplore: 'Explorar los riddims',
  },
  pt: {
    metaTitle: 'Explore os Riddims Jamaicanos — Banco de dados | WMC',
    metaDescription: (totalRiddims) =>
      `Explore os ${totalRiddims} riddims jamaicanos documentados na WMC. ` +
      `Filtre por gênero (Dancehall, Reggae, Lovers Rock), década e produtor. ` +
      `Classificados por popularidade de streaming.`,
    title: 'Explore os Riddims',
    subtitle: 'O banco de dados definitivo',
    documentedSuffix: 'riddims documentados',
    ariaExplore: 'Explorar os riddims',
  },
  ja: {
    metaTitle: 'ジャマイカのリディムを探索 — データベース | WMC',
    metaDescription: (totalRiddims) =>
      `WMCに収録された${totalRiddims}件のジャマイカのリディムを閲覧できます。` +
      `ジャンル（Dancehall、Reggae、Lovers Rock）、年代、プロデューサーで絞り込み。` +
      `ストリーミングの人気順に分類。`,
    title: 'リディムを探索',
    subtitle: '究極のデータベース',
    documentedSuffix: '件のリディムを収録',
    ariaExplore: 'リディムを探索',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  // /riddims duplique /explorer (même catalogue) ; /explorer est la page liée
  // partout (nav, footer) → on la déclare canonique pour éviter le contenu dupliqué.
  const canonicalUrl = `${BASE_URL}/${locale}/explorer`;
  const c = CONTENT[locale];

  const totalRiddims = (await getAllRiddims()).length;
  const title = c.metaTitle;
  const description = c.metaDescription(totalRiddims);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function RiddimsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const c = CONTENT[locale];
  const riddims = await getRiddimsByPopularity();
  const totalRiddims = riddims.length;

  return (
    <>
      {/* ── En-tête de page ── */}
      <header className={styles.header}>
        <h1 className={styles.title}>{c.title}</h1>
        <p className={styles.subtitle}>{c.subtitle}</p>
        <span className={styles.count}>{totalRiddims} {c.documentedSuffix}</span>

        {/* Brush stroke décoratif */}
        <svg
          className={styles.brush}
          width="200"
          height="10"
          viewBox="0 0 200 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3,7 C25,3 50,9 75,4 C100,0 125,8 150,3 C170,0 185,7 197,4"
            stroke="var(--color-brand-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      </header>

      {/* ── Explorer les riddims ── */}
      <section aria-label={c.ariaExplore}>
        <RiddimExplorer riddims={riddims} lang={locale} dict={dict} />
      </section>
    </>
  );
}
