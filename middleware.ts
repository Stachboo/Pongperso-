import { NextRequest, NextResponse } from 'next/server';

const locales = ['fr', 'en', 'es', 'pt', 'ja'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  var pathname = request.nextUrl.pathname;

  // Skip files with extensions (static assets)
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // Skip if path already has a locale
  for (var i = 0; i < locales.length; i++) {
    if (pathname === '/' + locales[i] || pathname.startsWith('/' + locales[i] + '/')) {
      return NextResponse.next();
    }
  }

  // Detect preferred language from Accept-Language header
  var accept = request.headers.get('accept-language') || '';
  var acceptLower = accept.toLowerCase();
  var preferred = defaultLocale;
  for (var j = 0; j < locales.length; j++) {
    if (acceptLower.includes(locales[j])) {
      preferred = locales[j];
      break;
    }
  }

  // Redirect to /{locale}{path}
  var url = request.nextUrl.clone();
  url.pathname = '/' + preferred + (pathname === '/' ? '' : pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/',
};
