/* tb-approach-a.jsx — Classic Split Panel (with eval detail zoom) */

const { useState, useEffect, useCallback } = React;
const {
  TB_STEPS, REF_COLORS, HEAP_ADDRS, renderDesc, TBCodePanel, TBStepControls, secLabelStyle,
} = window;

/* ── Address Chip with tooltip ── */

function AddrChip({ refId, style }) {
  const [tipOpen, setTipOpen] = useState(false);
  const addr = HEAP_ADDRS[refId] || '0x????';
  const rc = REF_COLORS[refId] || {};

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <span
        onClick={(e) => { e.stopPropagation(); setTipOpen(t => !t); }}
        onMouseEnter={() => setTipOpen(true)}
        onMouseLeave={() => setTipOpen(false)}
        style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5,
          fontWeight: 600, color: rc.dot || '#64748b',
          background: rc.bg || '#f1f5f9',
          border: `1px solid ${rc.border || '#cbd5e1'}`,
          borderRadius: 3, padding: '0 5px', cursor: 'help',
          letterSpacing: '0.02em', lineHeight: '18px',
          transition: 'box-shadow 0.15s',
          boxShadow: tipOpen ? `0 0 0 2px ${rc.border || '#cbd5e1'}44` : 'none',
          ...style,
        }}
      >{addr}</span>
      {tipOpen && (
        <span style={{
          position: 'absolute', bottom: '100%', left: '50%',
          transform: 'translateX(-50%)', marginBottom: 6,
          background: '#1e293b', color: '#f1f5f9',
          fontSize: 10, lineHeight: 1.4, padding: '5px 9px',
          borderRadius: 5, whiteSpace: 'nowrap',
          fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400,
          boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
          pointerEvents: 'none', zIndex: 10,
        }}>
          <strong style={{ fontWeight: 600 }}>{addr}</strong> is a memory address on the heap.
          <br/>The variable stores this address, not the data itself.
          <span style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            border: '5px solid transparent',
            borderTopColor: '#1e293b',
          }} />
        </span>
      )}
    </span>
  );
}

/* ── Memory Visualization ── */

/* ── Console Output (terminal style) ── */

function ConsoleOutput({ lines }) {
  return (
    <div>
      <div style={secLabelStyle}>Console</div>
      <div style={{
        background: '#1e1e2e', borderRadius: 6, overflow: 'hidden',
        border: '1px solid #313244',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', background: '#181825',
          borderBottom: '1px solid #313244',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f38ba8' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f9e2af' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1' }} />
          <span style={{
            fontSize: 9, color: '#6c7086', fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 600, marginLeft: 4,
          }}>stdout</span>
        </div>
        {/* Output area */}
        <div style={{
          padding: '6px 10px', minHeight: 28,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          lineHeight: '18px',
        }}>
          {(!lines || lines.length === 0) ? (
            <span style={{ color: '#585b70', fontStyle: 'italic', fontSize: 10 }}>
              (no output)
            </span>
          ) : lines.map((ln, i) => (
            <div key={i} style={{
              color: ln.isNew ? '#a6e3a1' : '#cdd6f4',
              transition: 'color 0.4s',
            }}>
              {ln.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemoryFull({ stepData }) {
  const { stack, heap } = stepData;
  const cs = { fontFamily: "'JetBrains Mono', monospace", fontSize: 12 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
      <div>
        <div style={secLabelStyle}>Stack Frame</div>
        <div style={{
          border: '1px solid #e2e6ee', borderRadius: 6, overflow: 'hidden', background: '#fff',
        }}>
          {/* Column headers */}
          {stack.length > 0 && (
            <div style={{
              display: 'grid', gridTemplateColumns: '42px 50px 1fr',
              padding: '3px 12px 2px', borderBottom: '1px solid #f1f3f7',
              background: '#fafbfc',
            }}>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif" }}>Name</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif" }}>Type</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif" }}>Value</span>
            </div>
          )}
          {stack.length === 0 ? (
            <div style={{
              padding: '10px 12px', color: '#94a3b8', fontStyle: 'italic',
              fontSize: 11.5, fontFamily: "'Source Sans 3', sans-serif",
            }}>(empty)</div>
          ) : stack.map((v, i) => (
            <div key={v.name} style={{
              display: 'grid', gridTemplateColumns: '42px 50px 1fr',
              alignItems: 'center', padding: '5px 12px',
              borderTop: i > 0 ? '1px solid #f1f3f7' : 'none',
              background: v.isNew ? '#f0fdf4' : '#fff', transition: 'background 0.3s',
            }}>
              <span style={{ ...cs, fontWeight: 600, color: '#1e293b' }}>{v.name}</span>
              <span style={{ ...cs, fontSize: 10.5, color: '#94a3b8' }}>{v.type}</span>
              {v.ref ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <AddrChip refId={v.ref} />
                </span>
              ) : (
                <span style={{
                  ...cs, fontWeight: 600, color: v.isNew ? '#059669' : '#2563eb',
                }}>{v.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={secLabelStyle}>Heap</div>
        {heap.length > 0 && (
          <div style={{
            display: 'flex', gap: 8, padding: '0 10px 3px',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif", width: 52 }}>Addr</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif", width: 42 }}>Type</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: '#c1c8d4', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Source Sans 3', sans-serif" }}>Data</span>
          </div>
        )}
        {heap.length === 0 ? (
          <div style={{
            padding: '10px 12px', color: '#c1c8d4', fontStyle: 'italic',
            fontSize: 11.5, fontFamily: "'Source Sans 3', sans-serif",
            border: '1px dashed #e2e6ee', borderRadius: 6,
          }}>(no allocations)</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {heap.map(obj => {
              const rc = REF_COLORS[obj.id] || {};
              return (
                <div key={obj.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '5px 10px', borderRadius: 6,
                  background: rc.bg || '#f8f9fb',
                  border: `1.5px solid ${rc.border || '#e2e6ee'}`,
                }}>
                  <AddrChip refId={obj.id} />
                  <span style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 600 }}>{obj.type}</span>
                  <span style={{ ...cs, fontWeight: 500, color: '#1e293b' }}>
                    {renderHeapVal(obj)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Console output */}
      <ConsoleOutput lines={stepData.console} />
    </div>
  );
}

function renderHeapVal(obj) {
  if (!Array.isArray(obj.display)) return obj.display;
  return (
    <span>
      {'[ '}
      {obj.display.map((v, i) => (
        <span key={i}>
          {i > 0 && <span style={{ color: '#94a3b8' }}>, </span>}
          <span style={{
            color: obj.changed?.includes(i) ? '#dc2626' : '#1e293b',
            fontWeight: obj.changed?.includes(i) ? 700 : 500,
            background: obj.changed?.includes(i) ? '#fee2e2' : 'none',
            padding: obj.changed?.includes(i) ? '0 3px' : 0, borderRadius: 2,
          }}>{v}</span>
        </span>
      ))}
      {' ]'}
    </span>
  );
}

/* ── Clickable Eval Chain ── */

function EvalChainClickable({ evalSteps, onClick }) {
  if (!evalSteps) return null;
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
      background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 6,
      padding: '5px 10px', cursor: 'pointer', width: '100%',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 1px 6px rgba(245,158,11,0.18)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#fde68a'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 2, color: '#b45309' }}>Eval</span>
      {evalSteps.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: '#94a3b8', fontSize: 13 }}>→</span>}
          <span style={{
            padding: '2px 7px', borderRadius: 4,
            background: i === evalSteps.length - 1 ? '#d1fae5' : i === 0 ? '#fff7ed' : '#f1f3f7',
            border: `1px solid ${i === evalSteps.length - 1 ? '#6ee7b7' : i === 0 ? '#fed7aa' : '#e2e6ee'}`,
            fontWeight: i === evalSteps.length - 1 ? 600 : 400,
            color: i === evalSteps.length - 1 ? '#047857' : '#1e293b',
          }}>{s}</span>
        </React.Fragment>
      ))}
      <span style={{
        marginLeft: 'auto', fontSize: 10, fontWeight: 600,
        color: '#b45309', fontFamily: "'Source Sans 3', sans-serif",
        display: 'flex', alignItems: 'center', gap: 3,
        paddingLeft: 8,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Details
      </span>
    </button>
  );
}

/* ── Approach A: Classic Split Panel ── */

function ApproachA() {
  const [step, setStep] = useState(0);
  const [evalOpen, setEvalOpen] = useState(false);
  const maxStep = TB_STEPS.length - 1;
  const s = TB_STEPS[step];

  const evalTree = window.EVAL_TREES && window.EVAL_TREES[step];
  const { EvalDetailPanel } = window;

  useEffect(() => { setEvalOpen(false); }, [step]);

  const closeEval = useCallback(() => setEvalOpen(false), []);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: "'Source Sans 3', sans-serif", background: '#fff', overflow: 'hidden',
    }}>
      {/* Description bar */}
      <div style={{
        padding: '8px 16px', fontSize: 12.5, lineHeight: 1.5,
        color: '#475569', background: '#f0f7ff', borderBottom: '1px solid #dbeafe',
        display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
      }}>
        <span style={{
          fontWeight: 700, color: '#3b82f6', fontSize: 11,
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap',
        }}>Step {step}</span>
        <span>{renderDesc(s.desc)}</span>
      </div>

      {/* Main panels */}
      <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0, overflow: 'hidden' }}>
        {/* Code */}
        <div style={{
          width: '46%', padding: '12px 12px 8px 16px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <TBCodePanel activeLine={s.line} style={{ flex: s.eval ? undefined : 1 }} compact />
          {s.eval && (
            <EvalChainClickable
              evalSteps={s.eval}
              onClick={() => setEvalOpen(true)}
            />
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: '#e2e6ee', flexShrink: 0 }} />

        {/* Right panel: Memory or Eval Detail */}
        <div style={{
          flex: 1, padding: '12px 16px 8px 12px',
          display: 'flex', flexDirection: 'column',
        }}>
          {evalOpen && evalTree && EvalDetailPanel ? (
            <EvalDetailPanel data={evalTree} onClose={closeEval} />
          ) : (
            <MemoryFull stepData={s} />
          )}
        </div>
      </div>

      {/* Footer controls */}
      <div style={{
        borderTop: '1px solid #e2e6ee', padding: '6px 16px',
        background: '#fafbfc', flexShrink: 0,
      }}>
        <TBStepControls step={step} setStep={setStep} maxStep={maxStep} compact />
      </div>
    </div>
  );
}

Object.assign(window, { ApproachA, MemoryFull, EvalChainClickable });
