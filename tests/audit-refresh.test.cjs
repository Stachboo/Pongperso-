const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function renderDashboard(response) {
  const filename = path.join(__dirname, '..', 'components', 'AuditDashboard.tsx');
  const source = fs.readFileSync(filename, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const states = [];
  const effects = [];
  let nextState = 0;
  const react = {
    useState(initial) {
      const index = nextState++;
      states[index] = initial;
      return [initial, value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useMemo(callback) { return callback(); },
    useCallback(callback) { return callback; },
    useEffect(callback) { effects.push(callback); },
    useRef(initial) { return { current: initial }; },
  };
  const module = { exports: {} };
  const context = {
    module, exports: module.exports, console, fetch: async () => response,
    window: { setTimeout() {}, addEventListener() {}, removeEventListener() {} },
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null, Fragment: 'fragment' };
      if (name === 'next/navigation') return { useRouter: () => ({}) };
      if (name === './Modal') return { default: () => null };
      if (name.endsWith('.module.css')) return { default: {} };
      return require(name);
    },
  };
  vm.runInNewContext(code, context, { filename });
  const initial = [{ id: 1, name: 'Diwali', producer: 'Producer', voicings: [] }];
  module.exports.default({ riddims: initial, lang: 'fr' });
  return { states, effects, initial };
}

test('a 503 refresh preserves the catalog and tells the administrator', async () => {
  const dashboard = renderDashboard({ ok: false, json: async () => ({ error: 'Catalogue momentanément indisponible' }) });
  dashboard.effects[0]();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dashboard.states[0], dashboard.initial);
  assert.ok(dashboard.states.some(state => Array.isArray(state) && state.some(item => item?.kind === 'error')));
});

test('a malformed successful response is not installed as the catalog', async () => {
  const dashboard = renderDashboard({ ok: true, json: async () => ({ unexpected: true }) });
  dashboard.effects[0]();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dashboard.states[0], dashboard.initial);
  assert.ok(dashboard.states.some(state => Array.isArray(state) && state.some(item => item?.kind === 'error')));
});

test('a successful refresh replaces the catalog', async () => {
  const updated = [{ id: 2, name: 'Updated', producer: 'Producer', voicings: [] }];
  const dashboard = renderDashboard({ ok: true, json: async () => updated });
  dashboard.effects[0]();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dashboard.states[0], updated);
});
