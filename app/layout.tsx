import type { Metadata } from 'next';
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
  title: {
    default: 'World Music Contest',
    template: '%s | WMC',
  },
  description: 'La référence mondiale des riddims jamaïcains.',
  metadataBase: new URL('https://wmc-riddim.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-180.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'World Music Contest',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
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
        <meta name="theme-color" content="#F2A900" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
