const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadCatalog({ list, fetch, env = {} }) {
  const filename = path.join(__dirname, '..', 'lib', 'data.ts');
  const source = fs.readFileSync(filename, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
  } }).outputText;
  const module = { exports: {} };
  const seed = [{ id: 1, name: 'Seed', voicings: [] }];
  let cacheOptions;
  const context = {
    module, exports: module.exports, console, fetch, process: { env },
    require(name) {
      if (name === '@vercel/blob') return { list };
      if (name === 'next/cache') return { unstable_cache: (fn, _keys, options) => { cacheOptions = options; return fn; } };
      if (name === '@/data/riddims.json') return { default: seed };
      return require(name);
    },
  };
  vm.runInNewContext(code, context, { filename });
  return { catalog: module.exports.getAllRiddims, seed, cacheOptions };
}

const entry = { pathname: 'riddims.json', url: 'https://example.test/riddims.json', uploadedAt: new Date(), etag: '"fresh"' };
const runtime = { BLOB_READ_WRITE_TOKEN: 'test-only' };

test('successful empty listing returns initial catalog', async () => {
  const result = loadCatalog({ list: async () => ({ blobs: [] }), env: runtime });
  assert.equal(await result.catalog(), result.seed);
});

test('local build without a token can use the seed without contacting Blob', async () => {
  let called = false;
  const result = loadCatalog({ list: async () => { called = true; throw Error('unexpected'); }, env: { NEXT_PHASE: 'phase-production-build' } });
  assert.equal(await result.catalog(), result.seed);
  assert.equal(called, false);
});

test('a configured build surfaces Blob failures rather than caching seed', async () => {
  const result = loadCatalog({ list: async () => { throw Error('Blob unavailable'); }, env: { ...runtime, NEXT_PHASE: 'phase-production-build' } });
  await assert.rejects(result.catalog(), /Blob unavailable/);
});

test('a local build configured with OIDC and store ID does not hide Blob failures', async () => {
  const result = loadCatalog({ list: async () => { throw Error('OIDC Blob unavailable'); }, env: {
    NEXT_PHASE: 'phase-production-build', VERCEL_OIDC_TOKEN: 'test-only', BLOB_STORE_ID: 'store-test',
  } });
  await assert.rejects(result.catalog(), /OIDC Blob unavailable/);
});

test('a Vercel build without Blob credentials does not pretend the seed is live data', async () => {
  const result = loadCatalog({ list: async () => { throw Error('Missing Blob credentials'); }, env: { VERCEL: '1', NEXT_PHASE: 'phase-production-build' } });
  await assert.rejects(result.catalog(), /Missing Blob credentials/);
});

test('runtime network errors are not returned as the seed catalog', async () => {
  const result = loadCatalog({ list: async () => { throw Error('Blob unavailable'); }, env: runtime });
  await assert.rejects(result.catalog(), /Blob unavailable/);
});

test('HTTP errors cannot be cached as a successful catalog', async () => {
  const result = loadCatalog({ list: async () => ({ blobs: [entry] }), fetch: async () => ({ ok: false, status: 503 }), env: runtime });
  await assert.rejects(result.catalog());
});

test('a missing or stale CDN ETag cannot be cached as current data', async () => {
  for (const etag of [null, '"stale"', 'W/"stale"']) {
    const result = loadCatalog({ list: async () => ({ blobs: [entry] }), fetch: async () => ({ ok: true, headers: { get: () => etag }, json: async () => [{ id: 1 }] }), env: runtime });
    await assert.rejects(result.catalog());
  }
});

test('a compressed CDN response with the same weak ETag is current', async () => {
  const fresh = [{ id: 2, name: 'Fresh', voicings: [] }];
  const result = loadCatalog({ list: async () => ({ blobs: [entry] }), fetch: async () => ({
    ok: true, headers: { get: () => `W/${entry.etag}` }, json: async () => fresh,
  }), env: runtime });
  assert.equal(await result.catalog(), fresh);
});

test('missing authoritative ETag and unrelated prefix matches are rejected', async () => {
  for (const blob of [{ ...entry, etag: undefined }, { ...entry, pathname: 'riddims.json.backup' }]) {
    const result = loadCatalog({ list: async () => ({ blobs: [blob] }), env: runtime });
    await assert.rejects(result.catalog());
  }
});

test('non-array Blob content is not accepted as a catalog', async () => {
  const result = loadCatalog({ list: async () => ({ blobs: [entry] }), fetch: async () => ({
    ok: true, headers: { get: () => entry.etag }, json: async () => ({ error: 'bad data' }),
  }), env: runtime });
  await assert.rejects(result.catalog());
});

test('a fresh response returns the catalog and cache revalidates after one minute', async () => {
  const fresh = [{ id: 2, name: 'Fresh', voicings: [] }];
  const result = loadCatalog({ list: async () => ({ blobs: [entry] }), fetch: async () => ({ ok: true, headers: { get: () => entry.etag }, json: async () => fresh }), env: runtime });
  assert.equal(await result.catalog(), fresh);
  assert.equal(result.cacheOptions.revalidate, 60);
});
