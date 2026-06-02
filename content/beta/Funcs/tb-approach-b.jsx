/* tb-approach-b.jsx — Inline Annotations */

const { useState, useRef, useEffect } = React;
const {
  TB_CODE, TB_STEPS, REF_COLORS, syntaxHL, renderDesc,
  TBStepControls, secLabelStyle,
} = window;

/* ── Annotation Callout ── */

function AnnotationCallout({ annotation, evalSteps, lineY }) {
  if (!annotation && !evalSteps) return null;
  return (
    <div style={{
      position: 'absolute', left: 0, top: lineY - 4,
      width: '100%', pointerEvents: 'none',
      transition: 'top 0.3s ease',
    }}>
      <div style={{
        background: '#fffbeb', border: '1px solid #fde68a',
        borderRadius: 6, padding: '5px 10px',
        fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace",
        color: '#92400e', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        pointerEvents: 'auto',
      }}>
        {evalSteps ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
            {evalSteps.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#b45309' }}>→</span>}
                <span style={{
                  padding: '1px 5px', borderRadius: 3,
                  background: i === evalSteps.length - 1 ? '#d1fae5' : 'rgba(255,255,255,0.7)',
                  fontWeight: i === evalSteps.length - 1 ? 600 : 400,
                  color: i === evalSteps.length - 1 ? '#047857' : '#92400e',
                }}>{s}</span>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <span>{annotation}</span>
        )}
      </div>
    </div>
  );
}

/* ── Memory Chip Bar ── */

function MemoryChipBar({ stepData, style }) {
  const { stack, heap } = stepData;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
      padding: '6px 12px', background: '#f8f9fb',
      borderRadius: 6, border: '1px solid #e2e6ee',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, ...style,
    }}>
      <span style={{ ...secLabelStyle, marginBottom: 0, fontSize: 9 }}>Memory</span>
      {stack.length === 0 && (
        <span style={{
          color: '#94a3b8', fontStyle: 'italic', fontSize: 10.5,
          fontFamily: "'Source Sans 3', sans-serif",
        }}>(empty)</span>
      )}
      {stack.map(v => (
        <span key={v.name} style={{
          display: 'flex', alignItems: 'center', gap: 3,
          background: v.isNew ? '#f0fdf4' : '#fff',
          border: `1px solid ${v.isNew ? '#bbf7d0' : '#e2e6ee'}`,
          borderRadius: 4, padding: '1px 7px',
          transition: 'background 0.3s',
        }}>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>{v.name}</span>
          <span style={{ color: '#c1c8d4' }}>=</span>
          {v.ref ? (
            <span style={{
              width: 6, height: 6, borderRadius: '50%', display: 'inline-block',
              background: REF_COLORS[v.ref]?.dot || '#94a3b8',
            }} />
          ) : (
            <span style={{ color: '#2563eb', fontWeight: 500 }}>{v.value}</span>
          )}
        </span>
      ))}
      {heap.map(obj => {
        const rc = REF_COLORS[obj.id] || {};
        return (
          <span key={obj.id} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: rc.bg || '#f8f9fb',
            border: `1px solid ${rc.border || '#e2e6ee'}`,
            borderRadius: 4, padding: '1px 7px',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: rc.dot || '#94a3b8',
            }} />
            <span style={{ fontWeight: 500, color: '#1e293b', fontSize: 10.5 }}>
              {Array.isArray(obj.display)
                ? `[${obj.display.map((v, i) =>
                    obj.changed?.includes(i) ? `*${v}*` : v
                  ).join(', ')}]`
                : obj.display}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ── Approach B: Code + Inline Annotations ── */

function ApproachB() {
  const [step, setStep] = useState(0);
  const maxStep = TB_STEPS.length - 1;
  const s = TB_STEPS[step];
  const LH = 21;

  /* Annotation data per line */
  const annotations = {
    0: step === 1 ? 'a ← 10 (value type)' : null,
    1: step === 2 ? null : null,  // uses eval chain instead
    2: step === 3 ? 'msg → heap ref' : null,
    3: step === 4 ? 'arr → heap ref' : null,
    4: step === 5 ? null : null,  // uses eval chain instead
  };

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

      {/* Code + Annotations area */}
      <div style={{
        flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden',
      }}>
        {/* Code */}
        <div style={{
          width: '54%', padding: '12px 0 8px 16px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          lineHeight: LH + 'px',
        }}>
          <div style={{
            background: '#f8f9fb', borderRadius: 6,
            border: '1px solid #e2e6ee', overflow: 'hidden',
          }}>
            <div style={{
              padding: '4px 12px', borderBottom: '1px solid #e2e6ee',
              fontSize: 9.5, fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase',
              letterSpacing: '0.06em', background: '#f1f3f7',
            }}>Program.cs</div>
            <div style={{ padding: '5px 0' }}>
              {TB_CODE.map((line, i) => {
                const isActive = i === s.line;
                const isFuture = s.line >= 0 && i > s.line;
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
                      marginRight: 10, userSelect: 'none', fontSize: 12,
                      fontWeight: isActive ? 600 : 400,
                    }}>{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: syntaxHL(line) }} />
                    {isActive && (
                      <span style={{
                        marginLeft: 'auto', paddingLeft: 10,
                        color: '#3b82f6', fontSize: 10, fontWeight: 600,
                      }}>◀</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Annotation panel */}
        <div style={{
          flex: 1, padding: '12px 16px 8px 12px',
          display: 'flex', flexDirection: 'column', gap: 10,
          position: 'relative',
        }}>
          {/* Active annotation */}
          {s.line >= 0 && (
            <div style={{
              marginTop: 25 + s.line * LH,
              transition: 'margin-top 0.3s ease',
            }}>
              {s.eval ? (
                <div style={{
                  background: '#fffbeb', border: '1px solid #fde68a',
                  borderRadius: 6, padding: '8px 12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ ...secLabelStyle, marginBottom: 6, color: '#b45309' }}>
                    Evaluation
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  }}>
                    {s.eval.map((e, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span style={{ color: '#b45309' }}>→</span>}
                        <span style={{
                          padding: '2px 6px', borderRadius: 3,
                          background: i === s.eval.length - 1 ? '#d1fae5' : 'rgba(255,255,255,0.6)',
                          fontWeight: i === s.eval.length - 1 ? 600 : 400,
                          color: i === s.eval.length - 1 ? '#047857' : '#92400e',
                        }}>{e}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : annotations[s.line] ? (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  borderRadius: 6, padding: '8px 12px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: '#047857', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  {annotations[s.line]}
                </div>
              ) : (
                <div style={{
                  background: '#f0f7ff', border: '1px solid #bfdbfe',
                  borderRadius: 6, padding: '8px 12px',
                  fontSize: 12, color: '#1e40af',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  {s.stack.find(v => v.isNew) ? (
                    <span>
                      <strong>{s.stack.find(v => v.isNew).name}</strong>
                      {' added to stack'}
                    </span>
                  ) : 'Executing...'}
                </div>
              )}
            </div>
          )}

          {s.line < 0 && (
            <div style={{
              marginTop: 30, padding: '12px',
              color: '#94a3b8', fontStyle: 'italic', fontSize: 12,
              textAlign: 'center', border: '1px dashed #e2e6ee', borderRadius: 6,
            }}>
              Step through code to see annotations
            </div>
          )}
        </div>
      </div>

      {/* Bottom: compact memory + controls */}
      <div style={{
        borderTop: '1px solid #e2e6ee', padding: '6px 16px',
        background: '#fafbfc', flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        <MemoryChipBar stepData={s} />
        <TBStepControls step={step} setStep={setStep} maxStep={maxStep} compact />
      </div>
    </div>
  );
}

Object.assign(window, { ApproachB });
