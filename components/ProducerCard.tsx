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
  const s = style.toLowerCase();
  if (s === 'reggae' || s === 'lovers rock' || s === 'reggae revival' || s === 'roots reggae') {
    return styles.borderGreen;
  }
  if (s === 'r&b' || s === 'latin' || s === 'shatta' || s === 'pop' || s === 'dancehall antillais') {
    return styles.borderRed;
  }
  return '';
}

/** Tronque un texte à la longueur donnée en coupant proprement */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

export default function ProducerCard({ producer, lang, href }: ProducerCardProps) {
  const borderClass = getBorderClass(producer.style[0]);

  return (
    <Link href={href} className={`${styles.card} ${borderClass}`}>
      {/* En-tête — Nom + Badge label */}
      <div className={styles.header}>
        <h2 className={styles.name}>{producer.name}</h2>
        <span className={styles.labelBadge}>{producer.label}</span>
      </div>

      {/* Origine + Actif */}
      <div className={styles.meta}>
        <span className={styles.metaItem}>{producer.origin}</span>
        <span className={styles.metaDot} aria-hidden="true">·</span>
        <span className={styles.metaItem}>{producer.active}</span>
      </div>

      {/* Description tronquée */}
      <p className={styles.desc}>{truncate(producer.description, 130)}</p>

      {/* Riddims dans WMC */}
      {producer.riddimIds.length > 0 && (
        <div className={styles.riddimSection}>
          <span className={styles.riddimLabel}>Riddims dans WMC</span>
          <div className={styles.riddimPills}>
            {producer.riddimIds.map((id) => (
              <span key={id} className={styles.riddimPill}>
                {id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer — Count + CTA */}
      <div className={styles.footer}>
        <span className={styles.count}>
          {producer.riddimIds.length} riddim{producer.riddimIds.length > 1 ? 's' : ''}
        </span>
        <span className={styles.cta}>
          Voir le profil
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
