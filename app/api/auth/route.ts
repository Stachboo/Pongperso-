import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WMC-riddim-2024!';
const AUTH_SECRET = process.env.AUTH_SECRET || 'wmc-riddim-secret-key-change-in-production-abc123xyz';

async function hmacSign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function createToken(username: string): Promise<string> {
  const payload = `${username}:${Date.now()}`;
  const hmac = await hmacSign(payload);
  return btoa(`${payload}:${hmac}`);
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = atob(token);
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const hmac = parts.pop()!;
    const payload = parts.join(':');
    const expected = await hmacSign(payload);
    return hmac === expected;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === 'login') {
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = await createToken(username);
      const response = NextResponse.json({ success: true });
      response.cookies.set('wmc-auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24h
      });
      return response;
    }

    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  if (action === 'logout') {
    const response = NextResponse.json({ success: true });
    response.cookies.set('wmc-auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
    return response;
  }

  if (action === 'check') {
    const token = req.cookies.get('wmc-auth')?.value;
    if (token && await verifyToken(token)) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
}
