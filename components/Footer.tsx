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
      title: 'Explorer',
      links: [
        { label: 'Explorer les riddims', href: `/${lang}/explorer` },
        { label: 'Top Dancehall', href: `/${lang}/explorer?genre=dancehall` },
        { label: 'Top Reggae', href: `/${lang}/explorer?genre=reggae` },
        { label: 'Lovers Rock', href: `/${lang}/explorer?genre=lovers+rock` },
        { label: 'Par décennie', href: `/${lang}/explorer?decade=1990` },
      ],
    },
    {
      title: 'Informations',
      links: [
        { label: 'À propos', href: `/${lang}/about` },
        { label: 'Méthodologie', href: `/${lang}/about#methodologie` },
        { label: 'Ajouter un riddim', href: `/${lang}/about#contribuer` },
        { label: 'Contact', href: `/${lang}/about#contact` },
        { label: 'Presse', href: `/${lang}/about#presse` },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', href: `/${lang}/mentions-legales` },
        { label: 'Politique de confidentialité', href: `/${lang}/confidentialite` },
        { label: "Conditions d'utilisation", href: `/${lang}/conditions` },
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
              WMC est la base de données de référence des riddims jamaïcains.
              Nous documentons chaque riddim, chaque voicing, classés
              par popularité de streaming mondiale.
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
              <span className={styles.miniStatLabel}>Riddims</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatValue}>5 000+</span>
              <span className={styles.miniStatLabel}>Voicings</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatValue}>5</span>
              <span className={styles.miniStatLabel}>Langues</span>
            </div>
          </div>
        </div>

        {/* ═══ BLOC 3 — Disclaimer ═══ */}
        <p className={styles.disclaimer}>
          {dict.footerNote} WMC n&apos;est affilié à aucun label.
        </p>
      </div>
    </footer>
  );
}
