import React from 'react';
import Link from 'next/link';
import type { Riddim } from '@/types/riddim';
import type { Dictionary } from '@/lib/i18n';
import { getTotalViews, formatViews, getYoutubeSearchUrl } from '@/lib/data';
import styles from './RiddimDetail.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM DETAIL
   Page de détail d'un riddim avec voicings
   ══════════════════════════════════════════════════════════════════════════════ */

interface RiddimDetailProps {
  riddim: Riddim;
  lang: string;
  dict: Dictionary;
}

function genreTagClass(genre: string): string {
  const g = genre.toLowerCase();
  if (g === 'dancehall') return styles.tagGold;
  if (g === 'reggae' || g === 'roots') return styles.tagGreen;
  if (g === 'lovers rock') return styles.tagRed;
  return styles.tagMuted;
}

export default function RiddimDetail({ riddim, lang, dict }: RiddimDetailProps) {
  const totalViews = getTotalViews(riddim);
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);
  const maxViews = sortedVoicings[0]?.views ?? 1;

  return (
    <div className={styles.container}>
      {/* Back link */}
      <Link href={`/${lang}/explorer`} className={styles.backLink}>
        ← {dict.backToCatalog}
      </Link>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.riddimName}>{riddim.name}</h1>
        <p className={styles.producerLabel}>
          {riddim.producer} · {riddim.label}
        </p>

        {/* Tags */}
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

        {/* Stats */}
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
            <span className={styles.statValue}>{riddim.year}</span>
            <span className={styles.statLabel}>{dict.year}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={styles.desc}>{riddim.description}</p>

      {/* Voicings table */}
      <div className={styles.voicingsSection}>
        <h2 className={styles.voicingsHeading}>
          {dict.voicingsTitle}
          <span className={styles.voicingsCount}>({riddim.voicings.length})</span>
        </h2>

        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>{dict.rank}</th>
              <th>{dict.artist}</th>
              <th>{dict.title}</th>
              <th style={{ textAlign: 'right' }}>{dict.views}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedVoicings.map((v, i) => {
              const rankClass = i === 0 ? styles.rankTop1 : i === 1 ? styles.rankTop2 : i === 2 ? styles.rankTop3 : '';
              const barWidth = Math.max(4, (v.views / maxViews) * 80);

              return (
                <tr key={`${v.artist}-${v.title}`} className={styles.tableRow}>
                  <td className={`${styles.rankCell} ${rankClass}`}>{i + 1}</td>
                  <td className={styles.artistCell}>{v.artist}</td>
                  <td className={styles.titleCell}>{v.title}</td>
                  <td className={styles.viewsCell}>
                    <span className={styles.viewsBar} style={{ width: `${barWidth}px` }} />
                    {formatViews(v.views)}
                  </td>
                  <td>
                    <a
                      href={getYoutubeSearchUrl(v.artist, v.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.ytLink}
                    >
                      ▶ {dict.listenOnYt}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
