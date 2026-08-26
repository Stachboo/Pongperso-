import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, LOCALES, type Locale } from '@/lib/i18n';
import { getAllRiddims } from '@/lib/data';
import { generateHreflang, BASE_URL, jsonLdString } from '@/utils/seo';
import { buildArtistList, getArtistBySlug, generateArtistJsonLd } from '@/utils/artists';
import ArtistDetail from '@/components/ArtistDetail';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE ARTISTE (DÉTAIL)
   Page de détail d'un artiste avec métadonnées SEO et JSON-LD
   ══════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   generateStaticParams — Routes statiques pour tous les artistes × langues
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const allArtists = buildArtistList(await getAllRiddims());
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const artist of allArtists) {
      params.push({ lang, slug: artist.slug });
    }
  }
  return params;
}

/* ═══════════════════════════════════════════════════════════════════════════
   generateMetadata — SEO
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const { lang, slug } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const artist = getArtistBySlug(slug, await getAllRiddims());

  if (!artist) {
    return { title: 'Artiste introuvable' };
  }

  const hreflang = generateHreflang(`/artistes/${slug}`, locale);
  const canonicalUrl = `${BASE_URL}/${locale}/artistes/${slug}`;

  const title = `${artist.name} — Riddims & Voicings Jamaïcains`;
  const description =
    `${artist.name} a enregistré ${artist.totalVoicings} voicings sur ` +
    `${artist.riddimCount} riddims jamaïcains dont ${artist.topRiddim}. ` +
    `Découvrez tous ses titres classés par popularité.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflang,
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default async function ArtistePage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const artist = getArtistBySlug(slug, await getAllRiddims());

  if (!artist) {
    notFound();
  }

  const jsonLd = generateArtistJsonLd(artist, locale, BASE_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <ArtistDetail artist={artist} lang={locale} />
    </>
  );
}
