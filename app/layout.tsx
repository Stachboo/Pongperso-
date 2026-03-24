import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
