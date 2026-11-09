// Web Crypto works both in the middleware runtime and on the server.
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function hmacSign(payload: string): Promise<string> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('Authentication is not configured');
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createToken(username: string): Promise<string> {
  const payload = `${username}:${Date.now()}`;
  return btoa(`${payload}:${await hmacSign(payload)}`);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    const parts = atob(token).split(':');
    if (parts.length < 3) return false;
    const signature = parts.pop()!;
    const payload = parts.join(':');
    if (!timingSafeEqual(signature, await hmacSign(payload))) return false;
    const timestamp = Number(payload.split(':').pop());
    return Number.isFinite(timestamp) && timestamp <= Date.now() && Date.now() - timestamp <= TOKEN_MAX_AGE_MS;
  } catch {
    return false;
  }
}
