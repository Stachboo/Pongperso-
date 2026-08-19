'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './PageWrapper.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE WRAPPER
   Composant layout universel avec animation d'entrée de page
   ══════════════════════════════════════════════════════════════════════════════ */

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Déclenche le fadeIn au montage */
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const wrapperClass = [
    styles.wrapper,
    isVisible ? styles.visible : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      <main className={styles.main} role="main">
        {children}
      </main>
    </div>
  );
}
