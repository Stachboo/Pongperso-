/* ══════════════════════════════════════════════════════════════════════════════
   WMC — SITEMAP XML DYNAMIQUE
   Génère automatiquement le sitemap pour toutes les pages × toutes les langues
   Convention Next.js 14 App Router : app/sitemap.ts → /sitemap.xml
   ══════════════════════════════════════════════════════════════════════════════ */

import type { MetadataRoute } from 'next';
import { getAllRiddims } from '@/lib/data';
import { BASE_URL } from '@/utils/seo';
import { buildArtistList } from '@/utils/artists';
import { producers } from '@/data/producers';

const LANGS = ['fr', 'en', 'es', 'pt', 'ja'] as const;

/** Pages éditoriales statiques (hors accueil/explorer). */
const STATIC_PATHS = [
  '/riddims',
  '/artistes',
  '/producteurs',
  '/about',
  '/methodologie',
  '/contact',
  '/presse',
  '/ajouter-riddim',
  '/conditions',
  '/confidentialite',
  '/mentions-legales',
] as const;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  const allRiddims = await getAllRiddims();

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

    // Autres pages éditoriales
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${lang}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: buildAlternates(path) },
      });
    }
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

  /* ═══ Pages dynamiques — Artistes ═══ */
  for (const artist of buildArtistList(allRiddims)) {
    const artistPath = `/artistes/${artist.slug}`;
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}/${lang}${artistPath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: buildAlternates(artistPath) },
      });
    }
  }

  /* ═══ Pages dynamiques — Producteurs ═══ */
  for (const producer of producers) {
    const producerPath = `/producteurs/${producer.id}`;
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}/${lang}${producerPath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: buildAlternates(producerPath) },
      });
    }
  }

  return entries;
}
