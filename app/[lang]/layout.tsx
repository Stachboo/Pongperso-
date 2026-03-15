import React from 'react';
import type { Metadata } from 'next';
import { LOCALES, type Locale, getDictionary, isValidLocale } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButton from '@/components/ShareButton';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — LANGUAGE LAYOUT
   Layout partagé pour toutes les pages d'une langue
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  return {
    title: dict.siteTitle,
    description: dict.metaDescHome,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);

  return (
    <>
      <html lang={locale} suppressHydrationWarning />
      <Header lang={locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} />
      <ShareButton dict={dict} />
    </>
  );
}
