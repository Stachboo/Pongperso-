import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LOCALES, type Locale, getDictionary, isValidLocale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import ScrollToTop from '@/components/ScrollToTop';
import ShareButton from '@/components/ShareButton';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — LANGUAGE LAYOUT
   Layout partagé pour toutes les pages d'une langue
   Navbar fixe + PageWrapper (fadeIn + padding) + Footer + ScrollToTop
   ══════════════════════════════════════════════════════════════════════════════ */

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar lang={locale} dict={dict} />
        <PageWrapper>
          {children}
        </PageWrapper>
        <Footer lang={locale} dict={dict} />
        <ScrollToTop />
        <ShareButton dict={dict} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
