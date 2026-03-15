import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE POLITIQUE DE CONFIDENTIALITÉ
   Protection des données personnelles et cookies
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
  const hreflang = generateHreflang('/confidentialite', locale);

  return {
    title: 'Politique de confidentialité | WMC',
    description:
      'Politique de confidentialité de World Music Contest. Protection des données personnelles, cookies et conformité RGPD.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/confidentialite`,
      languages: hreflang,
    },
  };
}

export default async function ConfidentialitePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Politique de confidentialité</h1>
        <span className={styles.subtitle}>protection des données</span>
      </header>

      <div className={styles.separator} />

      <p className={styles.legalDate}>Dernière mise à jour : mars 2026</p>

      <div className={styles.content}>
        <section className={styles.section} aria-label="Données personnelles">
          <h2 className={styles.sectionTitle}>Collecte des données personnelles</h2>
          <p className={styles.paragraph}>
            WMC ne collecte aucune donnée personnelle identifiable. Aucun compte utilisateur
            n&apos;est requis pour accéder à l&apos;ensemble du catalogue. Vous pouvez naviguer
            librement sur le site sans fournir aucune information personnelle.
          </p>
        </section>

        <section className={styles.section} aria-label="Cookies">
          <h2 className={styles.sectionTitle}>Cookies et traceurs</h2>
          <p className={styles.paragraph}>
            Des analyses de trafic anonymes peuvent être collectées via des outils
            d&apos;analyse web dans le respect du Règlement Général sur la Protection des
            Données (RGPD). Ces données sont strictement anonymisées et utilisées uniquement
            pour améliorer l&apos;expérience utilisateur du site.
          </p>
          <p className={styles.paragraph}>
            Aucun cookie publicitaire n&apos;est déposé sans votre consentement explicite.
            WMC n&apos;utilise aucune technologie de ciblage publicitaire et ne revend aucune
            donnée à des tiers.
          </p>
        </section>

        <section className={styles.section} aria-label="Cookies techniques">
          <h2 className={styles.sectionTitle}>Cookies techniques</h2>
          <p className={styles.paragraph}>
            Le site peut utiliser des cookies strictement nécessaires à son fonctionnement
            technique (préférence de langue, état de la navigation). Ces cookies ne collectent
            aucune donnée personnelle et sont exemptés de consentement conformément aux
            directives de la CNIL.
          </p>
        </section>

        <section className={styles.section} aria-label="Vos droits">
          <h2 className={styles.sectionTitle}>Vos droits</h2>
          <p className={styles.paragraph}>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
            de suppression et de portabilité de vos données. Puisque WMC ne collecte aucune
            donnée personnelle identifiable, ces droits s&apos;exercent principalement dans le
            cadre d&apos;une éventuelle correspondance par email.
          </p>
          <p className={styles.paragraph}>
            Pour exercer vos droits, contactez-nous à : contact@wmc-riddims.com
          </p>
        </section>

        <section className={styles.section} aria-label="Hébergement des données">
          <h2 className={styles.sectionTitle}>Hébergement des données</h2>
          <p className={styles.paragraph}>
            Le site est hébergé par Vercel Inc. aux États-Unis. Les données de navigation
            anonymisées transitent par les serveurs de Vercel Edge Network, répartis
            mondialement pour garantir des temps de chargement optimaux.
          </p>
        </section>
      </div>
    </main>
  );
}
