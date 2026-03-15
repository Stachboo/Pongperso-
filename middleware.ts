import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const locales = ['fr', 'en', 'es', 'pt', 'ja'];

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith('/' + locale + '/') || pathname === '/' + locale
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Detect preferred locale from Accept-Language
  const acceptLanguage = request.headers.get('accept-language') || '';
  let locale = 'fr';
  for (const l of locales) {
    if (acceptLanguage.toLowerCase().includes(l)) {
      locale = l;
      break;
    }
  }

  // Redirect: e.g. /explorer -> /fr/explorer
  return NextResponse.redirect(
    new URL('/' + locale + (pathname === '/' ? '' : pathname), request.url)
  );
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|manifest.json|og-image.png|logo-|Logo\\.png|logo\\.svg).*)'],
};
