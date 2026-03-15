import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE CONTACT
   Coordonnées et informations de contact
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
  const hreflang = generateHreflang('/contact', locale);

  return {
    title: 'Contact — Nous contacter | WMC',
    description:
      'Contactez l\'équipe WMC pour toute question sur la base de données des riddims jamaïcains, les partenariats ou les demandes presse.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/contact`,
      languages: hreflang,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact</h1>
        <span className={styles.subtitle}>nous écrire</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        <section className={styles.section} aria-label="Nous contacter">
          <h2 className={styles.sectionTitle}>Nous contacter</h2>
          <p className={styles.paragraph}>
            Pour toute question concernant WMC, les données, les partenariats ou les
            demandes presse, n&apos;hésitez pas à nous écrire. Notre équipe se fera un
            plaisir de vous répondre.
          </p>
        </section>

        <section className={styles.section} aria-label="Email">
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Email général</p>
            <p className={styles.infoValue}>contact@wmc-riddims.com</p>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Demandes presse</p>
            <p className={styles.infoValue}>presse@wmc-riddims.com</p>
          </div>
        </section>

        <section className={styles.section} aria-label="Réseaux sociaux">
          <h2 className={styles.sectionTitle}>Réseaux sociaux</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Instagram — @wmc_riddims
            </li>
            <li className={styles.listItem}>
              X (Twitter) — @wmc_riddims
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-label="Délai de réponse">
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Délai de réponse</p>
            <p className={styles.infoValue}>48 à 72 heures</p>
          </div>
          <p className={styles.paragraph}>
            Nous répondons à toutes les demandes dans un délai de 48 à 72 heures
            ouvrées. Pour les demandes urgentes, merci de le préciser dans l&apos;objet
            de votre message.
          </p>
        </section>
      </div>
    </main>
  );
}
