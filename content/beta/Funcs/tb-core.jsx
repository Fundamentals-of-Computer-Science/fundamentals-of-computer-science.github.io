/* tb-core.jsx — Shared data model & components for Interactive Textbook */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ═══ Data Model ═══ */

const TB_CODE = [
  'int a = 10;',
  'int b = a + 5;',
  'string msg = "Hi";',
  'int[] arr = {1, 2, 3};',
  'arr[1] = b;',
  'Console.WriteLine(msg);',
  'Console.WriteLine(b);',
];

const HEAP_ADDRS = { h1: '0x3A8F', h2: '0x7C12' };

const REF_COLORS = {
  h1: { bg: '#ede9fe', border: '#8b5cf6', dot: '#7c3aed' },
  h2: { bg: '#dbeafe', border: '#60a5fa', dot: '#3b82f6' },
};

const TB_STEPS = [
  {
    line: -1,
    desc: 'Program starts. Memory is empty.',
    stack: [], heap: [], eval: null, console: [],
  },
  {
    line: 0,
    desc: 'Declare integer `a` and assign the literal value `10`.',
    stack: [{ name: 'a', type: 'int', value: 10, isNew: true }],
    heap: [], eval: null, console: [],
  },
  {
    line: 1,
    desc: 'Evaluate `a + 5` → `10 + 5` → `15`. Assign result to `b`.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15, isNew: true },
    ],
    heap: [], eval: ['a + 5', '10 + 5', '15'], console: [],
  },
  {
    line: 2,
    desc: 'Create string `"Hi"` on the heap. `msg` holds a reference to it.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15 },
      { name: 'msg', type: 'string', ref: 'h1', isNew: true },
    ],
    heap: [{ id: 'h1', type: 'String', display: '"Hi"' }],
    eval: null, console: [],
  },
  {
    line: 3,
    desc: 'Allocate array `{1, 2, 3}` on the heap. `arr` holds a reference.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15 },
      { name: 'msg', type: 'string', ref: 'h1' },
      { name: 'arr', type: 'int[]', ref: 'h2', isNew: true },
    ],
    heap: [
      { id: 'h1', type: 'String', display: '"Hi"' },
      { id: 'h2', type: 'Int32[]', display: [1, 2, 3] },
    ],
    eval: null, console: [],
  },
  {
    line: 4,
    desc: 'Look up `b` → `15`. Mutate the heap array: `arr[1] = 15`.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15 },
      { name: 'msg', type: 'string', ref: 'h1' },
      { name: 'arr', type: 'int[]', ref: 'h2' },
    ],
    heap: [
      { id: 'h1', type: 'String', display: '"Hi"' },
      { id: 'h2', type: 'Int32[]', display: [1, 15, 3], changed: [1] },
    ],
    eval: ['arr[1] = b', 'arr[1] = 15'],
    console: [],
  },
  {
    line: 5,
    desc: 'Evaluate `msg` → dereference `0x3A8F` → `"Hi"`. Print to console.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15 },
      { name: 'msg', type: 'string', ref: 'h1' },
      { name: 'arr', type: 'int[]', ref: 'h2' },
    ],
    heap: [
      { id: 'h1', type: 'String', display: '"Hi"' },
      { id: 'h2', type: 'Int32[]', display: [1, 15, 3] },
    ],
    eval: ['msg', '"Hi"'],
    console: [{ text: 'Hi', isNew: true }],
  },
  {
    line: 6,
    desc: 'Evaluate `b` → `15`. Print to console.',
    stack: [
      { name: 'a', type: 'int', value: 10 },
      { name: 'b', type: 'int', value: 15 },
      { name: 'msg', type: 'string', ref: 'h1' },
      { name: 'arr', type: 'int[]', ref: 'h2' },
    ],
    heap: [
      { id: 'h1', type: 'String', display: '"Hi"' },
      { id: 'h2', type: 'Int32[]', display: [1, 15, 3] },
    ],
    eval: ['b', '15'],
    console: [{ text: 'Hi' }, { text: '15', isNew: true }],
  },
];

/* ═══ Syntax Highlighting ═══ */

function syntaxHL(code) {
  const subs = [];
  const ph = (html) => { subs.push(html); return `\x00X${subs.length - 1}\x00`; };

  let s = code.replace(/"[^"]*"/g, m =>
    ph(`<span style="color:#059669">${m}</span>`)
  );
  s = s.replace(
    /\b(int|string|new|var|bool|void|return|if|else|for|while|class|static|public|private|Console)\b/g,
    m => ph(`<span style="color:#7c3aed;font-weight:500">${m}</span>`)
  );
  s = s.replace(/\b(\d+)\b/g, m =>
    ph(`<span style="color:#2563eb">${m}</span>`)
  );
  s = s.replace(/\x00X(\d+)\x00/g, (_, i) => subs[+i]);
  return s;
}

/* ═══ Render backtick `code` in descriptions ═══ */

function renderDesc(text) {
  return text.split(/`([^`]+)`/).map((p, i) =>
    i % 2 === 1
      ? <code key={i} style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9em',
          background: '#e8f0fe', padding: '1px 5px', borderRadius: 3,
        }}>{p}</code>
      : p
  );
}

/* ═══ Code Panel ═══ */

function TBCodePanel({ activeLine, style, compact }) {
  const fs = compact ? 11.5 : 13;
  const lh = compact ? 21 : 27;
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: fs,
      lineHeight: lh + 'px', background: '#f8f9fb',
      borderRadius: 6, border: '1px solid #e2e6ee', overflow: 'hidden', ...style,
    }}>
      <div style={{
        padding: '4px 12px', borderBottom: '1px solid #e2e6ee',
        fontSize: 9.5, fontFamily: "'Source Sans 3', sans-serif",
        fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.06em', background: '#f1f3f7',
      }}>Program.cs</div>
      <div style={{ padding: '5px 0' }}>
        {TB_CODE.map((line, i) => {
          const isActive = i === activeLine;
          const isFuture = activeLine >= 0 && i > activeLine;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '0 10px',
              background: isActive ? '#fef9e7' : 'transparent',
              borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
              opacity: isFuture ? 0.32 : 1, transition: 'all 0.25s ease',
            }}>
              <span style={{
                width: 22, textAlign: 'right',
                color: isActive ? '#3b82f6' : '#c1c8d4',
                marginRight: 10, userSelect: 'none', fontSize: fs - 1,
                fontWeight: isActive ? 600 : 400,
              }}>{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: syntaxHL(line) }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ Step Controls ═══ */

function TBStepControls({ step, setStep, maxStep, style, compact }) {
  const bs = (primary) => ({
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: compact ? 11 : 12.5, fontWeight: 600,
    padding: compact ? '3px 8px' : '4px 12px',
    border: primary ? 'none' : '1px solid #cbd2de',
    borderRadius: 4, background: primary ? '#3b82f6' : '#fff',
    color: primary ? '#fff' : '#475569', cursor: 'pointer',
    whiteSpace: 'nowrap', lineHeight: 1.3,
  });

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, ...style,
    }}>
      <button onClick={() => setStep(0)} style={bs(false)} title="Reset">↺</button>
      <button onClick={() => setStep(Math.max(0, step - 1))}
        disabled={step === 0} style={{ ...bs(false), opacity: step === 0 ? 0.35 : 1 }}>
        ‹ Prev
      </button>
      <div style={{ flex: 1, display: 'flex', gap: 2 }}>
        {Array.from({ length: maxStep + 1 }, (_, i) => (
          <div key={i} onClick={() => setStep(i)} style={{
            flex: 1, height: compact ? 5 : 7, cursor: 'pointer',
            background: i === step ? '#3b82f6' : i < step ? '#1e293b' : '#e2e6ee',
            borderRadius: 1, transition: 'background 0.2s',
          }} />
        ))}
      </div>
      <span style={{
        fontSize: compact ? 9.5 : 10.5,
        fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8',
      }}>{step}/{maxStep}</span>
      <button onClick={() => setStep(Math.min(maxStep, step + 1))}
        disabled={step === maxStep}
        style={{ ...bs(true), opacity: step === maxStep ? 0.35 : 1 }}>
        Next ›
      </button>
    </div>
  );
}

/* ═══ Section Label ═══ */

const secLabelStyle = {
  fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 5,
  fontFamily: "'Source Sans 3', sans-serif",
};

/* ═══ Exports ═══ */

Object.assign(window, {
  TB_CODE, TB_STEPS, REF_COLORS, HEAP_ADDRS,
  syntaxHL, renderDesc, TBCodePanel, TBStepControls, secLabelStyle,
});
