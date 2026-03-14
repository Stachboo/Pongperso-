'use client';

import React from 'react';
import Link from 'next/link';
import type { Riddim } from '../types/riddim';
import styles from './RiddimCard.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM CARD
   Carte individuelle d'un riddim pour le Bento Grid
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimCardProps {
  /** Données du riddim */
  riddim: Riddim;
  /** Taille de la carte : lg (featured), md (standard), sm (compact) */
  size?: 'lg' | 'md' | 'sm';
  /** URL de la page détail */
  href: string;
  /** Priorité pour le LCP (cartes featured) */
  priority?: boolean;
}


/* ═══════════════════════════════════════════════════════════════════════════
   Utilitaires
   ═══════════════════════════════════════════════════════════════════════════ */

/** Normalise le genre pour le mapping visuel */
function normalizeGenre(genre: string): string {
  return genre.toLowerCase().trim();
}

/** Classe CSS pour la bande d'accent selon le genre */
function accentClass(genre: string): string {
  const g = normalizeGenre(genre);
  if (g === 'dancehall') return styles.accentDancehall;
  if (g === 'reggae' || g === 'roots') return styles.accentReggae;
  if (g === 'lovers rock') return styles.accentLovers;
  return styles.accentDefault;
}

/** Classe CSS pour le badge genre */
function badgeClass(genre: string): string {
  const g = normalizeGenre(genre);
  if (g === 'dancehall') return styles.badgeDancehall;
  if (g === 'reggae' || g === 'roots') return styles.badgeReggae;
  if (g === 'lovers rock') return styles.badgeLovers;
  return styles.badgeDefault;
}

/** Label lisible du genre */
function genreLabel(genre: string): string {
  const g = normalizeGenre(genre);
  const labels: Record<string, string> = {
    dancehall: 'Dancehall',
    reggae: 'Reggae',
    'lovers rock': 'Lovers Rock',
    roots: 'Roots',
    soca: 'Soca',
  };
  return labels[g] ?? genre;
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RiddimCard({
  riddim,
  size = 'md',
  href,
}: RiddimCardProps) {
  const { name, year, producer, label, genre, voicings } = riddim;

  /* Trier les voicings par vues décroissantes */
  const sortedVoicings = [...voicings].sort((a, b) => b.views - a.views);

  /* Nombre de voicings affichés selon la taille */
  const voicingLimit = size === 'lg' ? 3 : size === 'md' ? 2 : 0;
  const topVoicings = sortedVoicings.slice(0, voicingLimit);

  return (
    <article className={styles.card}>
      {/* ── Bande colorée supérieure ── */}
      <div className={`${styles.accentBar} ${accentClass(genre)}`} />

      <Link href={href} className={styles.link}>
        {/* ── Header : badge + année watermark ── */}
        <div className={styles.header}>
          <span className={`${styles.badge} ${badgeClass(genre)}`}>
            {genreLabel(genre)}
          </span>

          {size !== 'sm' && (
            <span
              className={`${styles.yearWatermark} ${size === 'lg' ? styles.yearLg : styles.yearMd}`}
              aria-hidden="true"
            >
              {year}
            </span>
          )}
        </div>

        {/* ── Nom du riddim ── */}
        <h3
          className={`${styles.name} ${
            size === 'lg' ? styles.nameLg : size === 'md' ? styles.nameMd : styles.nameSm
          }`}
        >
          {name}
        </h3>

        {/* ── Producteur · Label ── */}
        <p className={styles.meta}>
          {producer}
          {size !== 'sm' && label && (
            <>
              <span className={styles.metaDot}>·</span>
              {label}
            </>
          )}
        </p>

        {/* ── Top voicings ── */}
        {voicingLimit > 0 && topVoicings.length > 0 && (
          <>
            <div className={styles.divider} />

            <div className={styles.voicings}>
              {topVoicings.map((v, i) => (
                <div key={`${v.artist}-${v.title}`} className={styles.voicing}>
                  <span className={styles.voicingRank}>{i + 1}.</span>
                  <span className={styles.voicingArtist}>{v.artist}</span>
                  <span className={styles.voicingTitle}>— {v.title}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <span className={styles.voicingCount}>
            <span className={styles.voicingIcon} aria-hidden="true">♫</span>
            {voicings.length} voicing{voicings.length > 1 ? 's' : ''}
          </span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </div>
      </Link>
    </article>
  );
}
