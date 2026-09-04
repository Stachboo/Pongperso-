import React from 'react';
import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import { producers } from '@/data/producers';
import ProducerCard from '@/components/ProducerCard';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE PRODUCTEURS (LISTE)
   18 labels et producteurs du dancehall et reggae jamaïcain
   ══════════════════════════════════════════════════════════════════════════════ */

type PageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleScript: string;
  documentedSuffix: string;
};

const CONTENT: Record<Locale, PageContent> = {
  fr: {
    metaTitle: 'Producteurs — Les labels derrière les riddims jamaïcains',
    metaDescription:
      'Découvrez les 18 labels et producteurs qui ont façonné le dancehall jamaïcain : Notnice, Di Genius, Chimney Records, Daseca, Birchill, Rvssian, Arif Cooper et bien d\'autres. Leurs riddims, artistes et histoire.',
    title: 'Producteurs',
    titleScript: 'les architectes du son jamaïcain',
    documentedSuffix: 'labels documentés',
  },
  en: {
    metaTitle: 'Producers — The labels behind the Jamaican riddims',
    metaDescription:
      'Discover the 18 labels and producers who shaped Jamaican dancehall: Notnice, Di Genius, Chimney Records, Daseca, Birchill, Rvssian, Arif Cooper and many more. Their riddims, artists and history.',
    title: 'Producers',
    titleScript: 'the architects of the Jamaican sound',
    documentedSuffix: 'documented labels',
  },
  es: {
    metaTitle: 'Productores — Los sellos detrás de los riddims jamaicanos',
    metaDescription:
      'Descubre los 18 sellos y productores que dieron forma al dancehall jamaicano: Notnice, Di Genius, Chimney Records, Daseca, Birchill, Rvssian, Arif Cooper y muchos más. Sus riddims, artistas e historia.',
    title: 'Productores',
    titleScript: 'los arquitectos del sonido jamaicano',
    documentedSuffix: 'sellos documentados',
  },
  pt: {
    metaTitle: 'Produtores — Os selos por trás dos riddims jamaicanos',
    metaDescription:
      'Descubra os 18 selos e produtores que moldaram o dancehall jamaicano: Notnice, Di Genius, Chimney Records, Daseca, Birchill, Rvssian, Arif Cooper e muitos outros. Seus riddims, artistas e história.',
    title: 'Produtores',
    titleScript: 'os arquitetos do som jamaicano',
    documentedSuffix: 'selos documentados',
  },
  ja: {
    metaTitle: 'プロデューサー — ジャマイカのriddimを支えるレーベル',
    metaDescription:
      'ジャマイカのdancehallを形づくった18のレーベルとプロデューサーを紹介：Notnice、Di Genius、Chimney Records、Daseca、Birchill、Rvssian、Arif Cooperほか多数。彼らのriddim、アーティスト、そしてその歴史。',
    title: 'プロデューサー',
    titleScript: 'ジャマイカ・サウンドの設計者たち',
    documentedSuffix: '件の記録されたレーベル',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/producteurs', locale);
  const c = CONTENT[locale];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/producteurs`,
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
  const c = CONTENT[locale];

  return (
    <main className={styles.container}>
      {/* En-tête */}
      <header className={styles.header}>
        <h1 className={styles.title}>{c.title}</h1>
        <span className={styles.titleScript}>{c.titleScript}</span>
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
        <p className={styles.counter}>{producers.length} {c.documentedSuffix}</p>
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
