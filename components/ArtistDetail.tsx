import React from 'react';
import Link from 'next/link';
import type { Artist } from '@/utils/artists';
import { generateArtistContextText, getRelatedArtists, buildArtistList } from '@/utils/artists';
import { allRiddims, formatViews } from '@/lib/data';
import ArtistCard from '@/components/ArtistCard';
import styles from './ArtistDetail.module.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ARTIST DETAIL
   Page de détail d'un artiste avec carrière, riddims, artistes similaires
   Composant serveur pur — pas de 'use client'
   ══════════════════════════════════════════════════════════════════════════════ */

interface ArtistDetailProps {
  artist: Artist;
  lang: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Utilitaires
   ═══════════════════════════════════════════════════════════════════════════ */

const GRADIENTS = [
  'linear-gradient(135deg, #F5A623, #C17D0A)',
  'linear-gradient(135deg, #1DB954, #158A3E)',
  'linear-gradient(135deg, #E63946, #B82D38)',
  'linear-gradient(135deg, #F5A623, #1DB954)',
  'linear-gradient(135deg, #E63946, #F5A623)',
  'linear-gradient(135deg, #1DB954, #E63946)',
] as const;

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getGradient(name: string): string {
  return GRADIENTS[hashName(name) % GRADIENTS.length];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function genreBadgeClass(genre: string): string {
  const g = genre.toLowerCase();
  if (g === 'dancehall') return styles.badgeGold;
  if (g === 'reggae' || g === 'roots') return styles.badgeGreen;
  if (g === 'lovers rock') return styles.badgeRed;
  return styles.badgeMuted;
}

function getSpotifySearchUrl(q: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(q)}`;
}

function getYoutubeSearchUrl(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}


/* ═══════════════════════════════════════════════════════════════════════════
   Icônes SVG
   ═══════════════════════════════════════════════════════════════════════════ */

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ArtistDetail({ artist, lang }: ArtistDetailProps) {
  const contextText = generateArtistContextText(artist);
  const allArtists = buildArtistList(allRiddims);
  const relatedArtists = getRelatedArtists(artist, allArtists);

  return (
    <article className={styles.article}>

      {/* ═══ SECTION A — Header artiste ═══ */}
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
                <Link href={`/${lang}`} className={styles.breadcrumbLink}>Accueil</Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
              <li>
                <Link href={`/${lang}/artistes`} className={styles.breadcrumbLink}>Artistes</Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">·</li>
              <li aria-current="page" className={styles.breadcrumbCurrent}>{artist.name}</li>
            </ol>
          </nav>

          {/* Avatar */}
          <div
            className={styles.avatarLarge}
            style={{ background: getGradient(artist.name) }}
            aria-label={`${artist.name}, artiste`}
          >
            <span className={styles.initialsLarge}>{getInitials(artist.name)}</span>
          </div>

          {/* Nom */}
          <h1 className={styles.artistName}>{artist.name}</h1>

          {/* Badges styles */}
          <div className={styles.styleBadges}>
            {artist.styles.map((s) => (
              <span key={s} className={`${styles.badge} ${genreBadgeClass(s)}`}>{s}</span>
            ))}
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{artist.riddimCount}</span>
              <span className={styles.statLabel}>Riddims</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{artist.totalVoicings}</span>
              <span className={styles.statLabel}>Voicings</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>#{artist.topRank}</span>
              <span className={styles.statLabel}>Meilleur rang</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{artist.decades.join(' · ')}</span>
              <span className={styles.statLabel}>Décennies</span>
            </div>
          </div>

          {/* Liens externes */}
          <div className={styles.externalLinks}>
            <a
              href={getSpotifySearchUrl(artist.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.spotifyBtn}
              aria-label={`Écouter ${artist.name} sur Spotify`}
            >
              <SpotifyIcon />
              Écouter sur Spotify
            </a>
            <a
              href={getYoutubeSearchUrl(artist.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtubeBtn}
              aria-label={`Rechercher ${artist.name} sur YouTube`}
            >
              <YoutubeIcon />
              Rechercher sur YouTube
            </a>
          </div>
        </div>
      </header>

      <div className={styles.divider} />

      {/* ═══ SECTION B — Contexte généré ═══ */}
      <section aria-label="Carrière de l'artiste" className={styles.contextSection}>
        <h2 className={styles.sectionTitle}>Carrière</h2>
        <p className={styles.contextText}>{contextText}</p>
      </section>

      <div className={styles.divider} />

      {/* ═══ SECTION C — Tableau des riddims ═══ */}
      <section aria-label="Riddims de l'artiste" className={styles.riddimSection}>
        <h2 className={styles.sectionTitle}>
          Riddims
          <span className={styles.riddimCount}>({artist.riddims.length})</span>
        </h2>

        <table className={styles.table} aria-label={`Riddims de ${artist.name}`}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">Rang</th>
              <th scope="col">Riddim</th>
              <th scope="col">Titre</th>
              <th scope="col">Année</th>
              <th scope="col">Style</th>
              <th scope="col" className={styles.thActions}>Écouter</th>
            </tr>
          </thead>
          <tbody>
            {artist.riddims.map((r) => {
              const rankClass =
                r.rank === 1 ? styles.rankGold :
                r.rank === 2 ? styles.rankSilver :
                r.rank === 3 ? styles.rankBronze :
                '';

              return (
                <tr key={`${r.riddimId}-${r.title}`} className={styles.tableRow}>
                  <td className={styles.rankCell}>
                    <span className={`${styles.rankBadge} ${rankClass}`}>{r.rank}</span>
                  </td>
                  <td className={styles.riddimCell}>
                    <Link href={`/${lang}/riddim/${r.riddimId}`} className={styles.riddimLink}>
                      {r.riddimName}
                    </Link>
                  </td>
                  <td className={styles.titleCell}>{r.title}</td>
                  <td className={styles.yearCell}>{r.riddimYear}</td>
                  <td>
                    <span className={`${styles.stylePill} ${genreBadgeClass(r.riddimStyle)}`}>
                      {r.riddimStyle}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <a
                      href={getSpotifySearchUrl(`${artist.name} ${r.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionSpotify}
                      aria-label={`Écouter ${r.title} sur Spotify`}
                    >
                      <SpotifyIcon />
                    </a>
                    <a
                      href={getYoutubeSearchUrl(`${artist.name} ${r.title} riddim`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionYoutube}
                      aria-label={`Écouter ${r.title} sur YouTube`}
                    >
                      <YoutubeIcon />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ═══ SECTION D — Artistes similaires ═══ */}
      {relatedArtists.length > 0 && (
        <>
          <div className={styles.divider} />
          <aside className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>Artistes fréquemment associés</h2>
            <p className={styles.relatedSubtitle}>
              Ces artistes apparaissent sur les mêmes riddims
            </p>
            <div className={styles.relatedGrid}>
              {relatedArtists.map((a) => (
                <div key={a.slug} className={styles.relatedCard}>
                  <ArtistCard artist={a} href={`/${lang}/artistes/${a.slug}`} />
                </div>
              ))}
            </div>
          </aside>
        </>
      )}
    </article>
  );
}
