import React from 'react';
import Link from 'next/link';
import type { Producer } from '@/data/producers';
import styles from './ProducerCard.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PRODUCER CARD
   Carte producteur avec border-left colorée par genre principal
   Composant serveur pur — pas de 'use client'
   ══════════════════════════════════════════════════════════════════════════════ */

interface ProducerCardProps {
  producer: Producer;
  lang: string;
  href: string;
}

/** Détermine la classe de bordure gauche selon le style principal */
function getBorderClass(style: string): string {
  switch (style) {
    case 'Reggae':
    case 'Lovers Rock':
    case 'Reggae Revival':
      return styles.borderGreen;
    case 'R&B':
    case 'Pop':
    case 'Latin':
      return styles.borderRed;
    default:
      return '';
  }
}

/** Tronque un texte à la longueur donnée en coupant proprement */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

/** Icône SVG de localisation (10px) */
function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Icône SVG de calendrier (10px) */
function CalendarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function ProducerCard({ producer, lang, href }: ProducerCardProps) {
  const borderClass = getBorderClass(producer.style[0]);

  return (
    <Link href={href} className={`${styles.card} ${borderClass}`}>
      {/* En-tête — Nom + Badge */}
      <div className={styles.header}>
        <h2 className={styles.name}>{producer.name}</h2>
        <span className={styles.labelBadge}>{producer.label}</span>
      </div>

      {/* Origine + Période */}
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <PinIcon />
          {producer.origin}
        </span>
        <span className={styles.metaItem}>
          <CalendarIcon />
          {producer.active}
        </span>
      </div>

      {/* Description tronquée */}
      <p className={styles.desc}>{truncate(producer.description, 140)}</p>

      {/* Riddims dans WMC */}
      {producer.notableRiddims.length > 0 && (
        <div className={styles.riddimSection}>
          <span className={styles.riddimLabel}>Riddims dans WMC</span>
          <div className={styles.riddimPills}>
            {producer.notableRiddims.map((name) => (
              <span key={name} className={styles.riddimPill}>
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer — Count + CTA */}
      <div className={styles.footer}>
        <span className={styles.count}>
          {producer.riddimIds.length} riddim{producer.riddimIds.length > 1 ? 's' : ''} documenté{producer.riddimIds.length > 1 ? 's' : ''}
        </span>
        <span className={styles.cta}>
          Voir le profil
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
