/* ══════════════════════════════════════════════════════════════════════════════
   WMC — GÉNÉRATION TEXTE CONTEXTUEL
   Produit un paragraphe descriptif SEO à partir des données d'un riddim
   ══════════════════════════════════════════════════════════════════════════════ */

import type { Riddim } from '@/types/riddim';

/** Calcule la décennie depuis une année (ex : 1985 → "1980") */
function getDecade(year: number): string {
  return `${Math.floor(year / 10) * 10}`;
}

/**
 * Génère un texte contextuel SEO pour un riddim donné.
 * Fonction pure, testable, sans effets de bord.
 */
export function generateContextText(riddim: Riddim): string {
  const { name, genre, producer, label, year, voicings } = riddim;
  const decade = getDecade(year);

  const sorted = [...voicings].sort((a, b) => b.views - a.views);
  const count = sorted.length;

  const topArtists = sorted.slice(0, 3).map((v) => v.artist);

  let artistMention = '';
  if (topArtists.length >= 3) {
    artistMention = `Il réunit ${count} artistes parmi lesquels ${topArtists[0]}, ${topArtists[1]} et ${topArtists[2]}.`;
  } else if (topArtists.length === 2) {
    artistMention = `Il réunit ${count} artistes parmi lesquels ${topArtists[0]} et ${topArtists[1]}.`;
  } else if (topArtists.length === 1) {
    artistMention = `Il compte ${count} voicing${count > 1 ? 's' : ''}, dont celui de ${topArtists[0]}.`;
  }

  return (
    `Le ${name} est un riddim ${genre} jamaïcain produit par ${producer} ` +
    `pour le label ${label} en ${year}. ${artistMention} ` +
    `Ce riddim appartient à la période ${decade}s du ${genre} jamaïcain.`
  );
}
