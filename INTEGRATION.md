# WMC — Guide d'intégration finale

> Ce document liste les modifications à apporter aux fichiers **existants** pour
> intégrer les nouveaux composants créés lors des prompts 5 à 9.

---

## 1. Layout langue — `app/[lang]/layout.tsx`

Remplacer le contenu actuel par :

```tsx
import React from 'react';
import { LOCALES, type Locale, getDictionary, isValidLocale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import ScrollToTop from '@/components/ScrollToTop';
import ShareButton from '@/components/ShareButton';

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar lang={locale} />
      <PageWrapper>
        {children}
      </PageWrapper>
      <Footer lang={locale} dict={dict} />
      <ScrollToTop />
      <ShareButton dict={dict} />
    </>
  );
}
```

### Changements clés

| Avant | Après |
|-------|-------|
| `Header` | `Navbar` (fixe, scroll detection, burger) |
| `<main>{children}</main>` | `<PageWrapper>{children}</PageWrapper>` (fadeIn + padding-top) |
| — | `<ScrollToTop />` ajouté |

---

## 2. Page riddim — `app/[lang]/riddim/[id]/page.tsx`

Remplacer l'injection JSON-LD manuelle par le composant :

```tsx
import { RiddimJsonLd } from '@/components/RiddimJsonLd';

// Dans le return du composant page :
return (
  <>
    <RiddimJsonLd riddim={riddim} lang={locale} />
    <RiddimDetail riddim={riddim} lang={locale} dict={dict} />
  </>
);
```

---

## 3. Page artiste détail — `app/[lang]/artistes/[slug]/page.tsx`

Remplacer l'injection JSON-LD manuelle par le composant :

```tsx
import { ArtistJsonLd } from '@/components/RiddimJsonLd';

// Dans le return du composant page :
return (
  <>
    <ArtistJsonLd artist={artist} lang={locale} />
    <ArtistDetail artist={artist} lang={locale} />
  </>
);
```

---

## 4. Configuration Next.js — `next.config.mjs`

Ajouter les headers de sécurité et performance :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 5. Layout racine — `app/layout.tsx`

Ajouter les balises SEO enrichies dans le `metadata` export :

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://wmc-iota.vercel.app'),
  title: {
    default: 'WMC — World Music Contest | Base de Riddims Jamaïcains',
    template: '%s | WMC',
  },
  description:
    'Explorez la plus grande base de données de riddims jamaïcains : dancehall, reggae, roots. Artistes, voicings, producteurs et statistiques.',
  keywords: [
    'riddim', 'jamaican riddim', 'dancehall', 'reggae',
    'voicing', 'riddim database', 'WMC',
  ],
  openGraph: {
    type: 'website',
    siteName: 'WMC — World Music Contest',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
};
```

---

## 6. Utilisation de `utils/performance.ts`

Les fonctions utilitaires peuvent remplacer les implémentations locales :

```tsx
// Avant (dans ArtistCard.tsx) :
function hashName(name: string): number { ... }
function getInitials(name: string): string { ... }

// Après :
import { hashStringToIndex, getInitials } from '@/utils/performance';
const gradient = GRADIENTS[hashStringToIndex(artist.name, GRADIENTS.length)];
const initials = getInitials(artist.name);
```

```tsx
// Combine des classes CSS conditionnelles :
import { cn } from '@/utils/performance';
<div className={cn(styles.card, isActive && styles.active)} />
```

---

## Ordre d'intégration recommandé

1. `next.config.mjs` — headers de sécurité
2. `app/layout.tsx` — metadata enrichie
3. `app/[lang]/layout.tsx` — Navbar + PageWrapper + ScrollToTop
4. Pages riddim/artiste — composants JsonLd
5. Refactoring optionnel avec `utils/performance.ts`
