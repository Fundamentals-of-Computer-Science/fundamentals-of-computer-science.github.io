/* tb-ch1-sequence.jsx - ch1-1 data-driven concept lesson fixture */

const CH1_FULL_CODE = {
  lines: [
    {
      id: 'line-1',
      text: 'bool x = true;',
      translation: 'Create a boolean variable named x and bind the value true to it.',
    },
    {
      id: 'line-2',
      text: 'bool y = false;',
      translation: 'Create a boolean variable named y and bind the value false to it.',
    },
    {
      id: 'line-3',
      text: 'bool copy_of_x = x;',
      translation: 'Create a boolean variable named copy_of_x and bind the result of evaluating x to it.',
    },
    {
      id: 'line-4',
      text: 'x = false;',
      translation: 'Bind the value false to the existing variable x.',
    },
    {
      id: 'line-5',
      text: 'Console.WriteLine(copy_of_x);',
      translation: 'Evaluate copy_of_x and display the result in the console.',
    },
  ],
  tokens: {
    'Console.WriteLine': {
      tone: 'call',
      description: 'A method call that evaluates its argument and displays the result in the console.',
    },
    copy_of_x: {
      tone: 'name',
      description: 'A separate variable that receives the value produced by evaluating x.',
    },
    bool: {
      tone: 'type',
      description: 'A boolean type. It has exactly two values: true and false.',
    },
    true: {
      tone: 'value',
      description: 'A boolean value.',
    },
    false: {
      tone: 'value',
      description: 'A boolean value.',
    },
    x: {
      tone: 'name',
      description: 'A variable name. Here it stores a boolean value.',
    },
    y: {
      tone: 'name',
      description: 'A second variable name. It gets its own binding.',
    },
    '=': {
      tone: 'op',
      description: 'Assignment. Evaluate the right side first, then bind the result to the left side.',
    },
  },
};

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
      sourceLine: 'bool copy_of_x = x;',
      steps: [
        {
          label: 'Expression',
          note: 'Before creating copy_of_x, evaluate the right side `x`.',
        },
        {
          label: 'Lookup',
          note: 'Look up `x` in memory. It is currently bound to `true`.',
        },
        {
          label: 'Substitute',
          note: 'Substitute `true` for `x`. The copied value is what gets bound to copy_of_x.',
        },
      ],
      frames: [
        {
          expression: 'bool copy_of_x = x',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [17, 18], label: 'var', value: 'true' }],
          strike: { showAt: 2, activeAt: [2], span: [17, 18] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'bool copy_of_x = true',
          showAt: 2,
          activeAt: [2],
        },
      ],
      minCanvasWidth: 760,
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
      sourceLine: 'x = false;',
      steps: [
        {
          label: 'Expression',
          note: 'Evaluate the right side before writing to `x`.',
        },
        {
          label: 'Literal',
          note: '`false` is already a literal value, so the right side is resolved.',
        },
        {
          label: 'Write',
          note: 'Write the resolved value into `x`. No other variable is part of this evaluation.',
        },
      ],
      frames: [
        {
          expression: 'x = false',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [4, 9], label: 'literal', value: 'false' }],
          strike: { showAt: 2, activeAt: [2], span: [4, 9] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'write x = false',
          showAt: 2,
          activeAt: [2],
        },
      ],
      minCanvasWidth: 660,
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
      sourceLine: 'Console.WriteLine(copy_of_x);',
      steps: [
        {
          label: 'Call',
          note: 'Evaluate the argument inside the parentheses before calling WriteLine.',
        },
        {
          label: 'Lookup',
          note: 'Look up `copy_of_x` in memory. It still holds `true`.',
        },
        {
          label: 'Substitute',
          note: 'Substitute `true` for `copy_of_x`, so the call receives the copied value.',
        },
        {
          label: 'Print',
          note: 'WriteLine sends the evaluated value to the console output.',
        },
      ],
      frames: [
        {
          expression: 'Console.WriteLine(copy_of_x)',
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
          expression: 'stdout: true',
          showAt: 3,
          activeAt: [3],
        },
      ],
      minCanvasWidth: 900,
    },
  },
];

const CH1_CYCLE_DETAILS = [
  {
    n: 1,
    title: 'Boolean Storage / Declaration',
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
    title: 'Line-By-Line State',
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
    title: 'Read / Write / Value Copy',
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

const CH1_EXERCISES = [
  {
    number: '1',
    title: 'Remember the Original',
    summary: 'Keep an original boolean value available after the variable changes.',
    sample: 'start: flag = true -> later: flag = false, original still prints true',
    prompt: 'Write a short program that starts with one boolean variable, preserves its first value in a second variable, changes the first variable, then prints both values.',
    constraints: [
      'Use only bool variables and Console.WriteLine.',
      'The preserved value must come from reading the first variable, not from retyping the same literal.',
      'Your output should make it clear which value changed and which value did not.',
    ],
  },
  {
    number: '2',
    title: 'Predict Before You Run',
    summary: 'Create a program where a copied value and a changed value diverge.',
    sample: 'expected output: false, true',
    prompt: 'Design a four- or five-line program where two boolean variables have the same value at first, then one changes while the other keeps the copied value. Before running it, write the memory table after each line.',
    constraints: [
      'At least one assignment must read from an existing variable.',
      'At least one later assignment must write a different value into one variable.',
      'Do not use comments to explain the answer; the code and state table should carry the reasoning.',
    ],
  },
  {
    number: '3',
    title: 'Fill The Missing Line',
    summary: 'Choose the one line that makes the final output match the target.',
    sample: 'target output: true',
    prompt: 'Given a starter program with one missing line, fill the gap so the final Console.WriteLine prints the original value even after the main variable changes.',
    starter: [
      'bool ready = true;',
      '// your line here',
      'ready = false;',
      'Console.WriteLine(savedReady);',
    ],
    constraints: [
      'You may add exactly one line.',
      'Do not change the final Console.WriteLine line.',
      'The missing line must create or assign the variable used by the output line.',
    ],
  },
  {
    number: '4',
    title: 'Trace Someone Else',
    summary: 'Write the state table for a compact boolean program.',
    sample: 'columns: one, two, three, output',
    prompt: 'Trace a short program with three boolean variables where the second copies the first, the third copies the second, and then the first changes. Build the state table and predict the output.',
    constraints: [
      'Your trace should show memory after every line.',
      'Include one Console.WriteLine at the end.',
      'Explain which assignment reads a value and which assignment writes a value.',
    ],
  },
  {
    number: '5',
    title: 'Small Switchboard',
    summary: 'Model two independent on/off switches and report their final state.',
    sample: 'input idea: doorOpen, lightOn -> output both final values',
    prompt: 'Write a small program that models two independent boolean facts. Copy one fact into a backup variable, change both original facts, then print the backup and the final originals.',
    constraints: [
      'Use descriptive variable names.',
      'At least one printed value must be a copied old value.',
      'At least one printed value must be a final current value.',
    ],
  },
];

const CH1_CHAPTER_EXAMPLES = [
  {
    label: 'Lesson 1',
    source: 'ch1-1',
    title: 'Boolean Data and Memory',
    href: 'Ch1 Data Memory Sequence.html',
    current: true,
    summary: 'Booleans as stored values that change line by line.',
    tags: ['bool storage', 'state table', 'read/write'],
  },
  {
    label: 'Lesson 2',
    source: 'ch1-2',
    title: 'Boolean Expressions',
    href: 'Ch1 Boolean Expressions Sequence.html',
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

const FUNCS_CHAPTERS = [
  {
    n: 0,
    id: 'ch0',
    label: 'Chapter 0',
    title: 'Before You Begin',
    href: '../../ch0/',
  },
  {
    n: 1,
    id: 'ch1',
    label: 'Chapter 1',
    title: 'Booleans',
    href: 'Ch1 Roadmap.html',
    current: true,
  },
  {
    n: 2,
    id: 'ch2',
    label: 'Chapter 2',
    title: 'Integers and Doubles',
    href: 'Ch2 Numeric Data Memory Sequence.html',
  },
  {
    n: 3,
    id: 'ch3',
    label: 'Chapter 3',
    title: 'Arrays',
    href: '../../ch3/',
  },
  {
    n: 4,
    id: 'ch4',
    label: 'Chapter 4',
    title: 'Classes and Linked Lists',
    href: '../../ch4/',
  },
];

const CH1_AVAILABLE_SYNTAX = [
  {
    group: 'Boolean data',
    items: [
      { term: 'bool name = true;', note: 'Declare a boolean variable and bind true.', source: 'ch1-1' },
      { term: 'bool name = false;', note: 'Declare a boolean variable and bind false.', source: 'ch1-1' },
      { term: 'name = value;', note: 'Rebind an existing variable after the right side evaluates.', source: 'ch1-1' },
      { term: 'Console.WriteLine(name);', note: 'Evaluate a name and display its value in the console.', source: 'ch1-1' },
    ],
  },
  {
    group: 'Memory model',
    items: [
      { term: 'right side first', note: 'Assignment evaluates the expression on the right before writing to the left.', source: 'ch1-1' },
      { term: 'value copy', note: 'Copying a bool copies its current value into a separate binding.', source: 'ch1-1' },
    ],
  },
];

const CH1_BOOLEAN_DATA_MEMORY_LESSON = {
  id: 'ch1-boolean-data-memory',
  chapterId: 'ch1',
  source: 'ch1/ch1-1.md',
  stableUrl: 'ch1/boolean-data-and-memory',
  order: 1,
  title: 'Boolean Data And Memory',
  kicker: 'Chapter 1',
  learningTarget: 'Trace boolean declarations, assignments, value copies, and console output as changes to program memory.',
  roadmap: {
    order: 1,
    sourceAnchors: ['ch1/ch1-1.md', 'doc-16:Data and memory'],
    reviewConcepts: [],
  },
  availableSyntax: CH1_AVAILABLE_SYNTAX,
  chapterNav: {
    chapters: FUNCS_CHAPTERS,
  },
  chapterExamples: CH1_CHAPTER_EXAMPLES,
  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Data and Memory',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the program line by line. Click any line for its translation; hover highlighted tokens for definitions.',
      programLabel: 'Program.cs',
      programNote: 'The active line is the most recent executed line. Future lines are dimmed.',
    },
    code: CH1_FULL_CODE,
    states: CH1_FULL_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Commit to three predictions before reading the explanation. These questions point at the behavior the lesson will name.',
    answers: { line1: 'x: true', yExists: 'No', copyChanges: 'No' },
    bank: ['x: true', 'x: false', 'Yes', 'No', 'copy_of_x: false'],
    prompts: [
      {
        slot: 'line1',
        label: 'After line 1',
        prompt: 'What does memory contain after `bool x = true;` runs?',
        hint: 'Only line 1 has executed.',
      },
      {
        slot: 'yExists',
        label: 'Before line 2',
        prompt: 'Does `y` exist before line 2 runs?',
        hint: 'A variable exists only after its declaration has executed.',
      },
      {
        slot: 'copyChanges',
        label: 'After line 4',
        prompt: 'When `x = false;` runs, does `copy_of_x` also change?',
        hint: 'This is the value-copy question the lesson will resolve.',
      },
    ],
  },
  mainLesson: {
    title: 'Boolean Data And Memory',
    label: 'Main Lesson',
    intro: 'The full example is now broken into three internal acts. Each act names one part of the behavior, then reuses a smaller slice of the same code and memory model.',
    acts: CH1_CYCLE_DETAILS,
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace the transfer program, translate each line, predict the output, and explain why the copied value stays independent.',
    transferCode: [
      'bool a = false;',
      'bool b = a;',
      'a = true;',
      'Console.WriteLine(b);',
    ],
    stateRows: [
      { after: '1', a: 'false', b: '-' },
      { after: '2', a: 'false', b: 'false' },
      { after: '3', a: 'true', b: 'false' },
      { after: '4', a: 'true', b: 'false' },
    ],
    columns: ['a', 'b'],
    translations: [
      { id: 'A', text: 'Create a boolean variable named a and bind false to it.' },
      { id: 'B', text: 'Evaluate a, then bind that copied value to a new variable named b.' },
      { id: 'C', text: 'Bind true to the existing variable a.' },
      { id: 'D', text: 'Evaluate b and display the result in the console.' },
    ],
    outputAnswers: {
      output: 'false',
      why: 'b has its own copied value',
    },
    valueChoices: ['true', 'false', '-'],
    outputChoices: ['true', 'false', '(no output)'],
    reasonPrompt: 'Why does `b` keep that value?',
    reasonChoices: ['b has its own copied value', 'b points to a', 'Console.WriteLine changes b'],
  },
  exercises: {
    title: 'Boolean Data Practice Set',
    label: 'Exercises',
    intro: 'Each prompt asks you to use declaration, line-by-line state, and value-copy behavior without being handed the exact sequence of steps.',
    items: CH1_EXERCISES,
  },
};

function Ch1BooleanDataMemorySequence() {
  const { ConceptLessonSequence } = window;

  return <ConceptLessonSequence lesson={CH1_BOOLEAN_DATA_MEMORY_LESSON} />;
}

const FUNCS_LESSON_FIXTURES = {
  [CH1_BOOLEAN_DATA_MEMORY_LESSON.id]: CH1_BOOLEAN_DATA_MEMORY_LESSON,
};

function Ch1DataMemorySequence() {
  return <Ch1BooleanDataMemorySequence />;
}

Object.assign(window, {
  FUNCS_LESSON_FIXTURES,
  CH1_BOOLEAN_DATA_MEMORY_LESSON,
  Ch1BooleanDataMemorySequence,
  Ch1DataMemorySequence,
});
