import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE MÉTHODOLOGIE
   Explication de la collecte des données et des critères de classement
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
  const hreflang = generateHreflang('/methodologie', locale);

  return {
    title: 'Méthodologie — Comment nous collectons les données | WMC',
    description:
      'Découvrez comment WMC collecte les données de streaming, classe les voicings par popularité et met à jour son catalogue de riddims jamaïcains.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/methodologie`,
      languages: hreflang,
    },
  };
}

export default async function MethodologiePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Méthodologie</h1>
        <span className={styles.subtitle}>nos sources et critères</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        {/* ═══ COLLECTE ═══ */}
        <section className={styles.section} aria-label="Collecte des données">
          <h2 className={styles.sectionTitle}>Comment nous collectons les données</h2>
          <p className={styles.paragraph}>
            Les données de popularité proviennent des principales plateformes de streaming :
            Spotify, Apple Music, YouTube Music. Les chiffres de vues et de streams sont
            agrégés et approximatifs — ils reflètent la popularité relative des voicings,
            non des chiffres certifiés par les plateformes.
          </p>
          <p className={styles.paragraph}>
            Chaque riddim est documenté avec son producteur, son label, son année de sortie,
            son genre et son tempo (BPM). Les voicings sont associés à leurs artistes
            respectifs et classés par nombre de streams estimés.
          </p>
        </section>

        {/* ═══ CRITÈRES ═══ */}
        <section className={styles.section} aria-label="Critères de classement">
          <h2 className={styles.sectionTitle}>Critères de classement</h2>
          <p className={styles.paragraph}>
            Le classement des voicings par riddim est établi selon trois critères principaux :
          </p>
          <ol className={styles.orderedList}>
            <li className={styles.orderedItem}>
              Le nombre de streams estimés sur les plateformes majeures (Spotify, Apple Music,
              YouTube Music). C&apos;est le critère principal de classement.
            </li>
            <li className={styles.orderedItem}>
              La notoriété de l&apos;artiste dans le genre. Un voicing de Vybz Kartel ou
              Sean Paul aura naturellement plus de visibilité qu&apos;un artiste émergent.
            </li>
            <li className={styles.orderedItem}>
              L&apos;impact culturel du titre dans la communauté dancehall. Certains morceaux
              sont des classiques incontournables malgré des chiffres de streaming modestes,
              car ils sont antérieurs à l&apos;ère du streaming digital.
            </li>
          </ol>
        </section>

        {/* ═══ MISE À JOUR ═══ */}
        <section className={styles.section} aria-label="Mise à jour">
          <h2 className={styles.sectionTitle}>Mise à jour des données</h2>
          <p className={styles.paragraph}>
            Le catalogue est mis à jour manuellement par l&apos;équipe WMC. Les données ne
            sont pas en temps réel. Les chiffres de streaming sont des estimations basées sur
            les données publiquement disponibles au moment de la dernière mise à jour.
          </p>
          <p className={styles.paragraph}>
            Nous nous efforçons de maintenir le catalogue aussi complet et précis que possible,
            mais des erreurs ou omissions peuvent exister. Si vous constatez une inexactitude,
            n&apos;hésitez pas à nous la signaler.
          </p>
        </section>

        {/* ═══ AJOUTER ═══ */}
        <section className={styles.section} aria-label="Ajouter un riddim">
          <h2 className={styles.sectionTitle}>Ajouter un riddim</h2>
          <p className={styles.paragraph}>
            Vous connaissez un riddim qui n&apos;est pas encore dans notre base de données ?
            Notre formulaire de soumission vous permet de nous le suggérer avec toutes les
            informations nécessaires.
          </p>
          <p className={styles.paragraph}>
            <Link href={`/${locale}/ajouter-riddim`} className={styles.link}>
              Soumettre un riddim →
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
