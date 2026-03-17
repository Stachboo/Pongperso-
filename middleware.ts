import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET || 'wmc-riddim-secret-key-change-in-production-abc123xyz';

async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = atob(token);
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const hmac = parts.pop()!;
    const payload = parts.join(':');

    // Use Web Crypto API (Edge-compatible)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(AUTH_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expected = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return hmac === expected;
  } catch {
    return false;
  }
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('wmc-auth')?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Skip static assets
    if (pathname.includes('.')) {
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
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
