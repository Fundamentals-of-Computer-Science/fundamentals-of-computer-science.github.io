/* tb-quiz-2.jsx — Visual Eval Tree quiz + Complete the Code quiz */

const { useState, useCallback, useMemo } = React;
const {
  syntaxHL, secLabelStyle,
  shuffleArr, DragChip, DropSlot, QuizNav, footBtnStyle,
} = window;

/* ═══ Quiz C: Build the Evaluation Tree ═══ */

const EVAL_TREE_ANSWERS = {
  s1: '10', s2: '10 + 5', s3: '15',
  r1: 'var', r2: '+', ra: 'subst.',
};
const EVAL_VAL_BANK = ['10', '15', '10 + 5', '5', '25', 'a', 'a + 5', '20'];
const EVAL_RULE_BANK = ['var', '+', 'subst.', '*', '-', '=='];

function EvalTreeBlock({ children, style }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 3, ...style,
    }}>{children}</div>
  );
}

function EvalRuleLine({ slotId, placed, correct, checked, onDrop, onClear }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      <div style={{ width: 24, height: 0, borderTop: '2px solid #cbd5e1' }} />
      <DropSlot slotId={slotId} placed={placed} correct={correct}
        checked={checked} onDrop={onDrop} onClear={onClear} label="rule" />
      <div style={{ width: 24, height: 0, borderTop: '2px solid #cbd5e1' }} />
    </div>
  );
}

function EvalArrowSlot({ slotId, placed, correct, checked, onDrop, onClear }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 2, alignSelf: 'center',
    }}>
      <DropSlot slotId={slotId} placed={placed} correct={correct}
        checked={checked} onDrop={onDrop} onClear={onClear} label="rule" />
      <span style={{
        fontSize: 20, fontWeight: 700, color: '#cbd5e1', lineHeight: 1,
      }}>→</span>
    </div>
  );
}

function ExprBox({ text }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      fontWeight: 600, padding: '4px 12px', borderRadius: 5,
      background: '#f0f7ff', border: '1.5px solid #bfdbfe',
      color: '#1e40af', whiteSpace: 'nowrap',
    }}>{text}</div>
  );
}

/* Reusable drag chip (never dims) */
function ReusableChip({ value, color }) {
  return (
    <span
      draggable
      onDragStart={e => { e.dataTransfer.setData('text/plain', value); e.dataTransfer.effectAllowed = 'copy'; }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        fontWeight: 600, padding: '3px 9px', borderRadius: 4,
        cursor: 'grab', userSelect: 'none',
        background: color || '#fff',
        border: '1.5px solid #cbd5e1',
        color: '#1e293b',
      }}
    >{value}</span>
  );
}

function QuizEvalTree() {
  const [placed, setPlaced] = useState({});
  const [checked, setChecked] = useState(false);
  const valBank = useMemo(() => shuffleArr(EVAL_VAL_BANK), []);
  const ruleBank = useMemo(() => shuffleArr(EVAL_RULE_BANK), []);

  const handleDrop = useCallback((slotId, value) => {
    setChecked(false);
    setPlaced(p => ({ ...p, [slotId]: value }));
  }, []);
  const handleClear = useCallback((slotId) => {
    setChecked(false);
    setPlaced(p => { const next = { ...p }; delete next[slotId]; return next; });
  }, []);

  const allFilled = Object.keys(EVAL_TREE_ANSWERS).every(k => placed[k] != null);
  const score = checked ? Object.keys(EVAL_TREE_ANSWERS).filter(k => placed[k] === EVAL_TREE_ANSWERS[k]).length : 0;
  const total = Object.keys(EVAL_TREE_ANSWERS).length;

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: "'Source Sans 3', sans-serif", background: '#fff', overflow: 'hidden',
    }}>
      <QuizNav title="Build the Evaluation" />

      <div style={{
        padding: '8px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a',
        fontSize: 13, color: '#78350f', fontWeight: 500, lineHeight: 1.5, flexShrink: 0,
      }}>
        Given <code style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          background: '#fff7ed', padding: '1px 6px', borderRadius: 3, border: '1px solid #fed7aa',
        }}>a = 10</code>, build the evaluation of{' '}
        <code style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          background: '#fff7ed', padding: '1px 6px', borderRadius: 3, border: '1px solid #fed7aa',
        }}>a + 5</code>. Drag <strong>values</strong> and <strong>rules</strong> into the tree.
      </div>

      {/* Tree area */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 24px', gap: 16, minHeight: 0,
      }}>
        {/* Block 1: base expression + variable lookup */}
        <EvalTreeBlock>
          <DropSlot slotId="s1" placed={placed.s1} correct={EVAL_TREE_ANSWERS.s1}
            checked={checked} onDrop={handleDrop} onClear={handleClear} label="= ?" />
          <EvalRuleLine slotId="r1" placed={placed.r1} correct={EVAL_TREE_ANSWERS.r1}
            checked={checked} onDrop={handleDrop} onClear={handleClear} />
          <ExprBox text="a + 5" />
        </EvalTreeBlock>

        <EvalArrowSlot slotId="ra" placed={placed.ra} correct={EVAL_TREE_ANSWERS.ra}
          checked={checked} onDrop={handleDrop} onClear={handleClear} />

        {/* Block 2: substituted expression + evaluation */}
        <EvalTreeBlock>
          <DropSlot slotId="s3" placed={placed.s3} correct={EVAL_TREE_ANSWERS.s3}
            checked={checked} onDrop={handleDrop} onClear={handleClear} label="= ?" />
          <EvalRuleLine slotId="r2" placed={placed.r2} correct={EVAL_TREE_ANSWERS.r2}
            checked={checked} onDrop={handleDrop} onClear={handleClear} />
          <DropSlot slotId="s2" placed={placed.s2} correct={EVAL_TREE_ANSWERS.s2}
            checked={checked} onDrop={handleDrop} onClear={handleClear} label="expr" />
        </EvalTreeBlock>

        {/* Final arrow + result */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, alignSelf: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#cbd5e1' }}>→</span>
          <div style={{
            padding: '6px 16px', borderRadius: 6,
            background: checked && placed.s3 === EVAL_TREE_ANSWERS.s3 ? '#dcfce7' : '#f1f3f7',
            border: `1.5px solid ${checked && placed.s3 === EVAL_TREE_ANSWERS.s3 ? '#4ade80' : '#e2e6ee'}`,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            fontWeight: 700, color: placed.s3 ? '#1e293b' : '#c1c8d4',
            transition: 'all 0.2s',
          }}>
            {placed.s3 || '?'}
          </div>
        </div>
      </div>

      {/* Banks + Controls */}
      <div style={{ borderTop: '1px solid #e2e6ee', background: '#fafbfc', flexShrink: 0 }}>
        <div style={{ padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Values</span>
          {valBank.map((v, i) => (
            <ReusableChip key={v + i} value={v} />
          ))}
          <span style={{ width: 1, height: 18, background: '#e2e6ee', margin: '0 6px' }} />
          <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Rules</span>
          {ruleBank.map((v, i) => (
            <ReusableChip key={v + i} value={v} color="#fef3c7" />
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

/* ═══ Quiz D: Complete the Code ═══ */

const CODE_QUIZ_LINES = [
  { prefix: 'int a = ', slot: 'c0', suffix: ';', answer: '10' },
  { prefix: 'int b = ', slot: 'c1', suffix: ';', answer: 'a + 5' },
  { prefix: 'string msg = ', slot: 'c2', suffix: ';', answer: '"Hi"' },
  { prefix: 'int[] arr = ', slot: 'c3', suffix: ';', answer: '{1, 2, 3}' },
  { prefix: '', slot: 'c4', suffix: ' = b;', answer: 'arr[1]' },
  { prefix: 'Console.WriteLine(', slot: 'c5', suffix: ');', answer: 'msg' },
  { prefix: 'Console.WriteLine(', slot: 'c6', suffix: ');', answer: 'b' },
];

const CODE_QUIZ_ANSWERS = {};
CODE_QUIZ_LINES.forEach(l => { CODE_QUIZ_ANSWERS[l.slot] = l.answer; });

const CODE_QUIZ_BANK = [
  '10', 'a + 5', '"Hi"', '{1, 2, 3}', 'arr[1]', 'msg', 'b',
  'a + 3', '"Hello"', 'arr[0]', 'a', '15', '{1, 15, 3}',
];

function QuizCompleteCode() {
  const [placed, setPlaced] = useState({});
  const [checked, setChecked] = useState(false);
  const bank = useMemo(() => shuffleArr(CODE_QUIZ_BANK), []);
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

  const allFilled = Object.keys(CODE_QUIZ_ANSWERS).every(k => placed[k] != null);
  const score = checked ? Object.keys(CODE_QUIZ_ANSWERS).filter(k => placed[k] === CODE_QUIZ_ANSWERS[k]).length : 0;
  const total = Object.keys(CODE_QUIZ_ANSWERS).length;

  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: "'Source Sans 3', sans-serif", background: '#fff', overflow: 'hidden',
    }}>
      <QuizNav title="Complete the Code" />

      <div style={{
        padding: '8px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a',
        fontSize: 13, color: '#78350f', fontWeight: 500, lineHeight: 1.5, flexShrink: 0,
      }}>
        Given the final memory state, drag code fragments to complete the program.
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        {/* Code with blanks */}
        <div style={{ width: '52%', padding: '10px 10px 8px 16px', overflow: 'auto' }}>
          <div style={{
            ...mono, fontSize: 12, lineHeight: '26px',
            background: '#f8f9fb', borderRadius: 6, border: '1px solid #e2e6ee',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '4px 12px', borderBottom: '1px solid #e2e6ee',
              fontSize: 9.5, fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
              letterSpacing: '0.06em', background: '#f1f3f7',
            }}>Program.cs — fill in the blanks</div>
            <div style={{ padding: '6px 0' }}>
              {CODE_QUIZ_LINES.map((line, i) => (
                <div key={line.slot} style={{
                  display: 'flex', alignItems: 'center', padding: '1px 10px',
                  gap: 0,
                }}>
                  <span style={{ width: 22, textAlign: 'right', color: '#c1c8d4', marginRight: 10, fontSize: 11 }}>
                    {i + 1}
                  </span>
                  {line.prefix && (
                    <span dangerouslySetInnerHTML={{ __html: syntaxHL(line.prefix) }} />
                  )}
                  <DropSlot slotId={line.slot} placed={placed[line.slot]}
                    correct={CODE_QUIZ_ANSWERS[line.slot]} checked={checked}
                    onDrop={handleDrop} onClear={handleClear} label="___" />
                  {line.suffix && (
                    <span dangerouslySetInnerHTML={{ __html: syntaxHL(line.suffix) }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: '#e2e6ee', flexShrink: 0 }} />

        {/* Given: final memory state (read-only) */}
        <div style={{ flex: 1, padding: '10px 16px 8px 12px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>
            Final state after execution:
          </div>

          {/* Stack (given) */}
          <div>
            <div style={secLabelStyle}>Stack Frame</div>
            <div style={{ border: '1px solid #e2e6ee', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
              {[
                { n: 'a', t: 'int', v: '10' },
                { n: 'b', t: 'int', v: '15' },
                { n: 'msg', t: 'string', v: '0x3A8F' },
                { n: 'arr', t: 'int[]', v: '0x7C12' },
              ].map((r, i) => (
                <div key={r.n} style={{
                  display: 'grid', gridTemplateColumns: '36px 44px 1fr',
                  alignItems: 'center', padding: '3px 10px',
                  borderTop: i > 0 ? '1px solid #f1f3f7' : 'none',
                  ...mono, fontSize: 11,
                }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.n}</span>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{r.t}</span>
                  <span style={{ fontWeight: 600, color: '#2563eb' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heap (given) */}
          <div>
            <div style={secLabelStyle}>Heap</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { a: '0x3A8F', t: 'String', d: '"Hi"' },
                { a: '0x7C12', t: 'Int32[]', d: '[1, 15, 3]' },
              ].map(r => (
                <div key={r.a} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '3px 8px', borderRadius: 5,
                  background: '#f8f9fb', border: '1px solid #e2e6ee',
                  ...mono, fontSize: 10.5,
                }}>
                  <span style={{ fontWeight: 600, color: '#64748b' }}>{r.a}</span>
                  <span style={{ color: '#94a3b8', fontSize: 9.5 }}>{r.t}</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Console (given) */}
          <div>
            <div style={secLabelStyle}>Console</div>
            <div style={{
              background: '#1e1e2e', borderRadius: 6, border: '1px solid #313244', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: '#181825', borderBottom: '1px solid #313244' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f38ba8' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f9e2af' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a6e3a1' }} />
                <span style={{ fontSize: 8, color: '#6c7086', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, marginLeft: 3 }}>stdout</span>
              </div>
              <div style={{ padding: '4px 10px', ...mono, fontSize: 11, lineHeight: '18px' }}>
                <div style={{ color: '#cdd6f4' }}>Hi</div>
                <div style={{ color: '#cdd6f4' }}>15</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank + Controls */}
      <div style={{ borderTop: '1px solid #e2e6ee', background: '#fafbfc', flexShrink: 0 }}>
        <div style={{ padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Fragments</span>
          {bank.map((v, i) => (
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

Object.assign(window, { QuizEvalTree, QuizCompleteCode });
