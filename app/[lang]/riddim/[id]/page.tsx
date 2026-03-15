import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, isValidLocale, LOCALES, type Locale } from '@/lib/i18n';
import { getRiddimById, allRiddims } from '@/lib/data';
import RiddimDetail from '@/components/RiddimDetail';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM DETAIL PAGE
   Page de détail d'un riddim individuel
   ══════════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of LOCALES) {
    for (const riddim of allRiddims) {
      params.push({ lang, id: String(riddim.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const riddim = getRiddimById(Number(id));

  if (!riddim) {
    return { title: dict.riddimNotFound };
  }

  return {
    title: `${riddim.name} — ${riddim.producer} | ${dict.siteTitle}`,
    description: `${riddim.name} (${riddim.year}) — ${riddim.producer}. ${riddim.voicings.length} voicings. ${dict.metaDescRiddim}`,
  };
}

export default async function RiddimPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const riddim = getRiddimById(Number(id));

  if (!riddim) {
    notFound();
  }

  return <RiddimDetail riddim={riddim} lang={locale} dict={dict} />;
}
