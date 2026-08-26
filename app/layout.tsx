import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/tokens.css';
import '@/styles/globals.css';
import '@/styles/typography.css';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — ROOT LAYOUT
   Charge les fonts, le design system, et les analytics Vercel
   ══════════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL('https://wmc-iota.vercel.app'),
  title: {
    default: 'WMC — World Music Contest | Riddims Jamaïcains',
    template: '%s | WMC World Music Contest',
  },
  description:
    'La référence mondiale des riddims jamaïcains. ' +
    '500+ riddims documentés avec leurs voicings et artistes.',
  keywords: [
    'riddim', 'jamaican riddim', 'dancehall', 'reggae',
    'voicing', 'riddim database', 'WMC', 'world music contest',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-180.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'WMC — World Music Contest',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'Zb4dENdWiAQBqJ9RrQ-rAAIwwoDGqhtanXkqMxBvDBk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#F5A623',
  width: 'device-width',
  initialScale: 1,
};

// <html> / <body> vivent dans app/[lang]/layout.tsx pour porter le bon
// attribut lang par langue. Ce layout racine ne fait que propager les enfants
// et les métadonnées globales.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
