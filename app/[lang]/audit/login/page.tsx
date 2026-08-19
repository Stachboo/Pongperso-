import type { Metadata } from 'next';
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n';
import LoginForm from '@/components/LoginForm';

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Login — World Music Contest',
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale: Locale = isValidLocale(lang) ? lang : 'fr';

  return <LoginForm lang={locale} />;
}
