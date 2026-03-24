import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { allRiddims } from '@/lib/data';
import AuditDashboard from '@/components/AuditDashboard';

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: 'Audit Voicings — World Music Contest',
    description: 'Audit et vérification des voicings de la base de données riddim',
    robots: { index: false, follow: false },
  };
}

export default async function AuditPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return <AuditDashboard riddims={allRiddims} lang={locale} />;
}
