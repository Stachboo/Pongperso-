'use client';

import React from 'react';
import type { Riddim } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
import RiddimCard from './RiddimCard';
import styles from './RiddimGrid.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM GRID (Bento)
   Grille asymétrique avec hiérarchie visuelle forte
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimGridProps {
  riddims: Riddim[];
  isLoading?: boolean;
  lang: string;
  dict: Dictionary;
}

function getCardSize(index: number): 'lg' | 'md' | 'sm' {
  if (index < 2) return 'lg';
  if (index < 6) return 'md';
  return 'sm';
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonBar} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonMeta} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
    </div>
  );
}

export default function RiddimGrid({ riddims, isLoading = false, lang, dict }: RiddimGridProps) {
  const sectionHeader = (
    <div className={styles.sectionHeader}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{dict.sectionTitle}</h2>
        <span className={styles.subtitle}>{dict.sectionSubtitle}</span>
        <span className={styles.count}>({riddims.length} riddims)</span>
      </div>
      <span className={styles.brushWrap}>
        <svg width="180" height="10" viewBox="0 0 180 10" fill="none" aria-hidden="true">
          <path d="M3,7 C20,3 42,9 62,4 C82,0 105,8 130,3 C148,0 163,7 177,4" stroke="var(--color-brand-gold)" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        </svg>
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <section aria-label={dict.sectionTitle} aria-busy="true">
        {sectionHeader}
        <div className={styles.grid} role="list">
          {Array.from({ length: 8 }, (_, i) => <div key={i} role="listitem"><SkeletonCard /></div>)}
        </div>
      </section>
    );
  }

  if (riddims.length === 0) {
    return (
      <section aria-label={dict.sectionTitle}>
        {sectionHeader}
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden="true">♫</span>
          <p className={styles.emptyTitle}>{dict.noRiddimFound}</p>
          <p className={styles.emptySub}>{dict.noRiddimHint}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label={dict.sectionTitle}>
      {sectionHeader}
      <div className={styles.grid} role="list">
        {riddims.map((riddim, index) => (
          <div key={riddim.id} role="listitem">
            <RiddimCard
              riddim={riddim}
              size={getCardSize(index)}
              href={`/${lang}/riddim/${riddim.id}`}
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
