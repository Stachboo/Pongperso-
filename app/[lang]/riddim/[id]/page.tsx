import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, isValidLocale, LOCALES, type Locale, type Dictionary } from '@/lib/i18n';
import type { Riddim } from '@/types/riddim';
import { getRiddimById, getAllRiddims } from '@/lib/data';
import { generateHreflang, jsonLdString, BASE_URL, DATASET_UPDATED } from '@/utils/seo';
import RiddimDetail from '@/components/RiddimDetail';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — RIDDIM DETAIL PAGE
   Page de détail d'un riddim avec métadonnées SEO et JSON-LD Schema.org
   ══════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   generateStaticParams — Routes statiques pour tous les riddims × langues
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of LOCALES) {
    for (const riddim of await getAllRiddims()) {
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
  const riddim = await getRiddimById(Number(id));

  if (!riddim) {
    return { title: dict.riddimNotFound };
  }

  const canonicalUrl = `${BASE_URL}/${locale}/riddim/${riddim.id}`;
  const title = dict.metaRiddimTitle.replace('{name}', riddim.name);
  const description = dict.metaRiddimDesc
    .replace('{name}', riddim.name)
    .replace('{year}', String(riddim.year))
    .replace('{producer}', riddim.producer)
    .replace('{label}', riddim.label)
    .replace('{count}', String(riddim.voicings.length))
    .replace('{genre}', riddim.genre);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflang(`/riddim/${riddim.id}`, locale),
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

function generateJsonLd(riddim: Riddim, locale: Locale, dict: Dictionary) {
  const canonicalUrl = `${BASE_URL}/${locale}/riddim/${riddim.id}`;
  const sortedVoicings = [...riddim.voicings].sort((a, b) => b.views - a.views);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicComposition',
        '@id': `${canonicalUrl}#composition`,
        name: riddim.name,
        dateCreated: String(riddim.year),
        dateModified: DATASET_UPDATED,
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
        isPartOf: { '@id': `${BASE_URL}/#website` },
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#voicings`,
        name: dict.voicingsOf.replace('{name}', riddim.name),
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
            name: dict.navHome,
            item: `${BASE_URL}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: dict.statsRiddimsShort,
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
  const dict = getDictionary(locale);
  const riddim = await getRiddimById(Number(id));

  if (!riddim) {
    notFound();
  }

  const jsonLd = generateJsonLd(riddim, locale, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <RiddimDetail riddim={riddim} lang={locale} dict={dict} />
    </>
  );
}
