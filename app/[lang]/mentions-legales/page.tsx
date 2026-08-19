import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE MENTIONS LÉGALES
   Informations légales obligatoires
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
  const hreflang = generateHreflang('/mentions-legales', locale);

  return {
    title: 'Mentions légales | WMC',
    description:
      'Mentions légales du site World Music Contest (WMC). Éditeur, hébergement, responsable de publication et informations juridiques.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/mentions-legales`,
      languages: hreflang,
    },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mentions légales</h1>
        <span className={styles.subtitle}>informations juridiques</span>
      </header>

      <div className={styles.separator} />

      <p className={styles.legalDate}>Dernière mise à jour : mars 2026</p>

      <div className={styles.content}>
        <section className={styles.section} aria-label="Éditeur du site">
          <h2 className={styles.sectionTitle}>Éditeur du site</h2>
          <p className={styles.paragraph}>
            Le site World Music Contest (WMC) est édité par le projet World Music Contest,
            projet indépendant de documentation musicale.
          </p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Nom du projet</p>
            <p className={styles.infoValue}>World Music Contest (WMC)</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Responsable de publication</p>
            <p className={styles.infoValue}>Équipe WMC</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Contact</p>
            <p className={styles.infoValue}>contact@wmc-riddims.com</p>
          </div>
        </section>

        <section className={styles.section} aria-label="Hébergement">
          <h2 className={styles.sectionTitle}>Hébergement</h2>
          <p className={styles.paragraph}>
            Le site est hébergé par :
          </p>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Hébergeur</p>
            <p className={styles.infoValue}>Vercel Inc.</p>
          </div>
          <p className={styles.paragraph}>
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section className={styles.section} aria-label="Propriété intellectuelle">
          <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>
          <p className={styles.paragraph}>
            L&apos;ensemble du contenu du site WMC (textes, descriptions, organisation des
            données, design, code source) est protégé par le droit d&apos;auteur. Toute
            reproduction, représentation ou diffusion, en tout ou partie, sans autorisation
            préalable écrite, est interdite.
          </p>
          <p className={styles.paragraph}>
            Les noms d&apos;artistes, de riddims, de labels et de producteurs mentionnés sur
            le site sont la propriété de leurs détenteurs respectifs. WMC les utilise à des
            fins de documentation et de référencement uniquement.
          </p>
        </section>

        <section className={styles.section} aria-label="Données et responsabilité">
          <h2 className={styles.sectionTitle}>Données et responsabilité</h2>
          <p className={styles.paragraph}>
            Les données de streaming présentées sur WMC sont approximatives et proviennent
            de sources publiquement disponibles. Elles sont fournies à titre indicatif et
            ne constituent pas des chiffres officiels certifiés par les plateformes de
            streaming.
          </p>
          <p className={styles.paragraph}>
            WMC n&apos;est affilié à aucun label, aucun artiste, aucune plateforme de
            streaming ni aucun organisme de certification musicale.
          </p>
        </section>
      </div>
    </main>
  );
}
