import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['fr', 'en', 'es', 'pt', 'ja'] as const;
const DEFAULT_LOCALE = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Skip si le path a déjà une locale */
  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );
  if (hasLocale) return;

  /* Détecte la langue préférée depuis Accept-Language */
  const accept = request.headers.get('accept-language') ?? '';
  const preferred =
    LOCALES.find((l) => accept.toLowerCase().includes(l)) ?? DEFAULT_LOCALE;

  /* Redirige vers /{locale}{path} */
  return NextResponse.redirect(
    new URL(`/${preferred}${pathname === '/' ? '' : pathname}`, request.url),
  );
}

export const config = {
  matcher: ['/((?!_next|assets|api|favicon\\.ico|manifest\\.json|og-image\\.png).*)'],
};
