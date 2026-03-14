'use client';

import React, { useState, useCallback } from 'react';
import styles from './HeroSection.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — HERO SECTION
   World Music Contest — Jamaican Riddim Database
   ══════════════════════════════════════════════════════════════════════════════ */

interface HeroSectionProps {
  /** Nombre total de riddims archivés (défaut 500) */
  totalRiddims?: number;
  /** Nombre total de voicings documentés (défaut 5000) */
  totalVoicings?: number;
  /** Nombre de langues disponibles (défaut 5) */
  totalLanguages?: number;
  /** Callback déclenché lors d'une recherche */
  onSearch?: (query: string) => void;
}


/* ═══════════════════════════════════════════════════════════════════════════
   Utilitaire — Formatage des nombres avec seuil "+"
   ═══════════════════════════════════════════════════════════════════════════ */

function formatStat(n: number): string {
  if (n >= 5000) return `${Math.floor(n / 1000).toLocaleString('fr-FR')}\u00A0000+`;
  if (n >= 100) return `${n}+`;
  return String(n);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function HeroSection({
  totalRiddims = 500,
  totalVoicings = 5000,
  totalLanguages = 5,
  onSearch,
}: HeroSectionProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed && onSearch) onSearch(trimmed);
    },
    [query, onSearch],
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 2 — Formes géométriques décoratives
     ═══════════════════════════════════════════════════════════════════════════ */

  const decorativeShapes = (
    <>
      {/* Grand triangle rouge — coin haut-gauche */}
      <svg
        className={`${styles.shape} ${styles.shapeTopLeft}`}
        width="140" height="140"
        viewBox="0 0 140 140"
        aria-hidden="true"
      >
        <polygon
          points="70,5 135,130 5,130"
          fill="var(--color-brand-red)"
        />
      </svg>

      {/* Triangle or — coin haut-droit */}
      <svg
        className={`${styles.shape} ${styles.shapeTopRight}`}
        width="100" height="100"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <polygon
          points="50,8 95,90 5,90"
          fill="var(--color-brand-gold)"
        />
      </svg>

      {/* Losange vert — côté gauche milieu */}
      <svg
        className={`${styles.shape} ${styles.shapeLeftMid}`}
        width="60" height="80"
        viewBox="0 0 60 80"
        aria-hidden="true"
      >
        <polygon
          points="30,0 60,40 30,80 0,40"
          fill="var(--color-brand-green)"
        />
      </svg>

      {/* Petit triangle rouge — coin bas-droit */}
      <svg
        className={`${styles.shape} ${styles.shapeBottomRight}`}
        width="70" height="70"
        viewBox="0 0 70 70"
        aria-hidden="true"
      >
        <polygon
          points="35,5 65,60 5,60"
          fill="var(--color-brand-red)"
        />
      </svg>

      {/* Petit cercle or — bas-centre droit */}
      <svg
        className={`${styles.shape} ${styles.shapeBottomCenter}`}
        width="28" height="28"
        viewBox="0 0 28 28"
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="14" fill="var(--color-brand-gold)" />
      </svg>
    </>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 3a — Badge de crédibilité
     ═══════════════════════════════════════════════════════════════════════════ */

  const badge = (
    <div className={styles.badge}>
      <span role="img" aria-label="Jamaïque">🇯🇲</span>
      La référence mondiale des riddims jamaïcains
    </div>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 3b — Headline principale (3 lignes)
     ═══════════════════════════════════════════════════════════════════════════ */

  const headline = (
    <h1 className={styles.headline}>
      {/* Ligne 1 — Bebas Neue */}
      <span className={styles.headlineBold}>Chaque riddim.</span>
      {/* Ligne 2 — Bebas Neue */}
      <span className={styles.headlineBold}>Chaque voicing.</span>
      {/* Ligne 3 — Dancing Script */}
      <span className={styles.headlineScript}>Classé par popularité.</span>

      {/* Brush stroke SVG sous la ligne script */}
      <span className={styles.brushWrap}>
        <svg
          width="260"
          height="12"
          viewBox="0 0 260 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            className={styles.brushStroke}
            d="M4,8 C30,3 60,10 90,5 C120,0 150,9 180,4 C200,1 230,8 256,4"
            stroke="var(--color-brand-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </span>
    </h1>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 3c — Stats de preuve sociale
     ═══════════════════════════════════════════════════════════════════════════ */

  const stats = (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{formatStat(totalRiddims)}</span>
        <span className={styles.statLabel}>Riddims archivés</span>
      </div>

      <div className={styles.statDivider} />

      <div className={styles.stat}>
        <span className={styles.statValue}>{formatStat(totalVoicings)}</span>
        <span className={styles.statLabel}>Voicings documentés</span>
      </div>

      <div className={styles.statDivider} />

      <div className={styles.stat}>
        <span className={styles.statValue}>{formatStat(totalLanguages)}</span>
        <span className={styles.statLabel}>Langues disponibles</span>
      </div>
    </div>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 3d — Barre de recherche
     ═══════════════════════════════════════════════════════════════════════════ */

  const searchBar = (
    <form className={styles.searchWrap} onSubmit={handleSubmit} role="search">
      {/* Label accessible masqué */}
      <label htmlFor="hero-search" className={styles.srOnly}>
        Rechercher un riddim, un artiste ou un label
      </label>

      <div className={styles.searchBar}>
        {/* Icône loupe SVG */}
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          id="hero-search"
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher un riddim, un artiste, un label..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className={styles.searchBtn}>
          Rechercher
        </button>
      </div>
    </form>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     COUCHE 3e — CTA secondaire
     ═══════════════════════════════════════════════════════════════════════════ */

  const ctaLink = (
    <a href="#catalogue" className={styles.cta}>
      Explorer les {formatStat(totalRiddims)} riddims →
    </a>
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     RENDU FINAL
     ═══════════════════════════════════════════════════════════════════════════ */

  return (
    <section className={styles.hero} aria-label="Section principale">
      {/* Couche 2 — Formes décoratives */}
      {decorativeShapes}

      {/* Couche 3 — Contenu principal */}
      <div className={styles.content}>
        {badge}
        {headline}
        {stats}
        {searchBar}
        {ctaLink}
      </div>
    </section>
  );
}
