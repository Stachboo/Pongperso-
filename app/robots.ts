/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ROBOTS.TXT DYNAMIQUE
   Convention Next.js 14 App Router : app/robots.ts → /robots.txt
   Autorise les bots IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
   pour maximiser la visibilité AEO (Answer Engine Optimization)
   ══════════════════════════════════════════════════════════════════════════════ */

import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* Règle par défaut — tous les bots */
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },

      /* Googlebot — accès complet */
      {
        userAgent: 'Googlebot',
        allow: '/',
      },

      /* GPTBot (OpenAI / ChatGPT) — accès complet pour citation dans ChatGPT */
      {
        userAgent: 'GPTBot',
        allow: '/',
      },

      /* Google-Extended (Gemini) — accès complet pour citation dans Gemini */
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },

      /* PerplexityBot — accès complet pour citation dans Perplexity */
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },

      /* ClaudeBot (Anthropic) — accès complet */
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },

      /* Bingbot — accès complet */
      {
        userAgent: 'Bingbot',
        allow: '/',
      },

      /* Twitterbot — accès complet pour les previews de liens */
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },

      /* facebookexternalhit — accès complet pour les previews de liens */
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
