/* tb-quiz.jsx — Interactive quiz page variations */

const { useState, useCallback, useRef, useEffect, useMemo } = React;
const {
  TB_CODE, REF_COLORS, HEAP_ADDRS, syntaxHL, renderDesc,
  TBCodePanel, secLabelStyle,
} = window;

/* ═══ Shuffle utility ═══ */
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ═══ Shared: Drag & Drop primitives ═══ */

function DragChip({ value, label, color, used, onReturn }) {
  return (
    <span
      draggable={!used}
      onDragStart={e => { e.dataTransfer.setData('text/plain', value); e.dataTransfer.effectAllowed = 'move'; }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        fontWeight: 600, padding: '3px 9px', borderRadius: 4,
        cursor: used ? 'default' : 'grab', userSelect: 'none',
        background: used ? '#f1f3f7' : (color || '#fff'),
        border: `1.5px solid ${used ? '#e2e6ee' : '#cbd5e1'}`,
        color: used ? '#c1c8d4' : '#1e293b',
        opacity: used ? 0.45 : 1,
        transition: 'all 0.2s',
        textDecoration: used ? 'line-through' : 'none',
      }}
    >
      {label || value}
    </span>
  );
}

function DropSlot({ slotId, placed, correct, checked, onDrop, onClear, label }) {
  const [over, setOver] = useState(false);
  const isCorrect = checked && placed != null && placed === correct;
  const isWrong = checked && placed != null && placed !== correct;
  const isEmpty = placed == null;

  let bg = '#fff', border = '1.5px dashed #cbd5e1';
  if (over) { bg = '#eff6ff'; border = '1.5px solid #60a5fa'; }
  else if (isCorrect) { bg = '#f0fdf4'; border = '1.5px solid #4ade80'; }
  else if (isWrong) { bg = '#fef2f2'; border = '1.5px solid #f87171'; }
  else if (!isEmpty) { bg = '#f8fafc'; border = '1.5px solid #94a3b8'; }

  return (
    <div
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); onDrop(slotId, e.dataTransfer.getData('text/plain')); }}
      onClick={() => { if (placed != null) onClear(slotId); }}
      title={placed != null ? 'Click to remove' : 'Drag a value here'}
      style={{
        minWidth: 50, minHeight: 24, padding: '2px 8px',
        borderRadius: 4, background: bg, border,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        fontWeight: 600, color: '#1e293b',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: placed != null ? 'pointer' : 'default',
        transition: 'all 0.15s',
        position: 'relative',
      }}
    >
      {isEmpty ? (
        <span style={{ color: '#c1c8d4', fontSize: 10, fontWeight: 400, fontStyle: 'italic' }}>
          {label || '?'}
        </span>
      ) : (
        <span>{placed}</span>
      )}
      {isWrong && (
        <span style={{
          position: 'absolute', right: -6, top: -6,
          width: 14, height: 14, borderRadius: '50%',
          background: '#ef4444', color: '#fff', fontSize: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif",
        }}>✗</span>
      )}
      {isCorrect && (
        <span style={{
          position: 'absolute', right: -6, top: -6,
          width: 14, height: 14, borderRadius: '50%',
          background: '#22c55e', color: '#fff', fontSize: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
        }}>✓</span>
      )}
    </div>
  );
}

/* ═══ Shared: Nav & Chrome ═══ */

const quizNavStyle = {
  height: 42, display: 'flex', alignItems: 'center', padding: '0 20px',
  borderBottom: '1px solid #e2e6ee', background: '#fff', flexShrink: 0,
  fontFamily: "'Source Sans 3', sans-serif", gap: 10,
};

function QuizNav({ title }) {
  return (
    <div style={quizNavStyle}>
      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Unit 2</span>
      <span style={{ fontSize: 10, color: '#d1d5db' }}>›</span>
      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Chapter 4</span>
      <span style={{ fontSize: 10, color: '#d1d5db' }}>›</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{title}</span>
      <span style={{
        marginLeft: 8, fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.06em', background: '#fef3c7', color: '#92400e',
        padding: '2px 8px', borderRadius: 3,
      }}>Quiz</span>
    </div>
  );
}

const footBtnStyle = {
  fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600,
  padding: '5px 16px', borderRadius: 5, cursor: 'pointer', border: 'none',
};

/* ═══ Quiz A: Predict the State ═══ */

const QUIZ_A_ANSWERS = {
  'sa': '10', 'sb': '15', 'smsg': '0x3A8F', 'sarr': '0x7C12',
  'hh1': '"Hi"', 'hh2': '[1, 15, 3]',
};
const QUIZ_A_BANK = [
  '10', '15', '0x3A8F', '0x7C12', '"Hi"', '[1, 15, 3]',
  '20', '[1, 2, 3]', '"Hello"', '0xFFFF', '5',
];

function QuizPredictState() {
  const [placed, setPlaced] = useState({});
  const [checked, setChecked] = useState(false);

  const usedValues = Object.values(placed);

  const handleDrop = useCallback((slotId, value) => {
    setChecked(false);
    setPlaced(p => {
      const next = { ...p };
      // Remove value from any existing slot
      for (const k in next) { if (next[k] === value) delete next[k]; }
      next[slotId] = value;
      return next;
    });
  }, []);

  const handleClear = useCallback((slotId) => {
    setChecked(false);
    setPlaced(p => { const next = { ...p }; delete next[slotId]; return next; });
  }, []);

  const allFilled = Object.keys(QUIZ_A_ANSWERS).every(k => placed[k] != null);
  const score = checked ? Object.keys(QUIZ_A_ANSWERS).filter(k => placed[k] === QUIZ_A_ANSWERS[k]).length : 0;
  const total = Object.keys(QUIZ_A_ANSWERS).length;

  const stackRows = useMemo(() => shuffleArr([
    { name: 'a', type: 'int', slot: 'sa' },
    { name: 'b', type: 'int', slot: 'sb' },
    { name: 'msg', type: 'string', slot: 'smsg' },
    { name: 'arr', type: 'int[]', slot: 'sarr' },
  ]), []);
  const heapRows = useMemo(() => shuffleArr([
    { addr: '0x3A8F', type: 'String', slot: 'hh1' },
    { addr: '0x7C12', type: 'Int32[]', slot: 'hh2' },
  ]), []);
  const bankA = useMemo(() => shuffleArr(QUIZ_A_BANK), []);
  const colHdr = { fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif" };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: "'Source Sans 3', sans-serif", background: '#fff', overflow: 'hidden',
    }}>
      <QuizNav title="Predict the State" />

      {/* Question */}
      <div style={{
        padding: '8px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a',
        fontSize: 13, color: '#78350f', fontWeight: 500, lineHeight: 1.5, flexShrink: 0,
      }}>
        After <strong>all 5 lines</strong> execute, drag values into the correct memory slots.
        <span style={{ color: '#a16207', fontSize: 11, marginLeft: 6, fontStyle: 'italic' }}>
          (Click a placed value to remove it)
        </span>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        {/* Code */}
        <div style={{ width: '42%', padding: '10px 10px 8px 16px' }}>
          <TBCodePanel activeLine={4} compact />
        </div>
        <div style={{ width: 1, background: '#e2e6ee', flexShrink: 0 }} />

        {/* Memory slots */}
        <div style={{ flex: 1, padding: '10px 16px 8px 12px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Stack */}
          <div>
            <div style={secLabelStyle}>Stack Frame</div>
            <div style={{ border: '1px solid #e2e6ee', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '42px 50px 1fr', padding: '3px 12px 2px', borderBottom: '1px solid #f1f3f7', background: '#fafbfc' }}>
                <span style={colHdr}>Name</span><span style={colHdr}>Type</span><span style={colHdr}>Value</span>
              </div>
              {stackRows.map((r, i) => (
                <div key={r.slot} style={{
                  display: 'grid', gridTemplateColumns: '42px 50px 1fr',
                  alignItems: 'center', padding: '4px 12px',
                  borderTop: i > 0 ? '1px solid #f1f3f7' : 'none',
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{r.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#94a3b8' }}>{r.type}</span>
                  <DropSlot slotId={r.slot} placed={placed[r.slot]} correct={QUIZ_A_ANSWERS[r.slot]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="drag value" />
                </div>
              ))}
            </div>
          </div>

          {/* Heap */}
          <div>
            <div style={secLabelStyle}>Heap</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {heapRows.map(r => (
                <div key={r.slot} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 10px', borderRadius: 6,
                  background: '#fafbfc', border: '1px solid #e2e6ee',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
                    fontWeight: 600, color: '#64748b', background: '#f1f5f9',
                    border: '1px solid #e2e6ee', borderRadius: 3, padding: '0 5px', lineHeight: '18px',
                  }}>{r.addr}</span>
                  <span style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 600 }}>{r.type}</span>
                  <DropSlot slotId={r.slot} placed={placed[r.slot]} correct={QUIZ_A_ANSWERS[r.slot]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="drag data" />
                </div>
              ))}
            </div>
          </div>

          {/* Console */}
          <div>
            <div style={secLabelStyle}>Console</div>
            <div style={{
              background: '#1e1e2e', borderRadius: 6, border: '1px solid #313244', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#181825', borderBottom: '1px solid #313244' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f38ba8' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f9e2af' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1' }} />
                <span style={{ fontSize: 9, color: '#6c7086', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, marginLeft: 4 }}>stdout</span>
              </div>
              <div style={{ padding: '6px 10px', minHeight: 24 }}>
                <span style={{ color: '#585b70', fontStyle: 'italic', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                  (no output at this point)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank + Controls */}
      <div style={{ borderTop: '1px solid #e2e6ee', background: '#fafbfc', flexShrink: 0 }}>
        <div style={{ padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Values</span>
          {bankA.map((v, i) => (
            <DragChip key={v + i} value={v} used={usedValues.includes(v)} />
          ))}
        </div>
        <div style={{
          padding: '6px 20px', borderTop: '1px solid #e2e6ee',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <button onClick={() => { setPlaced({}); setChecked(false); }}
            style={{ ...footBtnStyle, background: '#fff', border: '1px solid #e2e6ee', color: '#64748b' }}>
            Reset
          </button>
          <div style={{ flex: 1 }} />
          {checked && (
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: score === total ? '#059669' : '#dc2626',
            }}>
              {score}/{total} correct
              {score === total && ' — Perfect!'}
              {score < total && ' — Try again'}
            </span>
          )}
          <button onClick={() => setChecked(true)}
            disabled={!allFilled}
            style={{
              ...footBtnStyle, background: allFilled ? '#3b82f6' : '#94a3b8',
              color: '#fff', opacity: allFilled ? 1 : 0.5,
            }}>
            Check ✓
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══ Quiz B: What Gets Printed? ═══ */

const QUIZ_B_CODE = [
  'int a = 10;',
  'int b = a + 5;',
  'string msg = "Hi";',
  'int[] arr = {1, 2, 3};',
  'arr[1] = b;',
  'Console.WriteLine(msg);',
  'Console.WriteLine(b);',
];

const QUIZ_B_ANSWERS = { 'c0': 'Hi', 'c1': '15' };
const QUIZ_B_BANK = ['Hi', '15', '10', 'Hello', '0x3A8F', '[1, 15, 3]', 'msg', 'b'];

function QuizWhatPrints() {
  const [placed, setPlaced] = useState({});
  const [checked, setChecked] = useState(false);
  const bankB = useMemo(() => shuffleArr(QUIZ_B_BANK), []);
  const usedValues = Object.values(placed);

  const handleDrop = useCallback((slotId, value) => {
    setChecked(false);
    setPlaced(p => {
      const next = { ...p };
      for (const k in next) { if (next[k] === value) delete next[k]; }
      next[slotId] = value;
      return next;
    });
  }, []);
  const handleClear = useCallback((slotId) => {
    setChecked(false);
    setPlaced(p => { const next = { ...p }; delete next[slotId]; return next; });
  }, []);

  const allFilled = Object.keys(QUIZ_B_ANSWERS).every(k => placed[k] != null);
  const score = checked ? Object.keys(QUIZ_B_ANSWERS).filter(k => placed[k] === QUIZ_B_ANSWERS[k]).length : 0;
  const total = Object.keys(QUIZ_B_ANSWERS).length;

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: "'Source Sans 3', sans-serif", background: '#fff', overflow: 'hidden',
    }}>
      <QuizNav title="What Gets Printed?" />

      <div style={{
        padding: '8px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a',
        fontSize: 13, color: '#78350f', fontWeight: 500, lineHeight: 1.5, flexShrink: 0,
      }}>
        Read the code and predict what appears in the console. Drag values to the output lines.
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        {/* Code */}
        <div style={{ width: '48%', padding: '10px 10px 8px 16px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
            lineHeight: '21px', background: '#f8f9fb',
            borderRadius: 6, border: '1px solid #e2e6ee', overflow: 'hidden',
          }}>
            <div style={{
              padding: '4px 12px', borderBottom: '1px solid #e2e6ee',
              fontSize: 9.5, fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
              letterSpacing: '0.06em', background: '#f1f3f7',
            }}>Program.cs</div>
            <div style={{ padding: '5px 0' }}>
              {QUIZ_B_CODE.map((line, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', padding: '0 10px',
                  borderLeft: '3px solid transparent',
                }}>
                  <span style={{ width: 22, textAlign: 'right', color: '#c1c8d4', marginRight: 10, fontSize: 10.5 }}>{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: syntaxHL(line) }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: '#e2e6ee', flexShrink: 0 }} />

        {/* Console output slots */}
        <div style={{ flex: 1, padding: '10px 16px 8px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            fontSize: 12, color: '#475569', lineHeight: 1.5, fontStyle: 'italic',
          }}>
            What appears in the console after the program runs?
          </div>

          <div style={{
            background: '#1e1e2e', borderRadius: 6, border: '1px solid #313244',
            overflow: 'hidden', flex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#181825', borderBottom: '1px solid #313244' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f38ba8' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f9e2af' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1' }} />
              <span style={{ fontSize: 9, color: '#6c7086', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, marginLeft: 4 }}>stdout</span>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['c0', 'c1'].map((slot, i) => (
                <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#585b70', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", width: 14 }}>{i + 1}.</span>
                  <DropSlot slotId={slot} placed={placed[slot]} correct={QUIZ_B_ANSWERS[slot]}
                    checked={checked} onDrop={handleDrop} onClear={handleClear}
                    label="drop output" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bank + Controls */}
      <div style={{ borderTop: '1px solid #e2e6ee', background: '#fafbfc', flexShrink: 0 }}>
        <div style={{ padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Values</span>
          {bankB.map((v, i) => (
            <DragChip key={v + i} value={v} used={usedValues.includes(v)} />
          ))}
        </div>
        <div style={{
          padding: '6px 20px', borderTop: '1px solid #e2e6ee',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <button onClick={() => { setPlaced({}); setChecked(false); }}
            style={{ ...footBtnStyle, background: '#fff', border: '1px solid #e2e6ee', color: '#64748b' }}>Reset</button>
          <div style={{ flex: 1 }} />
          {checked && (
            <span style={{ fontSize: 12, fontWeight: 700, color: score === total ? '#059669' : '#dc2626' }}>
              {score}/{total} correct{score === total ? ' — Perfect!' : ' — Try again'}
            </span>
          )}
          <button onClick={() => setChecked(true)} disabled={!allFilled}
            style={{ ...footBtnStyle, background: allFilled ? '#3b82f6' : '#94a3b8', color: '#fff', opacity: allFilled ? 1 : 0.5 }}>
            Check ✓
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  QuizPredictState, QuizWhatPrints,
  shuffleArr, DragChip, DropSlot, QuizNav, footBtnStyle,
});
