'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './ScrollToTop.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — SCROLL TO TOP
   Bouton de retour en haut de page avec apparition au scroll
   ══════════════════════════════════════════════════════════════════════════════ */

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    },
    [scrollToTop]
  );

  return (
    <div
      className={`${styles.button} ${isVisible ? styles.visible : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Retourner en haut de la page"
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  );
}
