#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════════
   WMC — AUDIT SCRIPT
   Vérifie chaque voicing de chaque riddim via YouTube search
   Génère un rapport JSON avec les résultats

   Usage: node scripts/audit-voicings.js [--riddim-id=X] [--output=report.json]
   ══════════════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────

const DATA_PATH = path.join(__dirname, '..', 'data', 'riddims.json');
const REPORT_PATH = path.join(__dirname, '..', 'data', 'audit-report.json');

// ─── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let filterRiddimId = null;
let outputPath = REPORT_PATH;

for (const arg of args) {
  if (arg.startsWith('--riddim-id=')) filterRiddimId = parseInt(arg.split('=')[1]);
  if (arg.startsWith('--output=')) outputPath = arg.split('=')[1];
}

// ─── Load data ───────────────────────────────────────────────────────────────

const riddims = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const toAudit = filterRiddimId
  ? riddims.filter(r => r.id === filterRiddimId)
  : riddims;

console.log(`\n🔍 AUDIT WMC — ${toAudit.length} riddims, ${toAudit.reduce((s, r) => s + r.voicings.length, 0)} voicings\n`);

// ─── Audit logic ─────────────────────────────────────────────────────────────

function auditRiddim(riddim) {
  const issues = [];
  const voicingAudits = [];

  // Check riddim-level data
  if (!riddim.name || riddim.name.trim() === '') {
    issues.push({ type: 'error', field: 'name', message: 'Nom du riddim manquant' });
  }
  if (!riddim.producer || riddim.producer.trim() === '') {
    issues.push({ type: 'warning', field: 'producer', message: 'Producteur manquant' });
  }
  if (!riddim.label || riddim.label.trim() === '') {
    issues.push({ type: 'warning', field: 'label', message: 'Label manquant' });
  }
  if (riddim.year < 1960 || riddim.year > 2026) {
    issues.push({ type: 'error', field: 'year', message: `Année suspecte: ${riddim.year}` });
  }
  if (riddim.bpm !== 0 && (riddim.bpm < 50 || riddim.bpm > 200)) {
    issues.push({ type: 'warning', field: 'bpm', message: `BPM suspect: ${riddim.bpm}` });
  }
  if (!riddim.description || riddim.description.length < 20) {
    issues.push({ type: 'warning', field: 'description', message: 'Description trop courte ou manquante' });
  }
  if (!['reggae', 'dancehall', 'lovers rock', 'soca'].includes(riddim.genre)) {
    issues.push({ type: 'warning', field: 'genre', message: `Genre non standard: ${riddim.genre}` });
  }
  if (!['classique', 'ragga', 'digital'].includes(riddim.type)) {
    issues.push({ type: 'warning', field: 'type', message: `Type non standard: ${riddim.type}` });
  }
  if (riddim.voicings.length === 0) {
    issues.push({ type: 'error', field: 'voicings', message: 'Aucun voicing' });
  }

  // Check each voicing
  const seenVoicings = new Set();
  for (let i = 0; i < riddim.voicings.length; i++) {
    const v = riddim.voicings[i];
    const voicingIssues = [];
    const key = `${v.artist.toLowerCase()}-${v.title.toLowerCase()}`;

    // Check for duplicates
    if (seenVoicings.has(key)) {
      voicingIssues.push({ type: 'error', message: 'Doublon dans le même riddim' });
    }
    seenVoicings.add(key);

    // Check artist
    if (!v.artist || v.artist.trim() === '') {
      voicingIssues.push({ type: 'error', message: 'Artiste manquant' });
    }

    // Check title
    if (!v.title || v.title.trim() === '') {
      voicingIssues.push({ type: 'error', message: 'Titre manquant' });
    }

    // Check views plausibility
    if (v.views <= 0) {
      voicingIssues.push({ type: 'error', message: 'Vues <= 0' });
    }
    if (v.views > 500_000_000) {
      voicingIssues.push({ type: 'warning', message: `Vues suspectes (${formatViews(v.views)}) — vérifier` });
    }

    // Check if views are round numbers (likely estimated)
    if (v.views >= 100000 && v.views % 100000 === 0) {
      voicingIssues.push({ type: 'info', message: 'Vues arrondies (probablement estimées)' });
    }

    // Generate verification URLs
    const ytQuery = encodeURIComponent(`${v.artist} - ${v.title}`);
    const spotifyQuery = encodeURIComponent(`${v.artist} ${v.title}`);

    voicingAudits.push({
      index: i,
      artist: v.artist,
      title: v.title,
      views: v.views,
      viewsFormatted: formatViews(v.views),
      youtubeSearchUrl: `https://www.youtube.com/results?search_query=${ytQuery}`,
      spotifySearchUrl: `https://open.spotify.com/search/${spotifyQuery}`,
      issues: voicingIssues,
      status: voicingIssues.some(i => i.type === 'error') ? 'error'
            : voicingIssues.some(i => i.type === 'warning') ? 'warning'
            : voicingIssues.some(i => i.type === 'info') ? 'info'
            : 'ok',
    });
  }

  // Check view ordering (should be descending in voicings)
  for (let i = 1; i < riddim.voicings.length; i++) {
    if (riddim.voicings[i].views > riddim.voicings[i - 1].views) {
      issues.push({
        type: 'info',
        field: 'voicings',
        message: `Voicings pas triés par vues décroissantes (index ${i})`
      });
      break;
    }
  }

  // Check for voicings that appear in multiple riddims (cross-riddim check later)
  const errorCount = voicingAudits.filter(v => v.status === 'error').length;
  const warningCount = voicingAudits.filter(v => v.status === 'warning').length;
  const estimatedCount = voicingAudits.filter(v => v.issues.some(i => i.message.includes('estimées'))).length;

  return {
    riddimId: riddim.id,
    riddimName: riddim.name,
    producer: riddim.producer,
    year: riddim.year,
    genre: riddim.genre,
    type: riddim.type,
    voicingCount: riddim.voicings.length,
    riddimIssues: issues,
    voicingAudits,
    summary: {
      errors: errorCount + issues.filter(i => i.type === 'error').length,
      warnings: warningCount + issues.filter(i => i.type === 'warning').length,
      estimated: estimatedCount,
      ok: voicingAudits.filter(v => v.status === 'ok').length,
    },
    overallStatus: (errorCount + issues.filter(i => i.type === 'error').length) > 0 ? 'error'
                 : (warningCount + issues.filter(i => i.type === 'warning').length) > 0 ? 'warning'
                 : 'ok',
  };
}

function formatViews(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

// ─── Cross-riddim duplicate check ────────────────────────────────────────────

function crossRiddimCheck(allAudits, allRiddims) {
  const voicingMap = new Map(); // key -> [{riddimId, riddimName}]

  for (const riddim of allRiddims) {
    for (const v of riddim.voicings) {
      const key = `${v.artist.toLowerCase()}|||${v.title.toLowerCase()}`;
      if (!voicingMap.has(key)) voicingMap.set(key, []);
      voicingMap.get(key).push({ riddimId: riddim.id, riddimName: riddim.name });
    }
  }

  const crossDuplicates = [];
  for (const [key, locations] of voicingMap) {
    if (locations.length > 1) {
      const [artist, title] = key.split('|||');
      crossDuplicates.push({
        artist,
        title,
        foundIn: locations,
      });
    }
  }

  return crossDuplicates;
}

// ─── Run audit ───────────────────────────────────────────────────────────────

const audits = toAudit.map(auditRiddim);
const crossDupes = crossRiddimCheck(audits, riddims);

// ─── Summary ─────────────────────────────────────────────────────────────────

const totalErrors = audits.reduce((s, a) => s + a.summary.errors, 0);
const totalWarnings = audits.reduce((s, a) => s + a.summary.warnings, 0);
const totalEstimated = audits.reduce((s, a) => s + a.summary.estimated, 0);
const totalOk = audits.reduce((s, a) => s + a.summary.ok, 0);
const totalVoicings = audits.reduce((s, a) => s + a.voicingCount, 0);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    riddims: audits.length,
    voicings: totalVoicings,
    errors: totalErrors,
    warnings: totalWarnings,
    estimatedViews: totalEstimated,
    verified: totalOk,
    crossRiddimDuplicates: crossDupes.length,
  },
  crossRiddimDuplicates: crossDupes,
  riddimAudits: audits,
};

// ─── Output ──────────────────────────────────────────────────────────────────

fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

console.log('═══════════════════════════════════════════');
console.log('  RAPPORT D\'AUDIT WMC');
console.log('═══════════════════════════════════════════');
console.log(`  Riddims audités:    ${audits.length}`);
console.log(`  Voicings total:     ${totalVoicings}`);
console.log(`  ✅ OK:              ${totalOk}`);
console.log(`  ⚠️  Warnings:       ${totalWarnings}`);
console.log(`  ❌ Erreurs:         ${totalErrors}`);
console.log(`  📊 Vues estimées:   ${totalEstimated}`);
console.log(`  🔄 Doublons cross:  ${crossDupes.length}`);
console.log('═══════════════════════════════════════════');

if (totalErrors > 0) {
  console.log('\n❌ ERREURS:');
  for (const a of audits) {
    if (a.summary.errors > 0) {
      console.log(`\n  [${a.riddimId}] ${a.riddimName}:`);
      for (const i of a.riddimIssues.filter(i => i.type === 'error')) {
        console.log(`    - ${i.field}: ${i.message}`);
      }
      for (const v of a.voicingAudits.filter(v => v.status === 'error')) {
        console.log(`    - Voicing "${v.artist} - ${v.title}": ${v.issues.map(i => i.message).join(', ')}`);
      }
    }
  }
}

if (crossDupes.length > 0) {
  console.log('\n🔄 DOUBLONS CROSS-RIDDIM:');
  for (const d of crossDupes) {
    console.log(`  "${d.artist} - ${d.title}" → ${d.foundIn.map(l => `[${l.riddimId}] ${l.riddimName}`).join(', ')}`);
  }
}

console.log(`\n📄 Rapport complet: ${outputPath}\n`);
