import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isValidLocale, LOCALES, type Locale } from '@/lib/i18n';
import { getRiddimById, allRiddims, getTotalViews, formatViews } from '@/lib/data';
import RiddimDetail from '@/components/RiddimDetail';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM DETAIL PAGE
   Page de détail d'un riddim avec métadonnées SEO et JSON-LD Schema.org
   ══════════════════════════════════════════════════════════════════════════════ */

const BASE_URL = 'https://wmc-iota.vercel.app';

/* ═══════════════════════════════════════════════════════════════════════════
   generateStaticParams — Routes statiques pour tous les riddims × langues
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of LOCALES) {
    for (const riddim of allRiddims) {
      params.push({ lang, id: String(riddim.id) });
    }
  }
  return params;
}

/* ═══════════════════════════════════════════════════════════════════════════
   generateMetadata — SEO title, description, OpenGraph, Twitter
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: { lang: string; id: string };
}): Promise<Metadata> {
  const { lang, id } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const dict = getDictionary(locale);
  const riddim = getRiddimById(Number(id));

  if (!riddim) {
    return { title: dict.riddimNotFound };
  }

  const canonicalUrl = `${BASE_URL}/${locale}/riddim/${riddim.id}`;
  const title = `${riddim.name} — Voicings, Artistes & Histoire | WMC`;
  const description =
    `Découvrez tous les voicings du ${riddim.name} (${riddim.year}), ` +
    `produit par ${riddim.producer} (${riddim.label}). ` +
    `${riddim.voicings.length} artistes ont enregistré sur ce riddim ${riddim.genre} jamaïcain. ` +
    `Classés par popularité.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'music.album',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   JSON-LD Schema.org — MusicComposition + ItemList + BreadcrumbList
   ═══════════════════════════════════════════════════════════════════════════ */

function generateJsonLd(riddim: typeof allRiddims[number], locale: Locale) {
  const canonicalUrl = `${BASE_URL}/${locale}/riddim/${riddim.id}`;
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicComposition',
        name: riddim.name,
        dateCreated: String(riddim.year),
        producer: {
          '@type': 'Person',
          name: riddim.producer,
        },
        recordLabel: {
          '@type': 'Organization',
          name: riddim.label,
        },
        genre: riddim.genre,
        inLanguage: 'en',
        url: canonicalUrl,
      },
      {
        '@type': 'ItemList',
        name: `Voicings du ${riddim.name}`,
        numberOfItems: riddim.voicings.length,
        itemListElement: sortedVoicings.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'MusicRecording',
            name: v.title,
            byArtist: {
              '@type': 'MusicGroup',
              name: v.artist,
            },
            inAlbum: {
              '@type': 'MusicAlbum',
              name: riddim.name,
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${BASE_URL}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Riddims',
            item: `${BASE_URL}/${locale}/explorer`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: riddim.name,
          },
        ],
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default async function RiddimPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const { lang, id } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const riddim = getRiddimById(Number(id));

  if (!riddim) {
    notFound();
  }

  const jsonLd = generateJsonLd(riddim, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RiddimDetail riddim={riddim} lang={locale} />
    </>
  );
}
