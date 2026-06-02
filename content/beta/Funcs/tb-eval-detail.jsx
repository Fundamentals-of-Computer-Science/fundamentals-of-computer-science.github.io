/* tb-eval-detail.jsx — Detailed evaluation tree panel (substitution walkthrough) */

const { useState, useEffect } = React;
const { renderDesc, secLabelStyle } = window;

/* ── Scene Builder (clean version) ── */
class EvalSceneBuilder {
  constructor(cw = 9.0) { this.elems = []; this.CW = cw; }
  span(x, text, s, e) {
    return {
      start: x + s * this.CW, end: x + e * this.CW,
      center: x + ((s + e) / 2) * this.CW,
    };
  }
  addText(id, step, text, x, y, active = []) {
    const w = text.length * this.CW;
    this.elems.push({ id, step, type: 'text', text, x, y, width: w, active, anchor: 'start' });
    return { x, y, width: w, center: x + w / 2 };
  }
  addCentered(id, step, text, cx, y, active = []) {
    const w = text.length * this.CW;
    this.elems.push({ id, step, type: 'text', text, x: cx, y, width: w, active, anchor: 'middle' });
    return { x: cx - w / 2, y, width: w, center: cx };
  }
  addLine(id, step, x1, x2, y, active = [], label = '') {
    this.elems.push({ id, step, type: 'line', x1, x2, y, active, label });
  }
  addArrow(id, step, x, y, active = []) {
    this.elems.push({ id, step, type: 'arrow', x, y, active, label: 'subst.' });
  }
  addStrike(id, step, x1, x2, y, active = []) {
    this.elems.push({ id, step, type: 'strike', x1, x2, y, active });
  }
}

/* ── Build eval tree: a + 5  (a = 10) ── */
function buildEvalTree1() {
  const b = new EvalSceneBuilder();
  const Y = 108, LH = 38, LO = 22, PAD = 35;
  let bx = 40;

  const t0 = b.addText('t0', 0, 'a + 5', bx, Y, [0]);
  const sp0 = b.span(bx, 'a + 5', 0, 1);
  b.addLine('l0', 1, sp0.start, sp0.end, Y - LO, [1], 'var');
  b.addCentered('r0', 1, '10', sp0.center, Y - LH, [1]);
  b.addStrike('s0', 2, sp0.start, sp0.end, Y, [2]);
  bx += t0.width + PAD;
  b.addArrow('a0', 2, bx, Y - 10, [2]);
  bx += 36;

  const t1 = b.addText('t1', 2, '10 + 5', bx, Y, [2]);
  const sp1 = b.span(bx, '10 + 5', 0, 6);
  b.addLine('l1', 3, sp1.start, sp1.end, Y - LO, [3], '+');
  b.addCentered('r1', 3, '15', sp1.center, Y - LH, [3]);
  b.addStrike('s1', 4, sp1.start, sp1.end, Y, [4]);
  bx += t1.width + PAD;
  b.addArrow('a1', 4, bx, Y - 10, [4]);
  bx += 36;

  const t2 = b.addText('t2', 4, '15', bx, Y, [4]);

  return {
    elems: b.elems, canvasWidth: bx + t2.width + 40,
    sourceLine: 'int b = a + 5;', highlightRange: [10, 15],
    descriptions: [
      'Before assigning to `b`, evaluate the expression `a + 5`.',
      'Identify `a` as a variable. Look it up in the stack → `10`.',
      'Substitute `10` for `a`. Expression becomes `10 + 5`.',
      'Evaluate the addition `10 + 5` → `15`.',
      'Fully resolved: `15`. This value is assigned to `b`.',
    ],
  };
}

/* ── Build eval tree: arr[1] = b  (b = 15) ── */
function buildEvalTree2() {
  const b = new EvalSceneBuilder();
  const Y = 108, LH = 38, LO = 22, PAD = 35;
  let bx = 40;

  const t0 = b.addText('t0', 0, 'arr[1] = b', bx, Y, [0]);
  const sp0 = b.span(bx, 'arr[1] = b', 9, 10);
  b.addLine('l0', 1, sp0.start, sp0.end, Y - LO, [1], 'var');
  b.addCentered('r0', 1, '15', sp0.center, Y - LH, [1]);
  b.addStrike('s0', 2, sp0.start, sp0.end, Y, [2]);
  bx += t0.width + PAD;
  b.addArrow('a0', 2, bx, Y - 10, [2]);
  bx += 36;

  const t1 = b.addText('t1', 2, 'arr[1] = 15', bx, Y, [2]);

  return {
    elems: b.elems, canvasWidth: bx + t1.width + 40,
    sourceLine: 'arr[1] = b;', highlightRange: [9, 10],
    descriptions: [
      'Before mutating the array, evaluate the right-hand side `b`.',
      'Look up `b` in the stack frame → `15`.',
      'Substitute `15` for `b` → `arr[1] = 15`. Execute the mutation.',
    ],
  };
}

/* ── Build eval tree: msg  (Console.WriteLine) ── */
function buildEvalTree3() {
  const b = new EvalSceneBuilder();
  const Y = 108, LH = 38, LO = 22, PAD = 35;
  let bx = 40;

  const t0 = b.addText('t0', 0, 'msg', bx, Y, [0]);
  const sp0 = b.span(bx, 'msg', 0, 3);
  b.addLine('l0', 1, sp0.start, sp0.end, Y - LO, [1], 'var');
  b.addCentered('r0', 1, '0x3A8F', sp0.center, Y - LH, [1]);
  b.addStrike('s0', 2, sp0.start, sp0.end, Y, [2]);
  bx += t0.width + PAD;
  b.addArrow('a0', 2, bx, Y - 10, [2]);
  bx += 36;

  const t1 = b.addText('t1', 2, '0x3A8F', bx, Y, [2]);
  const sp1 = b.span(bx, '0x3A8F', 0, 6);
  b.addLine('l1', 3, sp1.start, sp1.end, Y - LO, [3], 'deref');
  b.addCentered('r1', 3, '"Hi"', sp1.center, Y - LH, [3]);
  b.addStrike('s1', 4, sp1.start, sp1.end, Y, [4]);
  bx += t1.width + PAD;
  b.addArrow('a1', 4, bx, Y - 10, [4]);
  bx += 36;

  const t2 = b.addText('t2', 4, '"Hi"', bx, Y, [4]);

  return {
    elems: b.elems, canvasWidth: bx + t2.width + 40,
    sourceLine: 'Console.WriteLine(msg);', highlightRange: [18, 21],
    descriptions: [
      'Evaluate the argument `msg` before calling `WriteLine`.',
      'Look up `msg` in the stack \u2192 it holds address `0x3A8F`.',
      'Follow the reference to the heap. Dereference `0x3A8F`.',
      'The heap object at `0x3A8F` is the string `"Hi"`.',
      'Fully resolved: `"Hi"` is printed to the console.',
    ],
  };
}

/* ── Build eval tree: b  (Console.WriteLine) ── */
function buildEvalTree4() {
  const b = new EvalSceneBuilder();
  const Y = 108, LH = 38, LO = 22, PAD = 35;
  let bx = 40;

  const t0 = b.addText('t0', 0, 'b', bx, Y, [0]);
  const sp0 = b.span(bx, 'b', 0, 1);
  b.addLine('l0', 1, sp0.start, sp0.end, Y - LO, [1], 'var');
  b.addCentered('r0', 1, '15', sp0.center, Y - LH, [1]);
  b.addStrike('s0', 2, sp0.start, sp0.end, Y, [2]);
  bx += Math.max(t0.width, 20) + PAD;
  b.addArrow('a0', 2, bx, Y - 10, [2]);
  bx += 36;

  const t1 = b.addText('t1', 2, '15', bx, Y, [2]);

  return {
    elems: b.elems, canvasWidth: bx + t1.width + 40,
    sourceLine: 'Console.WriteLine(b);', highlightRange: [18, 19],
    descriptions: [
      'Evaluate the argument `b` before calling `WriteLine`.',
      'Look up `b` in the stack \u2192 it\u2019s a value type holding `15`.',
      'Fully resolved: `15` is printed to the console.',
    ],
  };
}

/* Keyed by TB_STEPS index */
const EVAL_TREES = { 2: buildEvalTree1(), 5: buildEvalTree2(), 6: buildEvalTree3(), 7: buildEvalTree4() };

/* ── SVG Renderer ── */
function EvalTreeSVG({ data, subStep }) {
  const AC = '#3b82f6', IN = '#d1d8e4', ACS = '#dc2626';

  return (
    <svg width={data.canvasWidth} height={160}
      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0 }}>
      <rect width="100%" height="100%" fill="#fafbfc" rx="4" />
      {data.elems.map(el => {
        if (el.step > subStep) return null;
        const on = el.active.includes(subStep);
        const fill = on ? AC : IN;
        const stroke = on ? AC : '#e2e6ee';
        const sw = on ? 2.5 : 1.5;
        const fw = on ? '600' : '400';

        if (el.type === 'text') {
          return (
            <text key={el.id} x={el.x} y={el.y} textAnchor={el.anchor}
              fontSize="15" fontWeight={fw} fill={fill}>
              {el.text}
            </text>
          );
        }
        if (el.type === 'line') {
          return (
            <g key={el.id}>
              <line x1={el.x1} y1={el.y} x2={el.x2} y2={el.y}
                stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
              {el.label && (
                <text x={el.x1 - 5} y={el.y} textAnchor="end"
                  dominantBaseline="middle" fontSize="10.5"
                  fontStyle="italic" fontWeight="600"
                  fontFamily="'Source Sans 3', sans-serif"
                  fill={on ? AC : IN}>{el.label}</text>
              )}
            </g>
          );
        }
        if (el.type === 'arrow') {
          return (
            <g key={el.id}>
              <text x={el.x + 11} y={el.y - 11} textAnchor="middle"
                fontSize="9.5" fontStyle="italic"
                fontFamily="'Source Sans 3', sans-serif"
                fill={on ? AC : IN}>{el.label}</text>
              <text x={el.x} y={el.y} fontSize="18" fill={on ? AC : IN}
                fontWeight="bold">→</text>
            </g>
          );
        }
        if (el.type === 'strike') {
          return (
            <line key={el.id} x1={el.x1} y1={el.y - 6} x2={el.x2} y2={el.y - 6}
              stroke={on ? ACS : '#e2e6ee'} strokeWidth={on ? 2.5 : 1.5}
              strokeLinecap="round" opacity={0.85} />
          );
        }
        return null;
      })}
    </svg>
  );
}

/* ── Eval Detail Panel (replaces memory pane when open) ── */
function EvalDetailPanel({ data, onClose }) {
  const [sub, setSub] = useState(0);
  const maxSub = data.descriptions.length - 1;

  useEffect(() => setSub(0), [data]);

  useEffect(() => {
    const h = e => {
      if (e.key === 'ArrowRight') { e.stopImmediatePropagation(); setSub(s => Math.min(maxSub, s + 1)); }
      if (e.key === 'ArrowLeft')  { e.stopImmediatePropagation(); setSub(s => Math.max(0, s - 1)); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h, true);
    return () => window.removeEventListener('keydown', h, true);
  }, [maxSub, onClose]);

  const btnBase = {
    fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600,
    padding: '3px 8px', border: '1px solid #cbd2de', borderRadius: 4,
    background: '#fff', color: '#475569', cursor: 'pointer', lineHeight: 1.3,
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1, gap: 6, minHeight: 0,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <button onClick={onClose} style={{
          ...btnBase, display: 'flex', alignItems: 'center', gap: 3,
          fontSize: 10.5, color: '#64748b',
        }}>
          <span style={{ fontSize: 13 }}>‹</span> Memory
        </button>
        <div style={{
          flex: 1, fontSize: 10, fontWeight: 700, color: '#3b82f6',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          fontFamily: "'Source Sans 3', sans-serif",
        }}>Evaluation Detail</div>
      </div>

      {/* Source context */}
      <div style={{
        padding: '5px 10px', borderRadius: 5,
        background: '#f0f7ff', border: '1px solid #dbeafe',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
        color: '#475569', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{
          fontSize: 8.5, fontWeight: 700, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          fontFamily: "'Source Sans 3', sans-serif",
        }}>from</span>
        <code style={{ fontWeight: 500 }}>{data.sourceLine}</code>
      </div>

      {/* Sub-step description */}
      <div style={{
        padding: '6px 10px', borderRadius: 5,
        background: sub === maxSub ? '#ecfdf5' : '#fffbeb',
        border: `1px solid ${sub === maxSub ? '#bbf7d0' : '#fde68a'}`,
        fontSize: 11.5, lineHeight: 1.5, color: '#475569',
        fontFamily: "'Source Sans 3', sans-serif",
        transition: 'background 0.25s, border-color 0.25s',
      }}>
        {renderDesc(data.descriptions[sub])}
      </div>

      {/* SVG tree */}
      <div style={{
        flex: 1, minHeight: 0, overflow: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 6, border: '1px solid #e2e6ee',
      }}>
        <EvalTreeSVG data={data} subStep={sub} />
      </div>

      {/* Sub-step controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        paddingTop: 2,
      }}>
        <button onClick={() => setSub(Math.max(0, sub - 1))}
          disabled={sub === 0}
          style={{ ...btnBase, opacity: sub === 0 ? 0.35 : 1 }}>‹ Prev</button>
        <div style={{ flex: 1, display: 'flex', gap: 2 }}>
          {Array.from({ length: maxSub + 1 }, (_, i) => (
            <div key={i} onClick={() => setSub(i)} style={{
              flex: 1, height: 5, cursor: 'pointer', borderRadius: 1,
              background: i === sub ? '#3b82f6' : i < sub ? '#1e293b' : '#e2e6ee',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
        <span style={{
          fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8',
        }}>{sub}/{maxSub}</span>
        <button onClick={() => setSub(Math.min(maxSub, sub + 1))}
          disabled={sub === maxSub}
          style={{
            ...btnBase, background: '#3b82f6', color: '#fff', border: 'none',
            opacity: sub === maxSub ? 0.35 : 1,
          }}>Next ›</button>
      </div>
    </div>
  );
}

Object.assign(window, { EVAL_TREES, EvalDetailPanel });
