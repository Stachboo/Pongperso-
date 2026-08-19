import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import { generateHreflang } from '@/utils/seo';
import styles from '@/styles/static-page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE CONDITIONS D'UTILISATION
   Règles d'utilisation du site et des données
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
  const hreflang = generateHreflang('/conditions', locale);

  return {
    title: "Conditions d'utilisation | WMC",
    description:
      "Conditions d'utilisation du site World Music Contest. Règles d'accès, propriété intellectuelle et limitations de responsabilité.",
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/conditions`,
      languages: hreflang,
    },
  };
}

export default async function ConditionsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  isValidLocale(lang);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Conditions d&apos;utilisation</h1>
        <span className={styles.subtitle}>règles d&apos;usage</span>
      </header>

      <div className={styles.separator} />

      <p className={styles.legalDate}>Dernière mise à jour : mars 2026</p>

      <div className={styles.content}>
        <section className={styles.section} aria-label="Acceptation des conditions">
          <h2 className={styles.sectionTitle}>Acceptation des conditions</h2>
          <p className={styles.paragraph}>
            En accédant au site World Music Contest (WMC), vous acceptez les présentes
            conditions d&apos;utilisation dans leur intégralité. Si vous n&apos;acceptez pas
            ces conditions, veuillez ne pas utiliser le site.
          </p>
        </section>

        <section className={styles.section} aria-label="Accès au service">
          <h2 className={styles.sectionTitle}>Accès au service</h2>
          <p className={styles.paragraph}>
            Le contenu de WMC est fourni à titre informatif et documentaire. L&apos;accès au
            site est gratuit et ne nécessite aucune inscription. WMC se réserve le droit de
            modifier, suspendre ou interrompre l&apos;accès au site à tout moment, sans
            préavis ni indemnité.
          </p>
        </section>

        <section className={styles.section} aria-label="Données de streaming">
          <h2 className={styles.sectionTitle}>Données de streaming</h2>
          <p className={styles.paragraph}>
            Les données de streaming présentées sur WMC sont approximatives et basées sur des
            estimations issues de sources publiquement disponibles. Ces chiffres ne constituent
            pas des données officielles certifiées par les plateformes de streaming (Spotify,
            Apple Music, YouTube Music).
          </p>
          <p className={styles.paragraph}>
            WMC ne garantit pas l&apos;exactitude, l&apos;exhaustivité ou la mise à jour en
            temps réel de ces données. Les utilisateurs sont invités à consulter les
            plateformes officielles pour des chiffres certifiés.
          </p>
        </section>

        <section className={styles.section} aria-label="Propriété intellectuelle">
          <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>
          <p className={styles.paragraph}>
            La reproduction du contenu de WMC (textes originaux, descriptions, organisation
            des données, design) sans autorisation préalable écrite est interdite. Les noms
            d&apos;artistes, de riddims et de labels sont la propriété de leurs détenteurs
            respectifs.
          </p>
        </section>

        <section className={styles.section} aria-label="Limitation de responsabilité">
          <h2 className={styles.sectionTitle}>Limitation de responsabilité</h2>
          <p className={styles.paragraph}>
            WMC n&apos;est pas responsable des erreurs ou omissions dans les données
            présentées. Le site est fourni « en l&apos;état » sans garantie d&apos;aucune
            sorte, expresse ou implicite. WMC ne saurait être tenu responsable de tout
            dommage direct ou indirect résultant de l&apos;utilisation du site.
          </p>
        </section>

        <section className={styles.section} aria-label="Liens externes">
          <h2 className={styles.sectionTitle}>Liens externes</h2>
          <p className={styles.paragraph}>
            WMC peut contenir des liens vers des sites tiers (YouTube, Spotify, etc.).
            Ces liens sont fournis à titre de commodité. WMC n&apos;exerce aucun contrôle
            sur le contenu de ces sites et n&apos;assume aucune responsabilité quant à leur
            contenu ou leurs pratiques de confidentialité.
          </p>
        </section>

        <section className={styles.section} aria-label="Droit applicable">
          <h2 className={styles.sectionTitle}>Droit applicable</h2>
          <p className={styles.paragraph}>
            Les présentes conditions d&apos;utilisation sont régies par le droit français.
            Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence
            exclusive des tribunaux français.
          </p>
        </section>
      </div>
    </main>
  );
}
