import React from 'react';
import type { Metadata } from 'next';
import { getDictionary, isValidLocale, type Locale } from '@/lib/i18n';
import { getRiddimsByPopularity, allRiddims } from '@/lib/data';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import RiddimExplorer from '@/components/RiddimExplorer';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE RIDDIMS
   Page dédiée à l'exploration de tous les riddims avec filtres
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const canonicalUrl = `${BASE_URL}/${locale}/riddims`;
  const hreflang = generateHreflang('/riddims', locale);

  const totalRiddims = allRiddims.length;
  const title = 'Explorer les Riddims Jamaïcains — Base de données | WMC';
  const description =
    `Parcourez les ${totalRiddims} riddims jamaïcains documentés sur WMC. ` +
    `Filtrez par genre (Dancehall, Reggae, Lovers Rock), décennie et producteur. ` +
    `Classés par popularité de streaming.`;

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
      languages: hreflang,
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
  const riddims = getRiddimsByPopularity();
  const totalRiddims = allRiddims.length;

  return (
    <>
      {/* ── En-tête de page ── */}
      <header className={styles.header}>
        <h1 className={styles.title}>Explorer les Riddims</h1>
        <p className={styles.subtitle}>La base de données ultime</p>
        <span className={styles.count}>{totalRiddims} riddims documentés</span>

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
      <section aria-label="Explorer les riddims">
        <RiddimExplorer riddims={riddims} lang={locale} dict={dict} />
      </section>
    </>
  );
}
