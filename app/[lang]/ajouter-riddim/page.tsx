import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import FormulaireSoumission from '@/components/FormulaireSoumission';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE AJOUTER UN RIDDIM
   Formulaire de soumission de riddim (statique, mailto)
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
  const hreflang = generateHreflang('/ajouter-riddim', locale);

  return {
    title: 'Ajouter un riddim — Contribuer à la base de données | WMC',
    description:
      'Soumettez un riddim jamaïcain non encore documenté dans la base de données WMC. Contribuez à préserver le patrimoine musical jamaïcain.',
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/ajouter-riddim`,
      languages: hreflang,
    },
  };
}

export default async function AjouterRiddimPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ajouter un riddim</h1>
        <span className={styles.subtitle}>contribuer à WMC</span>
      </header>

      <div className={styles.separator} />

      <div className={styles.content}>
        <section className={styles.section} aria-label="Contribuer à WMC">
          <h2 className={styles.sectionTitle}>Contribuer à WMC</h2>
          <p className={styles.paragraph}>
            WMC est construit par et pour les passionnés de musique jamaïcaine.
            Si vous connaissez un riddim non encore documenté, vous pouvez nous le
            soumettre via le formulaire ci-dessous.
          </p>
          <p className={styles.paragraph}>
            Renseignez le maximum d&apos;informations disponibles : nom du riddim,
            année de sortie, producteur, label, et surtout les voicings connus avec
            les artistes et titres associés.
          </p>
        </section>

        <section className={styles.section} aria-label="Formulaire de soumission">
          <h2 className={styles.sectionTitle}>Soumettre un riddim</h2>
          <FormulaireSoumission />
        </section>
      </div>
    </main>
  );
}
