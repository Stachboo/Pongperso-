'use client';

import { useState, useMemo } from 'react';
import type { Riddim, Voicing } from '@/types/riddim';
import styles from './AuditDashboard.module.css';

interface AuditDashboardProps {
  riddims: Riddim[];
  lang: string;
}

type AuditStatus = 'all' | 'estimated' | 'ok';

function getYoutubeSearchUrl(artist: string, title: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist} - ${title}`)}`;
}

function getSpotifySearchUrl(artist: string, title: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`;
}

function formatViews(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function isEstimated(views: number): boolean {
  return views >= 100000 && views % 100000 === 0;
}

function findCrossRiddimDuplicates(riddims: Riddim[]) {
  const map = new Map<string, { riddimId: number; riddimName: string }[]>();
  for (const r of riddims) {
    for (const v of r.voicings) {
      const key = `${v.artist.toLowerCase()}|||${v.title.toLowerCase()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ riddimId: r.id, riddimName: r.name });
    }
  }
  const dupes: { artist: string; title: string; locations: { riddimId: number; riddimName: string }[] }[] = [];
  for (const [key, locs] of map) {
    if (locs.length > 1) {
      const [artist, title] = key.split('|||');
      dupes.push({ artist, title, locations: locs });
    }
  }
  return dupes;
}

export default function AuditDashboard({ riddims, lang }: AuditDashboardProps) {
  const [selectedRiddim, setSelectedRiddim] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<AuditStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const crossDupes = useMemo(() => findCrossRiddimDuplicates(riddims), [riddims]);

  const stats = useMemo(() => {
    let totalVoicings = 0;
    let estimated = 0;
    let ok = 0;
    for (const r of riddims) {
      for (const v of r.voicings) {
        totalVoicings++;
        if (isEstimated(v.views)) estimated++;
        else ok++;
      }
    }
    return { totalRiddims: riddims.length, totalVoicings, estimated, ok, crossDupes: crossDupes.length };
  }, [riddims, crossDupes]);

  const filteredRiddims = useMemo(() => {
    let filtered = riddims;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.producer.toLowerCase().includes(q) ||
        r.voicings.some(v => v.artist.toLowerCase().includes(q) || v.title.toLowerCase().includes(q))
      );
    }

    if (filterStatus === 'estimated') {
      filtered = filtered.filter(r => r.voicings.some(v => isEstimated(v.views)));
    } else if (filterStatus === 'ok') {
      filtered = filtered.filter(r => r.voicings.every(v => !isEstimated(v.views)));
    }

    return filtered;
  }, [riddims, searchQuery, filterStatus]);

  const currentRiddim = selectedRiddim !== null ? riddims.find(r => r.id === selectedRiddim) : null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Audit Voicings</h1>
        <p className={styles.subtitle}>Vérification de la base de données riddim</p>
      </header>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalRiddims}</span>
          <span className={styles.statLabel}>Riddims</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalVoicings}</span>
          <span className={styles.statLabel}>Voicings</span>
        </div>
        <div className={`${styles.statCard} ${styles.statEstimated}`}>
          <span className={styles.statValue}>{stats.estimated}</span>
          <span className={styles.statLabel}>Vues estimées</span>
        </div>
        <div className={`${styles.statCard} ${styles.statOk}`}>
          <span className={styles.statValue}>{stats.ok}</span>
          <span className={styles.statLabel}>Vues vérifiées</span>
        </div>
        <div className={`${styles.statCard} ${styles.statDupe}`}>
          <span className={styles.statValue}>{stats.crossDupes}</span>
          <span className={styles.statLabel}>Doublons cross</span>
        </div>
      </div>

      {/* Cross-riddim duplicates */}
      {crossDupes.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Doublons cross-riddim</h2>
          <div className={styles.dupeList}>
            {crossDupes.map((d, i) => (
              <div key={i} className={styles.dupeItem}>
                <span className={styles.dupeArtist}>{d.artist} — {d.title}</span>
                <div className={styles.dupeTags}>
                  {d.locations.map((loc, j) => (
                    <button
                      key={j}
                      className={styles.dupeTag}
                      onClick={() => setSelectedRiddim(loc.riddimId)}
                    >
                      [{loc.riddimId}] {loc.riddimName}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher riddim, artiste, producteur..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className={styles.filterBtns}>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Tous ({riddims.length})
          </button>
          <button
            className={`${styles.filterBtn} ${styles.filterEstimated} ${filterStatus === 'estimated' ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus('estimated')}
          >
            Estimés
          </button>
          <button
            className={`${styles.filterBtn} ${styles.filterOk} ${filterStatus === 'ok' ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus('ok')}
          >
            Vérifiés
          </button>
        </div>
      </div>

      {/* Riddim list + detail */}
      <div className={styles.mainGrid}>
        {/* Left: riddim list */}
        <div className={styles.riddimList}>
          {filteredRiddims.map(r => {
            const estimatedCount = r.voicings.filter(v => isEstimated(v.views)).length;
            const isSelected = selectedRiddim === r.id;
            return (
              <button
                key={r.id}
                className={`${styles.riddimItem} ${isSelected ? styles.riddimSelected : ''}`}
                onClick={() => setSelectedRiddim(r.id)}
              >
                <div className={styles.riddimItemHeader}>
                  <span className={styles.riddimId}>#{r.id}</span>
                  <span className={styles.riddimName}>{r.name}</span>
                  <span className={styles.riddimYear}>{r.year}</span>
                </div>
                <div className={styles.riddimItemMeta}>
                  <span>{r.voicings.length} voicings</span>
                  {estimatedCount > 0 && (
                    <span className={styles.badgeEstimated}>{estimatedCount} estimés</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: detail */}
        <div className={styles.detailPanel}>
          {currentRiddim ? (
            <>
              <div className={styles.detailHeader}>
                <h2>{currentRiddim.name}</h2>
                <div className={styles.detailMeta}>
                  <span>{currentRiddim.producer}</span>
                  <span>{currentRiddim.label}</span>
                  <span>{currentRiddim.year}</span>
                  <span className={styles.genreTag}>{currentRiddim.genre}</span>
                  <span className={styles.typeTag}>{currentRiddim.type}</span>
                </div>
              </div>

              <table className={styles.voicingTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artiste</th>
                    <th>Titre</th>
                    <th>Vues</th>
                    <th>Status</th>
                    <th>Vérifier</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRiddim.voicings.map((v, i) => {
                    const estimated = isEstimated(v.views);
                    return (
                      <tr key={i} className={estimated ? styles.rowEstimated : styles.rowOk}>
                        <td className={styles.rankCell}>{i + 1}</td>
                        <td className={styles.artistCell}>{v.artist}</td>
                        <td className={styles.titleCell}>{v.title}</td>
                        <td className={styles.viewsCell}>{formatViews(v.views)}</td>
                        <td>
                          <span className={estimated ? styles.statusEstimated : styles.statusOk}>
                            {estimated ? 'Estimé' : 'OK'}
                          </span>
                        </td>
                        <td className={styles.linksCell}>
                          <a
                            href={getYoutubeSearchUrl(v.artist, v.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ytBtn}
                            title="Vérifier sur YouTube"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                          <a
                            href={getSpotifySearchUrl(v.artist, v.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.spotifyBtn}
                            title="Vérifier sur Spotify"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-.9 7.6-.5 10.4 1.2.3.2.4.6.2.9zm1.5-3.3c-.3.4-.8.5-1.2.3-2.9-1.8-7.2-2.3-10.6-1.3-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 3.9-1.2 8.8-.6 12.1 1.5.3.2.5.7.2 1.2zm.1-3.4c-3.4-2-9.1-2.2-12.4-1.2-.5.2-1.1-.1-1.3-.6-.2-.5.1-1.1.6-1.3 3.7-1.1 9.9-.9 13.8 1.4.5.3.6.9.4 1.4-.3.4-.9.6-1.1.3z"/>
                            </svg>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Sélectionne un riddim pour voir ses voicings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
