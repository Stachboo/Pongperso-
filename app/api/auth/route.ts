import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WMC-riddim-2024!';
const AUTH_SECRET = process.env.AUTH_SECRET || 'wmc-riddim-secret-key-change-in-production-abc123xyz';

function createToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64');
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const hmac = parts.pop()!;
    const payload = parts.join(':');
    const expected = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
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
      const token = createToken(username);
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
    if (token && verifyToken(token)) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
}
