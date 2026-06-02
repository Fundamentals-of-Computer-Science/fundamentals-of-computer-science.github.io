/* tb-ch1-sequence.jsx - ch1-1 example-first page sequence */

const CH1_FULL_CODE = [
  'bool x = true;',
  'bool y = false;',
  'bool copy_of_x = x;',
  'x = false;',
  'Console.WriteLine(copy_of_x);',
];

const CH1_FULL_TOKENS = {
  'Console.WriteLine': 'call',
  copy_of_x: 'name',
  bool: 'type',
  true: 'value',
  false: 'value',
  x: 'name',
  y: 'name',
  '=': 'op',
};

const CH1_FULL_DEFS = {
  bool: 'A boolean type. It has exactly two values: true and false.',
  true: 'A boolean value.',
  false: 'A boolean value.',
  x: 'A variable name. Here it stores a boolean value.',
  y: 'A second variable name. It gets its own binding.',
  copy_of_x: 'A separate variable that receives the value produced by evaluating x.',
  '=': 'Assignment. Evaluate the right side first, then bind the result to the left side.',
  'Console.WriteLine': 'A method call that evaluates its argument and displays the result in the console.',
};

const CH1_FULL_TRANSLATIONS = [
  'Create a boolean variable named x and bind the value true to it.',
  'Create a boolean variable named y and bind the value false to it.',
  'Create a boolean variable named copy_of_x and bind the result of evaluating x to it.',
  'Bind the value false to the existing variable x.',
  'Evaluate copy_of_x and display the result in the console.',
];

const CH1_FULL_STATES = [
  {
    label: 'Before execution',
    desc: 'No variables exist yet. The console has no output.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'x exists and is bound to true.',
    memory: [{ name: 'x', type: 'bool', value: 'true' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'y is added as a separate binding. x is unchanged.',
    memory: [
      { name: 'x', type: 'bool', value: 'true' },
      { name: 'y', type: 'bool', value: 'false' },
    ],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'The right side x is evaluated first. Its value, true, is copied into copy_of_x.',
    memory: [
      { name: 'x', type: 'bool', value: 'true' },
      { name: 'y', type: 'bool', value: 'false' },
      { name: 'copy_of_x', type: 'bool', value: 'true' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate the right side before binding',
      expression: 'copy_of_x = x',
      steps: [
        { code: 'x', note: 'Start with the right side of the assignment.' },
        { code: 'true', note: 'Look up x in memory. It is currently bound to true.' },
        { code: 'bool copy_of_x = true;', note: 'Bind that copied value to the new variable copy_of_x.' },
      ],
    },
  },
  {
    label: 'After line 4',
    desc: 'x is rebound to false. copy_of_x stays true because bool is a value type.',
    memory: [
      { name: 'x', type: 'bool', value: 'false' },
      { name: 'y', type: 'bool', value: 'false' },
      { name: 'copy_of_x', type: 'bool', value: 'true' },
    ],
    console: [],
    evalDetail: {
      title: 'Write to one variable',
      expression: 'x = false',
      steps: [
        { code: 'false', note: 'Evaluate the right side. It is already a literal value.' },
        { code: 'x: false', note: 'Write that value into x.' },
        { code: 'copy_of_x: true', note: 'copy_of_x is a separate storage location, so it does not change.' },
      ],
    },
  },
  {
    label: 'After line 5',
    desc: 'copy_of_x is evaluated and its value is displayed in the console.',
    memory: [
      { name: 'x', type: 'bool', value: 'false' },
      { name: 'y', type: 'bool', value: 'false' },
      { name: 'copy_of_x', type: 'bool', value: 'true' },
    ],
    console: ['true'],
    evalDetail: {
      title: 'Evaluate the argument before printing',
      expression: 'Console.WriteLine(copy_of_x)',
      steps: [
        { code: 'copy_of_x', note: 'Start with the argument inside the parentheses.' },
        { code: 'true', note: 'Look up copy_of_x in memory. It still holds true.' },
        { code: 'stdout: true', note: 'Write that evaluated value to the console output.' },
      ],
    },
  },
];

const CH1_CYCLE_DETAILS = [
  {
    n: 1,
    title: 'Types, Values, and Boolean Storage',
    body: [
      'A declaration creates a named storage location. The type tells C# what kind of value can live there.',
      'In bool x = true;, bool is the type, x is the name, and true is the value written into memory.',
    ],
    code: ['bool x = true;'],
    memory: [{ name: 'x', type: 'bool', value: 'true' }],
    translations: ['Create a boolean variable named x and bind the value true to it.'],
  },
  {
    n: 2,
    title: 'Program State Changes Line by Line',
    body: [
      'Programs execute top to bottom. Each declaration adds another binding to the current state.',
      'After line 1, memory contains only x. After line 2, memory contains both x and y.',
    ],
    code: ['bool x = true;', 'bool y = false;'],
    memory: [
      { name: 'x', type: 'bool', value: 'true' },
      { name: 'y', type: 'bool', value: 'false' },
    ],
    translations: [
      'Create x and bind true to it.',
      'Create y and bind false to it.',
    ],
  },
  {
    n: 3,
    title: 'Reading, Writing, and Value-Type Copying',
    body: [
      'The right side of an assignment is evaluated before the left side is written.',
      'copy_of_x receives a copy of the value in x. Later rebinding x does not rewrite copy_of_x.',
    ],
    code: ['bool x = true;', 'bool copy_of_x = x;', 'x = false;'],
    memory: [
      { name: 'x', type: 'bool', value: 'false' },
      { name: 'copy_of_x', type: 'bool', value: 'true' },
    ],
    translations: [
      'Create x and bind true to it.',
      'Evaluate x, then bind that copied value to copy_of_x.',
      'Bind false to x. copy_of_x is unchanged.',
    ],
  },
];

function ch1TokenPieces(line) {
  const tokens = Object.keys(CH1_FULL_TOKENS).sort((a, b) => b.length - a.length);
  const pieces = [];
  let i = 0;

  while (i < line.length) {
    const token = tokens.find((candidate) => line.startsWith(candidate, i));
    if (token) {
      pieces.push({ text: token, tone: CH1_FULL_TOKENS[token] });
      i += token.length;
    } else {
      pieces.push({ text: line[i] });
      i += 1;
    }
  }

  return pieces;
}

function Ch1TokenizedLine({ line, index, active, run, expanded, onToggle, onDef, translation }) {
  const { TBToken } = window;

  return (
    <div style={{
      borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
      background: active ? '#f8fbff' : run ? '#fbfdff' : 'transparent',
      opacity: run || active ? 1 : 0.48,
    }}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        style={{
          display: 'flex', alignItems: 'center',
          padding: '6px 18px 6px 15px', cursor: 'pointer',
          outline: 'none', fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13.5, lineHeight: '24px',
        }}>
        <span style={{
          width: 26, textAlign: 'right', marginRight: 16,
          color: active ? '#2563eb' : run ? '#64748b' : '#c1c8d4',
          fontSize: 12, fontWeight: active ? 700 : 400,
          position: 'relative', flexShrink: 0,
        }}>
          {index + 1}
          <span style={{
            position: 'absolute', right: -10, top: '50%',
            transform: `translateY(-50%) rotate(${expanded ? 90 : 0}deg)`,
            fontSize: 8, color: expanded ? '#2563eb' : '#cbd5e1',
            transition: 'transform 0.2s',
          }}>▶</span>
        </span>
        <span>
          {ch1TokenPieces(line).map((piece, idx) => piece.tone ? (
            <span
              key={`${piece.text}-${idx}`}
              title={CH1_FULL_DEFS[piece.text]}
              onMouseEnter={() => onDef(piece.text)}
              onMouseLeave={() => onDef(null)}
            >
              <TBToken tone={piece.tone}>{piece.text}</TBToken>
            </span>
          ) : (
            <React.Fragment key={`${piece.text}-${idx}`}>{piece.text}</React.Fragment>
          ))}
        </span>
      </div>
      {expanded && (
        <div style={{
          margin: '0 18px 9px 60px', padding: '8px 12px',
          background: active ? '#eff6ff' : '#f8fafc',
          borderLeft: `3px solid ${active ? '#2563eb' : '#cbd5e1'}`,
          borderRadius: '0 6px 6px 0',
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 12.5, lineHeight: 1.45,
          color: active ? '#1e40af' : '#475569',
        }}>
          {translation || CH1_FULL_TRANSLATIONS[index]}
        </div>
      )}
    </div>
  );
}

function Ch1Stepper({ step, setStep, maxStep }) {
  const btn = (primary, disabled) => ({
    border: primary ? 'none' : '1px solid #dbe4ef',
    background: primary ? '#2563eb' : '#fff',
    color: primary ? '#fff' : '#475569',
    borderRadius: 5,
    padding: '5px 10px',
    fontSize: 11.5,
    fontWeight: 800,
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? 'default' : 'pointer',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button type="button" onClick={() => setStep(0)} style={btn(false, false)} title="Reset execution">Reset</button>
      <button type="button" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))} style={btn(false, step === 0)}>Previous line</button>
      <div style={{ width: 130, display: 'flex', gap: 2 }}>
        {Array.from({ length: maxStep + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to execution step ${i}`}
            onClick={() => setStep(i)}
            style={{
              flex: 1, height: 6, border: 'none', padding: 0,
              borderRadius: 1, cursor: 'pointer',
              background: i === step ? '#2563eb' : i < step ? '#1e293b' : '#e2e8f0',
            }}
          />
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>
        {step}/{maxStep}
      </span>
      <button type="button" disabled={step === maxStep} onClick={() => setStep(Math.min(maxStep, step + 1))} style={btn(true, step === maxStep)}>
        Run next line
      </button>
    </div>
  );
}

function Ch1EvalDetail({ detail }) {
  const [sub, setSub] = React.useState(0);
  React.useEffect(() => setSub(0), [detail]);

  if (!detail) {
    return (
      <div style={{
        border: '1px dashed #cbd5e1', borderRadius: 7, padding: 14,
        color: '#94a3b8', fontSize: 13, fontStyle: 'italic',
      }}>
        This line does not need a separate evaluation view.
      </div>
    );
  }

  const current = detail.steps[sub];

  return (
    <div style={{ border: '1px solid #dbe4ef', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #edf2f7', background: '#f8fafc' }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Evaluation Detail
        </div>
        <div style={{ fontSize: 12.5, color: '#1e293b', fontWeight: 800 }}>{detail.title}</div>
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 10 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#64748b' }}>
          {detail.expression}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {detail.steps.map((item, i) => (
            <React.Fragment key={`${item.code}-${i}`}>
              <button
                type="button"
                onClick={() => setSub(i)}
                style={{
                  border: i === sub ? '1px solid #2563eb' : '1px solid #dbe4ef',
                  background: i === sub ? '#eff6ff' : '#fff',
                  color: i === sub ? '#1d4ed8' : '#334155',
                  borderRadius: 6, padding: '6px 9px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  fontWeight: 800, cursor: 'pointer',
                }}>
                {item.code}
              </button>
              {i < detail.steps.length - 1 && <span style={{ color: '#cbd5e1', fontWeight: 800 }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{
          minHeight: 42, padding: '9px 10px', borderRadius: 6,
          background: '#f8fafc', color: '#475569',
          fontSize: 13, lineHeight: 1.4,
        }}>
          <strong style={{ color: '#1e293b' }}>Step {sub + 1}:</strong> {current.note}
        </div>
      </div>
    </div>
  );
}

function Ch1FullExamplePage() {
  const { TBMemoryMini } = window;
  const [step, setStep] = React.useState(0);
  const [expandedLine, setExpandedLine] = React.useState(null);
  const [activeDef, setActiveDef] = React.useState(null);
  const [showEval, setShowEval] = React.useState(false);
  const state = CH1_FULL_STATES[step];
  const activeLine = step > 0 ? step - 1 : null;

  React.useEffect(() => {
    setExpandedLine(null);
    setShowEval(false);
  }, [step]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 18px', borderBottom: '1px solid #e2e6ee',
      }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Chapter 1</span>
        <span style={{ fontSize: 10, color: '#d1d5db' }}>›</span>
        <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 800 }}>Example: Data and Memory</span>
        <div style={{ flex: 1 }} />
        <Ch1Stepper step={step} setStep={setStep} maxStep={CH1_FULL_STATES.length - 1} />
      </div>
      <div style={{
        padding: '8px 18px', borderBottom: '1px solid #e2e6ee',
        background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          background: '#dbeafe', borderRadius: 3, padding: '2px 8px',
        }}>Full Walkthrough</span>
        <span style={{ fontSize: 12.5, color: '#64748b' }}>
          Run the program line by line. Click any line for its translation; hover highlighted tokens for definitions.
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '55% 45%' }}>
        <div style={{ borderRight: '1px solid #e2e6ee', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 18px', borderBottom: '1px solid #edf1f7' }}>
            <div style={{
              fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 4,
            }}>Program.cs</div>
            <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.35 }}>
              The active line is the most recent executed line. Future lines are dimmed.
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', paddingTop: 8 }}>
            {CH1_FULL_CODE.map((line, i) => (
              <Ch1TokenizedLine
                key={line}
                line={line}
                index={i}
                active={i === activeLine}
                run={activeLine === null || i <= activeLine}
                expanded={expandedLine === i}
                onToggle={() => setExpandedLine(prev => prev === i ? null : i)}
                onDef={setActiveDef}
              />
            ))}
          </div>
          <div style={{
            minHeight: 38, padding: '8px 18px', borderTop: '1px solid #e2e6ee',
            background: '#fbfcfe', fontSize: 12.5, color: '#475569',
          }}>
            {activeDef ? (
              <span><strong style={{ color: '#1e293b' }}>{activeDef}:</strong> {CH1_FULL_DEFS[activeDef]}</span>
            ) : (
              <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Hover a highlighted token to see its definition.</span>
            )}
          </div>
        </div>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fbfcfe' }}>
          <div style={{
            padding: '10px 16px', borderBottom: '1px solid #e2e6ee',
            display: 'flex', gap: 8, alignItems: 'center', background: '#fff',
          }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: step === 0 ? '#64748b' : '#047857',
              background: step === 0 ? '#f1f5f9' : '#d1fae5',
              borderRadius: 3, padding: '2px 8px', whiteSpace: 'nowrap',
            }}>{state.label}</span>
            <span style={{ fontSize: 12.5, lineHeight: 1.35, color: '#475569' }}>{state.desc}</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'grid', gap: 14, alignContent: 'start' }}>
            {state.evalDetail && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEval(prev => !prev)}
                  style={{
                    border: '1px solid #bfdbfe', background: showEval ? '#dbeafe' : '#fff',
                    color: '#1d4ed8', borderRadius: 5, padding: '5px 10px',
                    fontSize: 11.5, fontWeight: 800, cursor: 'pointer',
                  }}>
                  {showEval ? 'Show memory state' : 'Show evaluation steps'}
                </button>
              </div>
            )}
            {showEval ? (
              <Ch1EvalDetail detail={state.evalDetail} />
            ) : (
              <>
                <div>
                  <div style={{
                    fontSize: 9.5, fontWeight: 800, color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
                  }}>State</div>
                  {state.memory.length ? (
                    <TBMemoryMini rows={state.memory} />
                  ) : (
                    <div style={{
                      border: '1px dashed #cbd5e1', borderRadius: 7, padding: 14,
                      color: '#94a3b8', fontSize: 13, fontStyle: 'italic',
                    }}>No bindings yet.</div>
                  )}
                </div>
                <Ch1Console lines={state.console} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Ch1Console({ lines }) {
  return (
    <div>
      <div style={{
        fontSize: 9.5, fontWeight: 800, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
      }}>Console</div>
      <div style={{
        borderRadius: 7, overflow: 'hidden',
        border: '1px solid #313244', background: '#1e1e2e',
      }}>
        <div style={{ height: 25, background: '#181825', borderBottom: '1px solid #313244', display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f38ba8' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f9e2af' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1' }} />
          <span style={{ color: '#94a3b8', fontSize: 10, marginLeft: 4 }}>stdout</span>
        </div>
        <div style={{
          minHeight: 46, padding: '10px 12px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          color: lines.length ? '#e2e8f0' : '#6c7086',
          fontStyle: lines.length ? 'normal' : 'italic',
        }}>{lines.length ? lines.join('\n') : '(no output)'}</div>
      </div>
    </div>
  );
}

function Ch1QuizFooter({ checked, score, total, complete, onReset, onCheck }) {
  const { footBtnStyle } = window;
  return (
    <div style={{
      borderTop: '1px solid #e2e6ee', background: '#fafbfc',
      padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <button type="button" onClick={onReset} style={{
        ...footBtnStyle, background: '#fff', border: '1px solid #e2e6ee', color: '#64748b',
      }}>Reset</button>
      <div style={{ flex: 1 }} />
      {checked && (
        <span style={{ fontSize: 12.5, fontWeight: 800, color: score === total ? '#059669' : '#dc2626' }}>
          {score}/{total} correct{score === total ? ' - ready to move on' : ' - revise and check again'}
        </span>
      )}
      <button type="button" onClick={onCheck} disabled={!complete} style={{
        ...footBtnStyle, background: complete ? '#2563eb' : '#94a3b8',
        color: '#fff', opacity: complete ? 1 : 0.5,
      }}>Check</button>
    </div>
  );
}

function Ch1ReusableChip({ value, label, color }) {
  return (
    <span
      draggable
      onDragStart={e => { e.dataTransfer.setData('text/plain', value); e.dataTransfer.effectAllowed = 'copy'; }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        fontWeight: 700, padding: '3px 9px', borderRadius: 4,
        cursor: 'grab', userSelect: 'none',
        background: color || '#fff',
        border: '1.5px solid #cbd5e1',
        color: '#1e293b',
      }}
    >{label || value}</span>
  );
}

function Ch1OpeningPredictionQuiz() {
  const { TBQuizFrame, DropSlot, secLabelStyle } = window;
  const answers = { x: 'false', y: 'false', copy: 'true', console: 'true' };
  const bank = ['true', 'false', '(no output)', 'x', 'copy_of_x'];
  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => ({ ...prev, [slotId]: value }));
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const keys = Object.keys(answers);
  const complete = keys.every(key => placed[key] != null);
  const score = keys.filter(key => placed[key] === answers[key]).length;

  return (
    <TBQuizFrame
      title="Predict the Final State"
      prompt="Before reading the explanation, drag values into the final memory and console slots."
    >
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 16, minHeight: 0 }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, background: '#f8fafc', alignSelf: 'start' }}>
            {CH1_FULL_CODE.map((line, i) => (
              <Ch1TokenizedLine
                key={line}
                line={line}
                index={i}
                active={false}
                run
                expanded={false}
                onToggle={() => {}}
                onDef={() => {}}
              />
            ))}
          </div>
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            <div>
              <div style={secLabelStyle}>Final Memory</div>
              <div style={{ border: '1px solid #e2e6ee', borderRadius: 7, overflow: 'hidden', background: '#fff' }}>
                {[
                  { key: 'x', name: 'x', type: 'bool' },
                  { key: 'y', name: 'y', type: 'bool' },
                  { key: 'copy', name: 'copy_of_x', type: 'bool' },
                ].map((row, i) => (
                  <div key={row.key} style={{
                    display: 'grid', gridTemplateColumns: '110px 70px 1fr',
                    alignItems: 'center', padding: '7px 10px',
                    borderTop: i ? '1px solid #edf2f7' : 'none',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  }}>
                    <strong>{row.name}</strong>
                    <span style={{ color: '#64748b' }}>{row.type}</span>
                    <DropSlot slotId={row.key} placed={placed[row.key]} correct={answers[row.key]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="value" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={secLabelStyle}>Console Output</div>
              <DropSlot slotId="console" placed={placed.console} correct={answers.console} checked={checked} onDrop={handleDrop} onClear={handleClear} label="output" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 7 }}>
              <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Values</span>
              {bank.map((value, i) => (
                <Ch1ReusableChip key={`${value}-${i}`} value={value} />
              ))}
            </div>
          </div>
        </div>
        <Ch1QuizFooter
          checked={checked}
          score={score}
          total={keys.length}
          complete={complete}
          onReset={() => { setPlaced({}); setChecked(false); }}
          onCheck={() => setChecked(true)}
        />
      </div>
    </TBQuizFrame>
  );
}

function Ch1MiniCyclePanel({ cycle }) {
  const { TBMemoryMini } = window;
  const [expanded, setExpanded] = React.useState(null);
  const [activeDef, setActiveDef] = React.useState(null);

  return (
    <div style={{ border: '1px solid #dbe4ef', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #edf2f7', background: '#f8fafc' }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Embedded example
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#1e293b' }}>{cycle.title}</div>
      </div>
      <div style={{ paddingTop: 6 }}>
        {cycle.code.map((line, i) => (
          <Ch1TokenizedLine
            key={`${line}-${i}`}
            line={line}
            index={i}
            active={false}
            run
            expanded={expanded === i}
            onToggle={() => setExpanded(prev => prev === i ? null : i)}
            onDef={setActiveDef}
            translation={cycle.translations[i]}
          />
        ))}
      </div>
      <div style={{ padding: '0 12px 12px' }}>
        <TBMemoryMini rows={cycle.memory} />
      </div>
      <div style={{
        borderTop: '1px solid #edf2f7', padding: '7px 10px',
        background: '#fbfcfe', color: '#64748b', fontSize: 12,
      }}>
        {activeDef ? (
          <span><strong style={{ color: '#1e293b' }}>{activeDef}:</strong> {CH1_FULL_DEFS[activeDef]}</span>
        ) : (
          <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Hover a token for a definition. Click a line for translation.</span>
        )}
      </div>
    </div>
  );
}

function Ch1ReadingPage() {
  return (
    <div style={{
      height: '100%', overflow: 'auto', background: '#fff',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '22px 30px 34px' }}>
        <div style={{
          fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          marginBottom: 6,
        }}>Written Section</div>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.1, color: '#0f172a' }}>Data and Memory</h2>
        <p style={{ margin: '8px 0 20px', fontSize: 14.5, lineHeight: 1.6, color: '#475569' }}>
          The example is now broken into smaller behaviors. Each section names the rule, then gives a compact embedded panel using the same annotation and memory language from the opening frame.
        </p>
        <div style={{ display: 'grid', gap: 24 }}>
          {CH1_CYCLE_DETAILS.map((cycle) => (
            <section key={cycle.title} style={{
              borderTop: '1px solid #e2e8f0', paddingTop: 20,
              display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px',
              gap: 22, alignItems: 'start',
            }}>
              <div>
                <span style={{
                  display: 'inline-block', marginBottom: 7,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: '#2563eb', background: '#dbeafe',
                  borderRadius: 4, padding: '2px 7px', fontWeight: 800,
                }}>cycle {cycle.n}</span>
                <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.2, color: '#1e293b' }}>
                  {cycle.title}
                </h3>
                <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
                  {cycle.body.map((point) => (
                    <p key={point} style={{ margin: 0, fontSize: 14, lineHeight: 1.58, color: '#334155' }}>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
              <Ch1MiniCyclePanel cycle={cycle} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ch1TranslationQuiz() {
  const { TBQuizFrame, DropSlot, DragChip, secLabelStyle } = window;
  const rows = [
    { slot: 't1', code: 'bool ready = false;', answer: 'A' },
    { slot: 't2', code: 'bool status = active;', answer: 'B' },
    { slot: 't3', code: 'done = true;', answer: 'C' },
    { slot: 't4', code: 'Console.WriteLine(finished);', answer: 'D' },
  ];
  const choices = [
    { id: 'A', text: 'Create ready and bind false to it.' },
    { id: 'B', text: 'Create status and bind the result of evaluating active to it.' },
    { id: 'C', text: 'Bind true to the existing variable done.' },
    { id: 'D', text: 'Evaluate finished and display the result in the console.' },
  ];
  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const used = Object.values(placed);

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => { if (next[key] === value) delete next[key]; });
      next[slotId] = value;
      return next;
    });
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const complete = rows.every(row => placed[row.slot] != null);
  const score = rows.filter(row => placed[row.slot] === row.answer).length;

  return (
    <TBQuizFrame title="Translate the Lines" prompt="Match each code line with the precise English translation. Answers appear only after checking.">
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, minHeight: 0 }}>
          <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            {rows.map((row, i) => (
              <div key={row.slot} style={{
                border: '1px solid #e2e8f0', borderRadius: 8,
                display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 104px',
                alignItems: 'center', overflow: 'hidden', background: '#fff',
              }}>
                <div style={{
                  padding: 12, borderRight: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                  color: '#334155', whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  <span style={{ color: '#94a3b8', marginRight: 8 }}>{i + 1}</span>{row.code}
                </div>
                <div style={{ padding: 10 }}>
                  <DropSlot slotId={row.slot} placed={placed[row.slot]} correct={row.answer} checked={checked} onDrop={handleDrop} onClear={handleClear} label="letter" />
                </div>
              </div>
            ))}
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, alignSelf: 'start', background: '#fbfcfe' }}>
            <div style={secLabelStyle}>Translations</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {choices.map(choice => (
                <div key={choice.id} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 8, alignItems: 'start' }}>
                  <DragChip value={choice.id} label={choice.id} used={used.includes(choice.id)} />
                  <div style={{ fontSize: 13, lineHeight: 1.35, color: '#475569' }}>{choice.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Ch1QuizFooter
          checked={checked}
          score={score}
          total={rows.length}
          complete={complete}
          onReset={() => { setPlaced({}); setChecked(false); }}
          onCheck={() => setChecked(true)}
        />
      </div>
    </TBQuizFrame>
  );
}

function Ch1StateTableQuiz() {
  const { TBQuizFrame, DropSlot, secLabelStyle } = window;
  const rows = [
    { after: '1', a: 'true', b: '-', c: '-' },
    { after: '2', a: 'true', b: 'false', c: '-' },
    { after: '3', a: 'true', b: 'false', c: 'true' },
    { after: '4', a: 'false', b: 'false', c: 'true' },
    { after: '5', a: 'false', b: 'true', c: 'true' },
  ];
  const columns = ['a', 'b', 'c'];
  const answers = {};
  rows.forEach((row) => columns.forEach(col => { answers[`${row.after}-${col}`] = row[col]; }));
  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const keys = Object.keys(answers);
  const complete = keys.every(key => placed[key] != null);
  const score = keys.filter(key => placed[key] === answers[key]).length;

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => ({ ...prev, [slotId]: value }));
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  return (
    <TBQuizFrame title="Complete the State Table" prompt="Trace each line. Use the reusable value chips to fill every memory slot.">
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, minHeight: 0 }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, background: '#f8fafc', alignSelf: 'start' }}>
            {['bool a = true;', 'bool b = false;', 'bool c = a;', 'a = false;', 'b = c;'].map((line, i) => (
              <Ch1TokenizedLine key={line} line={line} index={i} active={false} run expanded={false} onToggle={() => {}} onDef={() => {}} />
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
              <span style={{ ...secLabelStyle, marginBottom: 0, width: '100%' }}>Reusable values</span>
              {['true', 'false', '-'].map(value => <Ch1ReusableChip key={value} value={value} />)}
            </div>
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', alignSelf: 'start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(3, 1fr)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>After</div>
              {columns.map(col => <div key={col} style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>{col}</div>)}
            </div>
            {rows.map((row) => (
              <div key={row.after} style={{
                display: 'grid', gridTemplateColumns: '70px repeat(3, 1fr)',
                borderTop: '1px solid #f1f5f9',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                alignItems: 'center',
              }}>
                <div style={{ padding: 8, color: '#64748b' }}>{row.after}</div>
                {columns.map(col => {
                  const slot = `${row.after}-${col}`;
                  return (
                    <div key={slot} style={{ padding: 7 }}>
                      <DropSlot slotId={slot} placed={placed[slot]} correct={answers[slot]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="value" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <Ch1QuizFooter
          checked={checked}
          score={score}
          total={keys.length}
          complete={complete}
          onReset={() => { setPlaced({}); setChecked(false); }}
          onCheck={() => setChecked(true)}
        />
      </div>
    </TBQuizFrame>
  );
}

function Ch1WriteCodeQuiz() {
  const { TBQuizFrame, DropSlot, DragChip, secLabelStyle } = window;
  const lines = [
    { slot: 'c1', prefix: 'bool enabled = ', suffix: ';', answer: 'true' },
    { slot: 'c2', prefix: 'running = ', suffix: ';', answer: 'false' },
    { slot: 'c3', prefix: 'bool backup = ', suffix: ';', answer: 'original' },
    { slot: 'c4', prefix: 'Console.WriteLine(', suffix: ');', answer: 'finished' },
  ];
  const bank = ['true', 'false', 'original', 'finished', 'bool', 'running'];
  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const used = Object.values(placed);
  const complete = lines.every(line => placed[line.slot] != null);
  const score = lines.filter(line => placed[line.slot] === line.answer).length;

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => { if (next[key] === value) delete next[key]; });
      next[slotId] = value;
      return next;
    });
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  return (
    <TBQuizFrame title="Write the Code" prompt="Drag code fragments into the blanks. Check only after the program is complete.">
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 270px', gap: 16, minHeight: 0 }}>
          <div style={{
            border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc',
            padding: '14px 12px', alignSelf: 'start',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: '30px',
          }}>
            {lines.map((line, i) => (
              <div key={line.slot} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <span style={{ width: 22, color: '#94a3b8', marginRight: 10, textAlign: 'right', fontSize: 11 }}>{i + 1}</span>
                <span>{line.prefix}</span>
                <DropSlot slotId={line.slot} placed={placed[line.slot]} correct={line.answer} checked={checked} onDrop={handleDrop} onClear={handleClear} label="___" />
                <span>{line.suffix}</span>
              </div>
            ))}
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, alignSelf: 'start', background: '#fbfcfe' }}>
            <div style={secLabelStyle}>Fragments</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {bank.map((value, i) => (
                <DragChip key={`${value}-${i}`} value={value} used={used.includes(value)} />
              ))}
            </div>
          </div>
        </div>
        <Ch1QuizFooter
          checked={checked}
          score={score}
          total={lines.length}
          complete={complete}
          onReset={() => { setPlaced({}); setChecked(false); }}
          onCheck={() => setChecked(true)}
        />
      </div>
    </TBQuizFrame>
  );
}

function Ch1DataMemorySequence() {
  const { TBPageSequence } = window;
  const pages = [
    {
      id: 'full-example',
      kicker: 'Example',
      title: 'Run the Whole Program',
      description: 'Preview storage, copying, rebinding, and output.',
      component: Ch1FullExamplePage,
    },
    {
      id: 'predict',
      kicker: 'Check',
      title: 'Predict the State',
      description: 'Commit before explanation.',
      component: Ch1OpeningPredictionQuiz,
    },
    {
      id: 'reading',
      kicker: 'Read',
      title: 'Learn the Cycles',
      description: 'Prose with compact embedded examples.',
      component: Ch1ReadingPage,
    },
    {
      id: 'translate',
      kicker: 'Quiz',
      title: 'Translate',
      description: 'Match code to precise English.',
      component: Ch1TranslationQuiz,
    },
    {
      id: 'state-table',
      kicker: 'Quiz',
      title: 'State Table',
      description: 'Trace value-type copying.',
      component: Ch1StateTableQuiz,
    },
    {
      id: 'write-code',
      kicker: 'Quiz',
      title: 'Write Code',
      description: 'Convert descriptions into C#.',
      component: Ch1WriteCodeQuiz,
    },
  ];

  return (
    <TBPageSequence
      kicker="ch1-1"
      title="Data and Memory - Example-First Sequence"
      pages={pages}
    />
  );
}

Object.assign(window, { Ch1DataMemorySequence });
