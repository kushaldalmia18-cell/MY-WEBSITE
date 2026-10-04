import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/* ---------------------------------------------------------------------
 * Problem data
 * ------------------------------------------------------------------- */

const PROBLEMS = {
  python: [
    {
      id: 'py1', title: 'Loss Ratio', difficulty: 'Easy',
      description: 'Write a function loss_ratio(claims, premium) that returns the loss ratio for a book of business.',
      formula: 'loss ratio = incurred claims / earned premium',
      example: { call: 'loss_ratio(750000, 1000000)', result: '0.75' },
      starter: 'def loss_ratio(claims, premium):\n    # write your code here\n    pass\n',
      test: { fnName: 'loss_ratio', args: [750000, 1000000], expected: 0.75, tol: 0.0001 }
    },
    {
      id: 'py2', title: 'Expected Claims', difficulty: 'Medium',
      description: 'Write a function expected_claims(frequency, severity, exposure) that returns expected claims cost using the frequency × severity model.',
      formula: 'expected claims = frequency × severity × exposure',
      example: { call: 'expected_claims(0.05, 2000, 1000)', result: '100000.0' },
      starter: 'def expected_claims(frequency, severity, exposure):\n    # write your code here\n    pass\n',
      test: { fnName: 'expected_claims', args: [0.05, 2000, 1000], expected: 100000, tol: 0.5 }
    }
  ],
  r: [
    {
      id: 'r1', title: 'Present Value', difficulty: 'Easy',
      description: 'Write a function present_value(fv, rate, years) that returns the present value of a future amount.',
      formula: 'PV = FV / (1 + r)^n',
      example: { call: 'present_value(1000, 0.05, 10)', result: '613.91' },
      starter: 'present_value <- function(fv, rate, years) {\n  # write your code here\n\n}\n',
      test: { fnName: 'present_value', args: [1000, 0.05, 10], expected: 613.9132535, tol: 0.01 }
    },
    {
      id: 'r2', title: 'Mortality Rate', difficulty: 'Easy',
      description: 'Write a function mortality_rate(deaths, exposure) that returns the observed mortality rate (qx).',
      formula: 'qx = deaths / exposure',
      example: { call: 'mortality_rate(42, 10000)', result: '0.0042' },
      starter: 'mortality_rate <- function(deaths, exposure) {\n  # write your code here\n\n}\n',
      test: { fnName: 'mortality_rate', args: [42, 10000], expected: 0.0042, tol: 0.00005 }
    }
  ],
  sql: [
    {
      id: 'sql1', title: 'Filter by Premium', difficulty: 'Easy',
      description: 'The policies table has columns policy_id, policy_type, premium, sum_insured. Write a query that selects policy_id, policy_type and premium for every policy with premium greater than 1000, ordered by policy_id.',
      schemaNote: 'policies(policy_id, policy_type, premium, sum_insured) · claims(claim_id, policy_id, amount)',
      starter: 'SELECT policy_id, policy_type, premium\nFROM policies\nWHERE premium > 1000\nORDER BY policy_id;\n',
      expected: [[2, 'Motor', 1200], [4, 'Home', 1500], [5, 'Life', 2200], [8, 'Life', 3100]]
    },
    {
      id: 'sql2', title: 'Total Claims by Type', difficulty: 'Medium',
      description: 'Join claims to policies and write a query that returns policy_type and the total claims amount for each type, ordered alphabetically by policy_type.',
      schemaNote: 'policies(policy_id, policy_type, premium, sum_insured) · claims(claim_id, policy_id, amount)',
      starter: 'SELECT p.policy_type, SUM(c.amount) AS total_claims\nFROM claims c\nJOIN policies p ON c.policy_id = p.policy_id\nGROUP BY p.policy_type\nORDER BY p.policy_type;\n',
      expected: [['Home', 45000], ['Life', 0], ['Motor', 6700]]
    }
  ],
  excel: [
    {
      id: 'xl1', title: 'Present Value', difficulty: 'Easy',
      description: 'Write a formula that calculates the present value of £1,000 received in 10 years, discounted at 5%, using Excel’s PV function.',
      formula: 'PV(rate, nper, pmt, fv)',
      note: 'Excel’s PV returns a negative number when fv is positive — it treats the present value as a cash outflow now in exchange for the future inflow. That sign convention trips people up constantly, so get used to it here.',
      example: { call: 'PV(0.05, 10, 0, 1000)', result: '-613.91' },
      starter: '=PV(0.05,10,0,1000)',
      expected: -613.9132535, tol: 0.01
    },
    {
      id: 'xl2', title: 'Loaded Reserve', difficulty: 'Easy',
      description: 'A case reserve of 50,000 needs an 8% claims-handling expense loading. Write a formula for the loaded reserve, rounded to the nearest whole number.',
      formula: 'loaded reserve = ROUND(reserve × (1 + loading), 0)',
      example: { call: 'ROUND(50000*(1+0.08),0)', result: '54000' },
      starter: '=ROUND(50000*(1+0.08),0)',
      expected: 54000, tol: 0
    }
  ]
};

const LANGS = [
  { key: 'python', label: 'Python' },
  { key: 'r', label: 'R' },
  { key: 'sql', label: 'SQL' },
  { key: 'excel', label: 'Excel' }
];

const CM_MODES = { python: 'python', r: 'r', sql: 'text/x-sql' };

const SQL_SEED = `
CREATE TABLE policies (
  policy_id INTEGER PRIMARY KEY,
  policy_type TEXT,
  premium REAL,
  sum_insured REAL
);
INSERT INTO policies VALUES
 (1,'Motor',850,15000),
 (2,'Motor',1200,22000),
 (3,'Home',640,180000),
 (4,'Home',1500,350000),
 (5,'Life',2200,500000),
 (6,'Motor',980,18000),
 (7,'Home',720,200000),
 (8,'Life',3100,750000);

CREATE TABLE claims (
  claim_id INTEGER PRIMARY KEY,
  policy_id INTEGER,
  amount REAL
);
INSERT INTO claims VALUES
 (1,1,2500),
 (2,3,15000),
 (3,5,0),
 (4,6,4200),
 (5,7,8000),
 (6,2,0),
 (7,4,22000),
 (8,8,0);
`;

/* ---------------------------------------------------------------------
 * Excel formula evaluator — a small, safe recursive-descent parser.
 * Supports +, -, *, /, ^, parentheses, comparisons, and a handful of
 * functions. Never uses eval()/new Function() on user input.
 * ------------------------------------------------------------------- */

function evalExcelFormula(input) {
  let s = String(input).trim();
  if (s.startsWith('=')) s = s.slice(1);
  let i = 0;

  function peek() { return s[i]; }
  function skipWs() { while (s[i] === ' ') i++; }

  function parseExpr() {
    skipWs();
    let left = parseTerm();
    for (;;) {
      skipWs();
      if (peek() === '+' || peek() === '-') {
        const op = s[i]; i++;
        const right = parseTerm();
        left = op === '+' ? left + right : left - right;
      } else break;
    }
    return left;
  }

  function parseTerm() {
    skipWs();
    let left = parsePow();
    for (;;) {
      skipWs();
      if (peek() === '*' || peek() === '/') {
        const op = s[i]; i++;
        const right = parsePow();
        if (op === '/') {
          if (right === 0) throw new Error('#DIV/0!');
          left = left / right;
        } else left = left * right;
      } else break;
    }
    return left;
  }

  function parsePow() {
    skipWs();
    const base = parseUnary();
    skipWs();
    if (peek() === '^') {
      i++;
      const exp = parsePow();
      return Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary() {
    skipWs();
    if (peek() === '-') { i++; return -parseUnary(); }
    if (peek() === '+') { i++; return parseUnary(); }
    return parseAtom();
  }

  function parseAtom() {
    skipWs();
    if (peek() === '(') {
      i++;
      const v = parseExpr();
      skipWs();
      if (peek() !== ')') throw new Error('Expected )');
      i++;
      return v;
    }
    if (/[0-9.]/.test(peek() || '')) {
      const start = i;
      while (i < s.length && /[0-9.]/.test(s[i])) i++;
      return parseFloat(s.slice(start, i));
    }
    if (/[A-Za-z_]/.test(peek() || '')) {
      const start = i;
      while (i < s.length && /[A-Za-z_]/.test(s[i])) i++;
      const name = s.slice(start, i).toUpperCase();
      skipWs();
      if (peek() === '(') {
        i++;
        const args = [];
        skipWs();
        if (peek() !== ')') {
          args.push(parseCondOrExpr());
          skipWs();
          while (peek() === ',') {
            i++;
            args.push(parseCondOrExpr());
            skipWs();
          }
        }
        if (peek() !== ')') throw new Error('Expected ) after ' + name);
        i++;
        return callFn(name, args);
      }
      if (name === 'TRUE') return true;
      if (name === 'FALSE') return false;
      throw new Error('Unknown identifier ' + name);
    }
    throw new Error('Unexpected character' + (peek() ? ': ' + peek() : ' (end of formula)'));
  }

  function parseCondOrExpr() {
    skipWs();
    const left = parseExpr();
    skipWs();
    const two = s.slice(i, i + 2);
    const one = s[i];
    let op = null;
    if (two === '>=' || two === '<=' || two === '<>') { op = two; i += 2; }
    else if (one === '>' || one === '<' || one === '=') { op = one; i += 1; }
    if (op) {
      const right = parseExpr();
      switch (op) {
        case '>': return left > right;
        case '<': return left < right;
        case '>=': return left >= right;
        case '<=': return left <= right;
        case '=': return left === right;
        case '<>': return left !== right;
        default: return left;
      }
    }
    return left;
  }

  function callFn(name, args) {
    switch (name) {
      case 'SUM': return args.reduce((a, b) => a + b, 0);
      case 'AVERAGE': return args.reduce((a, b) => a + b, 0) / args.length;
      case 'MIN': return Math.min.apply(null, args);
      case 'MAX': return Math.max.apply(null, args);
      case 'ABS': return Math.abs(args[0]);
      case 'ROUND': {
        const n = args[1] || 0;
        const f = Math.pow(10, n);
        return Math.round(args[0] * f) / f;
      }
      case 'IF': return args[0] ? args[1] : args[2];
      case 'PV': {
        const rate = args[0], nper = args[1], pmt = args[2] || 0, fv = args[3] || 0;
        if (rate === 0) return -(fv + pmt * nper);
        const pvPmt = pmt * ((1 - Math.pow(1 + rate, -nper)) / rate);
        return -(fv * Math.pow(1 + rate, -nper) + pvPmt);
      }
      case 'FV': {
        const rate = args[0], nper = args[1], pmt = args[2] || 0, pv = args[3] || 0;
        if (rate === 0) return -(pv + pmt * nper);
        const fvPmt = pmt * ((Math.pow(1 + rate, nper) - 1) / rate);
        return -(pv * Math.pow(1 + rate, nper) + fvPmt);
      }
      default: throw new Error('Unsupported function: ' + name);
    }
  }

  const result = parseCondOrExpr();
  skipWs();
  if (i < s.length) throw new Error('Unexpected trailing characters: ' + s.slice(i));
  return result;
}

/* ---------------------------------------------------------------------
 * Lazy runtime loaders — each is loaded once, on first use, and the
 * loading promise is cached so repeated Run clicks reuse the same
 * instance instead of reloading.
 * ------------------------------------------------------------------- */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-ag-src="' + src + '"]')) { resolve(); return; }
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.dataset.agSrc = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error('Could not load ' + src));
    document.head.appendChild(el);
  });
}

function loadCss(href) {
  return new Promise((resolve) => {
    if (document.querySelector('link[href="' + href + '"]')) { resolve(); return; }
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    el.onload = () => resolve();
    el.onerror = () => resolve();
    document.head.appendChild(el);
  });
}

let pyodidePromise = null;
function ensurePyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js')
      .then(() => window.loadPyodide());
  }
  return pyodidePromise;
}

let sqlPromise = null;
function ensureSQL() {
  if (!sqlPromise) {
    const base = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';
    sqlPromise = loadScript(base + 'sql-wasm.js')
      .then(() => window.initSqlJs({ locateFile: (f) => base + f }));
  }
  return sqlPromise;
}

let webRPromise = null;
function ensureWebR() {
  if (!webRPromise) {
    webRPromise = import(/* webpackIgnore: true */ 'https://webr.r-wasm.org/latest/webr.mjs').then(async (mod) => {
      const webR = new mod.WebR();
      await webR.init();
      return webR;
    });
  }
  return webRPromise;
}

let cmPromise = null;
function ensureCodeMirror() {
  if (!cmPromise) {
    const base = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/';
    cmPromise = loadCss(base + 'codemirror.min.css')
      .then(() => loadScript(base + 'codemirror.min.js'))
      .then(() => Promise.all([
        loadScript(base + 'mode/python/python.min.js'),
        loadScript(base + 'mode/sql/sql.min.js'),
        loadScript(base + 'mode/r/r.min.js')
      ]));
  }
  return cmPromise;
}

/* ---------------------------------------------------------------------
 * Per-language run/submit handlers. Each returns
 * { ok, output, passed, table? } where passed is null when there was
 * nothing to grade (a plain Run) and true/false when there was (Submit).
 * ------------------------------------------------------------------- */

async function runPython(code, test) {
  const pyodide = await ensurePyodide();
  let out = '';
  pyodide.setStdout({ batched: (s) => { out += s + '\n'; } });
  pyodide.setStderr({ batched: (s) => { out += s + '\n'; } });
  try {
    pyodide.runPython(code);
  } catch (e) {
    return { ok: false, output: (out ? out + '\n' : '') + String(e), passed: null };
  }
  if (!test) return { ok: true, output: out || '(no output — define your function, or add a print() call)', passed: null };
  try {
    const fn = pyodide.globals.get(test.fnName);
    const result = fn(...test.args);
    if (fn.destroy) fn.destroy();
    const passed = typeof result === 'number' && Math.abs(result - test.expected) <= test.tol;
    return { ok: true, output: (out ? out + '\n' : '') + test.fnName + '(' + test.args.join(', ') + ') = ' + result, passed };
  } catch (e) {
    return { ok: false, output: (out ? out + '\n' : '') + 'Error calling ' + test.fnName + '(): ' + String(e), passed: false };
  }
}

async function runR(code, test) {
  const webR = await ensureWebR();
  try {
    const capture = await webR.captureR(code, { captureStreams: true, captureConditions: false });
    const out = (capture.output || []).map((o) => (o && o.data !== undefined ? o.data : '')).join('\n');
    if (capture.result && capture.result.destroy) { try { capture.result.destroy(); } catch (e) { /* noop */ } }
    if (!test) return { ok: true, output: out || '(no output — define your function, or use print()/cat())', passed: null };
    const callCode = test.fnName + '(' + test.args.join(', ') + ')';
    const num = await webR.evalRNumber(callCode);
    const passed = typeof num === 'number' && Math.abs(num - test.expected) <= test.tol;
    return { ok: true, output: (out ? out + '\n' : '') + callCode + ' = ' + num, passed };
  } catch (e) {
    return { ok: false, output: 'Error: ' + String((e && e.message) || e), passed: test ? false : null };
  }
}

async function runSQL(code, problem) {
  const SQL = await ensureSQL();
  const db = new SQL.Database();
  try {
    db.run(SQL_SEED);
  } catch (e) {
    db.close();
    return { ok: false, output: 'Could not set up sample tables: ' + String((e && e.message) || e), passed: false, table: null };
  }
  let res;
  try {
    res = db.exec(code);
  } catch (e) {
    db.close();
    return { ok: false, output: 'SQL error: ' + String((e && e.message) || e), passed: false, table: null };
  }
  db.close();
  if (!res || res.length === 0) {
    return { ok: true, output: '(query ran — no rows returned)', passed: problem.expected ? false : null, table: null };
  }
  const columns = res[0].columns;
  const values = res[0].values;
  let passed = null;
  if (problem.expected) {
    const norm = (rows) => rows.map((r) => r.map((v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : String(v))).join('|')).sort();
    passed = JSON.stringify(norm(values)) === JSON.stringify(norm(problem.expected));
  }
  return { ok: true, output: null, passed, table: { columns, values } };
}

function runExcel(formula, problem) {
  try {
    const val = evalExcelFormula(formula || '');
    const shown = typeof val === 'number' ? (Math.round(val * 100) / 100) : String(val);
    const passed = problem.expected !== undefined ? (typeof val === 'number' && Math.abs(val - problem.expected) <= (problem.tol || 0.01)) : null;
    return { ok: true, output: (formula || '').trim() + '  =  ' + shown, passed };
  } catch (e) {
    return { ok: false, output: 'Error: ' + String((e && e.message) || e), passed: problem.expected !== undefined ? false : null };
  }
}

/* ---------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------- */

export default function CodingPractice() {
  const [lang, setLang] = useState('python');
  const [probIdx, setProbIdx] = useState({ python: 0, r: 0, sql: 0, excel: 0 });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState(null);
  const [excelValue, setExcelValue] = useState({});

  const codeStore = useRef({});
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  const problem = PROBLEMS[lang][probIdx[lang]];

  useEffect(() => {
    if (lang === 'excel') return;
    let cancelled = false;
    ensureCodeMirror().then(() => {
      if (cancelled || !window.CodeMirror) return;
      const initialCode = codeStore.current[problem.id] || problem.starter;
      if (!editorRef.current && textareaRef.current) {
        editorRef.current = window.CodeMirror.fromTextArea(textareaRef.current, {
          mode: CM_MODES[lang], lineNumbers: true, viewportMargin: Infinity, indentUnit: 2, tabSize: 2
        });
      }
      if (editorRef.current) {
        editorRef.current.setOption('mode', CM_MODES[lang]);
        if (editorRef.current.getValue() !== initialCode) editorRef.current.setValue(initialCode);
        if (editorRef.current._agHandler) editorRef.current.off('change', editorRef.current._agHandler);
        const handler = () => { codeStore.current[problem.id] = editorRef.current.getValue(); };
        editorRef.current._agHandler = handler;
        editorRef.current.on('change', handler);
        editorRef.current.refresh();
      }
    }).catch(() => { /* surfaced on Run instead */ });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, probIdx[lang]]);

  function selectLang(key) {
    setLang(key);
    setOutput(null);
  }
  function selectProblem(idx) {
    setProbIdx((prev) => Object.assign({}, prev, { [lang]: idx }));
    setOutput(null);
  }
  function resetCode() {
    codeStore.current[problem.id] = problem.starter;
    if (lang === 'excel') {
      setExcelValue((prev) => Object.assign({}, prev, { [problem.id]: problem.starter }));
    } else if (editorRef.current) {
      editorRef.current.setValue(problem.starter);
    }
  }

  async function handleRun(mode) {
    setBusy(true);
    setOutput(null);
    try {
      if (lang === 'python') {
        setStatus('Loading Python runtime…');
        const code = codeStore.current[problem.id] || problem.starter;
        const r = await runPython(code, mode === 'submit' ? problem.test : null);
        setOutput(r);
      } else if (lang === 'r') {
        setStatus('Loading R runtime — first run can take up to 30s…');
        const code = codeStore.current[problem.id] || problem.starter;
        const r = await runR(code, mode === 'submit' ? problem.test : null);
        setOutput(r);
      } else if (lang === 'sql') {
        setStatus('Loading SQL engine…');
        const code = codeStore.current[problem.id] || problem.starter;
        const r = await runSQL(code, mode === 'submit' ? problem : {});
        setOutput(r);
      } else if (lang === 'excel') {
        const formula = excelValue[problem.id] !== undefined ? excelValue[problem.id] : problem.starter;
        const r = runExcel(formula, mode === 'submit' ? problem : {});
        setOutput(r);
      }
    } catch (e) {
      setOutput({ ok: false, output: 'Unexpected error: ' + String((e && e.message) || e), passed: null });
    } finally {
      setBusy(false);
      setStatus('');
    }
  }

  return (
    <>
      <Head>
        <title>Coding Practice — Actuarial Guide</title>
        <meta name="description" content="Practice R, Python, SQL and Excel with actuarial-flavoured problems, run live in your browser." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="ag-topbar">
        <Link href="/" className="ag-logo">Actuarial<span>Guide</span></Link>
        <Link href="/" className="ag-back-link">← Back home</Link>
      </div>

      <div className="ag-cpage">
        <h1>Coding Practice</h1>
        <p className="ag-sub">R, Python, SQL and Excel exercises that run right here in your browser — the technical skills exams don’t test but every employer expects.</p>

        <div className="cp-langbar" role="tablist">
          {LANGS.map((l) => (
            <button key={l.key} className={'cp-langbtn' + (lang === l.key ? ' active' : '')} onClick={() => selectLang(l.key)}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="cp-probbar">
          {PROBLEMS[lang].map((p, idx) => (
            <button key={p.id} className={'cp-probbtn' + (probIdx[lang] === idx ? ' active' : '')} onClick={() => selectProblem(idx)}>
              <span className={'cp-diff cp-diff-' + p.difficulty.toLowerCase()}>{p.difficulty}</span>
              {p.title}
            </button>
          ))}
          <span className="cp-probbtn cp-probbtn-soon">More coming soon</span>
        </div>

        <div className="cp-grid">
          <div className="cp-problem-card">
            <div className="cp-problem-head">
              <h2>{problem.title}</h2>
              <span className={'cp-diff cp-diff-' + problem.difficulty.toLowerCase()}>{problem.difficulty}</span>
            </div>
            <div className="cp-problem-label">Description</div>
            <p className="cp-problem-text">{problem.description}</p>
            {problem.formula && (
              <>
                <div className="cp-problem-label">Formula</div>
                <p className="cp-problem-formula">{problem.formula}</p>
              </>
            )}
            {problem.note && (
              <>
                <div className="cp-problem-label">Note</div>
                <p className="cp-problem-text">{problem.note}</p>
              </>
            )}
            {problem.example && (
              <>
                <div className="cp-problem-label">Example</div>
                <div className="cp-example-box">
                  <div>{problem.example.call}</div>
                  <div className="cp-example-result"># Returns: {problem.example.result}</div>
                </div>
              </>
            )}
            {lang === 'sql' && problem.schemaNote && (
              <>
                <div className="cp-problem-label">Tables</div>
                <p className="cp-problem-text cp-mono-small">{problem.schemaNote}</p>
              </>
            )}
          </div>

          <div className="cp-editor-card">
            <div className="cp-editor-head">
              <span>{lang === 'excel' ? 'Formula Bar' : 'Code Editor'}</span>
              <div className="cp-editor-actions">
                <button className="cp-btn-ghost" onClick={resetCode} disabled={busy}>Reset</button>
                <button className="cp-btn-outline" onClick={() => handleRun('run')} disabled={busy}>Run</button>
                <button className="cp-btn-solid" onClick={() => handleRun('submit')} disabled={busy}>Submit</button>
              </div>
            </div>

            <div className="cp-editor-body" style={{ display: lang === 'excel' ? 'none' : 'block' }}>
              <textarea ref={textareaRef} defaultValue={problem.starter} />
            </div>

            {lang === 'excel' && (
              <div className="cp-excel-body">
                <span className="cp-excel-fx">fx</span>
                <input
                  className="cp-excel-input"
                  type="text"
                  value={excelValue[problem.id] !== undefined ? excelValue[problem.id] : problem.starter}
                  onChange={(e) => setExcelValue((prev) => Object.assign({}, prev, { [problem.id]: e.target.value }))}
                  spellCheck={false}
                />
              </div>
            )}

            <div className="cp-output-head">Output</div>
            <div className="cp-output-body">
              {busy && <p className="cp-output-status">{status || 'Running…'}</p>}
              {!busy && !output && <p className="cp-output-status">Click “Run” to test your code, or “Submit” to check your answer.</p>}
              {!busy && output && (
                <>
                  {output.passed === true && <div className="cp-verdict cp-verdict-pass">✓ Correct</div>}
                  {output.passed === false && <div className="cp-verdict cp-verdict-fail">✕ Not quite — check your logic and try again</div>}
                  {output.table && (
                    <div className="cp-table-wrap">
                      <table className="cp-table">
                        <thead><tr>{output.table.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                        <tbody>
                          {output.table.values.map((row, ri) => (
                            <tr key={ri}>{row.map((v, ci) => <td key={ci}>{String(v)}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {output.output && <pre className="cp-output-pre">{output.output}</pre>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root{
          --ag-bg:#FAF9F5; --ag-surface:#ffffff; --ag-ink:#15171C; --ag-muted:#6B7280;
          --ag-accent:#146B4D; --ag-accent-ink:#ffffff;
          --ag-teal:#2E3A59; --ag-pink:#B5563B; --ag-gold:#B8862E; --ag-purple:#5B4C6B; --ag-navy2:#44576B;
          --ag-line:#E3E1DA;
          --ag-font-display:'Newsreader',Georgia,serif; --ag-font-body:'Inter',system-ui,sans-serif; --ag-font-mono:'IBM Plex Mono',ui-monospace,monospace;
          color-scheme:light;
        }
        *{box-sizing:border-box;}
        html{background-color:var(--ag-bg) !important;}
        body{
          background-color:var(--ag-bg) !important;
          color:var(--ag-ink) !important; font-family:var(--ag-font-body); margin:0; padding-inline:16px;
        }
        h1,h2{font-family:var(--ag-font-display); font-style:italic; font-weight:500; text-wrap:balance; margin:0; color:var(--ag-ink) !important;}
        p{line-height:1.55; color:var(--ag-muted); margin:0;}

        .ag-topbar{display:flex; align-items:center; justify-content:space-between; padding-block:18px;}
        .ag-logo{font-family:var(--ag-font-display); font-weight:700; font-size:21px; text-decoration:none; color:var(--ag-ink);}
        .ag-logo span{color:var(--ag-accent);}
        .ag-back-link{font-family:var(--ag-font-mono); font-size:12.5px; font-weight:600; color:var(--ag-accent); text-decoration:none;}

        .ag-cpage{padding-block:12px 70px;}
        .ag-cpage h1{font-size:clamp(28px,4.2vw,40px);}
        .ag-cpage > p.ag-sub{margin-top:10px; font-size:15px; max-width:640px;}

        .cp-langbar{display:flex; gap:8px; flex-wrap:wrap; margin-top:28px;}
        .cp-langbtn{border:1.5px solid var(--ag-accent); background:transparent; color:var(--ag-muted); font-family:var(--ag-font-body); font-weight:600; font-size:13.5px; padding:10px 20px; border-radius:30px; cursor:pointer;}
        .cp-langbtn.active{background:var(--ag-accent); color:#fff;}

        .cp-probbar{display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;}
        .cp-probbtn{display:flex; align-items:center; gap:8px; border:1px solid var(--ag-line); background:var(--ag-surface); color:var(--ag-ink); font-family:var(--ag-font-body); font-weight:500; font-size:13px; padding:8px 14px; border-radius:10px; cursor:pointer;}
        .cp-probbtn.active{border-color:var(--ag-accent); box-shadow:inset 0 0 0 1px var(--ag-accent);}
        .cp-probbtn-soon{opacity:.5; cursor:default; font-style:italic;}
        .cp-diff{font-family:var(--ag-font-mono); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.03em; padding:2px 8px; border-radius:20px;}
        .cp-diff-easy{background:rgba(20,107,77,.14); color:var(--ag-accent);}
        .cp-diff-medium{background:rgba(184,134,46,.18); color:#7A5C1A;}
        .cp-diff-hard{background:rgba(181,86,59,.16); color:var(--ag-pink);}

        .cp-grid{display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:26px; align-items:start;}

        .cp-problem-card{background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:16px; padding:26px 28px;}
        .cp-problem-head{display:flex; align-items:center; justify-content:space-between; gap:12px; padding-bottom:16px; margin-bottom:16px; border-bottom:1px solid var(--ag-line);}
        .cp-problem-head h2{font-size:21px;}
        .cp-problem-label{font-family:var(--ag-font-mono); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-accent); margin:18px 0 8px;}
        .cp-problem-label:first-of-type{margin-top:0;}
        .cp-problem-text{font-size:14px; color:var(--ag-ink); line-height:1.6;}
        .cp-problem-formula{font-family:var(--ag-font-mono); font-size:13px; color:var(--ag-ink); background:var(--ag-bg); border:1px solid var(--ag-line); border-radius:8px; padding:10px 12px;}
        .cp-mono-small{font-family:var(--ag-font-mono); font-size:12px;}
        .cp-example-box{background:var(--ag-ink); color:#E8E6DD; border-radius:10px; padding:14px 16px; font-family:var(--ag-font-mono); font-size:12.5px; line-height:1.7;}
        .cp-example-result{color:#8FD9B6; margin-top:2px;}

        .cp-editor-card{background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:16px; overflow:hidden; display:flex; flex-direction:column;}
        .cp-editor-head{display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 18px; border-bottom:1px solid var(--ag-line); font-family:var(--ag-font-mono); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-ink);}
        .cp-editor-actions{display:flex; gap:8px;}
        .cp-btn-ghost,.cp-btn-outline,.cp-btn-solid{font-family:var(--ag-font-mono); font-size:11.5px; font-weight:600; border-radius:20px; padding:7px 14px; cursor:pointer; text-transform:none; letter-spacing:0;}
        .cp-btn-ghost{background:transparent; border:1px solid var(--ag-line); color:var(--ag-muted);}
        .cp-btn-outline{background:transparent; border:1.5px solid var(--ag-accent); color:var(--ag-accent);}
        .cp-btn-solid{background:var(--ag-accent); border:1.5px solid var(--ag-accent); color:#fff;}
        .cp-btn-ghost:disabled,.cp-btn-outline:disabled,.cp-btn-solid:disabled{opacity:.5; cursor:default;}

        .cp-editor-body{min-height:220px;}
        .cp-editor-body .CodeMirror{height:220px; font-family:var(--ag-font-mono); font-size:13px;}

        .cp-excel-body{display:flex; align-items:center; gap:10px; padding:16px 18px; border-bottom:1px solid var(--ag-line); background:var(--ag-bg);}
        .cp-excel-fx{font-family:var(--ag-font-display); font-style:italic; font-weight:600; color:var(--ag-accent); font-size:15px;}
        .cp-excel-input{flex:1; font-family:var(--ag-font-mono); font-size:14px; color:var(--ag-ink); background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:8px; padding:10px 12px;}

        .cp-output-head{font-family:var(--ag-font-mono); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-muted); padding:14px 18px 0;}
        .cp-output-body{padding:12px 18px 20px; min-height:70px;}
        .cp-output-status{font-size:13px; font-style:italic; color:var(--ag-muted);}
        .cp-output-pre{font-family:var(--ag-font-mono); font-size:12.5px; color:var(--ag-ink); background:var(--ag-bg); border:1px solid var(--ag-line); border-radius:8px; padding:12px 14px; white-space:pre-wrap; word-break:break-word; margin:0;}
        .cp-verdict{font-family:var(--ag-font-mono); font-size:13px; font-weight:700; padding:9px 14px; border-radius:8px; margin-bottom:10px;}
        .cp-verdict-pass{background:rgba(20,107,77,.12); color:var(--ag-accent);}
        .cp-verdict-fail{background:rgba(181,86,59,.12); color:var(--ag-pink);}

        .cp-table-wrap{overflow-x:auto; margin-bottom:10px;}
        .cp-table{border-collapse:collapse; width:100%; font-size:12.5px;}
        .cp-table th,.cp-table td{border:1px solid var(--ag-line); padding:7px 10px; text-align:left; font-family:var(--ag-font-mono);}
        .cp-table th{background:var(--ag-bg); font-weight:700; color:var(--ag-ink);}

        @media (max-width:900px){
          .cp-grid{grid-template-columns:1fr;}
        }
        @media (max-width:640px){
          .ag-cpage{padding-block:8px 50px;}
        }
      `}</style>
    </>
  );
}
