import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE À PROPOS
   Mission, vision et présentation du projet WMC
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
  const hreflang = generateHreflang('/about', locale);

  return {
    title: 'À propos — World Music Contest | WMC',
    description:
      'WMC est la base de données mondiale de référence des riddims jamaïcains. Découvrez notre mission, notre méthodologie et notre équipe.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/about`,
      languages: hreflang,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>À propos</h1>
        <span className={styles.subtitle}>World Music Contest</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        {/* ═══ MISSION ═══ */}
        <section id="mission" className={styles.section} aria-label="Notre mission">
          <h2 className={styles.sectionTitle}>Notre mission</h2>
          <p className={styles.paragraph}>
            WMC est la base de données mondiale de référence des riddims jamaïcains.
            Fondée en 2026, notre mission est de documenter chaque riddim, chaque voicing,
            classés par popularité de streaming mondiale.
          </p>
          <p className={styles.paragraph}>
            Le riddim est l&apos;âme de la musique jamaïcaine — une instrumentation partagée
            par des dizaines d&apos;artistes, fondement du dancehall et du reggae depuis les
            années 60. Du Bam Bam de Sly &amp; Robbie au Diwali de Lenky Marsden, ces
            instrumentales ont façonné la musique mondiale.
          </p>
        </section>

        {/* ═══ POURQUOI ═══ */}
        <section className={styles.section} aria-label="Pourquoi WMC existe">
          <h2 className={styles.sectionTitle}>Pourquoi WMC existe</h2>
          <p className={styles.paragraph}>
            Il n&apos;existait pas, avant WMC, de référence mondiale centralisant les riddims
            jamaïcains avec leurs voicings complets, leurs producteurs, leurs labels et leur
            contexte historique. Les informations étaient dispersées entre forums, blogs
            spécialisés et bases de données partielles.
          </p>
          <p className={styles.paragraph}>
            WMC comble ce vide en proposant un catalogue structuré, consultable en 5 langues,
            avec des données de streaming agrégées pour chaque voicing. Notre ambition est de
            devenir le Discogs du riddim jamaïcain.
          </p>
        </section>

        {/* ═══ MÉTHODOLOGIE ═══ */}
        <section id="methodologie" className={styles.section} aria-label="Notre méthodologie">
          <h2 className={styles.sectionTitle}>Notre méthodologie en bref</h2>
          <p className={styles.paragraph}>
            Les données de popularité proviennent des principales plateformes de streaming
            mondiales : Spotify, Apple Music, YouTube Music. Les chiffres sont agrégés et
            approximatifs — ils reflètent la popularité relative des voicings.
          </p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/methodologie`} className={styles.link}>
              Consulter notre méthodologie complète →
            </Link>
          </p>
        </section>

        {/* ═══ CONTRIBUER ═══ */}
        <section id="contribuer" className={styles.section} aria-label="Contribuer">
          <h2 className={styles.sectionTitle}>Contribuer</h2>
          <p className={styles.paragraph}>
            WMC est construit par et pour les passionnés de musique jamaïcaine. Si vous
            connaissez un riddim non encore documenté, vous pouvez nous le soumettre.
          </p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/ajouter-riddim`} className={styles.link}>
              Soumettre un riddim →
            </Link>
          </p>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className={styles.section} aria-label="Contact">
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.paragraph}>
            Pour toute question concernant WMC, les données, les partenariats ou les
            demandes presse.
          </p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/contact`} className={styles.link}>
              Nous contacter →
            </Link>
          </p>
        </section>

        {/* ═══ PRESSE ═══ */}
        <section id="presse" className={styles.section} aria-label="Presse">
          <h2 className={styles.sectionTitle}>Presse</h2>
          <p className={styles.paragraph}>
            WMC est disponible pour les interviews, collaborations éditoriales et demandes
            de partenariat liées à la culture jamaïcaine et au dancehall mondial.
          </p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/presse`} className={styles.link}>
              Espace presse →
            </Link>
          </p>
        </section>

        {/* ═══ ÉQUIPE ═══ */}
        <section className={styles.section} aria-label="L'équipe">
          <h2 className={styles.sectionTitle}>L&apos;équipe</h2>
          <p className={styles.paragraph}>
            WMC est un projet indépendant développé par une équipe passionnée de culture
            jamaïcaine et de musique mondiale. Nous ne sommes affiliés à aucun label,
            aucun artiste ni aucune plateforme de streaming.
          </p>
          <p className={styles.paragraph}>
            Notre objectif est simple : préserver et valoriser le patrimoine musical jamaïcain
            en le rendant accessible au plus grand nombre, dans toutes les langues.
          </p>
        </section>
      </div>
    </main>
  );
}
