import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import type { Dictionary } from '@/lib/i18n';
import styles from './Footer.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — FOOTER ENRICHI
   Footer complet avec colonnes de liens, stats live, disclaimer
   Composant serveur pur — pas de 'use client'
   ══════════════════════════════════════════════════════════════════════════════ */

interface FooterProps {
  lang: string;
  dict: Dictionary;
}

/** Colonne de liens pour le footer */
interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}


export default function Footer({ lang, dict }: FooterProps) {
  const columns: FooterColumn[] = [
    {
      title: dict.footerColExplore,
      links: [
        { label: dict.exploreRiddims, href: `/${lang}/explorer` },
        { label: dict.footerTopDancehall, href: `/${lang}/explorer?genre=dancehall` },
        { label: dict.footerTopReggae, href: `/${lang}/explorer?genre=reggae` },
        { label: dict.footerLoversRock, href: `/${lang}/explorer?genre=lovers+rock` },
        { label: dict.footerByDecade, href: `/${lang}/explorer?decade=1990` },
      ],
    },
    {
      title: dict.footerColInfo,
      links: [
        { label: dict.navAbout, href: `/${lang}/about` },
        { label: dict.footerMethodology, href: `/${lang}/about#methodologie` },
        { label: dict.footerAddRiddim, href: `/${lang}/about#contribuer` },
        { label: dict.footerContact, href: `/${lang}/about#contact` },
        { label: dict.footerPress, href: `/${lang}/about#presse` },
      ],
    },
    {
      title: dict.footerColLegal,
      links: [
        { label: dict.footerLegalNotices, href: `/${lang}/mentions-legales` },
        { label: dict.footerPrivacy, href: `/${lang}/confidentialite` },
        { label: dict.footerTerms, href: `/${lang}/conditions` },
        { label: 'Sitemap', href: '/sitemap.xml' },
      ],
    },
  ];

  return (
    <footer role="contentinfo" className={styles.footer}>

      {/* Triangle décoratif */}
      <svg
        className={styles.decoTriangle}
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <polygon points="400,400 200,400 400,200" />
      </svg>

      <div className={styles.container}>

        {/* ═══ BLOC 1 — En-tête du footer ═══ */}
        <div className={styles.top}>

          {/* Côté gauche — Logo + description */}
          <div className={styles.brandBlock}>
            <Logo variant="full" size={80} />
            <p className={styles.brandDesc}>
              {dict.footerBrandDesc}
            </p>
          </div>

          {/* Côté droit — 3 colonnes de liens */}
          <div className={styles.columns}>
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <ul className={styles.columnList}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.columnLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SÉPARATEUR ═══ */}
        <div className={styles.separator} />

        {/* ═══ BLOC 2 — Barre de bas de footer ═══ */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} World Music Contest — {dict.footerText}
          </p>

          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <span className={styles.miniStatValue}>500+</span>
              <span className={styles.miniStatLabel}>{dict.statsRiddimsShort}</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatValue}>5 000+</span>
              <span className={styles.miniStatLabel}>{dict.statsVoicingsShort}</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatValue}>5</span>
              <span className={styles.miniStatLabel}>{dict.footerLanguages}</span>
            </div>
          </div>
        </div>

        {/* ═══ BLOC 3 — Disclaimer ═══ */}
        <p className={styles.disclaimer}>
          {dict.footerNote} {dict.footerDisclaimer}
        </p>
      </div>
    </footer>
  );
}
