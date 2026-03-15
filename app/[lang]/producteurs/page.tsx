import React from 'react';
import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import { producers } from '@/data/producers';
import ProducerCard from '@/components/ProducerCard';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE PRODUCTEURS (LISTE)
   Les 7 labels majeurs du dancehall et reggae jamaïcain
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/producteurs', locale);

  return {
    title: 'Producteurs — Les labels derrière les riddims jamaïcains | WMC',
    description:
      'Découvrez les 7 labels et producteurs qui ont façonné le dancehall jamaïcain : Notnice, Di Genius, Chimney Records, Daseca, Birchill, Rvssian et Arif Cooper. Leurs riddims, artistes et histoire.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/producteurs`,
      languages: hreflang,
    },
  };
}

export default async function ProducteursPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return (
    <main className={styles.container}>
      {/* En-tête */}
      <header className={styles.header}>
        <h1 className={styles.title}>Producteurs</h1>
        <span className={styles.titleScript}>les architectes du son jamaïcain</span>
        <svg
          className={styles.brushStroke}
          viewBox="0 0 300 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 6 Q40 2 80 7 Q120 12 160 5 Q200 0 240 8 Q270 11 300 4"
            stroke="var(--color-brand-gold)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <p className={styles.counter}>{producers.length} labels documentés</p>
      </header>

      {/* Grille de cartes */}
      <div className={styles.grid}>
        {producers.map((producer) => (
          <ProducerCard
            key={producer.id}
            producer={producer}
            lang={locale}
            href={`/${locale}/producteurs/${producer.id}`}
          />
        ))}
      </div>
    </main>
  );
}
