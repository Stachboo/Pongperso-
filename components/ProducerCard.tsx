import React from 'react';
import Link from 'next/link';
import type { Producer } from '@/data/producers';
import styles from './ProducerCard.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PRODUCER CARD
   Carte producteur avec border-left colorée par genre principal
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
    case 'Latin':
    case 'Pop':
      return styles.borderRed;
    default:
      return '';
  }
}

/** Tronque un texte à la longueur donnée */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
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

      {/* Origine · Période */}
      <div className={styles.meta}>
        <span>{producer.origin}</span>
        <span className={styles.metaSep}>·</span>
        <span>{producer.active}</span>
      </div>

      {/* Description tronquée */}
      <p className={styles.desc}>{truncate(producer.description, 130)}</p>

      {/* Riddims dans WMC */}
      {producer.riddimIds.length > 0 && (
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
        <span className={styles.cta}>Voir le profil →</span>
      </div>
    </Link>
  );
}
