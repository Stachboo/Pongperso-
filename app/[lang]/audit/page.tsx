import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { getAllRiddims } from '@/lib/data';
import AuditDashboard from '@/components/AuditDashboard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  const cookieStore = await cookies();
  if (!(await verifyToken(cookieStore.get('wmc-auth')?.value))) {
    redirect(`/${locale}/audit/login`);
  }

  const riddims = await getAllRiddims();
  return <AuditDashboard riddims={riddims} lang={locale} />;
}
