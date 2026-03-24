import React from 'react';
import type { Metadata } from 'next';
import { getDictionary, isValidLocale, type Locale } from '@/lib/i18n';
import { allRiddims, getCatalogStats, formatViews } from '@/lib/data';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — HOME PAGE
   Page d'accueil avec hero, stats, sections éducatives, CTA
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const canonicalUrl = `${BASE_URL}/${locale}`;
  const hreflang = generateHreflang('', locale);

  return {
    title: `${dict.siteTitle} — ${dict.taglineHome}`,
    description: dict.metaDescHome,
    openGraph: {
      title: `${dict.siteTitle} — ${dict.taglineHome}`,
      description: dict.metaDescHome,
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.siteTitle} — ${dict.taglineHome}`,
      description: dict.metaDescHome,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflang,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const stats = getCatalogStats();

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero} aria-label="Hero">
        {/* Halo radial */}
        <div className={styles.heroGlow} />

        <div className={styles.heroContent}>
          {/* Badge */}
          <div className={styles.badge}>{dict.badgeText}</div>

          {/* Logo */}
          <Logo size={100} variant="full" animated className={styles.logo} />

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineBold}>{dict.heroTitle1}</span>
            <span className={styles.headlineBold}>{dict.heroTitle2}</span>
            <span className={styles.headlineScript}>{dict.heroTitle3}</span>
          </h1>

          <p className={styles.heroText}>{dict.heroText}</p>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.totalRiddims}+</span>
              <span className={styles.statLabel}>{dict.statsRiddimsShort}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.totalVoicings.toLocaleString()}+</span>
              <span className={styles.statLabel}>{dict.statsVoicingsShort}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatViews(stats.totalViews)}</span>
              <span className={styles.statLabel}>{dict.statsViewsShort}</span>
            </div>
          </div>

          {/* CTA */}
          <Link href={`/${locale}/explorer`} className={styles.cta}>
            {dict.ctaExplore} →
          </Link>
        </div>
      </section>

      {/* ── What is a riddim ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{dict.whatTitle}</h2>
        <div className={styles.columns}>
          <div dangerouslySetInnerHTML={{ __html: dict.whatP1 }} className={styles.paragraph} />
          <div dangerouslySetInnerHTML={{ __html: dict.whatP2 }} className={styles.paragraph} />
          <div dangerouslySetInnerHTML={{ __html: dict.whatP3 }} className={styles.paragraph} />
          <div dangerouslySetInnerHTML={{ __html: dict.whatP4 }} className={styles.paragraph} />
        </div>
      </section>

      {/* ── Genres ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{dict.genresTitle}</h2>
        <div className={styles.genreGrid}>
          {[
            { name: dict.genreReggae, desc: dict.genreReggaeDesc, icon: '🎵', color: 'green' },
            { name: dict.genreDancehall, desc: dict.genreDancehallDesc, icon: '🔥', color: 'gold' },
            { name: dict.genreLovers, desc: dict.genreLoversDesc, icon: '❤️', color: 'red' },
            { name: dict.genreSoca, desc: dict.genreSocaDesc, icon: '🎉', color: 'gold' },
          ].map((g) => (
            <div key={g.name} className={styles.genreCard}>
              <span className={styles.genreIcon}>{g.icon}</span>
              <h3 className={styles.genreName}>{g.name}</h3>
              <p className={styles.genreDesc}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{dict.howTitle}</h2>
        <div className={styles.steps}>
          {[
            { num: '01', title: dict.howStep1Title, desc: dict.howStep1Desc },
            { num: '02', title: dict.howStep2Title, desc: dict.howStep2Desc },
            { num: '03', title: dict.howStep3Title, desc: dict.howStep3Desc },
          ].map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{dict.ctaReadyTitle}</h2>
        <p className={styles.ctaText}>{dict.ctaReadyText}</p>
        <Link href={`/${locale}/explorer`} className={styles.ctaBtn}>
          {dict.ctaAccess} →
        </Link>
      </section>
    </>
  );
}
