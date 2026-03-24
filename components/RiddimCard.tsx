'use client';

import React from 'react';
import Link from 'next/link';
import type { Riddim } from '@/types/riddim';
import styles from './RiddimCard.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM CARD
   Carte individuelle d'un riddim pour le Bento Grid
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimCardProps {
  riddim: Riddim;
  size?: 'lg' | 'md' | 'sm';
  href: string;
  priority?: boolean;
}

function normalizeGenre(genre: string): string {
  return genre.toLowerCase().trim();
}

function accentClass(genre: string): string {
  const g = normalizeGenre(genre);
  if (g === 'dancehall') return styles.accentDancehall;
  if (g === 'reggae' || g === 'roots') return styles.accentReggae;
  if (g === 'lovers rock') return styles.accentLovers;
  return styles.accentDefault;
}

function badgeClass(genre: string): string {
  const g = normalizeGenre(genre);
  if (g === 'dancehall') return styles.badgeDancehall;
  if (g === 'reggae' || g === 'roots') return styles.badgeReggae;
  if (g === 'lovers rock') return styles.badgeLovers;
  return styles.badgeDefault;
}

function genreLabel(genre: string): string {
  const g = normalizeGenre(genre);
  const labels: Record<string, string> = {
    dancehall: 'Dancehall', reggae: 'Reggae', 'lovers rock': 'Lovers Rock',
    roots: 'Roots', soca: 'Soca',
  };
  return labels[g] ?? genre;
}

export default function RiddimCard({ riddim, size = 'md', href }: RiddimCardProps) {
  const { name, year, producer, label, genre, voicings } = riddim;
  const sortedVoicings = [...voicings].sort((a, b) => b.views - a.views);
  const voicingLimit = size === 'lg' ? 3 : size === 'md' ? 2 : 0;
  const topVoicings = sortedVoicings.slice(0, voicingLimit);

  return (
    <article className={styles.card}>
      <div className={`${styles.accentBar} ${accentClass(genre)}`} />
      <Link href={href} className={styles.link}>
        <div className={styles.header}>
          <span className={`${styles.badge} ${badgeClass(genre)}`}>{genreLabel(genre)}</span>
          {size !== 'sm' && (
            <span className={`${styles.yearWatermark} ${size === 'lg' ? styles.yearLg : styles.yearMd}`} aria-hidden="true">{year}</span>
          )}
        </div>

        <h3 className={`${styles.name} ${size === 'lg' ? styles.nameLg : size === 'md' ? styles.nameMd : styles.nameSm}`}>{name}</h3>

        <p className={styles.meta}>
          {producer}
          {size !== 'sm' && label && <><span className={styles.metaDot}>·</span>{label}</>}
        </p>

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
