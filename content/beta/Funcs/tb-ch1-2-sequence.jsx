/* tb-ch1-2-sequence.jsx - fixture-first Chapter 1.2 Boolean Expressions lesson */

const CH1_2_CHAPTERS = [
  { n: 0, id: 'ch0', label: 'Chapter 0', title: 'Before You Begin', href: '../../ch0/' },
  { n: 1, id: 'ch1', label: 'Chapter 1', title: 'Booleans', href: 'Ch1 Roadmap.html', current: true },
  { n: 2, id: 'ch2', label: 'Chapter 2', title: 'Integers and Doubles', href: 'Ch2 Numeric Data Memory Sequence.html' },
  { n: 3, id: 'ch3', label: 'Chapter 3', title: 'Arrays', href: '../../ch3/' },
  { n: 4, id: 'ch4', label: 'Chapter 4', title: 'Classes and Linked Lists', href: '../../ch4/' },
];

const CH1_2_CHAPTER_EXAMPLES = [
  {
    label: 'Lesson 1',
    source: 'ch1-1',
    title: 'Boolean Data and Memory',
    href: 'Ch1 Data Memory Sequence.html',
    summary: 'Booleans as stored values that change line by line.',
    tags: ['bool storage', 'state table', 'read/write'],
  },
  {
    label: 'Lesson 2',
    source: 'ch1-2',
    title: 'Boolean Expressions',
    href: 'Ch1 Boolean Expressions Sequence.html',
    current: true,
    summary: 'Operators compute new boolean values from existing state.',
    tags: ['!', '&&', 'variables'],
  },
  {
    label: 'Lesson 3',
    source: 'ch1-2',
    title: 'Compound Conditions',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-compound-short-circuit',
    summary: 'Combine and order boolean operators without losing the evaluation rule.',
    tags: ['||', 'precedence', 'short-circuit'],
  },
  {
    label: 'Lesson 4',
    source: 'ch1-3',
    title: 'Branching and Scope',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-branching-scope',
    summary: 'Use bool values to choose a path and update visible state.',
    tags: ['if', 'blocks', 'scope'],
  },
  {
    label: 'Lesson 5',
    source: 'ch1-3',
    title: 'Ordered Branches and Input',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-ordered-branches-input',
    summary: 'Check ordered cases from input-derived values.',
    tags: ['else if', 'input', 'case order'],
  },
  {
    label: 'Lesson 6',
    source: 'ch1-3',
    title: 'While Loops and Progress',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-while-progress',
    summary: 'Use a boolean guard and update it so a loop can finish.',
    tags: ['while', 'guard', 'progress'],
  },
  {
    label: 'Lesson 7',
    source: 'ch1-4',
    title: 'Boolean Methods',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-boolean-methods-return',
    summary: 'Package a boolean computation behind a return value.',
    tags: ['method', 'return', 'parameter'],
  },
  {
    label: 'Lesson 8',
    source: 'ch1-4',
    title: 'Void Methods and Operations',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-void-methods-operations',
    summary: 'Separate output methods from methods that compute a bool.',
    tags: ['void', 'call', 'output'],
  },
  {
    label: 'Lesson 9',
    source: 'ch1-5',
    title: 'Struct Basics and Fields',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-struct-basics-fields',
    summary: 'Group boolean facts into a small value with fields.',
    tags: ['struct', 'field', 'dot'],
  },
  {
    label: 'Lesson 10',
    source: 'ch1-5',
    title: 'Struct Copy and Methods',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-struct-copy-methods',
    summary: 'Copy struct values and pass them to boolean operations.',
    tags: ['copy', 'method', 'synthesis'],
  },
];

const CH1_2_FULL_CODE = {
  lines: [
    { id: 'line-1', text: 'bool sunny = true;', translation: 'Create sunny and bind true to it.' },
    { id: 'line-2', text: 'bool weekend = false;', translation: 'Create weekend and bind false to it.' },
    { id: 'line-3', text: 'bool stayInside = !sunny;', translation: 'Evaluate !sunny, then bind that result to stayInside.' },
    { id: 'line-4', text: 'bool goOutside = sunny && !weekend;', translation: 'Evaluate sunny and !weekend, then combine them with AND.' },
    { id: 'line-5', text: 'Console.WriteLine(goOutside);', translation: 'Evaluate goOutside and print the resulting boolean value.' },
  ],
  tokens: {
    'Console.WriteLine': {
      tone: 'call',
      description: 'A method call that evaluates its argument and displays the result.',
    },
    stayInside: {
      tone: 'name',
      description: 'A variable that stores the result of applying NOT to sunny.',
    },
    goOutside: {
      tone: 'name',
      description: 'A variable that stores the combined AND expression result.',
    },
    weekend: {
      tone: 'name',
      description: 'A variable name used as an operand in the expression.',
    },
    sunny: {
      tone: 'name',
      description: 'A variable name. Reading it produces its currently stored value.',
    },
    bool: {
      tone: 'type',
      description: 'The boolean type. A bool value is either true or false.',
    },
    true: {
      tone: 'value',
      description: 'A boolean literal value.',
    },
    false: {
      tone: 'value',
      description: 'A boolean literal value.',
    },
    '&&': {
      tone: 'op',
      description: 'AND. Produces true only when both operands evaluate to true.',
    },
    '!': {
      tone: 'op',
      description: 'NOT. Evaluates one bool and flips it.',
    },
    '=': {
      tone: 'op',
      description: 'Assignment. Evaluate the right side first, then bind the result.',
    },
  },
};

const CH1_2_FULL_STATES = [
  {
    label: 'Before execution',
    desc: 'No variables exist yet. No expression has been evaluated.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'sunny is bound directly to the literal value true.',
    memory: [{ name: 'sunny', type: 'bool', value: 'true' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'weekend is added as a second boolean binding.',
    memory: [
      { name: 'sunny', type: 'bool', value: 'true' },
      { name: 'weekend', type: 'bool', value: 'false' },
    ],
    console: [],
  },
  {
    label: 'After line 3',
    desc: '!sunny reads sunny, flips true to false, then binds false to stayInside.',
    memory: [
      { name: 'sunny', type: 'bool', value: 'true' },
      { name: 'weekend', type: 'bool', value: 'false' },
      { name: 'stayInside', type: 'bool', value: 'false' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate NOT before binding',
      sourceLine: 'bool stayInside = !sunny;',
      steps: [
        { label: 'Expression', note: 'Start with the complete right side before binding stayInside.' },
        { label: 'Lookup', note: 'Look up sunny in memory. It is currently true.' },
        { label: 'Substitute', note: 'Substitute true for sunny inside the expression.' },
        { label: 'Apply NOT', note: 'NOT flips true to false, then that result is bound.' },
      ],
      frames: [
        {
          expression: 'bool stayInside = !sunny',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [19, 24], label: 'var', value: 'true' }],
          strike: { showAt: 2, activeAt: [2], span: [19, 24] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'bool stayInside = !true',
          showAt: 2,
          activeAt: [2, 3],
          stack: [{ showAt: 3, activeAt: [3], span: [18, 23], label: 'not', value: 'false' }],
          strike: { showAt: 3, activeAt: [3], span: [18, 23] },
          arrowAfter: { showAt: 3, activeAt: [3] },
        },
        {
          expression: 'bool stayInside = false',
          showAt: 3,
          activeAt: [3],
        },
      ],
      minCanvasWidth: 980,
    },
  },
  {
    label: 'After line 4',
    desc: 'sunny is true and !weekend is true, so AND produces true.',
    memory: [
      { name: 'sunny', type: 'bool', value: 'true' },
      { name: 'weekend', type: 'bool', value: 'false' },
      { name: 'stayInside', type: 'bool', value: 'false' },
      { name: 'goOutside', type: 'bool', value: 'true' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate both operands before AND',
      sourceLine: 'bool goOutside = sunny && !weekend;',
      steps: [
        { label: 'Expression', note: 'Start with the complete right side.' },
        { label: 'Left lookup', note: 'Evaluate the left operand first. sunny is true.' },
        { label: 'Substitute left', note: 'Replace sunny with true.' },
        { label: 'Right lookup', note: 'Evaluate the right operand. weekend is false.' },
        { label: 'Apply NOT', note: '!false becomes true.' },
        { label: 'Apply AND', note: 'true && true produces true.' },
      ],
      frames: [
        {
          expression: 'bool goOutside = sunny && !weekend',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [17, 22], label: 'var', value: 'true' }],
          strike: { showAt: 2, activeAt: [2], span: [17, 22] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'bool goOutside = true && !weekend',
          showAt: 2,
          activeAt: [2, 3, 4],
          stack: [{ showAt: 3, activeAt: [3], span: [26, 33], label: 'var', value: 'false' }],
          strike: { showAt: 4, activeAt: [4], span: [25, 33] },
          arrowAfter: { showAt: 4, activeAt: [4] },
        },
        {
          expression: 'bool goOutside = true && true',
          showAt: 4,
          activeAt: [4, 5],
          stack: [{ showAt: 5, activeAt: [5], span: [17, 29], label: 'and', value: 'true' }],
          strike: { showAt: 5, activeAt: [5], span: [17, 29] },
          arrowAfter: { showAt: 5, activeAt: [5] },
        },
        {
          expression: 'bool goOutside = true',
          showAt: 5,
          activeAt: [5],
        },
      ],
      minCanvasWidth: 1040,
    },
  },
  {
    label: 'After line 5',
    desc: 'goOutside is evaluated and printed.',
    memory: [
      { name: 'sunny', type: 'bool', value: 'true' },
      { name: 'weekend', type: 'bool', value: 'false' },
      { name: 'stayInside', type: 'bool', value: 'false' },
      { name: 'goOutside', type: 'bool', value: 'true' },
    ],
    console: ['true'],
    evalDetail: {
      title: 'Evaluate the argument before printing',
      sourceLine: 'Console.WriteLine(goOutside);',
      steps: [
        { label: 'Call', note: 'Evaluate the argument inside the call.' },
        { label: 'Lookup', note: 'Look up goOutside in memory.' },
        { label: 'Substitute', note: 'Substitute true for goOutside.' },
        { label: 'Print', note: 'WriteLine sends the value to the console.' },
      ],
      frames: [
        {
          expression: 'Console.WriteLine(goOutside)',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [18, 27], label: 'var', value: 'true' }],
          strike: { showAt: 2, activeAt: [2], span: [18, 27] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'Console.WriteLine(true)',
          showAt: 2,
          activeAt: [2, 3],
          arrowAfter: { showAt: 3, activeAt: [3] },
        },
        {
          expression: 'console output: true',
          showAt: 3,
          activeAt: [3],
        },
      ],
      minCanvasWidth: 820,
    },
  },
];

const CH1_2_AVAILABLE_SYNTAX = [
  {
    group: 'Boolean storage',
    items: [
      { term: 'bool name = value;', note: 'Declare a boolean variable and bind an initial value.', source: 'ch1-1' },
      { term: 'name = value;', note: 'Rebind an existing variable after the right side evaluates.', source: 'ch1-1' },
      { term: 'Console.WriteLine(value);', note: 'Print the evaluated argument to stdout.', source: 'ch1-1' },
    ],
  },
  {
    group: 'Boolean expressions',
    items: [
      { term: '!expr', note: 'Evaluate expr as a bool, then flip it.', source: 'ch1-2' },
      { term: 'left && right', note: 'AND produces true only when both sides are true.', source: 'ch1-2' },
      { term: 'left || right', note: 'OR produces true when at least one side is true.', source: 'ch1-2' },
    ],
  },
];

const CH1_BOOLEAN_EXPRESSIONS_LESSON = {
  id: 'ch1-boolean-expressions',
  chapterId: 'ch1',
  source: 'ch1/ch1-2.md',
  stableUrl: 'ch1/boolean-expressions',
  order: 2,
  title: 'Boolean Expressions',
  kicker: 'Chapter 1',
  learningTarget: 'Evaluate ! and && expressions by reading variables, substituting values, applying operators, and binding the final bool.',
  roadmap: {
    order: 2,
    sourceAnchors: ['ch1/ch1-2.md', 'doc-16:Boolean operators'],
    reviewConcepts: ['Boolean variables', 'value copy', 'Console.WriteLine'],
  },
  availableSyntax: CH1_2_AVAILABLE_SYNTAX,
  chapterNav: {
    chapters: CH1_2_CHAPTERS,
  },
  chapterExamples: CH1_2_CHAPTER_EXAMPLES,
  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Boolean Expressions',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the program line by line. Click any line for its translation; hover highlighted tokens for definitions.',
      programLabel: 'Program.cs',
      programNote: 'Every assignment still evaluates the right side first. Operators compute a bool before the variable is bound.',
    },
    code: CH1_2_FULL_CODE,
    states: CH1_2_FULL_STATES,
  },
  preQuiz: {
    title: 'Predict Expression Results',
    prompt: 'Place each chip where it belongs before the lesson names the operator rules.',
    answers: {
      notSunny: 'false',
      andBoth: 'true',
      printed: 'true',
    },
    bank: ['true', 'false', '(no output)', 'goOutside'],
    prompts: [
      { slot: 'notSunny', label: '!sunny', prompt: 'sunny is true. What does !sunny evaluate to?', hint: 'NOT flips one bool.' },
      { slot: 'andBoth', label: 'sunny && !weekend', prompt: 'sunny is true and weekend is false. What does the AND expression produce?', hint: 'Evaluate both sides first.' },
      { slot: 'printed', label: 'WriteLine', prompt: 'What value does Console.WriteLine(goOutside) print?', hint: 'Read the value stored in goOutside.' },
    ],
  },
  mainLesson: {
    title: 'Operators Produce Values Before Assignment',
    label: 'Main Lesson',
    intro: 'Boolean expressions are not storage locations. They are computations that produce a bool. Assignment receives only the final value.',
    acts: [
      {
        n: 1,
        title: 'NOT reads one value and flips it',
        body: [
          'The operator ! is unary: it has one operand.',
          'The operand still follows the ordinary evaluation rule. If it is a variable, read the variable first.',
          'After the flip, assignment binds the computed value to the target variable.',
        ],
        code: [
          { id: 'not-1', text: 'bool sunny = true;', translation: 'Bind true to sunny.' },
          { id: 'not-2', text: 'bool stayInside = !sunny;', translation: 'Read sunny, flip true to false, and bind false.' },
        ],
        memory: [
          { name: 'sunny', type: 'bool', value: 'true' },
          { name: 'stayInside', type: 'bool', value: 'false' },
        ],
      },
      {
        n: 2,
        title: 'AND combines two evaluated operands',
        body: [
          'The operator && has a left operand and a right operand.',
          'Each operand must evaluate to a bool before AND can combine them.',
          'AND produces true only when both evaluated operands are true.',
        ],
        code: [
          { id: 'and-1', text: 'bool sunny = true;', translation: 'The left operand will read as true.' },
          { id: 'and-2', text: 'bool weekend = false;', translation: 'The right operand will be flipped by NOT.' },
          { id: 'and-3', text: 'bool goOutside = sunny && !weekend;', translation: 'true && true produces true.' },
        ],
        memory: [
          { name: 'sunny', type: 'bool', value: 'true' },
          { name: 'weekend', type: 'bool', value: 'false' },
          { name: 'goOutside', type: 'bool', value: 'true' },
        ],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Trace A Boolean Expression',
    prompt: 'Complete the state table, match translations, and predict the console output.',
    transferCode: {
      lines: [
        { id: 'rq-1', text: 'bool locked = false;' },
        { id: 'rq-2', text: 'bool hasKey = true;' },
        { id: 'rq-3', text: 'bool canOpen = !locked && hasKey;' },
        { id: 'rq-4', text: 'Console.WriteLine(canOpen);' },
      ],
    },
    columns: ['locked', 'hasKey', 'canOpen'],
    stateRows: [
      { after: 1, locked: 'false', hasKey: '-', canOpen: '-' },
      { after: 2, locked: 'false', hasKey: 'true', canOpen: '-' },
      { after: 3, locked: 'false', hasKey: 'true', canOpen: 'true' },
      { after: 4, locked: 'false', hasKey: 'true', canOpen: 'true' },
    ],
    translations: [
      { id: 'A', text: 'Bind false to locked.' },
      { id: 'B', text: 'Bind true to hasKey.' },
      { id: 'C', text: 'Evaluate !locked and hasKey, then bind the AND result.' },
      { id: 'D', text: 'Print the value stored in canOpen.' },
    ],
    outputAnswers: {
      output: 'true',
      why: 'locked is false, so !locked is true; hasKey is true, so AND produces true',
    },
    valueChoices: ['true', 'false', '-'],
    outputChoices: ['true', 'false', '(no output)'],
    reasonPrompt: 'Why does the program print that value?',
    reasonChoices: [
      'locked is false, so !locked is true; hasKey is true, so AND produces true',
      'canOpen copies locked directly',
      'Console.WriteLine changes the stored bool',
    ],
  },
  exercises: {
    title: 'Boolean Expression Practice',
    label: 'Practice',
    intro: 'Write small boolean programs that compute a value before printing or storing it.',
    items: [
      {
        number: 1,
        title: 'Flip a stored answer',
        summary: 'Create a bool, store its opposite, then print the opposite.',
        sample: 'bool opposite = !answer;',
        prompt: 'Write a program with a bool named answer, another bool named opposite, and one output line that prints opposite.',
        starter: ['bool answer = true;', 'bool opposite = ___;', 'Console.WriteLine(___);'],
        constraints: ['Use ! exactly once.', 'Do not print answer directly.', 'Use Console.WriteLine once.'],
      },
      {
        number: 2,
        title: 'Require two facts',
        summary: 'Use && to combine two stored booleans.',
        sample: 'bool ready = pluggedIn && charged;',
        prompt: 'Write a program that prints true only when pluggedIn and charged are both true.',
        starter: ['bool pluggedIn = true;', 'bool charged = false;', 'bool ready = ___;', 'Console.WriteLine(ready);'],
        constraints: ['Use && in the assignment to ready.', 'Do not change pluggedIn or charged after declaration.'],
      },
      {
        number: 3,
        title: 'Explain a trace',
        summary: 'Translate a compound assignment into English.',
        sample: 'bool safe = !locked && adultPresent;',
        prompt: 'Write one sentence explaining how the right side is evaluated before safe is bound.',
        constraints: ['Mention variable lookup.', 'Mention NOT before the final AND result.', 'Use the word bind or binding.'],
      },
    ],
  },
};

function Ch1BooleanExpressionsSequence() {
  const { ConceptLessonSequence } = window;
  return <ConceptLessonSequence lesson={CH1_BOOLEAN_EXPRESSIONS_LESSON} />;
}

const FUNCS_LESSON_FIXTURES_NEXT = {
  ...(window.FUNCS_LESSON_FIXTURES || {}),
  [CH1_BOOLEAN_EXPRESSIONS_LESSON.id]: CH1_BOOLEAN_EXPRESSIONS_LESSON,
};

Object.assign(window, {
  FUNCS_LESSON_FIXTURES: FUNCS_LESSON_FIXTURES_NEXT,
  CH1_BOOLEAN_EXPRESSIONS_LESSON,
  Ch1BooleanExpressionsSequence,
});
