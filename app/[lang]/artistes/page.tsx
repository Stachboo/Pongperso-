import React from 'react';
import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { allRiddims } from '@/lib/data';
import { generateHreflang } from '@/utils/seo';
import { buildArtistList } from '@/utils/artists';
import ArtistSearchBar from '@/components/ArtistSearchBar';
import styles from './page.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE ARTISTES (LISTE)
   Répertoire complet des artistes avec recherche côté client
   ══════════════════════════════════════════════════════════════════════════════ */

const allArtists = buildArtistList(allRiddims);

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const hreflang = generateHreflang('/artistes', locale);

  const title = 'Artistes — Tous les voicings de riddims jamaïcains | WMC';
  const description =
    `Découvrez les ${allArtists.length} artistes qui ont enregistré sur des ` +
    `riddims jamaïcains. Vybz Kartel, Sean Paul, Mavado, Chronixx et ` +
    `${allArtists.length}+ artistes documentés avec leurs voicings.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wmc-iota.vercel.app/${locale}/artistes`,
      languages: hreflang,
    },
  };
}

export default async function ArtistesPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return (
    <div className={styles.container}>
      {/* En-tête */}
      <header className={styles.header}>
        <h1 className={styles.title}>Artistes</h1>
        <span className={styles.titleScript}>tous les voicings</span>
        <svg className={styles.brushStroke} viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 8 Q75 0 150 6 Q225 12 300 4" stroke="var(--color-brand-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        <p className={styles.counter}>{allArtists.length} artistes documentés</p>
      </header>

      {/* Recherche + Grille (composant client) */}
      <ArtistSearchBar artists={allArtists} lang={locale} />
    </div>
  );
}
