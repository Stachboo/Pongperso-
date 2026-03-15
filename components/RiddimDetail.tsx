import React from 'react';
import Link from 'next/link';
import type { Riddim } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
import { getTotalViews, formatViews, getYoutubeSearchUrl, allRiddims } from '@/lib/data';
import { generateContextText } from '@/utils/generateContextText';
import RiddimCard from '@/components/RiddimCard';
import styles from './RiddimDetail.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM DETAIL
   Page de détail complète d'un riddim avec SEO, voicings et riddims similaires
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimDetailProps {
  riddim: Riddim;
  lang: string;
  dict: Dictionary;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Utilitaires
   ═══════════════════════════════════════════════════════════════════════════ */

function genreTagClass(genre: string): string {
  const g = genre.toLowerCase();
  if (g === 'dancehall') return styles.tagGold;
  if (g === 'reggae' || g === 'roots') return styles.tagGreen;
  if (g === 'lovers rock') return styles.tagRed;
  return styles.tagMuted;
}

function getDecade(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

function getSpotifySearchUrl(artist: string, title: string): string {
  const q = encodeURIComponent(`${artist} ${title}`);
  return `https://open.spotify.com/search/${q}`;
}

function getSimilarRiddims(riddim: Riddim, limit: number): Riddim[] {
  return allRiddims
    .filter((r) => r.id !== riddim.id && r.genre.toLowerCase() === riddim.genre.toLowerCase())
    .slice(0, limit);
}


/* ═══════════════════════════════════════════════════════════════════════════
   Icônes SVG inline
   ═══════════════════════════════════════════════════════════════════════════ */

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ProducerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function LabelIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RiddimDetail({ riddim, lang, dict }: RiddimDetailProps) {
  const totalViews = getTotalViews(riddim);
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);
  const maxViews = sortedVoicings[0]?.views ?? 1;
  const topArtist = sortedVoicings[0]?.artist ?? '—';
  const decade = getDecade(riddim.year);
  const contextText = generateContextText(riddim);
  const similarRiddims = getSimilarRiddims(riddim, 4);

  return (
    <article className={styles.article}>

      {/* ═══ Back link (original) ═══ */}
      <Link href={`/${lang}/explorer`} className={styles.backLink}>
        ← {dict.backToCatalog}
      </Link>

      {/* ═══ SECTION A — Header ═══ */}
      <header className={styles.header}>
        {/* Triangles décoratifs */}
        <svg className={styles.decoTriangleLeft} viewBox="0 0 200 200" aria-hidden="true">
          <polygon points="0,0 200,0 0,200" />
        </svg>
        <svg className={styles.decoTriangleRight} viewBox="0 0 200 200" aria-hidden="true">
          <polygon points="200,200 0,200 200,0" />
        </svg>

        <div className={styles.headerContent}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol className={styles.breadcrumbList}>
              <li>
                <Link href={`/${lang}`} className={styles.breadcrumbLink}>
                  {dict.navHome}
                </Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
              <li>
                <Link href={`/${lang}/explorer`} className={styles.breadcrumbLink}>
                  {dict.navExplorer}
                </Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
              <li aria-current="page" className={styles.breadcrumbCurrent}>
                {riddim.name}
              </li>
            </ol>
          </nav>

          {/* Nom du riddim */}
          <h1 className={styles.riddimName}>
            {riddim.name}
            <span className={styles.brushStroke} aria-hidden="true">
              <svg viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M0 8 Q75 0 150 6 Q225 12 300 4" stroke="var(--color-brand-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Producteur · Label (original) */}
          <p className={styles.producerLabel}>
            {riddim.producer} · {riddim.label}
          </p>

          {/* Tags (original : genre + type + année + BPM) */}
          <div className={styles.tags}>
            <span className={`${styles.tag} ${genreTagClass(riddim.genre)}`}>
              {riddim.genre}
            </span>
            <span className={`${styles.tag} ${styles.tagMuted}`}>
              {riddim.type}
            </span>
            <span className={`${styles.tag} ${styles.tagMuted}`}>
              {riddim.year}
            </span>
            {riddim.bpm > 0 && (
              <span className={`${styles.tag} ${styles.tagMuted}`}>
                {riddim.bpm} BPM
              </span>
            )}
          </div>

          {/* Méta-informations avec icônes */}
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <CalendarIcon />
              {riddim.year}
            </span>
            <span className={styles.metaItem}>
              <ProducerIcon />
              {riddim.producer}
            </span>
            <span className={styles.metaItem}>
              <LabelIcon />
              {riddim.label}
            </span>
          </div>

          {/* Stats (original totalViews + nouvelles stats) */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatViews(totalViews)}</span>
              <span className={styles.statLabel}>{dict.totalViews}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{riddim.voicings.length}</span>
              <span className={styles.statLabel}>{dict.voicingsTitle}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{topArtist}</span>
              <span className={styles.statLabel}>Top Artist</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{decade}</span>
              <span className={styles.statLabel}>{dict.filterDecade}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Description (original) */}
      <p className={styles.desc}>{riddim.description}</p>

      <div className={styles.divider} />

      {/* ═══ SECTION B — Contexte historique ═══ */}
      <section aria-label="Contexte historique" className={styles.contextSection}>
        <h2 className={styles.sectionTitle}>
          À propos de ce riddim
          <span className={styles.sectionTitleScript}> son histoire</span>
        </h2>
        <p className={styles.contextText}>{contextText}</p>
      </section>

      <div className={styles.divider} />

      {/* ═══ SECTION C — Tableau des voicings ═══ */}
      <section aria-label="Liste des voicings" className={styles.voicingsSection}>
        <h2 className={styles.voicingsHeading}>
          {dict.voicingsTitle}
          <span className={styles.voicingsCount}>({riddim.voicings.length})</span>
        </h2>

        <table className={styles.table} aria-label={`Voicings du riddim ${riddim.name}`}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">{dict.rank}</th>
              <th scope="col">{dict.artist}</th>
              <th scope="col">{dict.title}</th>
              <th scope="col" style={{ textAlign: 'right' }}>{dict.views}</th>
              <th scope="col" className={styles.thActions}></th>
            </tr>
          </thead>
          <tbody>
            {sortedVoicings.map((v, i) => {
              const rank = i + 1;
              const rankClass =
                rank === 1 ? styles.rankTop1 :
                rank === 2 ? styles.rankTop2 :
                rank === 3 ? styles.rankTop3 :
                '';
              const barWidth = Math.max(4, (v.views / maxViews) * 80);

              return (
                <tr key={`${v.artist}-${v.title}`} className={styles.tableRow}>
                  <td className={`${styles.rankCell} ${rankClass}`}>{rank}</td>
                  <td className={styles.artistCell}>{v.artist}</td>
                  <td className={styles.titleCell}>{v.title}</td>
                  <td className={styles.viewsCell}>
                    <span className={styles.viewsBar} style={{ width: `${barWidth}px` }} />
                    {formatViews(v.views)}
                  </td>
                  <td className={styles.actionsCell}>
                    <a
                      href={getYoutubeSearchUrl(v.artist, v.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ytLink}
                    >
                      ▶ {dict.listenOnYt}
                    </a>
                    <a
                      href={getSpotifySearchUrl(v.artist, v.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionSpotify}
                      aria-label={`Rechercher ${v.artist} ${v.title} sur Spotify`}
                    >
                      <SpotifyIcon />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ═══ SECTION D — Riddims similaires ═══ */}
      {similarRiddims.length > 0 && (
        <>
          <div className={styles.divider} />
          <aside className={styles.similarSection}>
            <h2 className={styles.sectionTitle}>Riddims du même style</h2>
            <div className={styles.similarWrapper}>
              <button className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`} aria-label="Défiler à gauche" type="button">
                <ChevronLeftIcon />
              </button>
              <div className={styles.similarGrid}>
                {similarRiddims.map((r) => (
                  <div key={r.id} className={styles.similarCard}>
                    <RiddimCard riddim={r} size="sm" href={`/${lang}/riddim/${r.id}`} />
                  </div>
                ))}
              </div>
              <button className={`${styles.scrollBtn} ${styles.scrollBtnRight}`} aria-label="Défiler à droite" type="button">
                <ChevronRightIcon />
              </button>
            </div>
          </aside>
        </>
      )}
    </article>
  );
}
