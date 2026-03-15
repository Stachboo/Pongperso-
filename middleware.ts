import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en', 'es', 'pt', 'ja'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and internal Next.js routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return NextResponse.next();
    }
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') || '';
  let detected = defaultLocale;
  for (const locale of locales) {
    if (acceptLang.toLowerCase().includes(locale)) {
      detected = locale;
      break;
    }
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
