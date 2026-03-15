import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['fr', 'en', 'es', 'pt', 'ja'] as const;
const DEFAULT_LOCALE = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Skip si le path a déjà une locale */
  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );
  if (hasLocale) return NextResponse.next();

  /* Skip les fichiers statiques (avec extension) */
  if (pathname.includes('.')) return NextResponse.next();

  /* Détecte la langue préférée depuis Accept-Language */
  const accept = request.headers.get('accept-language') ?? '';
  const preferred =
    LOCALES.find((l) => accept.toLowerCase().includes(l)) ?? DEFAULT_LOCALE;

  /* Redirige vers /{locale}{path} */
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon\\.ico|manifest\\.json|og-image\\.png|logo|.*\\.png$|.*\\.svg$|.*\\.ico$).*)'],
};
