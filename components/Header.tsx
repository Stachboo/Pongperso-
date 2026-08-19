'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import type { Dictionary } from '@/lib/i18n';
import { LOCALES, type Locale } from '@/lib/i18n';
import styles from './Header.module.css';

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

const FLAGS: Record<Locale, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', pt: '🇧🇷', ja: '🇯🇵',
};

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isExplorer = pathname.includes('/explorer');

  return (
    <header className={styles.header}>
      {/* Brand */}
      <Link href={`/${lang}`} className={styles.brand}>
        <Logo size={36} variant="icon" />
        <div className={styles.brandText}>
          <span className={styles.siteTitle}>{dict.siteTitle}</span>
          <span className={styles.tagline}>{dict.taglineHome}</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className={styles.nav}>
        <Link
          href={`/${lang}`}
          className={`${styles.navLink} ${isHome ? styles.navLinkActive : ''}`}
        >
          {dict.navHome}
        </Link>
        <Link
          href={`/${lang}/explorer`}
          className={`${styles.navLink} ${isExplorer ? styles.navLinkActive : ''}`}
        >
          {dict.navExplorer}
        </Link>

        {/* Language switcher */}
        <div className={styles.langSwitcher}>
          {LOCALES.map((l) => {
            const newPath = pathname.replace(`/${lang}`, `/${l}`);
            return (
              <Link
                key={l}
                href={newPath}
                className={`${styles.langOption} ${l === lang ? styles.langOptionActive : ''}`}
                title={l.toUpperCase()}
              >
                {FLAGS[l]}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
