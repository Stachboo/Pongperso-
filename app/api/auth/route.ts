import { NextRequest, NextResponse } from 'next/server';
import { createToken, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === 'login') {
    const { ADMIN_USERNAME, ADMIN_PASSWORD, AUTH_SECRET } = process.env;
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !AUTH_SECRET) {
      return NextResponse.json({ error: 'Authentification indisponible' }, { status: 503 });
    }
    if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
      const token = await createToken(body.username);
      const response = NextResponse.json({ success: true });
      response.cookies.set('wmc-auth', token, {
        httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict',
        path: '/', maxAge: 60 * 60 * 24,
      });
      return response;
    }
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  if (action === 'logout') {
    const response = NextResponse.json({ success: true });
    response.cookies.set('wmc-auth', '', {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0,
    });
    return response;
  }

  if (action === 'check') {
    if (await verifyToken(req.cookies.get('wmc-auth')?.value)) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
}
