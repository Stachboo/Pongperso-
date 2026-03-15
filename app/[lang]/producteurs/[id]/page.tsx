import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, LOCALES, type Locale } from '@/lib/i18n';
import { generateHreflang, BASE_URL } from '@/utils/seo';
import { producers } from '@/data/producers';
import ProducerDetail from '@/components/ProducerDetail';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — PAGE PRODUCTEUR (DÉTAIL)
   Page de détail d'un producteur avec métadonnées SEO et JSON-LD
   ══════════════════════════════════════════════════════════════════════════════ */

/** Producteurs individuels → Person, labels multi-personnes → Organization */
const INDIVIDUAL_PRODUCERS = new Set(['notnice', 'di-genius', 'rvssian', 'arif-cooper']);

/* ═══════════════════════════════════════════════════════════════════════════
   generateStaticParams — 7 producteurs × 5 langues = 35 routes
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  for (const lang of LOCALES) {
    for (const producer of producers) {
      params.push({ lang, id: producer.id });
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
  params: { lang: string; id: string };
}): Promise<Metadata> {
  const { lang, id } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const producer = producers.find((p) => p.id === id);

  if (!producer) {
    return { title: 'Producteur introuvable' };
  }

  const hreflang = generateHreflang(`/producteurs/${id}`, locale);
  const canonicalUrl = `${BASE_URL}/${locale}/producteurs/${id}`;

  const title = `${producer.name} (${producer.label}) — Producteur Jamaïcain | WMC`;
  const description = producer.description.slice(0, 150).trimEnd() + '…';

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
   JSON-LD Schema.org
   ═══════════════════════════════════════════════════════════════════════════ */

function generateProducerJsonLd(
  producer: (typeof producers)[number],
  locale: string
): object {
  const canonicalUrl = `${BASE_URL}/${locale}/producteurs/${producer.id}`;
  const entityType = INDIVIDUAL_PRODUCERS.has(producer.id) ? 'Person' : 'Organization';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': entityType,
        name: producer.name,
        description: producer.description,
        foundingDate: producer.founded,
        url: canonicalUrl,
        ...(entityType === 'Organization' && {
          alternateName: producer.label,
        }),
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
            name: 'Producteurs',
            item: `${BASE_URL}/${locale}/producteurs`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: producer.name,
          },
        ],
      },
    ],
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default async function ProducteurPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const { lang, id } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';
  const producer = producers.find((p) => p.id === id);

  if (!producer) {
    notFound();
  }

  const jsonLd = generateProducerJsonLd(producer, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProducerDetail producer={producer} lang={locale} />
    </>
  );
}
