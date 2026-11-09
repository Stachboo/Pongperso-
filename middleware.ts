import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('wmc-auth')?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Skip static assets (extensions connues uniquement — ne pas court-circuiter
    // l'auth sur un chemin quelconque contenant un point)
    if (/\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|mjs|json|txt|xml|html?|woff2?|ttf|eot|map|webmanifest|pdf|mp4|webm)$/i.test(pathname)) {
      return NextResponse.next();
    }

    // Skip internal paths
    if (pathname.startsWith('/_next') || pathname.startsWith('/_vercel')) {
      return NextResponse.next();
    }

    // ─── Protect API /api/riddims (POST only) ─────────────────────────────
    if (pathname.startsWith('/api/riddims') && request.method === 'POST') {
      if (!(await isAuthenticated(request))) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
      }
      return NextResponse.next();
    }

    // Skip all other API routes
    if (pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    // ─── Protect /*/audit pages (but not login) ──────────────────────────
    const auditMatch = pathname.match(/^\/([a-z]{2})\/audit$/);
    if (auditMatch) {
      if (!(await isAuthenticated(request))) {
        const lang = auditMatch[1];
        return NextResponse.redirect(new URL(`/${lang}/audit/login`, request.url));
      }
      return NextResponse.next();
    }

    // ─── Locale redirect (existing logic) ─────────────────────────────────
    const locales = ['fr', 'en', 'es', 'pt', 'ja'];

    for (let i = 0; i < locales.length; i++) {
      if (pathname === '/' + locales[i] || pathname.startsWith('/' + locales[i] + '/')) {
        return NextResponse.next();
      }
    }

    const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();
    let locale = 'fr';
    for (let i = 0; i < locales.length; i++) {
      if (acceptLang.includes(locales[i])) {
        locale = locales[i];
        break;
      }
    }

    const newPathname = '/' + locale + (pathname === '/' ? '' : pathname);
    return NextResponse.redirect(new URL(newPathname, request.url));
  } catch (e) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
