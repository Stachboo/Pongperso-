import React from 'react';
import Link from 'next/link';
import type { Artist } from '@/utils/artists';
import styles from './ArtistCard.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ARTIST CARD
   Carte individuelle d'un artiste pour la grille artistes
   ══════════════════════════════════════════════════════════════════════════════ */

interface ArtistCardProps {
  artist: Artist;
  href: string;
}

/** 6 dégradés prédéfinis générés depuis le hash du nom */
const GRADIENTS = [
  'linear-gradient(135deg, #F5A623, #C17D0A)',
  'linear-gradient(135deg, #1DB954, #158A3E)',
  'linear-gradient(135deg, #E63946, #B82D38)',
  'linear-gradient(135deg, #F5A623, #1DB954)',
  'linear-gradient(135deg, #E63946, #F5A623)',
  'linear-gradient(135deg, #1DB954, #E63946)',
] as const;

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getGradient(name: string): string {
  return GRADIENTS[hashName(name) % GRADIENTS.length];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function genreBadgeClass(genre: string): string {
  const g = genre.toLowerCase();
  if (g === 'dancehall') return styles.badgeGold;
  if (g === 'reggae' || g === 'roots') return styles.badgeGreen;
  if (g === 'lovers rock') return styles.badgeRed;
  return styles.badgeMuted;
}


export default function ArtistCard({ artist, href }: ArtistCardProps) {
  const mainStyle = artist.styles[0] ?? '';

  return (
    <article className={styles.card}>
      {/* Badge style principal */}
      {mainStyle && (
        <span className={`${styles.styleBadge} ${genreBadgeClass(mainStyle)}`}>
          {mainStyle}
        </span>
      )}

      <Link href={href} className={styles.link}>
        {/* Avatar */}
        <div
          className={styles.avatar}
          style={{ background: getGradient(artist.name) }}
          aria-label={`${artist.name}, artiste`}
        >
          <span className={styles.initials}>{getInitials(artist.name)}</span>
        </div>

        {/* Nom */}
        <h3 className={styles.name}>{artist.name}</h3>

        {/* Stats */}
        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.statValue}>{artist.riddimCount}</span>
            <span className={styles.statLabel}>riddims</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statValue}>#{artist.topRank}</span>
            <span className={styles.statLabel}>meilleur rang</span>
          </span>
        </div>

        {/* Décennies actives */}
        {artist.decades.length > 0 && (
          <div className={styles.decades}>
            {artist.decades.map((d) => (
              <span key={d} className={styles.decadePill}>{d}</span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
