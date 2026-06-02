/* tb-integrated.jsx — Annotated code + memory split panel */

function IntegratedAnnotationsMemory() {
  const [activeLine, setActiveLine] = React.useState(0);
  const [expandedLine, setExpandedLine] = React.useState(0);
  const [activeDef, setActiveDef] = React.useState(null);

  const {
    ANN_TOKENS, ANN_TRANS, ANN_MONO, ANN_SANS, AnnToken, AnnDefBar,
    MemoryFull, TB_STEPS, renderDesc,
  } = window;

  const step = activeLine + 1;
  const stepData = TB_STEPS[step];

  const selectLine = (lineIndex) => {
    setActiveLine(prevActive => {
      setExpandedLine(prevExpanded =>
        prevActive === lineIndex && prevExpanded === lineIndex ? null : lineIndex
      );
      return lineIndex;
    });
  };

  const codeText = (tokens) => tokens.map(tok => tok.t).join('');

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: ANN_SANS, background: '#fff', overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 18px', borderBottom: '1px solid #e2e6ee',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        background: '#fafbfc',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
        }}>Integrated Example</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
          Variables &amp; Memory
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          Click a line to expand it and update memory
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        <div style={{
          width: '54%', minWidth: 0, borderRight: '1px solid #e2e6ee',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '8px 18px', borderBottom: '1px solid #edf1f7',
            background: '#fff', flexShrink: 0,
          }}>
            <div style={{
              fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 4,
            }}>Program.cs</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#64748b' }}>
              Each line is a small lesson. The memory panel shows the state after that line runs.
            </div>
          </div>

          <div style={{
            flex: 1, overflow: 'auto', padding: '8px 0 10px',
            fontFamily: ANN_MONO, fontSize: 13.5, lineHeight: '24px',
          }}>
            {ANN_TOKENS.map((line, li) => {
              const isActive = li === activeLine;
              const isExpanded = li === expandedLine;
              return (
                <div key={li} style={{
                  borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                  background: isActive ? '#f8fbff' : 'transparent',
                  transition: 'background 0.15s, border-color 0.15s',
                }}>
                  <div
                    onClick={() => selectLine(li)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`Show explanation for line ${li + 1}: ${codeText(line)}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectLine(li);
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '4px 18px 4px 15px',
                      cursor: 'pointer', outline: 'none',
                    }}>
                    <span style={{
                      width: 26, textAlign: 'right', marginRight: 16,
                      color: isActive ? '#2563eb' : '#c1c8d4',
                      fontSize: 12, fontWeight: isActive ? 700 : 400,
                      userSelect: 'none', position: 'relative', flexShrink: 0,
                    }}>
                      {li + 1}
                      <span style={{
                        position: 'absolute', right: -10, top: '50%',
                        transform: `translateY(-50%) rotate(${isExpanded ? 90 : 0}deg)`,
                        fontSize: 8, color: isExpanded ? '#2563eb' : '#cbd5e1',
                        transition: 'transform 0.2s, color 0.15s',
                      }}>▶</span>
                    </span>
                    <span>
                      {line.map((tok, ti) => (
                        <AnnToken
                          key={ti}
                          tok={tok}
                          fontSize={13.5}
                          isActive={activeDef === tok.k}
                          onEnter={() => tok.k && setActiveDef(tok.k)}
                          onLeave={() => setActiveDef(null)}
                        />
                      ))}
                    </span>
                  </div>

                  {isExpanded && (
                    <div style={{
                      margin: '0 18px 8px 60px', padding: '8px 12px',
                      background: '#eff6ff', borderLeft: '3px solid #2563eb',
                      borderRadius: '0 6px 6px 0',
                      fontFamily: ANN_SANS, fontSize: 12.5, lineHeight: 1.45,
                      color: '#1e40af',
                    }}>
                      {ANN_TRANS[li]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <AnnDefBar defKey={activeDef} style={{ flexShrink: 0 }} />
        </div>

        <div style={{
          flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
          background: '#fbfcfe',
        }}>
          <div style={{
            padding: '9px 16px', borderBottom: '1px solid #e2e6ee',
            display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
            background: '#fff',
          }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#047857',
              background: '#d1fae5', borderRadius: 3,
              padding: '2px 8px', whiteSpace: 'nowrap',
            }}>After line {activeLine + 1}</span>
            <span style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.35 }}>
              {renderDesc(stepData.desc)}
            </span>
          </div>

          <div style={{
            flex: 1, minHeight: 0, padding: '12px 14px',
            display: 'flex', flexDirection: 'column', overflow: 'auto',
          }}>
            <MemoryFull stepData={stepData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegratedFullPageExample() {
  const [step, setStep] = React.useState(0);
  const [expandedLine, setExpandedLine] = React.useState(null);
  const [activeDef, setActiveDef] = React.useState(null);
  const [evalOpen, setEvalOpen] = React.useState(false);

  const {
    ANN_TOKENS, ANN_TRANS, ANN_MONO, ANN_SANS, AnnToken, AnnDefBar,
    MemoryFull, TB_STEPS, TBStepControls, renderDesc,
    EvalChainClickable, EvalDetailPanel, EVAL_TREES,
  } = window;

  const maxStep = TB_STEPS.length - 1;
  const activeLine = step > 0 ? step - 1 : null;
  const stepData = TB_STEPS[step];
  const evalTree = EVAL_TREES && EVAL_TREES[step];

  React.useEffect(() => {
    setExpandedLine(null);
    setEvalOpen(false);
  }, [activeLine]);

  const toggleTranslation = (lineIndex) => {
    setExpandedLine(prev => prev === lineIndex ? null : lineIndex);
  };

  const goPrev = () => setStep(prev => Math.max(0, prev - 1));
  const goNext = () => setStep(prev => Math.min(maxStep, prev + 1));
  const codeText = (tokens) => tokens.map(tok => tok.t).join('');

  const navBtn = (disabled, primary) => ({
    fontFamily: ANN_SANS, fontSize: 11, fontWeight: 600,
    padding: '4px 10px', borderRadius: 4,
    border: primary ? 'none' : '1px solid #dbe3ef',
    background: primary ? '#2563eb' : '#fff',
    color: primary ? '#fff' : '#475569',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden', fontFamily: ANN_SANS,
    }}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 20px', borderBottom: '1px solid #e2e6ee',
        background: '#fff', flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Unit 2</span>
        <span style={{ fontSize: 10, color: '#d1d5db' }}>›</span>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Chapter 4</span>
        <span style={{ fontSize: 10, color: '#d1d5db' }}>›</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
          Example: Variables &amp; Memory
        </span>
        <div style={{ flex: 1 }} />
        <button onClick={goPrev} disabled={step === 0} style={navBtn(step === 0, false)}>
          ‹ Prev
        </button>
        <button onClick={goNext} disabled={step === maxStep} style={navBtn(step === maxStep, true)}>
          Next ›
        </button>
      </div>

      <div style={{
        padding: '8px 18px', borderBottom: '1px solid #e2e6ee',
        background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
        }}>Walkthrough</span>
        <span style={{ fontSize: 12, color: '#64748b' }}>
          Use next to run the program. Click any code line for its translation; hover tokens for definitions.
        </span>
        <div style={{ flex: 1 }} />
        <span style={{
          fontFamily: ANN_MONO, fontSize: 10.5, color: '#94a3b8',
          fontVariantNumeric: 'tabular-nums',
        }}>step {step} / {maxStep}</span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        <div style={{
          width: '55%', minWidth: 0, display: 'flex', flexDirection: 'column',
          borderRight: '1px solid #e2e6ee', background: '#fff',
        }}>
          <div style={{
            padding: '8px 18px', borderBottom: '1px solid #edf1f7',
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 4,
            }}>Program.cs</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#64748b' }}>
              The highlighted line is the next executed state. Translations are optional and collapsible.
            </div>
          </div>

          <div style={{
            flex: 1, overflow: 'auto', padding: '8px 0 10px',
            fontFamily: ANN_MONO, fontSize: 13.5, lineHeight: '24px',
          }}>
            {ANN_TOKENS.map((line, li) => {
              const isActive = li === activeLine;
              const isExpanded = li === expandedLine;
              const isFuture = activeLine !== null && li > activeLine;
              const hasRun = activeLine !== null && li < activeLine;
              return (
                <div key={li} style={{
                  borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                  background: isActive ? '#f8fbff' : hasRun ? '#fbfdff' : 'transparent',
                  opacity: isFuture ? 0.48 : 1,
                  transition: 'background 0.15s, border-color 0.15s, opacity 0.15s',
                }}>
                  <div
                    onClick={() => toggleTranslation(li)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle translation for line ${li + 1}: ${codeText(line)}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTranslation(li);
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '4px 18px 4px 15px',
                      cursor: 'pointer', outline: 'none',
                    }}>
                    <span style={{
                      width: 26, textAlign: 'right', marginRight: 16,
                      color: isActive ? '#2563eb' : hasRun ? '#64748b' : '#c1c8d4',
                      fontSize: 12, fontWeight: isActive ? 700 : 400,
                      userSelect: 'none', position: 'relative', flexShrink: 0,
                    }}>
                      {li + 1}
                      <span style={{
                        position: 'absolute', right: -10, top: '50%',
                        transform: `translateY(-50%) rotate(${isExpanded ? 90 : 0}deg)`,
                        fontSize: 8, color: isExpanded ? '#2563eb' : '#cbd5e1',
                        transition: 'transform 0.2s, color 0.15s',
                      }}>▶</span>
                    </span>
                    <span>
                      {line.map((tok, ti) => (
                        <AnnToken
                          key={ti}
                          tok={tok}
                          fontSize={13.5}
                          isActive={activeDef === tok.k}
                          onEnter={() => tok.k && setActiveDef(tok.k)}
                          onLeave={() => setActiveDef(null)}
                        />
                      ))}
                    </span>
                  </div>

                  {isExpanded && (
                    <div style={{
                      margin: '0 18px 8px 60px', padding: '8px 12px',
                      background: isActive ? '#eff6ff' : '#f8fafc',
                      borderLeft: `3px solid ${isActive ? '#2563eb' : '#cbd5e1'}`,
                      borderRadius: '0 6px 6px 0',
                      fontFamily: ANN_SANS, fontSize: 12.5, lineHeight: 1.45,
                      color: isActive ? '#1e40af' : '#475569',
                    }}>
                      {ANN_TRANS[li]}
                      {isActive && TB_STEPS[li + 1]?.eval && EvalChainClickable && (
                        <div style={{
                          marginTop: 8, paddingTop: 8, borderTop: '1px solid #dbeafe',
                        }}>
                          <EvalChainClickable
                            evalSteps={TB_STEPS[li + 1].eval}
                            onClick={() => setEvalOpen(true)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <AnnDefBar defKey={activeDef} style={{ flexShrink: 0 }} />
        </div>

        <div style={{
          flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
          background: '#fbfcfe',
        }}>
          <div style={{
            padding: '9px 16px', borderBottom: '1px solid #e2e6ee',
            display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
            background: '#fff',
          }}>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: step === 0 ? '#64748b' : '#047857',
              background: step === 0 ? '#f1f5f9' : '#d1fae5',
              borderRadius: 3, padding: '2px 8px', whiteSpace: 'nowrap',
            }}>{step === 0 ? 'Before execution' : `After line ${activeLine + 1}`}</span>
            <span style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.35 }}>
              {evalOpen && evalTree ? 'Step through the expression transformation.' : renderDesc(stepData.desc)}
            </span>
          </div>

          <div style={{
            flex: 1, minHeight: 0, padding: '12px 14px',
            display: 'flex', flexDirection: 'column', overflow: 'auto',
          }}>
            {evalOpen && evalTree && EvalDetailPanel ? (
              <EvalDetailPanel data={evalTree} onClose={() => setEvalOpen(false)} />
            ) : (
              <MemoryFull stepData={stepData} />
            )}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #e2e6ee', padding: '6px 16px',
        background: '#fafbfc', flexShrink: 0,
      }}>
        <TBStepControls step={step} setStep={setStep} maxStep={maxStep} compact />
      </div>
    </div>
  );
}

Object.assign(window, { IntegratedAnnotationsMemory, IntegratedFullPageExample });
