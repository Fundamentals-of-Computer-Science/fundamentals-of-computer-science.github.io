/* flow-ch1-3-truth-tables-compound-evaluation.jsx - Chapter 1, Lesson 3.
   One JSON-compatible lesson object; every page renders through the shared flow kit. */

const CH1_COMPOUND_BOOLEAN_GOALS = {
  evaluate: {
    id: 'evaluate',
    n: 'A',
    label: 'Compute and display one compound Boolean result.',
    gloss: 'Initialize the inputs, evaluate the grouped Boolean expression, and make its result visible in the console.',
  },
};

const CH1_COMPOUND_BOOLEAN_SUBGOALS = {
  initialize: {
    id: 'initialize', n: 'A.a', goal: 'evaluate',
    label: 'Initialize the starting Boolean variables.',
    gloss: 'Create each Boolean variable with the value the test expression will read.',
  },
  createExpression: {
    id: 'createExpression', n: 'A.b', goal: 'evaluate',
    label: 'Create the test Boolean expression.',
    gloss: 'Group and evaluate the operators, then bind the one Boolean result to a variable.',
  },
  display: {
    id: 'display', n: 'A.c', goal: 'evaluate',
    label: "Display the expression's value.",
    gloss: 'Pass the result variable to WriteLine so the stored Boolean value becomes visible.',
  },
};

const CH1_COMPOUND_BOOLEAN_CODE = {
  layout: 'frame',
  goals: CH1_COMPOUND_BOOLEAN_GOALS,
  subgoals: CH1_COMPOUND_BOOLEAN_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'initialize' },
    { kind: 'seg', subgoal: 'createExpression' },
    { kind: 'seg', subgoal: 'display' },
  ],
  lines: [
    {
      id: 'entry-line-1', num: '1', indent: 0,
      text: 'bool hasBadge = true;', subgoal: 'initialize',
      translation: 'Create hasBadge and initialize it with true.',
    },
    {
      id: 'entry-line-2', num: '2', indent: 0,
      text: 'bool knowsCode = false;', subgoal: 'initialize',
      translation: 'Create knowsCode and initialize it with false.',
    },
    {
      id: 'entry-line-3', num: '3', indent: 0,
      text: 'bool doorLocked = false;', subgoal: 'initialize',
      translation: 'Create doorLocked and initialize it with false.',
    },
    { id: 'entry-line-4', num: '4', indent: 0, text: '', subgoal: 'initialize' },
    {
      id: 'entry-line-5', num: '5', indent: 0,
      text: 'bool canEnter =', subgoal: 'createExpression',
      translation: 'Begin a declaration whose initializer will produce one Boolean value.',
    },
    {
      id: 'entry-line-6', num: '6', indent: 1,
      text: '(hasBadge || knowsCode) && !doorLocked;', subgoal: 'createExpression',
      translation: 'Evaluate the grouped OR and the negated lock state, then combine their results with AND.',
    },
    { id: 'entry-line-7', num: '7', indent: 0, text: '', subgoal: 'createExpression' },
    {
      id: 'entry-line-8', num: '8', indent: 0,
      text: 'Console.WriteLine(canEnter);', subgoal: 'display',
      translation: 'Display the Boolean value stored in canEnter.',
    },
  ],
  tokens: {
    bool: { tone: 'type', description: 'The type whose only values are true and false.' },
    hasBadge: { tone: 'name', description: 'Whether a badge is available.' },
    knowsCode: { tone: 'name', description: 'Whether the entry code is known.' },
    doorLocked: { tone: 'name', description: 'Whether the door is locked.' },
    canEnter: { tone: 'name', description: 'The result of the compound entry test.' },
    '!': { tone: 'op', description: 'NOT takes one Boolean input and produces its opposite.' },
    '&&': { tone: 'op', description: 'AND takes two Boolean inputs and produces true only when both are true.' },
    '||': { tone: 'op', description: 'OR takes two Boolean inputs and produces true when either or both are true.' },
    'Console.WriteLine': { tone: 'call', description: 'Display the value supplied as its argument.' },
  },
};

const CH1_COMPOUND_BOOLEAN_STATES = [
  {
    label: 'Before execution',
    desc: 'None of the starting variables exists yet, and the console is empty.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'hasBadge exists and stores true.',
    memory: [{ name: 'hasBadge', type: 'bool', value: 'true' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'knowsCode exists and stores false. The earlier value in hasBadge has not changed.',
    memory: [
      { name: 'hasBadge', type: 'bool', value: 'true' },
      { name: 'knowsCode', type: 'bool', value: 'false' },
    ],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'All three starting Boolean variables now exist with their authored values.',
    memory: [
      { name: 'hasBadge', type: 'bool', value: 'true' },
      { name: 'knowsCode', type: 'bool', value: 'false' },
      { name: 'doorLocked', type: 'bool', value: 'false' },
    ],
    console: [],
  },
  {
    label: 'After lines 5-6',
    desc: 'hasBadge is true, so OR skips the read of knowsCode. !doorLocked becomes true, and canEnter stores true.',
    memory: [
      { name: 'hasBadge', type: 'bool', value: 'true' },
      { name: 'knowsCode', type: 'bool', value: 'false' },
      { name: 'doorLocked', type: 'bool', value: 'false' },
      { name: 'canEnter', type: 'bool', value: 'true' },
    ],
    console: [],
    evalDetail: {
      title: 'Create the test Boolean expression',
      sourceLine: 'bool canEnter = (hasBadge || knowsCode) && !doorLocked;',
      steps: [
        { label: 'Start', note: 'Start with the complete declaration. The evaluation bar marks hasBadge as the first value needed.' },
        { label: 'Read hasBadge', note: 'Read true from hasBadge.' },
        { label: 'Short-circuit OR', note: 'A true left operand fixes the OR result. The read of knowsCode is skipped.' },
        { label: 'Substitute OR', note: 'Substitute true for the parenthesized OR expression.' },
        { label: 'Read doorLocked', note: 'Read false from doorLocked.' },
        { label: 'Substitute the read', note: 'Substitute false for doorLocked inside the NOT expression.' },
        { label: 'Apply NOT', note: '!false becomes true.' },
        { label: 'Substitute NOT', note: 'Substitute true for !false in the AND expression.' },
        { label: 'Apply AND', note: 'true && true becomes true.' },
        { label: 'Bind the result', note: 'Substitute the final value into the declaration and bind true to canEnter.' },
      ],
      layout: 'verticalStack',
      blocks: [
        {
          levels: [
            {
              expression: 'bool canEnter = (hasBadge || knowsCode) && !doorLocked',
              evalSpan: [17, 25],
              label: 'var',
              strike: { span: [16, 39] },
            },
            { expression: 'true || knowsCode' },
            { expression: 'true  (knowsCode skipped)' },
          ],
          arrowAfter: {},
        },
        {
          levels: [
            {
              expression: 'bool canEnter = true && !doorLocked',
              evalSpan: [29, 39],
              label: 'var',
              strike: { span: [29, 39] },
            },
            { expression: 'false' },
          ],
          arrowAfter: {},
        },
        {
          levels: [
            {
              expression: 'bool canEnter = true && !false',
              evalSpan: [28, 34],
              label: '!',
              strike: { span: [28, 34] },
            },
            { expression: 'true' },
          ],
          arrowAfter: {},
        },
        {
          levels: [
            {
              expression: 'bool canEnter = true && true',
              evalSpan: [16, 28],
              label: '&&',
              strike: { span: [16, 28] },
            },
            { expression: 'true' },
          ],
          arrowAfter: {},
        },
        {
          levels: [{ expression: 'bool canEnter = true' }],
        },
      ],
      minCanvasWidth: 770,
    },
  },
  {
    label: 'After line 8',
    desc: 'WriteLine reads canEnter and displays the same Boolean value stored in program state.',
    memory: [
      { name: 'hasBadge', type: 'bool', value: 'true' },
      { name: 'knowsCode', type: 'bool', value: 'false' },
      { name: 'doorLocked', type: 'bool', value: 'false' },
      { name: 'canEnter', type: 'bool', value: 'true' },
    ],
    console: ['True'],
  },
];

const CH1_COMPOUND_BOOLEAN_TRACE = [
  { id: 'entry-step-1', rowKey: 'entry-line-1', subgoal: 'initialize', goal: 'evaluate', stateIndex: 1 },
  { id: 'entry-step-2', rowKey: 'entry-line-2', subgoal: 'initialize', goal: 'evaluate', stateIndex: 2 },
  { id: 'entry-step-3', rowKey: 'entry-line-3', subgoal: 'initialize', goal: 'evaluate', stateIndex: 3 },
  { id: 'entry-step-4', rowKey: 'entry-line-5', subgoal: 'createExpression', goal: 'evaluate', stateIndex: 4 },
  { id: 'entry-step-5', rowKey: 'entry-line-8', subgoal: 'display', goal: 'evaluate', stateIndex: 5 },
];

const CH1_COMPOUND_BOOLEAN_TRANSFER_CODE = {
  lines: [
    { id: 'start-line-1', num: '1', text: 'bool safe = true;' },
    { id: 'start-line-2', num: '2', text: 'bool overrideActive = false;' },
    { id: 'start-line-3', num: '3', text: 'bool lockout = false;' },
    { id: 'start-line-4', num: '4', text: '' },
    { id: 'start-line-5', num: '5', text: 'bool canStart =' },
    { id: 'start-line-6', num: '6', indent: 1, text: 'safe && (!lockout || overrideActive);' },
    { id: 'start-line-7', num: '7', text: '' },
    { id: 'start-line-8', num: '8', text: 'Console.WriteLine(canStart);' },
  ],
};

const CH1_COMPOUND_BOOLEAN_CHAPTERS = (window.FUNCS_CHAPTERS || []).map(chapter => ({
  ...chapter,
  current: chapter.id === 'ch1',
}));

const CH1_COMPOUND_BOOLEAN_EXAMPLES = [
  {
    label: 'Lesson 1',
    source: 'ch1/ch1-1.md',
    title: 'Boolean Values, State, and Visible Results',
    href: 'Ch1-1-Boolean-Values-State-Visible-Results.html',
    current: false,
    summary: 'Store Boolean values, compute new values, and display the results.',
    tags: ['bool', 'state', 'equality'],
  },
  {
    label: 'Lesson 2',
    source: 'ch1/ch1-3.md',
    title: 'Simple Decisions from Input',
    href: 'Ch1-2-Simple-Decisions-From-Input.html',
    current: false,
    summary: 'Retrieve input, produce a Boolean decision, and execute the selected scope.',
    tags: ['ReadLine', 'condition', 'if', 'else'],
  },
  {
    label: 'Lesson 3',
    source: 'ch1/ch1-2.md',
    title: 'Truth Tables and Compound Evaluation',
    href: 'Ch1-3-Truth-Tables-Compound-Evaluation.html',
    current: true,
    summary: 'Use truth tables, grouping, and short-circuit rules to evaluate compound Boolean expressions.',
    tags: ['truth tables', 'OR', 'precedence', 'short-circuit'],
  },
];

const CH1_COMPOUND_BOOLEAN_LESSON = {
  id: 'ch1-3-truth-tables-compound-evaluation',
  chapterId: 'ch1',
  source: 'ch1/ch1-2.md',
  stableUrl: '/ch1/ch1-2.html',
  order: 3,
  title: 'Truth Tables and Compound Evaluation',
  kicker: 'Chapter 1',
  learningTarget: 'Follow a compound Boolean expression until it becomes one value, then identify any operand C# skips.',
  roadmap: {
    order: 3,
    sourceAnchors: ['ch1-2-ci-006', 'ch1-2-ci-008', 'ch1-2-ci-009'],
    reviewConcepts: ['ch1-2-ci-010', 'C1.1 Boolean state, NOT, AND, and equality'],
  },
  availableSyntax: [
    {
      group: 'Boolean operators',
      items: [
        { term: '!value', note: 'NOT takes one Boolean input and produces its opposite.', source: 'review' },
        { term: 'left && right', note: 'AND produces true only when both inputs are true.', source: 'review' },
        { term: 'left || right', note: 'OR produces true when either or both inputs are true.', source: 'ch1-2-ci-006' },
      ],
    },
    {
      group: 'Grouping and evidence',
      items: [
        { term: '(expression)', note: 'Parentheses make grouping explicit.', source: 'ch1-2-ci-008' },
        { term: 'Console.WriteLine(value);', note: 'Display the final Boolean result.', source: 'review' },
      ],
    },
  ],
  chapterNav: { chapters: CH1_COMPOUND_BOOLEAN_CHAPTERS },
  chapterExamples: CH1_COMPOUND_BOOLEAN_EXAMPLES,

  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Evaluate an entry condition',
      modeLabel: 'Full walkthrough',
      instructions: 'Run the program one executed row at a time. Open the evaluation steps when canEnter is created to see the skipped read and each substitution.',
      programLabel: 'Program.cs',
      programNote: 'The three labels name the jobs performed by each code group.',
    },
    code: CH1_COMPOUND_BOOLEAN_CODE,
    goals: CH1_COMPOUND_BOOLEAN_GOALS,
    subgoals: CH1_COMPOUND_BOOLEAN_SUBGOALS,
    executionTrace: CH1_COMPOUND_BOOLEAN_TRACE,
    states: CH1_COMPOUND_BOOLEAN_STATES,
  },

  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Recall Boolean state, operator inputs, simple results, and exact console evidence before evaluating a compound expression.',
  },

  mainLesson: {
    title: 'From Truth-Table Rows to One Boolean Value',
    label: 'Main Lesson',
    intro: 'A Boolean expression may contain several operators and still produce one value. Truth tables determine each operator result, grouping identifies the operands, and short-circuit rules determine which right operands C# actually evaluates.',
    acts: [
      {
        n: 1,
        title: 'Count operator inputs and build truth tables.',
        body: [
          'A Boolean operator takes Boolean inputs and produces a Boolean result.',
          'One Boolean input has two possible values, so a unary truth table has two rows. Two Boolean inputs have four possible pairs, so a binary truth table has four rows.',
          '! is unary and returns the opposite of its input. && is binary and returns true only when both inputs are true. || is binary and returns true when either input is true or both inputs are true. The last OR row matters: true || true is true because C# uses inclusive OR.',
        ],
        definitions: [
          { term: 'Expression', definition: 'Code that evaluates to a value.' },
          { term: 'Unary operator', definition: 'An operator with one input.' },
          { term: 'Binary operator', definition: 'An operator with two input positions.' },
          { term: 'Truth table', definition: 'A table that lists every possible input combination and the result for each combination.' },
        ],
        code: [
          '// NOT: one input',
          '// x      !x',
          '// false  true',
          '// true   false',
          '// AND: two inputs',
          '// a      b      a && b',
          '// false  false  false',
          '// false  true   false',
          '// true   false  false',
          '// true   true   true',
          '// OR: two inputs',
          '// a      b      a || b',
          '// false  false  false  // only false OR row',
          '// false  true   true',
          '// true   false  true',
          '// true   true   true   // inclusive OR',
        ],
        translations: [
          { code: '!x', text: 'not x' },
          { code: 'a && b', text: 'a and b' },
          { code: 'a || b', text: 'a or b' },
        ],
        recall: {
          cards: [
            { id: 'truth-table-rows', prompt: 'How many rows do unary and binary Boolean truth tables need?', answer: 'A unary Boolean truth table needs two rows. A binary Boolean truth table needs four rows.' },
            { id: 'inclusive-or', prompt: 'What does true || true produce in C#?', answer: 'It produces true because || is inclusive OR.' },
          ],
        },
      },
      {
        n: 2,
        title: 'Simplify a compound expression by its grouping.',
        body: [
          'Parentheses and precedence determine how a compound expression is grouped. When parentheses do not settle the grouping, ! groups first, && groups next, and || groups last.',
          'For false || !false && true, the structure is false || ((!false) && true). The outer operator is ||. Its false left operand does not fix the result, so C# must evaluate the grouped right operand.',
          'First, !false becomes true. Next, true && true becomes true. Finally, false || true becomes true. Preserve the containing expression until the selected term has been replaced by its result.',
          'Precedence describes structure; it does not promise that every higher-precedence group will execute. A short-circuiting operator can skip an entire grouped right operand.',
          'In the evaluation window, the bar marks the next term whose value is needed. Each Next action reveals one immediate result upward. After that term becomes a value, the following action substitutes it across into the simplified containing expression. A skipped group receives no evaluation step.',
        ],
        definitions: [
          { term: 'Compound expression', definition: 'An expression that contains more than one operator.' },
          { term: 'Grouping', definition: 'The structure that determines which operands belong to each operator.' },
          { term: 'Precedence', definition: 'The rule C# uses to determine grouping when parentheses do not already settle it.' },
        ],
        code: [
          'false || !false && true',
          'false || true && true',
          'false || true',
          'true',
        ],
        translations: [
          {
            code: 'false || !false && true',
            text: 'false or (not false and true)',
          },
          {
            code: 'false || ((!false) && true)',
            text: 'The explicit grouping: NOT belongs to false, that result and true belong to AND, and the AND result belongs to OR.',
          },
        ],
        recall: {
          cards: [
            { id: 'precedence-order', prompt: 'What is the Boolean precedence order when parentheses do not settle the grouping?', answer: '! groups first, && groups next, and || groups last.' },
            { id: 'grouping-runtime', prompt: 'Does precedence guarantee that every grouped operand executes?', answer: 'No. Precedence determines grouping; short-circuiting can still skip a grouped right operand.' },
          ],
        },
      },
      {
        n: 3,
        title: 'Separate the logical result from executed operands.',
        body: [
          'For && and ||, C# evaluates the left operand first. false && right becomes false without evaluating right. true || right becomes true without evaluating right. true && right and false || right must evaluate the right operand.',
          'Return to (hasBadge || knowsCode) && !doorLocked. Reading hasBadge produces true, so the inner OR skips the read of knowsCode and becomes true. The outer AND still needs its right operand, so C# reads doorLocked, computes !false as true, and combines true && true.',
          'The final result is true. knowsCode exists and stores false, but this expression never reads it. Initialization and operand evaluation occur at different moments.',
        ],
        definitions: [
          { term: 'Operand', definition: 'An input expression supplied to an operator.' },
          { term: 'Short-circuit evaluation', definition: 'Skipping a right operand when the left operand already determines the result of && or ||.' },
        ],
        code: [
          'false && right  // false; right skipped',
          'true || right   // true; right skipped',
          'true && right   // evaluate right',
          'false || right  // evaluate right',
        ],
        translations: [
          { code: 'false && right', text: 'false and right; the result is false, so C# skips right.' },
          { code: 'true || right', text: 'true or right; the result is true, so C# skips right.' },
          { code: 'true && right', text: 'true and right; C# must evaluate right to determine the result.' },
          { code: 'false || right', text: 'false or right; C# must evaluate right to determine the result.' },
        ],
        recall: {
          cards: [
            { id: 'and-skip', prompt: 'When does && skip its right operand?', answer: '&& skips its right operand when the left operand evaluates to false.' },
            { id: 'or-skip', prompt: 'When does || skip its right operand?', answer: '|| skips its right operand when the left operand evaluates to true.' },
          ],
        },
      },
    ],
  },

  rigorousQuiz: {
    title: 'System Start Transfer',
    prompt: 'Use the visible system-start program for every question. Track its starting values, grouping, runtime order, skipped read, result, and exact console output.',
    transferCode: CH1_COMPOUND_BOOLEAN_TRANSFER_CODE,
  },

  exercises: {
    title: 'Compound Boolean Practice',
    label: 'Exercises',
    intro: 'Move from labeled construction to independent simplification, then use complete truth tables to discover and apply a negation pattern.',
  },

  flow: {
    goal: {
      intent: 'Observe how one compound expression simplifies, which variable read is skipped, and how the result becomes visible.',
      badge: 'Full example',
      activeGoal: 'evaluate',
      activeSubgoal: 'initialize',
      activeKey: 'entry-line-1',
      startLabel: 'Start example',
      startStatus: 'example not yet run',
      runLabel: 'Run next executed row',
      note: 'The walkthrough uses the authored starting values. Opening the evaluation detail shows only the base expression before each result is revealed.',
    },

    preQuiz: {
      intent: 'Recall the state, operator, and display jobs used by the opening compound expression.',
      kicker: 'Pre-Quiz - Truth Tables and Compound Evaluation',
      part1Prompt: 'Put the three code jobs in the order used by this program.',
      part1Code: [
        'bool ready = true;',
        'bool blocked = !ready;',
        'Console.WriteLine(blocked);',
      ],
      part2Prompt: 'Open each code job and answer its short question.',
      orderSuccess: 'The program initializes its starting value, creates the test result, then displays that result.',
      orderRetry: 'Begin with the declaration that supplies the input. The expression needs that value, and WriteLine needs the expression result.',
      categories: [
        {
          id: 'initialize', n: 'A.a',
          label: 'Initialize the starting Boolean variables.',
          why: 'The declaration creates ready and stores true before the test expression runs.',
        },
        {
          id: 'createExpression', n: 'A.b',
          label: 'Create the test Boolean expression.',
          why: 'The expression reads ready, applies NOT, and binds the result to blocked.',
        },
        {
          id: 'display', n: 'A.c',
          label: "Display the expression's value.",
          why: 'WriteLine reads blocked and displays its Boolean value.',
        },
      ],
      hideOrderOrdinals: true,
      shuffled: ['display', 'initialize', 'createExpression'],
      details: {
        initialize: {
          type: 'complete the state row', kind: 'row',
          q: 'Complete program state after both declarations run.',
          contextCode: [
            'bool ready = true;',
            'bool blocked = !ready;',
          ],
          rowLabel: 'after line 2',
          columns: ['moment', 'ready', 'blocked'],
          cells: [
            { col: 'ready', chips: ['true', 'false'], correct: 'true' },
            { col: 'blocked', chips: ['true', 'false'], correct: 'false' },
          ],
          why: 'A.a initializes ready with true. A.b computes a new false value for blocked without changing ready.',
        },
        createExpression: {
          type: 'complete the operator row', kind: 'row',
          q: 'Complete the input count and the two simple results.',
          rowLabel: 'operator recall',
          columns: ['item', '! inputs', '!true', 'true && false'],
          cells: [
            { col: '! inputs', chips: ['one', 'two', 'four'], correct: 'one' },
            { col: '!true', chips: ['true', 'false'], correct: 'false' },
            { col: 'true && false', chips: ['true', 'false'], correct: 'false' },
          ],
          why: 'A.b uses Boolean operators. NOT is unary, !true is false, and AND is true only when both inputs are true.',
        },
        display: {
          type: 'choose the exact output', kind: 'choice', mono: true,
          q: 'What exact line does Console.WriteLine(blocked) display?',
          choices: ['false', 'True', 'False'],
          correct: 2,
          why: 'A.c displays the false value stored in blocked using C# Boolean casing: False.',
        },
      },
    },

    mainLesson: {
      intent: 'Build complete truth tables, use grouping to simplify a compound expression, and separate grouping from short-circuit execution.',
      completeNote: 'You used truth-table rules to simplify grouped expressions and identified the exact right operands C# skipped.',
      checks: [
        {
          type: 'complete the OR row', kind: 'row',
          q: 'Complete this OR row and identify the operator input count.',
          rowLabel: 'a = true, b = false',
          columns: ['inputs', 'a || b', 'operator kind'],
          cells: [
            { col: 'a || b', chips: ['true', 'false'], correct: 'true' },
            { col: 'operator kind', chips: ['unary', 'binary'], correct: 'binary' },
          ],
          why: 'OR is false only when both inputs are false. It is binary because it has two input positions.',
        },
        {
          type: 'order the simplification', kind: 'order',
          q: 'Put the simplification states for false || !false && true in order.',
          bank: [
            'false || true',
            'true',
            'false || !false && true',
            'false || true && true',
          ],
          correct: [
            'false || !false && true',
            'false || true && true',
            'false || true',
            'true',
          ],
          placeholder: 'tap the next expression state',
          why: 'NOT simplifies inside the grouped right operand, AND produces that operand\'s value, and OR then produces the final value.',
        },
        {
          type: 'complete the execution row', kind: 'row',
          q: 'Complete the runtime row for false && (!false || true).',
          rowLabel: 'false && right group',
          columns: ['expression', 'left operand', 'right group', 'final result'],
          cells: [
            { col: 'left operand', chips: ['evaluated as false', 'skipped'], correct: 'evaluated as false' },
            { col: 'right group', chips: ['evaluated', 'skipped'], correct: 'skipped' },
            { col: 'final result', chips: ['true', 'false'], correct: 'false' },
          ],
          why: 'A false left operand fixes the result of &&. C# skips the complete parenthesized right operand and returns false.',
        },
      ],
    },

    rigorousQuiz: {
      intent: 'Transfer grouping, truth-table, short-circuit, binding, and output reasoning to a new compound expression.',
      codeLabel: 'System-start program',
      success: 'You followed the grouped expression to true, identified the skipped overrideActive read, and matched the stored value with the console output.',
      cards: [
        {
          id: 'starting-state', type: 'complete the starting state', kind: 'row',
          q: 'Complete the state immediately before canStart is evaluated.',
          rowLabel: 'before line 5',
          columns: ['moment', 'safe', 'overrideActive', 'lockout'],
          cells: [
            { col: 'safe', chips: ['true', 'false'], correct: 'true' },
            { col: 'overrideActive', chips: ['true', 'false'], correct: 'false' },
            { col: 'lockout', chips: ['true', 'false'], correct: 'false' },
          ],
          why: 'A.a Initialize the starting Boolean variables: read the three declaration lines. The test expression has not changed any stored value.',
        },
        {
          id: 'grouping', type: 'choose the grouping', kind: 'choice', mono: true,
          q: 'Which fully parenthesized form matches line 6?',
          choices: [
            '(safe && !lockout) || overrideActive',
            '(safe && (!lockout)) && overrideActive',
            'safe && ((!lockout) || overrideActive)',
          ],
          correct: 2,
          why: 'A.b Create the test Boolean expression: the written parentheses make the OR expression the right operand of &&, and ! applies to lockout.',
        },
        {
          id: 'runtime-order', type: 'order the runtime events', kind: 'order',
          q: 'Put the expression events in runtime order.',
          bank: [
            'Bind true to canStart.',
            'Read safe as true.',
            'Skip the read of overrideActive.',
            'Read lockout as false and apply ! to produce true.',
            'Combine true && true to produce true.',
          ],
          correct: [
            'Read safe as true.',
            'Read lockout as false and apply ! to produce true.',
            'Skip the read of overrideActive.',
            'Combine true && true to produce true.',
            'Bind true to canStart.',
          ],
          placeholder: 'tap the next runtime event',
          why: 'A true left operand makes && request its right group. Inside that group, !lockout becomes true, so || skips overrideActive.',
        },
        {
          id: 'result-output', type: 'complete the result row', kind: 'row',
          q: 'Complete the stored result and exact visible evidence.',
          rowLabel: 'after line 8',
          columns: ['moment', 'canStart', 'console'],
          cells: [
            { col: 'canStart', chips: ['true', 'false'], correct: 'true' },
            { col: 'console', chips: ['true', 'True', 'False'], correct: 'True' },
          ],
          why: 'A.b binds true to canStart. A.c displays the same Boolean value using C# casing: True.',
        },
        {
          id: 'skipped-read', type: 'choose the skipped read', kind: 'choice', mono: true,
          q: 'Which variable is initialized but not read while canStart is evaluated?',
          choices: ['overrideActive', 'canStart', 'safe', 'lockout'],
          correct: 0,
          why: '!lockout produces true, so the inner OR already has a true result and skips the read of overrideActive.',
        },
      ],
    },

    exercises: {
      intent: 'Fade support from labeled construction to trace repair, truth-table discovery, and independent equivalence checking.',
      intro: 'Complete every truth-table row before opening its model. A single matching input pair is not enough to establish that two expressions are equivalent.',
      problems: [
        {
          n: 1, title: 'Build a labeled status test', tag: 'guided labels',
          statement: 'Complete the test so alert is true only when the sensor is active and not muted, then predict the exact console output.',
          given: [
            '// A.a Initialize the starting Boolean variables.',
            'bool sensorActive = true;',
            'bool muted = false;',
            '',
            '// A.b Create the test Boolean expression.',
            'bool alert = ____________________;',
            '',
            '// A.c Display the expression\'s value.',
            'Console.WriteLine(alert);',
          ],
          constraints: [
            'Use sensorActive, muted, &&, and !.',
            'Do not change the starting values.',
            'Predict the exact C# console output.',
          ],
          model: [
            'bool alert = sensorActive && !muted;',
            'alert stores true.',
            'Console output: True',
          ],
          feedback: 'If alert is wrong, check A.b: negate muted before AND combines the inputs. If the output is lowercase, check A.c and C# Boolean casing.',
        },
        {
          n: 2, title: 'Decide whether the right operand is needed', tag: 'labels retained',
          statement: 'Evaluate the expression, identify whether holiday is read, and predict the exact output.',
          given: [
            'bool weekday = false;',
            'bool holiday = true;',
            'bool closed = !weekday || holiday;',
            'Console.WriteLine(closed);',
          ],
          constraints: [
            'State the value produced by !weekday.',
            'State whether the expression reads holiday.',
            'State the value stored in closed and the exact console output.',
          ],
          model: [
            '!weekday becomes true.',
            'true || holiday short-circuits, so holiday is not read.',
            'closed stores true.',
            'Console output: True',
          ],
          feedback: 'The declaration of holiday runs before the expression. The later read of holiday is what short-circuiting skips.',
        },
        {
          n: 3, title: 'Repair a faulty trace', tag: 'reduced guidance',
          statement: 'Correct the grouping and runtime trace, then give the final value.',
          given: [
            'Expression: true || false && false',
            '',
            'Faulty trace:',
            '1. Evaluate true || false first.',
            '2. Replace it with true.',
            '3. Evaluate true && false.',
            '4. Report false.',
          ],
          constraints: [
            'Write the fully grouped expression.',
            'State which operands actually execute.',
            'Separate precedence from runtime short-circuiting.',
          ],
          model: [
            'Grouping: true || (false && false)',
            'Read the left operand of || as true.',
            'Skip the complete right group.',
            'Final value: true',
          ],
          feedback: 'If the grouping is wrong, && groups before ||. If the group still executes, remember that grouping does not override the true || right short-circuit rule.',
        },
        {
          n: 4, title: 'Discover a negation pattern', tag: 'truth-table discovery',
          statement: 'Complete both tables before opening the model. Compare the final two columns in each table and describe the pattern you find.',
          given: [
            'Table A',
            'a      b      !(a && b)   !a || !b',
            'false  false  _________   ________',
            'false  true   _________   ________',
            'true   false  _________   ________',
            'true   true   _________   ________',
            '',
            'Table B',
            'a      b      !(a || b)   !a && !b',
            'false  false  _________   ________',
            'false  true   _________   ________',
            'true   false  _________   ________',
            'true   true   _________   ________',
          ],
          constraints: [
            'Compute the grouped expression before applying the outside !.',
            'Complete all eight rows before comparing columns.',
            'Describe what happens to each input and to the grouped operator.',
          ],
          model: [
            'Table A results: true/true, true/true, true/true, false/false.',
            'Table B results: true/true, false/false, false/false, false/false.',
            '!(a && b) has the same result as !a || !b.',
            '!(a || b) has the same result as !a && !b.',
            'The pattern negates each input and swaps && with ||.',
            'A later class will call these equivalences De Morgan\'s laws.',
          ],
          feedback: 'If one row differs, recompute the grouped expression before applying the outside !. If every row differs, check that you negated both inputs and swapped the operator.',
        },
        {
          n: 5, title: 'Use the discovered pattern', tag: 'independent transfer',
          statement: 'Rewrite both expressions without placing ! outside parentheses, then verify each rewrite across all four input pairs.',
          given: [
            '1. !(ready && verified)',
            '2. !(blocked || expired)',
            '',
            'Program check for one input pair:',
            'bool ready = false;',
            'bool verified = true;',
            'bool original = !(ready && verified);',
            'bool rewritten = !ready || !verified;',
            'Console.WriteLine(original == rewritten);',
          ],
          constraints: [
            'Use only bool variables, !, &&, ||, ==, and Console.WriteLine.',
            'Negate each input and swap the grouped operator.',
            'Verify all four input pairs; one matching pair is not enough evidence.',
            'Do not use if, loops, or methods.',
          ],
          model: [
            '!ready || !verified',
            '!blocked && !expired',
            'Each original column matches its rewritten column in all four rows.',
            'The shown program displays True for its input pair.',
          ],
          feedback: 'If the truth-table columns differ, check both parts of the pattern: negate each input and swap AND with OR. If the values match but the output prediction is wrong, check A.c and C# Boolean casing.',
        },
      ],
    },
  },
};

Object.assign(window, {
  CH1_COMPOUND_BOOLEAN_GOALS,
  CH1_COMPOUND_BOOLEAN_SUBGOALS,
  CH1_COMPOUND_BOOLEAN_CODE,
  CH1_COMPOUND_BOOLEAN_STATES,
  CH1_COMPOUND_BOOLEAN_TRACE,
  CH1_COMPOUND_BOOLEAN_TRANSFER_CODE,
  CH1_COMPOUND_BOOLEAN_LESSON,
});
