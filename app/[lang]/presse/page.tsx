import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE PRESSE
   Kit presse, chiffres clés et contact média
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/presse', locale);

  return {
    title: 'Presse — Espace média et kit presse | WMC',
    description:
      'Espace presse de WMC. Retrouvez les chiffres clés, le kit presse et les coordonnées média de la base de données des riddims jamaïcains.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/presse`,
      languages: hreflang,
    },
  };
}

export default async function PressePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Presse</h1>
        <span className={styles.subtitle}>espace média</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        <section className={styles.section} aria-label="WMC dans les médias">
          <h2 className={styles.sectionTitle}>WMC dans les médias</h2>
          <p className={styles.paragraph}>
            WMC est disponible pour les interviews, collaborations éditoriales et demandes
            de partenariat liées à la culture jamaïcaine et au dancehall mondial. Nous
            collaborons avec les médias spécialisés en musique caribéenne, les chercheurs
            en musicologie et les institutions culturelles.
          </p>
        </section>

        <section className={styles.section} aria-label="Kit presse">
          <h2 className={styles.sectionTitle}>Kit presse</h2>
          <p className={styles.paragraph}>
            Le logo WMC et les visuels du projet sont disponibles sur demande pour tout
            usage éditorial ou promotionnel en lien avec la couverture de WMC.
          </p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Contact presse</p>
            <p className={styles.infoValue}>presse@wmc-riddims.com</p>
          </div>
        </section>

        <section className={styles.section} aria-label="Chiffres clés">
          <h2 className={styles.sectionTitle}>Chiffres clés</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Riddims documentés</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>5 000+</span>
              <span className={styles.statLabel}>Voicings référencés</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>5</span>
              <span className={styles.statLabel}>Langues disponibles</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>1 400+</span>
              <span className={styles.statLabel}>Pages indexées</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-label="À propos de WMC">
          <h2 className={styles.sectionTitle}>À propos de WMC</h2>
          <p className={styles.paragraph}>
            World Music Contest (WMC) est la première base de données mondiale de référence
            dédiée aux riddims jamaïcains. Fondée en 2026, WMC documente chaque riddim, chaque
            voicing et chaque producteur, classés par popularité de streaming mondiale. Le
            projet couvre plus de 60 ans d&apos;histoire musicale jamaïcaine, du ska au dancehall
            contemporain.
          </p>
        </section>
      </div>
    </main>
  );
}
