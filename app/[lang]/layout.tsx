import React from 'react';
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
      <Header lang={locale} dict={dict} />
      <main>{children}</main>
      <Footer lang={locale} dict={dict} />
      <ShareButton dict={dict} />
    </>
  );
}
