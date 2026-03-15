/* ══════════════════════════════════════════════════════════════════════════════
   WMC — SITEMAP XML DYNAMIQUE
   Génère automatiquement le sitemap pour toutes les pages × toutes les langues
   Convention Next.js 14 App Router : app/sitemap.ts → /sitemap.xml
   ══════════════════════════════════════════════════════════════════════════════ */

import type { MetadataRoute } from 'next';
import { allRiddims } from '@/lib/data';
import { BASE_URL } from '@/utils/seo';

const LANGS = ['fr', 'en', 'es', 'pt', 'ja'] as const;

/**
 * Construit l'objet alternates.languages pour une route donnée.
 * Inclut x-default pointant vers la version anglaise.
 */
function buildAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    languages[lang] = `${BASE_URL}/${lang}${path}`;
  }
  languages['x-default'] = `${BASE_URL}/en${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  /* ═══ Pages statiques ═══ */
  for (const lang of LANGS) {
    // Accueil
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: buildAlternates('') },
    });

    // Explorer (catalogue des riddims)
    entries.push({
      url: `${BASE_URL}/${lang}/explorer`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: buildAlternates('/explorer') },
    });
  }

  /* ═══ Pages dynamiques — Riddims ═══ */
  for (const riddim of allRiddims) {
    const riddimPath = `/riddim/${riddim.id}`;

    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}/${lang}${riddimPath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: buildAlternates(riddimPath) },
      });
    }
  }

  return entries;
}
