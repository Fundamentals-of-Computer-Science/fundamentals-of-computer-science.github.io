const { useState } = React;
const {
  FuncsFrameCodeWindow,
  FuncsSubgoalNowPanel,
  FuncsMemoryStatePanel,
  FuncsConsole,
  FuncsLoopStepperDetail,
} = window;

const LOOP_SUBGOALS = {
  init:    { id: 'init',    n: 'a', label: 'Establish the initial state',     gloss: 'Create count and give it a starting value of 0.' },
  check:   { id: 'check',   n: 'b', label: 'Evaluate the continuation check', gloss: 'Ask: should the body run again?' },
  work:    { id: 'work',    n: 'c', label: 'Execute the core work',           gloss: 'Print the current value of count.' },
  advance: { id: 'advance', n: 'd', label: 'Advance the loop state',          gloss: 'Add 1 to count so the condition can eventually be false.' },
  after:   { id: 'after',   n: 'e', label: 'Continue after the loop',         gloss: 'Run once the condition is finally false.' },
};

const LOOP_CODE = {
  layout: 'frame',
  subgoals: LOOP_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'init' },
    {
      kind: 'wrap',
      subgoal: 'check',
      header: 'line-while',
      footer: 'line-close',
      hint: 'encloses the block below',
      body: [
        { kind: 'seg', subgoal: 'work', hint: 'each pass' },
        { kind: 'seg', subgoal: 'advance', hint: 'each pass' },
      ],
    },
    { kind: 'seg', subgoal: 'after' },
  ],
  lines: [
    { id: 'line-init',     num: '1', indent: 0, subgoal: 'init',    text: 'int count = 0;' },
    { id: 'line-while',    num: '2', indent: 0, subgoal: 'check',   text: 'while (count < 3) {' },
    { id: 'line-print',    num: '3', indent: 1, subgoal: 'work',    text: 'Console.WriteLine(count);' },
    { id: 'line-progress', num: '4', indent: 1, subgoal: 'advance', text: 'count = count + 1;' },
    { id: 'line-close',    num: '5', indent: 0,                     text: '}' },
    { id: 'line-after',    num: '6', indent: 0, subgoal: 'after',   text: 'Console.WriteLine("done");' },
  ],
};

const LOOP_TRACE = [
  { rowKey: 'line-init',     subgoal: 'init',    iteration: null,     phase: 'Initialize',      outcome: null,    note: 'count is created and starts at 0.', memory: [{name:'count',type:'int',value:'0'}], console: [] },
  { rowKey: 'line-while',    subgoal: 'check',   iteration: 'pass 1', phase: 'Check condition', outcome: 'true',  note: '0 < 3 is true, so the body runs.', memory: [{name:'count',type:'int',value:'0'}], console: [] },
  { rowKey: 'line-print',    subgoal: 'work',    iteration: 'pass 1', phase: 'Execute body',    outcome: null,    note: 'Print the current value of count (0).', memory: [{name:'count',type:'int',value:'0'}], console: ['0'] },
  { rowKey: 'line-progress', subgoal: 'advance', iteration: 'pass 1', phase: 'Advance state',   outcome: null,    note: 'Add 1 to count: 1. The next check will see the new value.', memory: [{name:'count',type:'int',value:'1'}], console: ['0'] },
  { rowKey: 'line-while',    subgoal: 'check',   iteration: 'pass 2', phase: 'Check condition', outcome: 'true',  note: '1 < 3 is true, so the body runs again.', memory: [{name:'count',type:'int',value:'1'}], console: ['0'] },
  { rowKey: 'line-print',    subgoal: 'work',    iteration: 'pass 2', phase: 'Execute body',    outcome: null,    note: 'Print the current value of count (1).', memory: [{name:'count',type:'int',value:'1'}], console: ['0','1'] },
  { rowKey: 'line-progress', subgoal: 'advance', iteration: 'pass 2', phase: 'Advance state',   outcome: null,    note: 'Add 1 to count: 2.', memory: [{name:'count',type:'int',value:'2'}], console: ['0','1'] },
  { rowKey: 'line-while',    subgoal: 'check',   iteration: 'pass 3', phase: 'Check condition', outcome: 'true',  note: '2 < 3 is true, so one more body run happens.', memory: [{name:'count',type:'int',value:'2'}], console: ['0','1'] },
  { rowKey: 'line-print',    subgoal: 'work',    iteration: 'pass 3', phase: 'Execute body',    outcome: null,    note: 'Print the last satisfying value (2).', memory: [{name:'count',type:'int',value:'2'}], console: ['0','1','2'] },
  { rowKey: 'line-progress', subgoal: 'advance', iteration: 'pass 3', phase: 'Advance state',   outcome: null,    note: 'Add 1 to count: 3. The next check will be false.', memory: [{name:'count',type:'int',value:'3'}], console: ['0','1','2'] },
  { rowKey: 'line-while',    subgoal: 'check',   iteration: 'exit',   phase: 'Check condition', outcome: 'false', note: '3 < 3 is false, so skip the body and leave the loop.', memory: [{name:'count',type:'int',value:'3'}], console: ['0','1','2'] },
  { rowKey: 'line-after',    subgoal: 'after',   iteration: 'after',  phase: 'Continue',        outcome: null,    note: 'Execution continues past the loop. Print "done".', memory: [{name:'count',type:'int',value:'3'}], console: ['0','1','2','done'] },
];

const LOOP_TRACE_DETAIL = {
  title: 'Trace the while loop cycle',
  kicker: 'Code Stepper',
  triggerLabel: 'Show code steps',
  sourceLine: 'while (count < 3) { ... }',
  subgoals: LOOP_SUBGOALS,
  steps: LOOP_TRACE,
};

function PrototypeApp() {
  const [step, setStep] = useState(0);
  const [showCodeSteps, setShowCodeSteps] = useState(false);
  const current = LOOP_TRACE[step];
  const activeSubgoal = current.subgoal ? LOOP_SUBGOALS[current.subgoal] : null;

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: 18, background: '#f4f1eb' }}>
      <style>{`
        @media (max-width: 820px) {
          .uploaded-frame-prototype-grid { grid-template-columns: 1fr !important; }
          .uploaded-frame-prototype-footer { justify-content: stretch !important; }
        }
      `}</style>
      <div style={{ width: 'min(924px, 100%)', minHeight: 540, margin: '0 auto', border: '1px solid #d8d2c8', boxShadow: '0 10px 30px rgba(43,37,30,0.12)', background: '#fff', overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px 10px', borderBottom: '1px solid #e2e6ee', background: '#fff' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 4 }}>Full Walkthrough</div>
          <h1 style={{ margin: 0, fontSize: 23, lineHeight: 1.08, fontWeight: 800, color: '#1e293b' }}>Example: While Loops And Progress</h1>
          <p style={{ margin: '6px 0 0', maxWidth: 760, fontSize: 14, lineHeight: 1.45, color: '#64748b' }}>
            This page authors the uploaded code window with code.lines, code.subgoals, and code.frame, then renders it through the shared lesson kit.
          </p>
        </div>

        <div className="uploaded-frame-prototype-grid" style={{ padding: '14px 18px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1.45fr) minmax(260px,0.55fr)', gap: 18, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button type="button" onClick={() => setShowCodeSteps(prev => !prev)} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11.5, fontWeight: 700, padding: '5px 13px', border: '1px solid #bfdbfe', borderRadius: 6, background: '#fff', color: '#1d4ed8', cursor: 'pointer' }}>
                {showCodeSteps ? 'Hide code steps' : 'Show code steps'}
              </button>
            </div>
            <FuncsFrameCodeWindow
              code={LOOP_CODE}
              activeSubgoal={current.subgoal}
              activeKey={current.rowKey}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {showCodeSteps ? (
              <FuncsLoopStepperDetail
                detail={LOOP_TRACE_DETAIL}
                currentStep={step}
                onStepChange={setStep}
                onClose={() => setShowCodeSteps(false)}
              />
            ) : (
              <React.Fragment>
                <FuncsSubgoalNowPanel subgoal={activeSubgoal} />
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>State</div>
                  <FuncsMemoryStatePanel state={current} />
                </div>
                <FuncsConsole lines={current.console} />
                <div style={{ background: '#f4f6f9', border: '1px solid #dbe1ea', borderRadius: 8, padding: '9px 12px', fontSize: 12.5, color: '#334155', lineHeight: 1.45 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>This step</div>
                  {current.note}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="uploaded-frame-prototype-footer" style={{ borderTop: '1px solid #e2e6ee', background: '#fff', padding: '9px 18px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11.5, fontWeight: 700, padding: '7px 10px', borderRadius: 6, border: '1px solid #e2e6ee', background: '#fff', color: '#64748b', cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.35 : 1, whiteSpace: 'nowrap' }}>
            Previous line
          </button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 700, color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e6ee', borderRadius: 999, padding: '4px 20px', textAlign: 'center' }}>
            {step} of {LOOP_TRACE.length - 1}
          </span>
          <button type="button" onClick={() => setStep(Math.min(LOOP_TRACE.length - 1, step + 1))} disabled={step === LOOP_TRACE.length - 1} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11.5, fontWeight: 700, padding: '7px 12px', borderRadius: 6, border: 'none', background: step === LOOP_TRACE.length - 1 ? '#94a3b8' : '#2563eb', color: '#fff', cursor: step === LOOP_TRACE.length - 1 ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
            Run next line
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrototypeApp />);
