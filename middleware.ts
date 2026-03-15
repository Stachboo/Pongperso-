import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Skip any path with a file extension (static assets)
    if (pathname.includes('.')) {
      return NextResponse.next();
    }

    // Skip internal paths
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/_vercel')) {
      return NextResponse.next();
    }

    const locales = ['fr', 'en', 'es', 'pt', 'ja'];

    // Already has a locale prefix — pass through
    for (let i = 0; i < locales.length; i++) {
      if (pathname === '/' + locales[i] || pathname.startsWith('/' + locales[i] + '/')) {
        return NextResponse.next();
      }
    }

    // Detect locale from Accept-Language
    const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();
    let locale = 'fr';
    for (let i = 0; i < locales.length; i++) {
      if (acceptLang.includes(locales[i])) {
        locale = locales[i];
        break;
      }
    }

    // Redirect to locale-prefixed path
    const newPathname = '/' + locale + (pathname === '/' ? '' : pathname);
    return NextResponse.redirect(new URL(newPathname, request.url));
  } catch (e) {
    // If anything fails, just pass through — never crash
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/',
};
