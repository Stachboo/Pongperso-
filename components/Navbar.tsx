'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { LOCALES, type Locale, type Dictionary } from '@/lib/i18n';
import styles from './Navbar.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — NAVBAR
   Navigation fixe avec scroll detection, burger mobile, sélecteur de langue
   ══════════════════════════════════════════════════════════════════════════════ */

interface NavbarProps {
  lang: string;
  dict: Dictionary;
}

/** Drapeaux emoji par langue */
const FLAGS: Record<Locale, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', pt: '🇧🇷', ja: '🇯🇵',
};

/** Liens de navigation — les clés de dictionnaire correspondantes */
const NAV_LINKS = [
  { key: 'home', dictKey: 'navHome' as const, path: '' },
  { key: 'explorer', dictKey: 'navExplorerShort' as const, path: '/explorer' },
  { key: 'artistes', dictKey: 'navArtists' as const, path: '/artistes' },
  { key: 'producteurs', dictKey: 'navProducers' as const, path: '/producteurs' },
  { key: 'about', dictKey: 'navAbout' as const, path: '/about' },
] as const;


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Détecte si on est sur la page d'accueil */
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  /* ── Scroll detection ── */
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Fermer le menu au changement de route ── */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /* ── Fermer le menu si resize > 768px ── */
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Bloquer le scroll du body quand menu ouvert ── */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  /** Vérifie si un lien de navigation est actif */
  function isActive(navPath: string): boolean {
    const fullPath = `/${lang}${navPath}`;
    if (navPath === '') {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname.startsWith(fullPath);
  }

  /** Construit l'URL de la même page dans une autre langue */
  function langSwitchHref(targetLang: string): string {
    return pathname.replace(`/${lang}`, `/${targetLang}`);
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navigation principale"
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.inner}>

          {/* ═══ LOGO CENTRÉ (masqué sur la home) ═══ */}
          {!isHome && (
            <Link href={`/${lang}`} className={styles.brand} aria-label={dict.backToHome}>
              <Logo variant="icon" size={36} />
            </Link>
          )}

          {/* Spacer pour garder le burger à droite quand pas de logo */}
          {isHome && <div className={styles.spacer} />}

          {/* ═══ BLOC CENTRE — Navigation desktop ═══ */}
          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={`/${lang}${link.path}`}
                className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
              >
                {dict[link.dictKey]}
              </Link>
            ))}
          </div>

          {/* ═══ BLOC DROIT — Actions ═══ */}
          <div className={styles.actions}>

            {/* Sélecteur de langue (desktop) */}
            <div className={styles.langSwitcher}>
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={langSwitchHref(l)}
                  className={`${styles.langFlag} ${l === lang ? styles.langFlagActive : ''}`}
                  title={l.toUpperCase()}
                >
                  {FLAGS[l]}
                </Link>
              ))}
            </div>

            {/* Bouton CTA Explorer (desktop) */}
            <Link href={`/${lang}/explorer`} className={styles.ctaBtn}>
              {dict.navExplorerShort}
            </Link>

            {/* Burger (mobile) */}
            <button
              type="button"
              className={styles.burger}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineTop : ''}`} />
              <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineMid : ''}`} />
              <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineBot : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ DRAWER MOBILE ═══ */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className={styles.drawer}
          role="dialog"
        >
          <div className={styles.drawerContent}>

            {/* Liens de navigation */}
            <div className={styles.drawerLinks}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={`/${lang}${link.path}`}
                  className={`${styles.drawerLink} ${isActive(link.path) ? styles.drawerLinkActive : ''}`}
                >
                  {dict[link.dictKey]}
                </Link>
              ))}
            </div>

            {/* Sélecteur de langue mobile */}
            <div className={styles.drawerLangs}>
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={langSwitchHref(l)}
                  className={`${styles.drawerLangFlag} ${l === lang ? styles.drawerLangFlagActive : ''}`}
                  title={l.toUpperCase()}
                >
                  {FLAGS[l]}
                </Link>
              ))}
            </div>

            {/* Bouton CTA mobile */}
            <Link href={`/${lang}/explorer`} className={styles.drawerCta}>
              {dict.exploreRiddims}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
