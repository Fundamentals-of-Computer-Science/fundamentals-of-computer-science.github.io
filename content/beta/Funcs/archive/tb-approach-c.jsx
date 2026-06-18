/* tb-approach-c.jsx — State Timeline */

const { useState } = React;
const {
  TB_CODE, TB_STEPS, REF_COLORS, syntaxHL, renderDesc,
  TBStepControls, secLabelStyle,
} = window;

/* ── Timeline Column ── */

function TimelineCol({ stepIdx, stepData, isCurrent, onClick }) {
  const { stack, heap } = stepData;
  const allVars = stack.map(v => v.name);

  return (
    <div onClick={onClick} style={{
      flex: 1, minWidth: 0, cursor: 'pointer',
      background: isCurrent ? '#f0f7ff' : '#fff',
      border: isCurrent ? '1.5px solid #93c5fd' : '1px solid #e2e6ee',
      borderRadius: 6, padding: '6px 6px 8px',
      transition: 'all 0.25s ease',
      boxShadow: isCurrent ? '0 2px 8px rgba(59,130,246,0.12)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      {/* Step number */}
      <div style={{
        fontSize: 9, fontWeight: 700, textAlign: 'center',
        color: isCurrent ? '#3b82f6' : '#94a3b8',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.04em',
      }}>S{stepIdx}</div>

      {/* Divider */}
      <div style={{
        height: 1, background: isCurrent ? '#bfdbfe' : '#f1f3f7',
        margin: '1px 0',
      }} />

      {/* Stack entries */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 2,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      }}>
        {stack.length === 0 && (
          <div style={{
            color: '#d1d5db', fontSize: 9, textAlign: 'center',
            fontFamily: "'Source Sans 3', sans-serif", fontStyle: 'italic',
            padding: '4px 0',
          }}>—</div>
        )}
        {stack.map(v => (
          <div key={v.name} style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '1px 3px', borderRadius: 3,
            background: v.isNew ? '#ecfdf5' : 'transparent',
            transition: 'background 0.3s',
          }}>
            <span style={{
              fontWeight: 600, color: '#475569',
              width: 24, fontSize: 9.5, flexShrink: 0,
            }}>{v.name}</span>
            {v.ref ? (
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: REF_COLORS[v.ref]?.dot || '#94a3b8',
                flexShrink: 0,
              }} />
            ) : (
              <span style={{
                color: v.isNew ? '#059669' : '#2563eb',
                fontWeight: v.isNew ? 600 : 500, fontSize: 10,
              }}>{v.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Heap entries (compact) */}
      {heap.length > 0 && (
        <div style={{
          marginTop: 2, paddingTop: 3,
          borderTop: '1px dashed #e2e6ee',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {heap.map(obj => {
            const rc = REF_COLORS[obj.id] || {};
            return (
              <div key={obj.id} style={{
                display: 'flex', alignItems: 'center', gap: 3,
                padding: '1px 3px', borderRadius: 3,
                background: rc.bg || '#f8f9fb',
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: rc.dot || '#94a3b8', flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9, fontWeight: 500, color: '#475569',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {Array.isArray(obj.display)
                    ? `[${obj.display.map((v, i) =>
                        obj.changed?.includes(i) ? `${v}!` : v
                      ).join(',')}]`
                    : obj.display}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Delta Badge ── */

function DeltaBadge({ stepData, prevData }) {
  if (!stepData || !prevData) return null;
  const newVars = stepData.stack.filter(v => v.isNew);
  const heapChanges = stepData.heap.filter(h => h.changed && h.changed.length > 0);
  const newHeap = stepData.heap.filter(h =>
    !prevData.heap.find(ph => ph.id === h.id)
  );

  const deltas = [];
  newVars.forEach(v => {
    if (v.ref) {
      deltas.push({ text: `+ ${v.name} →`, color: '#7c3aed' });
    } else {
      deltas.push({ text: `+ ${v.name}=${v.value}`, color: '#059669' });
    }
  });
  newHeap.forEach(h => {
    deltas.push({
      text: `heap: ${Array.isArray(h.display) ? '[…]' : h.display}`,
      color: REF_COLORS[h.id]?.dot || '#64748b',
    });
  });
  heapChanges.forEach(h => {
    deltas.push({ text: `mutate [${h.changed.join(',')}]`, color: '#dc2626' });
  });

  if (deltas.length === 0) return null;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 2,
      alignItems: 'center',
    }}>
      {deltas.map((d, i) => (
        <span key={i} style={{
          fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace",
          color: d.color, fontWeight: 600,
          background: d.color + '12', padding: '0 4px',
          borderRadius: 2, whiteSpace: 'nowrap',
        }}>{d.text}</span>
      ))}
    </div>
  );
}

/* ── Approach C: State Timeline ── */

function ApproachC() {
  const [step, setStep] = useState(0);
  const maxStep = TB_STEPS.length - 1;
  const s = TB_STEPS[step];

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

      {/* Code panel (compact, full width) */}
      <div style={{
        padding: '8px 16px', borderBottom: '1px solid #e2e6ee', flexShrink: 0,
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
          lineHeight: '20px', background: '#f8f9fb',
          borderRadius: 6, border: '1px solid #e2e6ee', overflow: 'hidden',
        }}>
          <div style={{
            padding: '3px 12px', borderBottom: '1px solid #e2e6ee',
            fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
            letterSpacing: '0.06em', background: '#f1f3f7',
          }}>Program.cs</div>
          <div style={{ padding: '3px 0', display: 'flex', flexWrap: 'wrap' }}>
            {TB_CODE.map((line, i) => {
              const isActive = i === s.line;
              const isFuture = s.line >= 0 && i > s.line;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', padding: '0 10px',
                  width: i < 2 ? '50%' : i < 4 ? '50%' : '100%',
                  background: isActive ? '#fef9e7' : 'transparent',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                  opacity: isFuture ? 0.32 : 1, transition: 'all 0.25s ease',
                }}>
                  <span style={{
                    width: 18, textAlign: 'right',
                    color: isActive ? '#3b82f6' : '#c1c8d4',
                    marginRight: 8, fontSize: 10.5,
                    fontWeight: isActive ? 600 : 400,
                  }}>{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: syntaxHL(line) }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        flex: 1, padding: '10px 16px 4px', minHeight: 0,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{ ...secLabelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Memory Timeline</span>
          <div style={{
            flex: 1, height: 1, background: '#e2e6ee',
          }} />
          <span style={{ fontSize: 9, color: '#94a3b8', fontWeight: 400 }}>
            click a column to jump
          </span>
        </div>

        {/* Timeline columns */}
        <div style={{
          flex: 1, display: 'flex', gap: 5, minHeight: 0,
        }}>
          {TB_STEPS.map((sd, i) => (
            <TimelineCol
              key={i}
              stepIdx={i}
              stepData={sd}
              isCurrent={i === step}
              onClick={() => setStep(i)}
            />
          ))}
        </div>

        {/* Delta badges row */}
        <div style={{
          display: 'flex', gap: 5,
          minHeight: 22,
        }}>
          {TB_STEPS.map((sd, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              {i > 0 && <DeltaBadge stepData={sd} prevData={TB_STEPS[i - 1]} />}
            </div>
          ))}
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

Object.assign(window, { ApproachC });
