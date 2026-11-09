const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { webcrypto } = require('node:crypto');

const root = path.resolve(__dirname, '..');

function load(relative, mocks = {}) {
  const filename = path.join(root, relative);
  const source = fs.readFileSync(filename, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const module = { exports: {} };
  const context = { module, exports: module.exports, process, crypto: webcrypto, TextEncoder, btoa, atob, Date, Number, Array, Uint8Array, console,
    require(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === '@/lib/auth') return load('lib/auth.ts');
      return require(name);
    } };
  vm.runInNewContext(js, context, { filename });
  return module.exports;
}

const NextResponse = {
  json(body, options = {}) { return { body, status: options.status ?? 200, headers: options.headers, cookies: { set(name, value) { this[name] = value; } } }; },
  next() { return { status: 200 }; },
  redirect(url) { return { status: 307, location: String(url) }; },
};

const saved = { ...process.env };
test.after(() => { process.env = saved; });

test('a missing username does not fall back to an administrator name', async () => {
  delete process.env.ADMIN_USERNAME;
  process.env.ADMIN_PASSWORD = 'test-password';
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  const { POST } = load('app/api/auth/route.ts', { 'next/server': { NextResponse } });
  const response = await POST({ json: async () => ({ action: 'login', username: 'admin', password: 'test-password' }) });
  assert.notEqual(response.status, 200);
});

test('login fails closed when the signing secret is missing', async () => {
  process.env.ADMIN_USERNAME = 'test-admin';
  process.env.ADMIN_PASSWORD = 'test-password';
  delete process.env.AUTH_SECRET;
  const { POST } = load('app/api/auth/route.ts', { 'next/server': { NextResponse } });
  const response = await POST({ json: async () => ({ action: 'login', username: 'test-admin', password: 'test-password' }) });
  assert.notEqual(response.status, 200);
});

test('login fails closed when the password is missing', async () => {
  process.env.ADMIN_USERNAME = 'test-admin';
  delete process.env.ADMIN_PASSWORD;
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  const { POST } = load('app/api/auth/route.ts', { 'next/server': { NextResponse } });
  const response = await POST({ json: async () => ({ action: 'login', username: 'test-admin', password: 'test-password' }) });
  assert.notEqual(response.status, 200);
});

test('a configured login issues a token accepted by the auth check', async () => {
  process.env.ADMIN_USERNAME = 'test-admin';
  process.env.ADMIN_PASSWORD = 'test-password';
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  const { POST } = load('app/api/auth/route.ts', { 'next/server': { NextResponse } });
  const response = await POST({ json: async () => ({ action: 'login', username: 'test-admin', password: 'test-password' }) });
  assert.equal(response.status, 200);
  const token = response.cookies['wmc-auth'];
  assert.ok(token);
  const check = await POST({ json: async () => ({ action: 'check' }), cookies: { get: () => ({ value: token }) } });
  assert.equal(check.status, 200);
});

test('catalogue writes reject unauthenticated callers even without middleware', async () => {
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  let readBody = false;
  const { POST } = load('app/api/riddims/route.ts', {
    'next/server': { NextResponse },
    'next/cache': { revalidateTag() {} },
    '@vercel/blob': { list() { throw new Error('must not touch storage'); } },
    '@/lib/data': {},
  });
  const response = await POST({ cookies: { get: () => undefined }, json: async () => { readBody = true; return {}; } });
  assert.equal(response.status, 401);
  assert.equal(readBody, false);
});

test('anonymous catalogue reads never initialize or migrate storage', async () => {
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  let writes = 0;
  const { GET } = load('app/api/riddims/route.ts', {
    'next/server': { NextResponse },
    'next/cache': { revalidateTag() {} },
    '@vercel/blob': { list: async () => ({ blobs: [] }), put: async () => { writes++; } },
    '@/lib/data': {},
    '@/data/riddims.json': { default: [{ id: 1, voicings: [{ title: 'Example' }] }] },
  });
  const response = await GET({ cookies: { get: () => undefined } });
  assert.equal(response.status, 200);
  assert.equal(response.body.length, 1);
  assert.equal(response.headers['Cache-Control'], 'private, no-store');
  assert.equal(writes, 0);
});

test('authenticated catalogue reads persist stable IDs before editing', async () => {
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  const token = await load('lib/auth.ts').createToken('test-admin');
  const writes = [];
  const { GET } = load('app/api/riddims/route.ts', {
    'next/server': { NextResponse },
    'next/cache': { revalidateTag() {} },
    '@vercel/blob': { list: async () => ({ blobs: [] }), put: async (_name, body) => { writes.push(JSON.parse(body)); } },
    '@/lib/data': {},
    '@/data/riddims.json': { default: [{ id: 1, voicings: [{ title: 'Example' }] }] },
  });
  const response = await GET({ cookies: { get: () => ({ value: token }) } });
  assert.equal(response.status, 200);
  assert.ok(response.body[0].voicings[0].id);
  assert.equal(writes.at(-1)[0].voicings[0].id, response.body[0].voicings[0].id);
});

test('expired and tampered tokens do not authenticate', async () => {
  process.env.AUTH_SECRET = 'test-secret-for-unit-tests';
  const { createToken, verifyToken } = load('lib/auth.ts');
  const token = await createToken('test-admin');
  assert.equal(await verifyToken(token.slice(0, -4) + 'AAAA'), false);
  const payload = `test-admin:${Date.now() - 25 * 60 * 60 * 1000}`;
  const { createHmac } = require('node:crypto');
  const signature = createHmac('sha256', process.env.AUTH_SECRET).update(payload).digest('hex');
  assert.equal(await verifyToken(Buffer.from(`${payload}:${signature}`).toString('base64')), false);
});

test('middleware does not continue when its access checks throw', async () => {
  const { middleware } = load('middleware.ts', { 'next/server': { NextResponse } });
  const response = await middleware({ get nextUrl() { throw new Error('failure'); } });
  assert.notEqual(response.status, 200);
});

test('the audit page rejects a direct unauthenticated server render', async () => {
  const { default: page } = load('app/[lang]/audit/page.tsx', {
    'react/jsx-runtime': { jsx() { throw new Error('must not render'); } },
    'next/headers': { cookies: () => ({ get: () => undefined }) },
    'next/navigation': { redirect() { throw new Error('redirected'); } },
    '@/lib/i18n': { isValidLocale: () => true },
    '@/lib/data': { getAllRiddims() { throw new Error('must not read data'); } },
    '@/components/AuditDashboard': {},
  });
  await assert.rejects(page({ params: { lang: 'fr' } }), /redirected/);
});
