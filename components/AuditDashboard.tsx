'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Riddim } from '@/types/riddim';
import Modal from './Modal';
import styles from './AuditDashboard.module.css';

interface AuditDashboardProps {
  riddims: Riddim[];
  lang: string;
}

type AuditStatus = 'all' | 'estimated' | 'ok';
type Toast = { id: number; kind: 'success' | 'error'; message: string };

function getYoutubeSearchUrl(artist: string, title: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist} - ${title}`)}`;
}
function getSpotifySearchUrl(artist: string, title: string) {
  return `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`;
}
function getDeezerSearchUrl(artist: string, title: string) {
  return `https://www.deezer.com/search/${encodeURIComponent(`${artist} ${title}`)}`;
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

/** Glyphe vinyle/dubplate — identité soundsystem. Décoratif (aria-hidden). */
function VinylGlyph({ size = 40, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <span
      className={`${styles.vinyl} ${spinning ? styles.vinylSpin : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className={styles.vinylLabel} />
      <span className={styles.vinylHole} />
    </span>
  );
}

export default function AuditDashboard({ riddims: initialRiddims, lang }: AuditDashboardProps) {
  const router = useRouter();
  const [riddims, setRiddims] = useState<Riddim[]>(initialRiddims);
  const [selectedRiddim, setSelectedRiddim] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<AuditStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDupes, setShowDupes] = useState(false);

  // ─── Modales ────────────────────────────────────────────────────────────────
  const [moveModal, setMoveModal] = useState<{ riddimId: number; voicingId?: string; artist: string; title: string } | null>(null);
  const [moveTargetId, setMoveTargetId] = useState<number | ''>('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ riddimId: number; voicingId?: string; artist: string; title: string } | null>(null);
  const [showAddVoicing, setShowAddVoicing] = useState(false);
  const [newVoicing, setNewVoicing] = useState(EMPTY_VOICING);
  const [editModal, setEditModal] = useState<{ riddimId: number; voicingId?: string; artist: string; title: string; views: number } | null>(null);
  const [showCreateRiddim, setShowCreateRiddim] = useState(false);
  const [newRiddim, setNewRiddim] = useState(EMPTY_RIDDIM);
  const [newRiddimVoicings, setNewRiddimVoicings] = useState<{ artist: string; title: string; views: number }[]>([]);
  const [editRiddim, setEditRiddim] = useState<{ id: number; name: string; year: number; producer: string; label: string; type: string; genre: string; bpm: number; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [flashId, setFlashId] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const dupesRef = useRef<HTMLDivElement>(null);
  const toastSeq = useRef(0);

  // ─── Toasts ───────────────────────────────────────────────────────────────
  const pushToast = useCallback((kind: Toast['kind'], message: string) => {
    const id = ++toastSeq.current;
    setToasts(t => [...t, { id, kind, message }]);
    window.setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);

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
  const maxViews = useMemo(
    () => (currentRiddim ? Math.max(1, ...currentRiddim.voicings.map(v => v.views)) : 1),
    [currentRiddim]
  );

  // ─── API ────────────────────────────────────────────────────────────────────
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/riddims');
      const data = await res.json();
      setRiddims(data);
    } catch { /* ignore */ }
  }, []);

  // Au montage, remplacer les données figées du build par l'état réel du Blob.
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Raccourci « / » : focus la recherche (hors champs de saisie).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const flashRow = useCallback((id?: string) => {
    if (!id) return;
    setFlashId(id);
    window.setTimeout(() => setFlashId(cur => (cur === id ? null : cur)), 650);
  }, []);

  const apiCall = useCallback(async (body: Record<string, unknown>, successMsg?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/riddims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        pushToast('error', data.error || 'Erreur serveur');
        await refreshData(); // resync même en erreur (évite l'état périmé / 409)
        return null;
      }
      await refreshData();
      if (successMsg) pushToast('success', successMsg);
      return data;
    } catch (err) {
      pushToast('error', err instanceof Error ? err.message : 'Erreur réseau');
      return null;
    } finally {
      setLoading(false);
    }
  }, [refreshData, pushToast]);

  // ─── Handlers CRUD (ciblage par id) ──────────────────────────────────────────
  const handleMoveVoicing = async () => {
    if (!moveModal || !moveTargetId) return;
    const result = await apiCall({
      action: 'move-voicing',
      fromRiddimId: moveModal.riddimId,
      toRiddimId: Number(moveTargetId),
      voicingId: moveModal.voicingId,
    }, 'Voicing déplacé');
    if (result) {
      setMoveModal(null);
      setMoveTargetId('');
    }
  };

  const handleDeleteVoicing = async () => {
    if (!deleteConfirm) return;
    const result = await apiCall({
      action: 'delete-voicing',
      riddimId: deleteConfirm.riddimId,
      voicingId: deleteConfirm.voicingId,
    }, 'Voicing supprimé');
    if (result) setDeleteConfirm(null);
  };

  const handleAddVoicing = async () => {
    if (!currentRiddim || !newVoicing.artist || !newVoicing.title) return;
    const result = await apiCall({
      action: 'add-voicing',
      riddimId: currentRiddim.id,
      artist: newVoicing.artist,
      title: newVoicing.title,
      views: newVoicing.views,
    }, 'Voicing ajouté');
    if (result) {
      flashRow(result.addedVoicing?.id);
      setNewVoicing(EMPTY_VOICING);
      setShowAddVoicing(false);
    }
  };

  const handleEditVoicing = async () => {
    if (!editModal || !editModal.artist || !editModal.title) return;
    const result = await apiCall({
      action: 'edit-voicing',
      riddimId: editModal.riddimId,
      voicingId: editModal.voicingId,
      artist: editModal.artist,
      title: editModal.title,
      views: editModal.views,
    }, 'Voicing modifié');
    if (result) {
      flashRow(editModal.voicingId);
      setEditModal(null);
    }
  };

  const handleReorderVoicing = async (riddimId: number, voicingId: string | undefined, direction: 'up' | 'down') => {
    await apiCall({ action: 'reorder-voicing', riddimId, voicingId, direction });
  };

  const handleCreateRiddim = async () => {
    if (!newRiddim.name || !newRiddim.producer) return;
    const result = await apiCall({
      action: 'create-riddim',
      ...newRiddim,
      voicings: newRiddimVoicings.filter(v => v.artist && v.title),
    }, 'Riddim créé');
    if (result) {
      setNewRiddim(EMPTY_RIDDIM);
      setNewRiddimVoicings([]);
      setShowCreateRiddim(false);
      if (result.createdRiddim) setSelectedRiddim(result.createdRiddim.id);
    }
  };

  const handleEditRiddim = async () => {
    if (!editRiddim || !editRiddim.name || !editRiddim.producer) return;
    const result = await apiCall({ action: 'edit-riddim', riddimId: editRiddim.id, ...editRiddim }, 'Riddim modifié');
    if (result) setEditRiddim(null);
  };

  const filterIndex = filterStatus === 'all' ? 0 : filterStatus === 'estimated' ? 1 : 2;

  return (
    <div className={styles.container}>
      {/* Barre de progression indéterminée (remplace le spinner bloquant) */}
      <div className={`${styles.topBar} ${loading ? styles.topBarActive : ''}`} aria-hidden="true" />

      {/* ─── CommandBar ──────────────────────────────────────────────────────── */}
      <header className={styles.commandBar}>
        <div className={styles.lockup}>
          <VinylGlyph size={30} spinning={loading} />
          <span className={styles.wordmark}>
            RIDDIM CONSOLE <span className={styles.wordmarkScript} aria-hidden="true">voicings</span>
          </span>
          {currentRiddim && (
            <span className={styles.breadcrumb}>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.mono}>#{currentRiddim.id}</span> {currentRiddim.name}
            </span>
          )}
        </div>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            className={styles.searchInput}
            placeholder="Rechercher riddim, artiste, producteur…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Rechercher"
          />
          <kbd className={styles.kbd} aria-hidden="true">/</kbd>
        </div>

        <div
          className={styles.segmented}
          style={{ ['--seg-index' as string]: filterIndex }}
          role="group"
          aria-label="Filtrer par statut"
        >
          <span className={styles.segIndicator} aria-hidden="true" />
          <button
            className={`${styles.segBtn} ${filterStatus === 'all' ? styles.segActive : ''}`}
            onClick={() => setFilterStatus('all')}
            aria-pressed={filterStatus === 'all'}
          >
            Tous <span className={styles.mono}>{riddims.length}</span>
          </button>
          <button
            className={`${styles.segBtn} ${filterStatus === 'estimated' ? styles.segActive : ''}`}
            onClick={() => setFilterStatus('estimated')}
            aria-pressed={filterStatus === 'estimated'}
          >
            Estimés
          </button>
          <button
            className={`${styles.segBtn} ${filterStatus === 'ok' ? styles.segActive : ''}`}
            onClick={() => setFilterStatus('ok')}
            aria-pressed={filterStatus === 'ok'}
          >
            Vérifiés
          </button>
        </div>

        <button className={styles.createBtn} onClick={() => setShowCreateRiddim(true)}>
          <span aria-hidden="true">+</span> Nouveau riddim
        </button>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Déconnexion" aria-label="Déconnexion">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      {/* ─── SignalStrip ─────────────────────────────────────────────────────── */}
      <div className={styles.signalStrip}>
        <div className={styles.signalCell}>
          <span className={`${styles.signalValue} ${styles.mono}`}>{stats.totalRiddims}</span>
          <span className={styles.signalLabel}>Riddims</span>
        </div>
        <div className={styles.signalCell}>
          <span className={`${styles.signalValue} ${styles.mono}`}>{stats.totalVoicings}</span>
          <span className={styles.signalLabel}>Voicings</span>
        </div>
        <div className={`${styles.signalCell} ${styles.cellEstimated}`}>
          <span className={`${styles.signalValue} ${styles.mono}`}>{stats.estimated}</span>
          <span className={styles.signalLabel}>Vues estimées</span>
        </div>
        <div className={`${styles.signalCell} ${styles.cellVerified}`}>
          <span className={`${styles.signalValue} ${styles.mono}`}>{stats.ok}</span>
          <span className={styles.signalLabel}>Vues vérifiées</span>
        </div>
        <button
          className={`${styles.signalCell} ${styles.cellDupe} ${styles.signalButton}`}
          onClick={() => { setShowDupes(s => !s); if (!showDupes) requestAnimationFrame(() => dupesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })); }}
          disabled={crossDupes.length === 0}
          aria-expanded={showDupes}
        >
          <span className={`${styles.signalValue} ${styles.mono}`}>{stats.crossDupes}</span>
          <span className={styles.signalLabel}>Doublons cross ▾</span>
        </button>
      </div>

      {/* ─── Doublons cross-riddim (repliable) ───────────────────────────────── */}
      {showDupes && crossDupes.length > 0 && (
        <section className={styles.dupesPanel} ref={dupesRef}>
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
                      <span className={styles.mono}>[{loc.riddimId}]</span> {loc.riddimName}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Grille principale ───────────────────────────────────────────────── */}
      <div className={styles.mainGrid}>
        {/* Colonne gauche : liste des riddims */}
        <div className={styles.riddimList}>
          {filteredRiddims.map(r => {
            const total = r.voicings.length || 1;
            const estimatedCount = r.voicings.filter(v => isEstimated(v.views)).length;
            const verifiedRatio = ((total - estimatedCount) / total) * 100;
            const isSelected = selectedRiddim === r.id;
            return (
              <button
                key={r.id}
                className={`${styles.riddimItem} ${isSelected ? styles.riddimSelected : ''}`}
                onClick={() => setSelectedRiddim(r.id)}
                aria-current={isSelected}
              >
                <span className={styles.riddimLine1}>
                  <span className={`${styles.riddimId} ${styles.mono}`}>#{r.id}</span>
                  <span className={styles.riddimName}>{r.name}</span>
                  <span className={`${styles.riddimYear} ${styles.mono}`}>{r.year}</span>
                </span>
                <span className={styles.riddimLine2}>
                  <span className={styles.riddimCount}>{r.voicings.length} voicings</span>
                  <span className={styles.splitMeter} aria-hidden="true">
                    <span className={styles.splitVerified} style={{ width: `${verifiedRatio}%` }} />
                  </span>
                </span>
              </button>
            );
          })}
          {filteredRiddims.length === 0 && (
            <p className={styles.listEmpty}>Aucun riddim ne correspond.</p>
          )}
        </div>

        {/* Colonne droite : détail */}
        <div className={styles.detailPanel}>
          {currentRiddim ? (
            <>
              <div className={styles.detailBar}>
                <div>
                  <h2 className={styles.detailTitle}>{currentRiddim.name}</h2>
                  <div className={styles.detailMeta}>
                    <span>{currentRiddim.producer}</span>
                    {currentRiddim.label && <span>{currentRiddim.label}</span>}
                    <span className={styles.mono}>{currentRiddim.year}</span>
                    <span className={styles.genreTag}>{currentRiddim.genre}</span>
                    <span className={styles.typeTag}>{currentRiddim.type}</span>
                    {currentRiddim.bpm > 0 && <span className={styles.mono}>{currentRiddim.bpm} BPM</span>}
                  </div>
                </div>
                <div className={styles.detailBarActions}>
                  <button
                    className={styles.addVoicingBtn}
                    onClick={() => setEditRiddim({
                      id: currentRiddim.id, name: currentRiddim.name, year: currentRiddim.year,
                      producer: currentRiddim.producer, label: currentRiddim.label, type: currentRiddim.type,
                      genre: currentRiddim.genre, bpm: currentRiddim.bpm, description: currentRiddim.description,
                    })}
                  >
                    <span aria-hidden="true">✎</span> Métadonnées
                  </button>
                  <button className={styles.addVoicingBtn} onClick={() => setShowAddVoicing(v => !v)}>
                    <span aria-hidden="true">+</span> Voicing
                  </button>
                </div>
              </div>

              {showAddVoicing && (
                <div className={styles.inlineForm}>
                  <input type="text" placeholder="Artiste" value={newVoicing.artist}
                    onChange={e => setNewVoicing({ ...newVoicing, artist: e.target.value })}
                    className={styles.formInput} aria-label="Artiste" />
                  <input type="text" placeholder="Titre" value={newVoicing.title}
                    onChange={e => setNewVoicing({ ...newVoicing, title: e.target.value })}
                    className={styles.formInput} aria-label="Titre" />
                  <input type="number" placeholder="Vues" value={newVoicing.views || ''}
                    onChange={e => setNewVoicing({ ...newVoicing, views: Number(e.target.value) || 0 })}
                    className={styles.formInputSmall} aria-label="Vues" />
                  <button onClick={handleAddVoicing} className={styles.confirmBtn} disabled={loading || !newVoicing.artist || !newVoicing.title}>
                    Ajouter
                  </button>
                  <button onClick={() => { setShowAddVoicing(false); setNewVoicing(EMPTY_VOICING); }} className={styles.cancelBtn}>
                    Annuler
                  </button>
                </div>
              )}

              <div className={styles.tableScroll}>
                <table className={styles.voicingTable}>
                  <thead>
                    <tr>
                      <th className={styles.thRank}>#</th>
                      <th>Artiste</th>
                      <th>Titre</th>
                      <th className={styles.thViews}>Vues</th>
                      <th>Statut</th>
                      <th>Vérifier</th>
                      <th className={styles.thActions}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRiddim.voicings.map((v, i) => {
                      const estimated = isEstimated(v.views);
                      const rowKey = v.id ?? `${v.artist}|${v.title}|${i}`;
                      return (
                        <tr
                          key={rowKey}
                          className={`${estimated ? styles.rowEstimated : ''} ${flashId && v.id === flashId ? styles.commitFlash : ''}`}
                        >
                          <td className={styles.rankCell}>
                            <span className={`${styles.medallion} ${i < 3 ? styles.medallionTop : ''} ${styles.mono}`} aria-hidden="true">{i + 1}</span>
                          </td>
                          <td className={styles.artistCell}>{v.artist}</td>
                          <td className={styles.titleCell}>{v.title}</td>
                          <td className={styles.viewsCell}>
                            <span className={styles.mono}>{formatViews(v.views)}</span>
                            <span className={styles.viewsBar} aria-hidden="true">
                              <span className={styles.viewsBarFill} style={{ width: `${(v.views / maxViews) * 100}%` }} />
                            </span>
                          </td>
                          <td>
                            <span className={estimated ? styles.statusEstimated : styles.statusOk}>
                              <span className={styles.pip} aria-hidden="true" />
                              {estimated ? 'Estimé' : 'OK'}
                            </span>
                          </td>
                          <td className={styles.linksCell}>
                            <a href={getYoutubeSearchUrl(v.artist, v.title)} target="_blank" rel="noopener noreferrer" className={styles.ytBtn} title="Vérifier sur YouTube" aria-label={`Vérifier ${v.artist} sur YouTube`}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a href={getSpotifySearchUrl(v.artist, v.title)} target="_blank" rel="noopener noreferrer" className={styles.spotifyBtn} title="Vérifier sur Spotify" aria-label={`Vérifier ${v.artist} sur Spotify`}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-.9 7.6-.5 10.4 1.2.3.2.4.6.2.9zm1.5-3.3c-.3.4-.8.5-1.2.3-2.9-1.8-7.2-2.3-10.6-1.3-.5.1-1-.1-1.1-.6-.1-.5.1-1 .6-1.1 3.9-1.2 8.8-.6 12.1 1.5.3.2.5.7.2 1.2zm.1-3.4c-3.4-2-9.1-2.2-12.4-1.2-.5.2-1.1-.1-1.3-.6-.2-.5.1-1.1.6-1.3 3.7-1.1 9.9-.9 13.8 1.4.5.3.6.9.4 1.4-.3.4-.9.6-1.1.3z" /></svg>
                            </a>
                            <a href={getDeezerSearchUrl(v.artist, v.title)} target="_blank" rel="noopener noreferrer" className={styles.deezerBtn} title="Vérifier sur Deezer" aria-label={`Vérifier ${v.artist} sur Deezer`}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.5 7.5H24V10H18.5V7.5ZM18.5 11.25H24V13.75H18.5V11.25ZM12.33 11.25H17.83V13.75H12.33V11.25ZM18.5 15H24V17.5H18.5V15ZM12.33 15H17.83V17.5H12.33V15ZM6.17 15H11.67V17.5H6.17V15ZM0 15H5.5V17.5H0V15Z" /></svg>
                            </a>
                          </td>
                          <td className={styles.actionsCell}>
                            <button className={styles.actionReorder} title="Monter" aria-label="Monter" disabled={i === 0 || loading}
                              onClick={() => handleReorderVoicing(currentRiddim.id, v.id, 'up')}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15" /></svg>
                            </button>
                            <button className={styles.actionReorder} title="Descendre" aria-label="Descendre" disabled={i === currentRiddim.voicings.length - 1 || loading}
                              onClick={() => handleReorderVoicing(currentRiddim.id, v.id, 'down')}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                            </button>
                            <button className={styles.actionEdit} title="Modifier" aria-label="Modifier ce voicing"
                              onClick={() => setEditModal({ riddimId: currentRiddim.id, voicingId: v.id, artist: v.artist, title: v.title, views: v.views })}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            </button>
                            <button className={styles.actionMove} title="Déplacer" aria-label="Déplacer vers un autre riddim"
                              onClick={() => { setMoveModal({ riddimId: currentRiddim.id, voicingId: v.id, artist: v.artist, title: v.title }); setMoveTargetId(''); }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 9l-3 3 3 3" /><path d="M9 5l3-3 3 3" /><path d="M15 19l3 3 3-3" /><path d="M19 9l3 3-3 3" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /></svg>
                            </button>
                            <button className={styles.actionDelete} title="Supprimer" aria-label="Supprimer ce voicing"
                              onClick={() => setDeleteConfirm({ riddimId: currentRiddim.id, voicingId: v.id, artist: v.artist, title: v.title })}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <VinylGlyph size={64} />
              <p>Sélectionne un riddim pour gérer ses voicings</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Modale : déplacer ───────────────────────────────────────────────── */}
      {moveModal && (
        <Modal title="Déplacer le voicing" accent="blue" onClose={() => setMoveModal(null)}>
          <p className={styles.modalDesc}>
            <strong>{moveModal.artist} — {moveModal.title}</strong><br />
            Riddim de destination :
          </p>
          <select className={styles.formSelect} value={moveTargetId}
            onChange={e => setMoveTargetId(e.target.value ? Number(e.target.value) : '')} aria-label="Riddim de destination">
            <option value="">— Choisir un riddim —</option>
            {riddims.filter(r => r.id !== moveModal.riddimId).sort((a, b) => a.name.localeCompare(b.name)).map(r => (
              <option key={r.id} value={r.id}>[{r.id}] {r.name}</option>
            ))}
          </select>
          <div className={styles.modalActions}>
            <button onClick={handleMoveVoicing} className={styles.confirmBtn} disabled={!moveTargetId || loading}>Déplacer</button>
            <button onClick={() => setMoveModal(null)} className={styles.cancelBtn}>Annuler</button>
          </div>
        </Modal>
      )}

      {/* ─── Modale : supprimer ──────────────────────────────────────────────── */}
      {deleteConfirm && (
        <Modal title="Supprimer le voicing" accent="red" onClose={() => setDeleteConfirm(null)}>
          <p className={styles.modalDesc}>
            Supprimer <strong>{deleteConfirm.artist} — {deleteConfirm.title}</strong> ?
            <br />Cette action est irréversible.
          </p>
          <div className={styles.modalActions}>
            <button onClick={handleDeleteVoicing} className={styles.deleteBtn} disabled={loading}>Supprimer</button>
            <button onClick={() => setDeleteConfirm(null)} className={styles.cancelBtn}>Annuler</button>
          </div>
        </Modal>
      )}

      {/* ─── Modale : modifier ───────────────────────────────────────────────── */}
      {editModal && (
        <Modal title="Modifier le voicing" accent="gold" onClose={() => setEditModal(null)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="edit-artist">Artiste</label>
            <input id="edit-artist" type="text" className={styles.formInput} value={editModal.artist}
              onChange={e => setEditModal({ ...editModal, artist: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="edit-title">Titre</label>
            <input id="edit-title" type="text" className={styles.formInput} value={editModal.title}
              onChange={e => setEditModal({ ...editModal, title: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="edit-views">Vues</label>
            <input id="edit-views" type="number" className={styles.formInput} value={editModal.views || ''}
              onChange={e => setEditModal({ ...editModal, views: Number(e.target.value) || 0 })} />
          </div>
          <div className={styles.modalActions}>
            <button onClick={handleEditVoicing} className={styles.confirmBtn} disabled={!editModal.artist || !editModal.title || loading}>Enregistrer</button>
            <button onClick={() => setEditModal(null)} className={styles.cancelBtn}>Annuler</button>
          </div>
        </Modal>
      )}

      {/* ─── Modale : créer un riddim ────────────────────────────────────────── */}
      {/* ─── Modale : modifier les métadonnées d'un riddim ───────────────────── */}
      {editRiddim && (
        <Modal title="Modifier le riddim" accent="gold" large onClose={() => setEditRiddim(null)}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-name">Nom *</label>
              <input id="er-name" type="text" className={styles.formInput} value={editRiddim.name}
                onChange={e => setEditRiddim({ ...editRiddim, name: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-prod">Producteur *</label>
              <input id="er-prod" type="text" className={styles.formInput} value={editRiddim.producer}
                onChange={e => setEditRiddim({ ...editRiddim, producer: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-year">Année</label>
              <input id="er-year" type="number" className={styles.formInput} value={editRiddim.year}
                onChange={e => setEditRiddim({ ...editRiddim, year: Number(e.target.value) || editRiddim.year })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-label">Label</label>
              <input id="er-label" type="text" className={styles.formInput} value={editRiddim.label}
                onChange={e => setEditRiddim({ ...editRiddim, label: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-genre">Genre</label>
              <select id="er-genre" className={styles.formSelect} value={editRiddim.genre}
                onChange={e => setEditRiddim({ ...editRiddim, genre: e.target.value })}>
                <option value="dancehall">Dancehall</option>
                <option value="reggae">Reggae</option>
                <option value="lovers rock">Lovers Rock</option>
                <option value="soca">Soca</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-type">Type</label>
              <select id="er-type" className={styles.formSelect} value={editRiddim.type}
                onChange={e => setEditRiddim({ ...editRiddim, type: e.target.value })}>
                <option value="digital">Digital</option>
                <option value="classique">Classique</option>
                <option value="ragga">Ragga</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="er-bpm">BPM</label>
              <input id="er-bpm" type="number" className={styles.formInput} value={editRiddim.bpm || ''}
                onChange={e => setEditRiddim({ ...editRiddim, bpm: Number(e.target.value) || 0 })} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="er-desc">Description</label>
            <textarea id="er-desc" className={styles.formTextarea} rows={3} value={editRiddim.description}
              onChange={e => setEditRiddim({ ...editRiddim, description: e.target.value })} />
          </div>
          <div className={styles.modalActions}>
            <button onClick={handleEditRiddim} className={styles.confirmBtn} disabled={!editRiddim.name || !editRiddim.producer || loading}>Enregistrer</button>
            <button onClick={() => setEditRiddim(null)} className={styles.cancelBtn}>Annuler</button>
          </div>
        </Modal>
      )}

      {showCreateRiddim && (
        <Modal title="Créer un nouveau riddim" accent="gold" large onClose={() => { setShowCreateRiddim(false); setNewRiddim(EMPTY_RIDDIM); setNewRiddimVoicings([]); }}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-name">Nom *</label>
              <input id="cr-name" type="text" className={styles.formInput} placeholder="Ex : Stalag Riddim"
                value={newRiddim.name} onChange={e => setNewRiddim({ ...newRiddim, name: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-prod">Producteur *</label>
              <input id="cr-prod" type="text" className={styles.formInput} placeholder="Ex : Steely & Clevie"
                value={newRiddim.producer} onChange={e => setNewRiddim({ ...newRiddim, producer: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-year">Année</label>
              <input id="cr-year" type="number" className={styles.formInput}
                value={newRiddim.year} onChange={e => setNewRiddim({ ...newRiddim, year: Number(e.target.value) || 2024 })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-label">Label</label>
              <input id="cr-label" type="text" className={styles.formInput} placeholder="Ex : VP Records"
                value={newRiddim.label} onChange={e => setNewRiddim({ ...newRiddim, label: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-genre">Genre</label>
              <select id="cr-genre" className={styles.formSelect} value={newRiddim.genre} onChange={e => setNewRiddim({ ...newRiddim, genre: e.target.value })}>
                <option value="dancehall">Dancehall</option>
                <option value="reggae">Reggae</option>
                <option value="lovers rock">Lovers Rock</option>
                <option value="soca">Soca</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-type">Type</label>
              <select id="cr-type" className={styles.formSelect} value={newRiddim.type} onChange={e => setNewRiddim({ ...newRiddim, type: e.target.value })}>
                <option value="digital">Digital</option>
                <option value="classique">Classique</option>
                <option value="ragga">Ragga</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="cr-bpm">BPM</label>
              <input id="cr-bpm" type="number" className={styles.formInput} placeholder="0"
                value={newRiddim.bpm || ''} onChange={e => setNewRiddim({ ...newRiddim, bpm: Number(e.target.value) || 0 })} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cr-desc">Description</label>
            <textarea id="cr-desc" className={styles.formTextarea} placeholder="Description du riddim…"
              value={newRiddim.description} onChange={e => setNewRiddim({ ...newRiddim, description: e.target.value })} rows={3} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Voicings initiaux</label>
            {newRiddimVoicings.map((v, i) => (
              <div key={i} className={styles.inlineForm}>
                <input type="text" placeholder="Artiste" value={v.artist} className={styles.formInput} aria-label="Artiste"
                  onChange={e => { const u = [...newRiddimVoicings]; u[i] = { ...u[i], artist: e.target.value }; setNewRiddimVoicings(u); }} />
                <input type="text" placeholder="Titre" value={v.title} className={styles.formInput} aria-label="Titre"
                  onChange={e => { const u = [...newRiddimVoicings]; u[i] = { ...u[i], title: e.target.value }; setNewRiddimVoicings(u); }} />
                <input type="number" placeholder="Vues" value={v.views || ''} className={styles.formInputSmall} aria-label="Vues"
                  onChange={e => { const u = [...newRiddimVoicings]; u[i] = { ...u[i], views: Number(e.target.value) || 0 }; setNewRiddimVoicings(u); }} />
                <button className={styles.actionDelete} aria-label="Retirer ce voicing"
                  onClick={() => setNewRiddimVoicings(newRiddimVoicings.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
            <button className={styles.addVoicingBtn} onClick={() => setNewRiddimVoicings([...newRiddimVoicings, { artist: '', title: '', views: 0 }])}>
              <span aria-hidden="true">+</span> Ajouter un voicing
            </button>
          </div>

          <div className={styles.modalActions}>
            <button onClick={handleCreateRiddim} className={styles.confirmBtn} disabled={!newRiddim.name || !newRiddim.producer || loading}>Créer le riddim</button>
            <button onClick={() => { setShowCreateRiddim(false); setNewRiddim(EMPTY_RIDDIM); setNewRiddimVoicings([]); }} className={styles.cancelBtn}>Annuler</button>
          </div>
        </Modal>
      )}

      {/* ─── Pile de toasts (aria-live) ──────────────────────────────────────── */}
      <div className={styles.toastStack} aria-live="polite" aria-atomic="false">
        {toasts.map(t => (
          <div key={t.id} className={`${styles.toast} ${t.kind === 'error' ? styles.toastError : styles.toastSuccess}`} role={t.kind === 'error' ? 'alert' : 'status'}>
            <span className={styles.toastMsg}>{t.message}</span>
            <button className={styles.toastClose} onClick={() => dismissToast(t.id)} aria-label="Fermer">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
