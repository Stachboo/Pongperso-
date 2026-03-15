import React from 'react';
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
    <>
      <Navbar lang={locale} dict={dict} />
      <PageWrapper>
        {children}
      </PageWrapper>
      <Footer lang={locale} dict={dict} />
      <ScrollToTop />
      <ShareButton dict={dict} />
    </>
  );
}
