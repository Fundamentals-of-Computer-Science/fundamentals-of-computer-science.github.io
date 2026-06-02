/* tb-chapter-flow.jsx — Chapter progression comparison mockups */

const {
  TBFlowShell: FlowShell,
  TBFlowStep: FlowStep,
  TBMiniPreview: MiniPreview,
  TBFlowStage: FlowStage,
} = window;

const CH1_TOKEN_TONES = { bool: 'type', true: 'value', false: 'value' };

const CH1_CYCLES = [
  {
    n: 1,
    title: 'Types, Values, and Boolean Storage',
    shortTitle: 'Boolean storage',
    behaviors: ['identify the type token', 'identify the boolean value', 'bind a value to a named location'],
    vocab: ['type', 'value', 'boolean', 'variable', 'binding'],
    code: ['bool x = true;'],
    tokenTones: CH1_TOKEN_TONES,
    memory: [{ name: 'x', type: 'bool', value: 'true' }],
    check: {
      prompt: 'After this line runs, what exists in memory?',
      choices: ['x stores true', 'true stores x', 'x has no value yet'],
      answer: 0,
    },
    text: [
      'A type names the group of values a variable may hold.',
      'The boolean type has exactly two values: true and false.',
      'This line creates x and binds the value true to that name.',
    ],
    final: ['Translate bool flag = true;', 'Write bool example_var = false;'],
  },
  {
    n: 2,
    title: 'Program State Changes Line by Line',
    shortTitle: 'Line-by-line state',
    behaviors: ['execute top to bottom', 'grow state with new bindings', 'read state after a selected line'],
    vocab: ['state', 'binding', 'line-by-line execution'],
    code: ['bool x = true;', 'bool y = false;'],
    tokenTones: CH1_TOKEN_TONES,
    memory: [
      { name: 'x', type: 'bool', value: 'true' },
      { name: 'y', type: 'bool', value: 'false' },
    ],
    check: {
      prompt: 'Which state is correct after line 1?',
      choices: ['x = true only', 'x = true and y = false', 'y = false only'],
      answer: 0,
    },
    text: [
      'Programs run one line at a time from top to bottom.',
      'State is the set of bindings at a point in execution.',
      'After line 2, the state has two bindings: x and y.',
    ],
    final: ['Complete a two-line state table.', 'Explain why y does not exist after line 1.'],
  },
  {
    n: 3,
    title: 'Reading, Writing, and Value-Type Copying',
    shortTitle: 'Read, write, copy',
    behaviors: ['evaluate the right side first', 'separate reading from writing', 'show value-type copies stay independent'],
    vocab: ['evaluating', 'binding', 'value type', 'reading', 'writing'],
    code: ['bool x = true;', 'bool copy_of_x = x;', 'x = false;'],
    tokenTones: CH1_TOKEN_TONES,
    memory: [
      { name: 'x', type: 'bool', value: 'false' },
      { name: 'copy_of_x', type: 'bool', value: 'true' },
    ],
    check: {
      prompt: 'After x is rebound, what happens to copy_of_x?',
      choices: ['It stays true', 'It changes to false', 'It stops existing'],
      answer: 0,
    },
    text: [
      'The right side is evaluated before the left side is updated.',
      'copy_of_x receives the value produced by evaluating x.',
      'Booleans are value types, so the two variables do not share storage.',
    ],
    final: ['Complete the final state table.', 'Translate each line of the three-line example.'],
  },
];

function ChapterFlowCh1Cycles() {
  const { TBExampleFirstCycleFlow } = window;

  return (
    <TBExampleFirstCycleFlow
      kicker="Pilot"
      title="ch1-1 section cycles: Data and Memory"
      intro="The section becomes a flexible sequence of cycles. Each cycle starts with behavior, then checks, names, and transfers it."
      cycles={CH1_CYCLES}
    />
  );
}

function ChapterFlowExampleFirst() {
  const {
    IntegratedFullPageExample, QuizPredictState, PageInlineEmbed,
    QuizEvalTree, QuizCompleteCode,
  } = window;

  return (
    <FlowShell
      kicker="Sequence A"
      title="Example-first chapter: value types vs reference types"
    >
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        background: '#fafbfc',
      }}>
        <div style={{
          padding: '10px 18px', borderBottom: '1px solid #e2e6ee',
          display: 'flex', gap: 12, alignItems: 'center', background: '#fff',
        }}>
          <span style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.45 }}>
            Students first see the whole mechanism, then answer a narrow check, then read the explanation with embedded examples, then take a broader quiz set.
          </span>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <FlowStage
            n={1}
            title="Preview the full example"
            tag="full-page example"
            tone="#2563eb"
            note="Run the value/reference program before the chapter names every concept."
          >
            <MiniPreview height={290} scale={0.31}>
              <IntegratedFullPageExample />
            </MiniPreview>
          </FlowStage>
          <FlowStage
            n={2}
            title="Short concept check"
            tag="quiz page"
            tone="#b45309"
            note="Ask for stack/heap state from the same example before the prose lesson."
          >
            <MiniPreview height={290} scale={0.31}>
              <QuizPredictState />
            </MiniPreview>
          </FlowStage>
          <FlowStage
            n={3}
            title="Teach through the example"
            tag="written section"
            tone="#059669"
            note="Break the explanation into value-type and reference-type sections with embedded panels."
          >
            <MiniPreview height={290} scale={0.31}>
              <PageInlineEmbed />
            </MiniPreview>
          </FlowStage>
          <FlowStage
            n={4}
            title="Broader quiz set"
            tag="multi-concept assessment"
            tone="#7c3aed"
            note="Test both memory state and expression evaluation after the written walkthrough."
          >
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 8, minHeight: 0 }}>
              <MiniPreview height={140} scale={0.31}>
                <QuizEvalTree />
              </MiniPreview>
              <MiniPreview height={140} scale={0.31}>
                <QuizCompleteCode />
              </MiniPreview>
            </div>
          </FlowStage>
        </div>
      </div>
    </FlowShell>
  );
}

function CompactFlowStep({ n, title, body, component, tone }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '210px 1fr', gap: 12,
      padding: '12px 14px', borderBottom: '1px solid #edf1f7',
      minHeight: 0,
    }}>
      <FlowStep n={n} label={title} caption={body} tone={tone} />
      <MiniPreview height={122} scale={0.26}>
        {component}
      </MiniPreview>
    </div>
  );
}

function ChapterFlowCompactAlt() {
  const {
    PageInlineEmbed, IntegratedFullPageExample, QuizPredictState, QuizCompleteCode,
  } = window;

  return (
    <FlowShell
      kicker="Sequence B"
      title="Teach-first comparison using the same pieces"
    >
      <div style={{
        height: '100%', display: 'grid', gridTemplateColumns: '1fr 280px',
        minHeight: 0, background: '#fff',
      }}>
        <div style={{ minHeight: 0, overflow: 'hidden' }}>
          <CompactFlowStep
            n={1}
            title="Start with written instruction"
            body="Introduce value/reference terms before students run the whole example."
            tone="#059669"
            component={<PageInlineEmbed />}
          />
          <CompactFlowStep
            n={2}
            title="Open the full example after terms exist"
            body="Use the integrated walkthrough as consolidation instead of discovery."
            tone="#2563eb"
            component={<IntegratedFullPageExample />}
          />
          <CompactFlowStep
            n={3}
            title="Check memory state"
            body="Ask students to place stack, heap, and console values from the example."
            tone="#b45309"
            component={<QuizPredictState />}
          />
          <CompactFlowStep
            n={4}
            title="End with code reconstruction"
            body="Assess whether they can connect memory state back to source code."
            tone="#7c3aed"
            component={<QuizCompleteCode />}
          />
        </div>
        <div style={{
          borderLeft: '1px solid #e2e6ee', background: '#fbfcfe',
          padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div>
            <div style={{
              fontSize: 9.5, fontWeight: 700, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 6,
            }}>Comparison focus</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.45, color: '#475569', margin: 0 }}>
              This version is more conventional: terms first, example second. It may feel easier to grade, but the interactive example is less of a motivating puzzle.
            </p>
          </div>
          <div style={{
            border: '1px solid #dbeafe', background: '#eff6ff',
            borderRadius: 7, padding: '10px 12px',
            fontSize: 12.5, lineHeight: 1.45, color: '#1e40af',
          }}>
            Useful contrast against Sequence A: does the example work better as an opener, or only after the vocabulary is taught?
          </div>
        </div>
      </div>
    </FlowShell>
  );
}

Object.assign(window, {
  CH1_CYCLES,
  CH1_TOKEN_TONES,
  ChapterFlowCh1Cycles,
  ChapterFlowExampleFirst,
  ChapterFlowCompactAlt,
});
