'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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

const EMPTY_VOICING = { artist: '', title: '', views: 0 };
const EMPTY_RIDDIM = {
  name: '', year: 2024, producer: '', label: '', type: 'digital',
  genre: 'dancehall', bpm: 0, description: '',
};

export default function AuditDashboard({ riddims: initialRiddims, lang }: AuditDashboardProps) {
  const router = useRouter();
  const [riddims, setRiddims] = useState<Riddim[]>(initialRiddims);
  const [selectedRiddim, setSelectedRiddim] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<AuditStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Modal states ───────────────────────────────────────────────────────────
  const [moveModal, setMoveModal] = useState<{ riddimId: number; voicingIndex: number } | null>(null);
  const [moveTargetId, setMoveTargetId] = useState<number | ''>('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ riddimId: number; voicingIndex: number; artist: string; title: string } | null>(null);
  const [showAddVoicing, setShowAddVoicing] = useState(false);
  const [newVoicing, setNewVoicing] = useState(EMPTY_VOICING);
  const [editModal, setEditModal] = useState<{ riddimId: number; voicingIndex: number; artist: string; title: string; views: number } | null>(null);
  const [showCreateRiddim, setShowCreateRiddim] = useState(false);
  const [newRiddim, setNewRiddim] = useState(EMPTY_RIDDIM);
  const [newRiddimVoicings, setNewRiddimVoicings] = useState<{ artist: string; title: string; views: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    router.push(`/${lang}/audit/login`);
    router.refresh();
  }, [lang, router]);

  const crossDupes = useMemo(() => findCrossRiddimDuplicates(riddims), [riddims]);

  const stats = useMemo(() => {
    let totalVoicings = 0, estimated = 0, ok = 0;
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

  // ─── API helpers ────────────────────────────────────────────────────────────
  const apiCall = useCallback(async (body: Record<string, unknown>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/riddims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      // Refresh data
      const freshRes = await fetch('/api/riddims');
      const freshData = await freshRes.json();
      setRiddims(freshData);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── CRUD handlers ─────────────────────────────────────────────────────────
  const handleMoveVoicing = async () => {
    if (!moveModal || !moveTargetId) return;
    await apiCall({
      action: 'move-voicing',
      fromRiddimId: moveModal.riddimId,
      toRiddimId: Number(moveTargetId),
      voicingIndex: moveModal.voicingIndex,
    });
    setMoveModal(null);
    setMoveTargetId('');
  };

  const handleDeleteVoicing = async () => {
    if (!deleteConfirm) return;
    await apiCall({
      action: 'delete-voicing',
      riddimId: deleteConfirm.riddimId,
      voicingIndex: deleteConfirm.voicingIndex,
    });
    setDeleteConfirm(null);
  };

  const handleAddVoicing = async () => {
    if (!currentRiddim || !newVoicing.artist || !newVoicing.title) return;
    await apiCall({
      action: 'add-voicing',
      riddimId: currentRiddim.id,
      artist: newVoicing.artist,
      title: newVoicing.title,
      views: newVoicing.views,
    });
    setNewVoicing(EMPTY_VOICING);
    setShowAddVoicing(false);
  };

  const handleEditVoicing = async () => {
    if (!editModal || !editModal.artist || !editModal.title) return;
    await apiCall({
      action: 'edit-voicing',
      riddimId: editModal.riddimId,
      voicingIndex: editModal.voicingIndex,
      artist: editModal.artist,
      title: editModal.title,
      views: editModal.views,
    });
    setEditModal(null);
  };

  const handleReorderVoicing = async (riddimId: number, voicingIndex: number, direction: 'up' | 'down') => {
    await apiCall({
      action: 'reorder-voicing',
      riddimId,
      voicingIndex,
      direction,
    });
  };

  const handleCreateRiddim = async () => {
    if (!newRiddim.name || !newRiddim.producer) return;
    const result = await apiCall({
      action: 'create-riddim',
      ...newRiddim,
      voicings: newRiddimVoicings.filter(v => v.artist && v.title),
    });
    setNewRiddim(EMPTY_RIDDIM);
    setNewRiddimVoicings([]);
    setShowCreateRiddim(false);
    if (result?.createdRiddim) {
      setSelectedRiddim(result.createdRiddim.id);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Audit Voicings</h1>
            <p className={styles.subtitle}>Vérification et gestion de la base de données riddim</p>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
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

      {/* Filters + Create button */}
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
            className={`${styles.filterBtn} ${filterStatus === 'estimated' ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus('estimated')}
          >
            Estimés
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === 'ok' ? styles.filterActive : ''}`}
            onClick={() => setFilterStatus('ok')}
          >
            Vérifiés
          </button>
        </div>
        <button
          className={styles.createBtn}
          onClick={() => setShowCreateRiddim(true)}
        >
          + Nouveau Riddim
        </button>
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
                  {currentRiddim.bpm > 0 && <span>{currentRiddim.bpm} BPM</span>}
                </div>
              </div>

              {/* Add voicing toggle */}
              <div className={styles.detailActions}>
                <button
                  className={styles.addVoicingBtn}
                  onClick={() => setShowAddVoicing(!showAddVoicing)}
                >
                  + Ajouter un voicing
                </button>
              </div>

              {/* Add voicing form */}
              {showAddVoicing && (
                <div className={styles.inlineForm}>
                  <input
                    type="text"
                    placeholder="Artiste"
                    value={newVoicing.artist}
                    onChange={e => setNewVoicing({ ...newVoicing, artist: e.target.value })}
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    placeholder="Titre"
                    value={newVoicing.title}
                    onChange={e => setNewVoicing({ ...newVoicing, title: e.target.value })}
                    className={styles.formInput}
                  />
                  <input
                    type="number"
                    placeholder="Vues"
                    value={newVoicing.views || ''}
                    onChange={e => setNewVoicing({ ...newVoicing, views: Number(e.target.value) || 0 })}
                    className={styles.formInputSmall}
                  />
                  <button onClick={handleAddVoicing} className={styles.confirmBtn} disabled={loading}>
                    Ajouter
                  </button>
                  <button onClick={() => { setShowAddVoicing(false); setNewVoicing(EMPTY_VOICING); }} className={styles.cancelBtn}>
                    Annuler
                  </button>
                </div>
              )}

              <table className={styles.voicingTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artiste</th>
                    <th>Titre</th>
                    <th>Vues</th>
                    <th>Status</th>
                    <th>Vérifier</th>
                    <th>Actions</th>
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
                        <td className={styles.actionsCell}>
                          <button
                            className={styles.actionReorder}
                            title="Monter"
                            disabled={i === 0 || loading}
                            onClick={() => handleReorderVoicing(currentRiddim.id, i, 'up')}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionReorder}
                            title="Descendre"
                            disabled={i === currentRiddim.voicings.length - 1 || loading}
                            onClick={() => handleReorderVoicing(currentRiddim.id, i, 'down')}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionEdit}
                            title="Modifier ce voicing"
                            onClick={() => setEditModal({ riddimId: currentRiddim.id, voicingIndex: i, artist: v.artist, title: v.title, views: v.views })}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionMove}
                            title="Déplacer vers un autre riddim"
                            onClick={() => { setMoveModal({ riddimId: currentRiddim.id, voicingIndex: i }); setMoveTargetId(''); }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 9l-3 3 3 3"/><path d="M9 5l3-3 3 3"/><path d="M15 19l3 3 3-3"/><path d="M19 9l3 3-3 3"/>
                              <line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>
                            </svg>
                          </button>
                          <button
                            className={styles.actionDelete}
                            title="Supprimer ce voicing"
                            onClick={() => setDeleteConfirm({ riddimId: currentRiddim.id, voicingIndex: i, artist: v.artist, title: v.title })}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
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

      {/* ─── Move Voicing Modal ──────────────────────────────────────────────── */}
      {moveModal && (
        <div className={styles.modalOverlay} onClick={() => setMoveModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Déplacer le voicing</h3>
            <p className={styles.modalDesc}>
              Sélectionne le riddim de destination :
            </p>
            <select
              className={styles.formSelect}
              value={moveTargetId}
              onChange={e => setMoveTargetId(Number(e.target.value))}
            >
              <option value="">— Choisir un riddim —</option>
              {riddims
                .filter(r => r.id !== moveModal.riddimId)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(r => (
                  <option key={r.id} value={r.id}>
                    [{r.id}] {r.name}
                  </option>
                ))}
            </select>
            <div className={styles.modalActions}>
              <button onClick={handleMoveVoicing} className={styles.confirmBtn} disabled={!moveTargetId || loading}>
                Déplacer
              </button>
              <button onClick={() => setMoveModal(null)} className={styles.cancelBtn}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ───────────────────────────────────────── */}
      {deleteConfirm && (
        <div className={styles.modalOverlay} onClick={() => setDeleteConfirm(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Supprimer le voicing</h3>
            <p className={styles.modalDesc}>
              Supprimer <strong>{deleteConfirm.artist} — {deleteConfirm.title}</strong> ?
              <br />Cette action est irréversible.
            </p>
            <div className={styles.modalActions}>
              <button onClick={handleDeleteVoicing} className={styles.deleteBtn} disabled={loading}>
                Supprimer
              </button>
              <button onClick={() => setDeleteConfirm(null)} className={styles.cancelBtn}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Edit Voicing Modal ──────────────────────────────────────────────── */}
      {editModal && (
        <div className={styles.modalOverlay} onClick={() => setEditModal(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Modifier le voicing</h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Artiste</label>
              <input
                type="text"
                className={styles.formInput}
                value={editModal.artist}
                onChange={e => setEditModal({ ...editModal, artist: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Titre</label>
              <input
                type="text"
                className={styles.formInput}
                value={editModal.title}
                onChange={e => setEditModal({ ...editModal, title: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Vues</label>
              <input
                type="number"
                className={styles.formInput}
                value={editModal.views || ''}
                onChange={e => setEditModal({ ...editModal, views: Number(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleEditVoicing} className={styles.confirmBtn} disabled={!editModal.artist || !editModal.title || loading}>
                Enregistrer
              </button>
              <button onClick={() => setEditModal(null)} className={styles.cancelBtn}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Riddim Modal ─────────────────────────────────────────────── */}
      {showCreateRiddim && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateRiddim(false)}>
          <div className={styles.modalLarge} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Créer un nouveau riddim</h3>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nom *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Ex: Stalag Riddim"
                  value={newRiddim.name}
                  onChange={e => setNewRiddim({ ...newRiddim, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Producteur *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Ex: Steely & Clevie"
                  value={newRiddim.producer}
                  onChange={e => setNewRiddim({ ...newRiddim, producer: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Année</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={newRiddim.year}
                  onChange={e => setNewRiddim({ ...newRiddim, year: Number(e.target.value) || 2024 })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Label</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Ex: VP Records"
                  value={newRiddim.label}
                  onChange={e => setNewRiddim({ ...newRiddim, label: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Genre</label>
                <select
                  className={styles.formSelect}
                  value={newRiddim.genre}
                  onChange={e => setNewRiddim({ ...newRiddim, genre: e.target.value })}
                >
                  <option value="dancehall">Dancehall</option>
                  <option value="reggae">Reggae</option>
                  <option value="roots">Roots</option>
                  <option value="dub">Dub</option>
                  <option value="ska">Ska</option>
                  <option value="rocksteady">Rocksteady</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Type</label>
                <select
                  className={styles.formSelect}
                  value={newRiddim.type}
                  onChange={e => setNewRiddim({ ...newRiddim, type: e.target.value })}
                >
                  <option value="digital">Digital</option>
                  <option value="one-drop">One Drop</option>
                  <option value="steppers">Steppers</option>
                  <option value="rockers">Rockers</option>
                  <option value="nyabinghi">Nyabinghi</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>BPM</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="0"
                  value={newRiddim.bpm || ''}
                  onChange={e => setNewRiddim({ ...newRiddim, bpm: Number(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Description du riddim..."
                value={newRiddim.description}
                onChange={e => setNewRiddim({ ...newRiddim, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Initial voicings */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Voicings initiaux</label>
              {newRiddimVoicings.map((v, i) => (
                <div key={i} className={styles.inlineForm}>
                  <input
                    type="text"
                    placeholder="Artiste"
                    value={v.artist}
                    onChange={e => {
                      const updated = [...newRiddimVoicings];
                      updated[i] = { ...updated[i], artist: e.target.value };
                      setNewRiddimVoicings(updated);
                    }}
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    placeholder="Titre"
                    value={v.title}
                    onChange={e => {
                      const updated = [...newRiddimVoicings];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setNewRiddimVoicings(updated);
                    }}
                    className={styles.formInput}
                  />
                  <input
                    type="number"
                    placeholder="Vues"
                    value={v.views || ''}
                    onChange={e => {
                      const updated = [...newRiddimVoicings];
                      updated[i] = { ...updated[i], views: Number(e.target.value) || 0 };
                      setNewRiddimVoicings(updated);
                    }}
                    className={styles.formInputSmall}
                  />
                  <button
                    className={styles.actionDelete}
                    onClick={() => setNewRiddimVoicings(newRiddimVoicings.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className={styles.addVoicingBtn}
                onClick={() => setNewRiddimVoicings([...newRiddimVoicings, { artist: '', title: '', views: 0 }])}
              >
                + Ajouter un voicing
              </button>
            </div>

            <div className={styles.modalActions}>
              <button onClick={handleCreateRiddim} className={styles.confirmBtn} disabled={!newRiddim.name || !newRiddim.producer || loading}>
                Créer le riddim
              </button>
              <button onClick={() => { setShowCreateRiddim(false); setNewRiddim(EMPTY_RIDDIM); setNewRiddimVoicings([]); }} className={styles.cancelBtn}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
}
