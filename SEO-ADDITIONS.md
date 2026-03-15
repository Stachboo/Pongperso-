# WMC — Blocs SEO à ajouter dans les fichiers existants

> Ce fichier documente les modifications à apporter aux fichiers existants.
> Aucun fichier existant n'a été réécrit — seuls les blocs manquants sont listés.

---

## 1. app/layout.tsx — Métadonnées à enrichir

Remplacer le bloc `export const metadata: Metadata` par celui-ci :

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://wmc-iota.vercel.app'),
  title: {
    default: 'WMC — World Music Contest | Base de données des riddims jamaïcains',
    template: '%s | WMC World Music Contest',
  },
  description:
    'La référence mondiale des riddims jamaïcains. ' +
    '500+ riddims documentés avec leurs voicings, artistes et histoire. ' +
    'Dancehall, Reggae, Lovers Rock. Classés par popularité de streaming.',
  keywords: [
    'riddim', 'jamaican riddim', 'dancehall', 'reggae',
    'voicing', 'jamaique', 'jamaican music database',
    'riddim list', 'dancehall riddim', 'vybz kartel riddim',
  ],
  authors: [{ name: 'WMC World Music Contest' }],
  creator: 'WMC World Music Contest',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-180.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'es_ES', 'pt_BR', 'ja_JP'],
    url: 'https://wmc-iota.vercel.app',
    siteName: 'WMC World Music Contest',
    title: 'WMC — La référence mondiale des riddims jamaïcains',
    description:
      'La référence mondiale des riddims jamaïcains. ' +
      '500+ riddims documentés avec leurs voicings, artistes et histoire.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WMC — World Music Contest',
    description:
      'La référence mondiale des riddims jamaïcains. ' +
      '500+ riddims documentés avec leurs voicings, artistes et histoire.',
    creator: '@WMCRiddims',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'À_REMPLACER_PAR_TON_CODE_GOOGLE_SEARCH_CONSOLE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};
```

---

## 2. next.config.mjs — Blocs à ajouter

Le fichier actuel est vide (`const nextConfig = {}`). Ajouter :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Désactiver le header X-Powered-By: Next.js */
  poweredByHeader: false,

  /* Compression gzip */
  compress: true,

  /* Headers de sécurité + SEO */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
```
