import React from 'react';
import type { Metadata } from 'next';
import { getDictionary, isValidLocale, type Locale } from '@/lib/i18n';
import { getRiddimsByPopularity } from '@/lib/data';
import ExplorerClient from '@/components/ExplorerClient';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — EXPLORER PAGE
   Catalogue filtrable de tous les riddims
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  return {
    title: `${dict.navExplorer} | ${dict.siteTitle}`,
    description: dict.metaDescExplorer,
  };
}

export default async function ExplorerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const riddims = getRiddimsByPopularity();

  return <ExplorerClient riddims={riddims} lang={locale} dict={dict} />;
}
