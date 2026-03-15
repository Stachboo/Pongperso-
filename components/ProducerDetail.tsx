import React from 'react';
import Link from 'next/link';
import type { Producer } from '@/data/producers';
import { allRiddims } from '@/lib/data';
import { toArtistSlug, toRiddimSlug } from '@/utils/seo';
import RiddimCard from '@/components/RiddimCard';
import styles from './ProducerDetail.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PRODUCER DETAIL
   Page de détail d'un producteur : histoire, achievements, riddims, artistes
   Composant serveur pur — pas de 'use client'
   ══════════════════════════════════════════════════════════════════════════════ */

interface ProducerDetailProps {
  producer: Producer;
  lang: string;
}

/** Classe CSS du badge selon le style */
function styleBadgeClass(style: string): string {
  const s = style.toLowerCase();
  if (s === 'dancehall') return styles.badgeGold;
  if (s === 'reggae' || s === 'lovers rock' || s === 'reggae revival') return styles.badgeGreen;
  if (s === 'r&b' || s === 'pop' || s === 'latin') return styles.badgeRed;
  return styles.badgeMuted;
}

export default function ProducerDetail({ producer, lang }: ProducerDetailProps) {
  /* Trouver les riddims correspondants dans la base de données */
  const matchedRiddims = allRiddims.filter((r) => {
    const slug = toRiddimSlug(r.name);
    return producer.riddimIds.includes(slug);
  });

  return (
    <article className={styles.article}>

      {/* ═══ SECTION A — Header ═══ */}
      <header className={styles.header}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href={`/${lang}`} className={styles.breadcrumbLink}>Accueil</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
            <li>
              <Link href={`/${lang}/producteurs`} className={styles.breadcrumbLink}>Producteurs</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
            <li aria-current="page" className={styles.breadcrumbCurrent}>{producer.name}</li>
          </ol>
        </nav>

        {/* Nom */}
        <h1 className={styles.producerName}>{producer.name}</h1>

        {/* Label + Origine + Période */}
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>{producer.label}</span>
          <span className={styles.metaSep} aria-hidden="true">·</span>
          <span className={styles.metaItem}>{producer.origin}</span>
          <span className={styles.metaSep} aria-hidden="true">·</span>
          <span className={styles.metaItem}>{producer.active}</span>
        </div>

        {/* Badges styles */}
        <div className={styles.styleBadges}>
          {producer.style.map((s) => (
            <span key={s} className={`${styles.badge} ${styleBadgeClass(s)}`}>{s}</span>
          ))}
        </div>
      </header>

      <div className={styles.divider} />

      {/* ═══ SECTION B — Description complète ═══ */}
      <section aria-label="Histoire du producteur">
        <h2 className={styles.sectionTitle}>
          Histoire
          <span className={styles.sectionAccent}>le parcours</span>
        </h2>
        <p className={styles.descriptionText}>{producer.description}</p>
      </section>

      <div className={styles.divider} />

      {/* ═══ SECTION C — Achievements ═══ */}
      <section aria-label="Faits marquants">
        <h2 className={styles.sectionTitle}>Faits marquants</h2>
        <ul className={styles.achievementList} role="list">
          {producer.achievements.map((achievement) => (
            <li key={achievement} className={styles.achievementItem}>
              <svg className={styles.starIcon} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-brand-gold)" aria-hidden="true">
                <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74z" />
              </svg>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.divider} />

      {/* ═══ SECTION D — Riddims dans WMC ═══ */}
      <section aria-label="Riddims documentés">
        <h2 className={styles.sectionTitle}>
          Riddims documentés
          <span className={styles.riddimCount}>{matchedRiddims.length}</span>
        </h2>

        {matchedRiddims.length > 0 ? (
          <div className={styles.riddimGrid}>
            {matchedRiddims.map((riddim) => (
              <RiddimCard
                key={riddim.id}
                riddim={riddim}
                size="md"
                href={`/${lang}/riddim/${riddim.id}`}
              />
            ))}
          </div>
        ) : (
          <div className={styles.riddimFallback}>
            <p className={styles.fallbackTitle}>Riddims notables</p>
            <div className={styles.fallbackPills}>
              {producer.notableRiddims.map((name) => (
                <span key={name} className={styles.fallbackPill}>{name}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className={styles.divider} />

      {/* ═══ SECTION E — Artistes associés ═══ */}
      <section aria-label="Artistes phares">
        <h2 className={styles.sectionTitle}>Artistes phares</h2>
        <div className={styles.artistPills}>
          {producer.keyArtists.map((artistName) => (
            <Link
              key={artistName}
              href={`/${lang}/artistes/${toArtistSlug(artistName)}`}
              className={styles.artistPill}
            >
              {artistName}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
