/* tb-ch2-sequence.jsx - ch2-1 data-driven numeric concept lesson fixture */

const CH2_FULL_CODE = {
  lines: [
    {
      id: 'line-1',
      text: 'int seats = 24;',
      translation: 'Create an integer variable named seats and bind 24 to it.',
    },
    {
      id: 'line-2',
      text: 'double ticketPrice = 12.50;',
      translation: 'Create a double variable named ticketPrice and bind 12.50 to it.',
    },
    {
      id: 'line-3',
      text: 'int originalSeats = seats;',
      translation: 'Evaluate seats, copy its current value, and bind that value to originalSeats.',
    },
    {
      id: 'line-4',
      text: 'seats = 30;',
      translation: 'Bind 30 to the existing seats variable. originalSeats does not change.',
    },
    {
      id: 'line-5',
      text: 'Console.WriteLine(originalSeats);',
      translation: 'Evaluate originalSeats and display the copied whole-number value.',
    },
    {
      id: 'line-6',
      text: 'Console.WriteLine(ticketPrice);',
      translation: 'Evaluate ticketPrice and display the decimal value.',
    },
  ],
  tokens: {
    'Console.WriteLine': {
      tone: 'call',
      description: 'A method call that evaluates its argument and displays the result in the console.',
    },
    originalSeats: {
      tone: 'name',
      description: 'A variable that receives a copied integer value from seats.',
    },
    startingCapacity: {
      tone: 'name',
      description: 'A variable that receives a copied integer value from capacity.',
    },
    ticketPrice: {
      tone: 'name',
      description: 'A variable name for a decimal ticket price.',
    },
    fillRate: {
      tone: 'name',
      description: 'A variable name for a decimal rate.',
    },
    capacity: {
      tone: 'name',
      description: 'A variable name for a counted whole-number capacity.',
    },
    seats: {
      tone: 'name',
      description: 'A variable name for a counted whole-number quantity.',
    },
    int: {
      tone: 'type',
      description: 'A 32-bit whole number type. Use it for counts and discrete quantities.',
    },
    double: {
      tone: 'type',
      description: 'A 64-bit approximate decimal number type. Use it for measurements and fractional values.',
    },
    '12.50': {
      tone: 'value',
      description: 'A double literal because it includes a decimal part.',
    },
    '0.75': {
      tone: 'value',
      description: 'A double literal because it includes a decimal part.',
    },
    '60': {
      tone: 'value',
      description: 'An integer literal value.',
    },
    '50': {
      tone: 'value',
      description: 'An integer literal value.',
    },
    '24': {
      tone: 'value',
      description: 'An integer literal value.',
    },
    '30': {
      tone: 'value',
      description: 'An integer literal value.',
    },
    '=': {
      tone: 'op',
      description: 'Assignment. Evaluate the right side first, then bind the result to the left side.',
    },
  },
};

const CH2_FULL_STATES = [
  {
    label: 'Before execution',
    desc: 'No numeric variables exist yet.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'seats is an int because seats are counted as whole units.',
    memory: [{ name: 'seats', type: 'int', value: '24' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'ticketPrice is a double because prices can have decimal parts.',
    memory: [
      { name: 'seats', type: 'int', value: '24' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
    ],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'originalSeats receives a copy of the current value in seats.',
    memory: [
      { name: 'seats', type: 'int', value: '24' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
      { name: 'originalSeats', type: 'int', value: '24' },
    ],
    console: [],
    evalDetail: {
      title: 'Copy an int value before binding',
      sourceLine: 'int originalSeats = seats;',
      steps: [
        {
          label: 'Expression',
          note: 'Start with the right side of the declaration before creating originalSeats.',
        },
        {
          label: 'Lookup',
          note: 'Look up `seats` in memory. Its current value is `24`.',
        },
        {
          label: 'Substitute',
          note: 'Substitute `24` for `seats`.',
        },
        {
          label: 'Bind',
          note: 'Bind the copied value `24` to originalSeats.',
        },
      ],
      frames: [
        {
          expression: 'int originalSeats = seats',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [20, 25], label: 'var', value: '24' }],
          strike: { showAt: 2, activeAt: [2], span: [20, 25] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'int originalSeats = 24',
          showAt: 2,
          activeAt: [2, 3],
        },
      ],
      minCanvasWidth: 820,
    },
  },
  {
    label: 'After line 4',
    desc: 'seats is rebound to 30. originalSeats still holds its copied value.',
    memory: [
      { name: 'seats', type: 'int', value: '30' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
      { name: 'originalSeats', type: 'int', value: '24' },
    ],
    console: [],
    evalDetail: {
      title: 'Write a new int value',
      sourceLine: 'seats = 30;',
      steps: [
        {
          label: 'Expression',
          note: 'Evaluate the right side before writing to `seats`.',
        },
        {
          label: 'Literal',
          note: '`30` is already an integer literal value.',
        },
        {
          label: 'Write',
          note: 'Write `30` into seats. originalSeats is a separate binding and does not change.',
        },
      ],
      frames: [
        {
          expression: 'seats = 30',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [8, 10], label: 'literal', value: '30' }],
          strike: { showAt: 2, activeAt: [2], span: [8, 10] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'write seats = 30',
          showAt: 2,
          activeAt: [2],
        },
      ],
      minCanvasWidth: 700,
    },
  },
  {
    label: 'After line 5',
    desc: 'WriteLine prints the copied int value from originalSeats.',
    memory: [
      { name: 'seats', type: 'int', value: '30' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
      { name: 'originalSeats', type: 'int', value: '24' },
    ],
    console: ['24'],
    evalDetail: {
      title: 'Evaluate the int argument before printing',
      sourceLine: 'Console.WriteLine(originalSeats);',
      steps: [
        {
          label: 'Call',
          note: 'Start with the Console.WriteLine call before it prints anything.',
        },
        {
          label: 'Lookup',
          note: 'Look up originalSeats in memory. It still holds `24`.',
        },
        {
          label: 'Substitute',
          note: 'Substitute `24` as the argument to Console.WriteLine.',
        },
        {
          label: 'Print',
          note: 'WriteLine displays the evaluated integer value.',
        },
      ],
      frames: [
        {
          expression: 'Console.WriteLine(originalSeats)',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [18, 31], label: 'var', value: '24' }],
          strike: { showAt: 2, activeAt: [2], span: [18, 31] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'Console.WriteLine(24)',
          showAt: 2,
          activeAt: [2, 3],
          arrowAfter: { showAt: 3, activeAt: [3] },
        },
        {
          expression: 'stdout: 24',
          showAt: 3,
          activeAt: [3],
        },
      ],
      minCanvasWidth: 940,
    },
  },
  {
    label: 'After line 6',
    desc: 'WriteLine prints the double value stored in ticketPrice.',
    memory: [
      { name: 'seats', type: 'int', value: '30' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
      { name: 'originalSeats', type: 'int', value: '24' },
    ],
    console: ['24', '12.50'],
    evalDetail: {
      title: 'Evaluate the double argument before printing',
      sourceLine: 'Console.WriteLine(ticketPrice);',
      steps: [
        {
          label: 'Call',
          note: 'Start with the Console.WriteLine call before it prints anything.',
        },
        {
          label: 'Lookup',
          note: 'Look up ticketPrice in memory. It holds the double value `12.50`.',
        },
        {
          label: 'Substitute',
          note: 'Substitute `12.50` as the argument to Console.WriteLine.',
        },
        {
          label: 'Print',
          note: 'WriteLine displays the evaluated decimal value.',
        },
      ],
      frames: [
        {
          expression: 'Console.WriteLine(ticketPrice)',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [18, 29], label: 'var', value: '12.50' }],
          strike: { showAt: 2, activeAt: [2], span: [18, 29] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        {
          expression: 'Console.WriteLine(12.50)',
          showAt: 2,
          activeAt: [2, 3],
          arrowAfter: { showAt: 3, activeAt: [3] },
        },
        {
          expression: 'stdout: 12.50',
          showAt: 3,
          activeAt: [3],
        },
      ],
      minCanvasWidth: 980,
    },
  },
];

const CH2_ACTS = [
  {
    n: 1,
    title: 'Integer Storage',
    body: [
      'Use int when a value is a whole-number count.',
      'The declaration pattern is the same as bool: type, name, then value.',
    ],
    code: ['int seats = 24;'],
    memory: [{ name: 'seats', type: 'int', value: '24' }],
    translations: ['Create an integer variable named seats and bind 24 to it.'],
  },
  {
    n: 2,
    title: 'Double Storage',
    body: [
      'Use double when a value can have a decimal part.',
      'The mechanism is still reserve, name, and bind; only the numeric type changes.',
    ],
    code: ['double ticketPrice = 12.50;'],
    memory: [{ name: 'ticketPrice', type: 'double', value: '12.50' }],
    translations: ['Create a double variable named ticketPrice and bind 12.50 to it.'],
  },
  {
    n: 3,
    title: 'Choose By Meaning',
    body: [
      'The right type depends on what the number represents.',
      'Seats are counted, so int fits. A ticket price can include cents, so double fits.',
    ],
    code: ['int seats = 24;', 'double ticketPrice = 12.50;'],
    memory: [
      { name: 'seats', type: 'int', value: '24' },
      { name: 'ticketPrice', type: 'double', value: '12.50' },
    ],
    translations: [
      'Create seats as an int because it is a counted quantity.',
      'Create ticketPrice as a double because it can include cents.',
    ],
  },
  {
    n: 4,
    title: 'Numeric Values Copy',
    body: [
      'Integers and doubles are value types like booleans.',
      'When originalSeats copies seats, later rebinding seats does not rewrite originalSeats.',
    ],
    code: ['int originalSeats = seats;', 'seats = 30;'],
    memory: [
      { name: 'seats', type: 'int', value: '30' },
      { name: 'originalSeats', type: 'int', value: '24' },
    ],
    translations: [
      'Evaluate seats, then bind that copied value to originalSeats.',
      'Bind 30 to seats. originalSeats is unchanged.',
    ],
  },
];

const CH2_EXERCISES = [
  {
    number: '1',
    title: 'Pick The Numeric Type',
    summary: 'Classify values as int or double based on what they represent.',
    sample: 'pages -> int, package weight -> double',
    prompt: 'Choose types for pages in a book, outside temperature, login attempts, and a GPA. Explain the reason for each choice.',
    constraints: [
      'Use int for counted whole units.',
      'Use double for measurements or fractional values.',
      'Explain the meaning of each quantity, not just whether the sample value has a decimal point.',
    ],
  },
  {
    number: '2',
    title: 'Preserve The Count',
    summary: 'Copy an integer value before rebinding the original.',
    sample: 'start: count = 12 -> later: count = 15, original still prints 12',
    prompt: 'Write a program that stores an item count, copies the original count, changes the current count, then prints both values.',
    constraints: [
      'Use at least two int variables.',
      'The preserved value must come from reading the first variable.',
      'Print the copied value and the final current value.',
    ],
  },
  {
    number: '3',
    title: 'Trace Mixed Numeric State',
    summary: 'Track int and double variables in one table.',
    sample: 'columns: quantity, price, originalQuantity, output',
    prompt: 'Trace a program with one int and one double declaration, one copied int value, and one later int rebinding.',
    constraints: [
      'Show memory after every line.',
      'Include type labels in your table.',
      'Do not change the double value in the program.',
    ],
  },
];

const CH2_CHAPTERS = [
  { n: 0, id: 'ch0', label: 'Chapter 0', title: 'Before You Begin', href: '../../ch0/' },
  { n: 1, id: 'ch1', label: 'Chapter 1', title: 'Booleans', href: 'Ch1 Data Memory Sequence.html' },
  { n: 2, id: 'ch2', label: 'Chapter 2', title: 'Integers and Doubles', href: '#numeric-data-memory', current: true },
  { n: 3, id: 'ch3', label: 'Chapter 3', title: 'Arrays', href: '../../ch3/' },
  { n: 4, id: 'ch4', label: 'Chapter 4', title: 'Classes and Linked Lists', href: '../../ch4/' },
];

const CH2_CHAPTER_EXAMPLES = [
  {
    label: 'Example 1',
    source: 'ch2-1',
    title: 'Numeric Data And Memory',
    href: 'Ch2 Numeric Data Memory Sequence.html',
    summary: 'Store ints and doubles, choose the right type, and trace copied numeric values.',
    tags: ['int', 'double', 'type choice', 'value copy'],
  },
  {
    label: 'Example 2',
    source: 'ch2-2',
    title: 'Numeric Computation',
    href: '../../ch2/ch2-2/',
    summary: 'Use arithmetic operators to compute new numeric values.',
    tags: ['+', '-', '*', 'division'],
  },
  {
    label: 'Example 3',
    source: 'ch2-3',
    title: 'While Loops And Progress',
    href: 'Ch2 3 Sequence.html',
    summary: 'Step through check condition, run body, update progress, then check again.',
    tags: ['while', 'condition', 'body', 'progress'],
  },
  {
    label: 'Example 4',
    source: 'ch2-4',
    title: 'Recursive Numeric Methods',
    href: 'Ch2 4 Sequence.html',
    summary: 'Separate the base case from the recursive case and trace a recursive call.',
    tags: ['recursion', 'base case', 'recursive case', 'return'],
  },
  {
    label: 'Example 5',
    source: 'ch2-5',
    title: 'Numeric Custom Types',
    href: '../../ch2/ch2-5/',
    summary: 'Group related numeric facts inside a value type.',
    tags: ['struct', 'fields', 'methods'],
  },
];

function ch2ChapterExamplesFor(source) {
  return CH2_CHAPTER_EXAMPLES.map(item => ({
    ...item,
    current: item.source === source,
    href: item.source === source ? `#${source}` : item.href,
  }));
}

const CH2_AVAILABLE_SYNTAX = [
  {
    group: 'Numeric data',
    items: [
      { term: 'int name = wholeNumber;', note: 'Declare a variable for counted whole-number values.', source: 'ch2-1' },
      { term: 'double name = decimalNumber;', note: 'Declare a variable for measured or fractional values.', source: 'ch2-1' },
      { term: 'name = value;', note: 'Rebind an existing numeric variable after the right side evaluates.', source: 'ch2-1' },
    ],
  },
  {
    group: 'Output and copy',
    items: [
      { term: 'int original = current;', note: 'Copy the current int value into a separate binding.', source: 'ch2-1' },
      { term: 'Console.WriteLine(value);', note: 'Display an evaluated numeric value.', source: 'ch2-1' },
    ],
  },
];

const CH2_NUMERIC_DATA_MEMORY_LESSON = {
  id: 'ch2-numeric-data-memory',
  chapterId: 'ch2',
  source: 'ch2/ch2-1.md',
  stableUrl: 'ch2/numeric-data-and-memory',
  order: 1,
  title: 'Numeric Data And Memory',
  kicker: 'Chapter 2',
  learningTarget: 'Trace int and double declarations, type choices, numeric value copies, and console output as changes to memory.',
  roadmap: {
    order: 1,
    sourceAnchors: ['ch2/ch2-1.md'],
    reviewConcepts: ['Boolean data and memory', 'value copy'],
  },
  availableSyntax: CH2_AVAILABLE_SYNTAX,
  chapterNav: { chapters: CH2_CHAPTERS },
  chapterExamples: ch2ChapterExamplesFor('ch2-1'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 2',
      exampleTitle: 'Example: Numeric Data And Memory',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the program line by line. Watch how int and double variables occupy independent bindings.',
      programLabel: 'Program.cs',
      programNote: 'The active line is the most recent executed line. Future lines are dimmed.',
    },
    code: CH2_FULL_CODE,
    states: CH2_FULL_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Commit to type choices before the walkthrough names the rules.',
    answers: { seats: 'int', price: 'double', attempts: 'int' },
    bank: ['int', 'double'],
    prompts: [
      {
        slot: 'seats',
        label: 'Room seats',
        prompt: 'Which type should store the number of seats in a room?',
        hint: 'Seats are counted as whole units.',
      },
      {
        slot: 'price',
        label: 'Ticket price',
        prompt: 'Which type should store the price of one ticket?',
        hint: 'Prices can include cents.',
      },
      {
        slot: 'attempts',
        label: 'Login attempts',
        prompt: 'Which type should store the number of login attempts?',
        hint: 'Attempts are counted.',
      },
    ],
  },
  mainLesson: {
    title: 'Numeric Data And Memory',
    label: 'Main Lesson',
    intro: 'Chapter 2 starts by reusing the Chapter 1 memory model with numeric types. The new work is choosing the correct numeric type and tracking copied numeric values.',
    acts: CH2_ACTS,
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace the event-capacity program, translate each line, predict the output, and explain why the copied count stays independent.',
    transferCode: [
      'int capacity = 50;',
      'double fillRate = 0.75;',
      'int startingCapacity = capacity;',
      'capacity = 60;',
      'Console.WriteLine(startingCapacity);',
    ],
    stateRows: [
      { after: '1', capacity: '50', fillRate: '-', startingCapacity: '-' },
      { after: '2', capacity: '50', fillRate: '0.75', startingCapacity: '-' },
      { after: '3', capacity: '50', fillRate: '0.75', startingCapacity: '50' },
      { after: '4', capacity: '60', fillRate: '0.75', startingCapacity: '50' },
      { after: '5', capacity: '60', fillRate: '0.75', startingCapacity: '50' },
    ],
    columns: ['capacity', 'fillRate', 'startingCapacity'],
    translations: [
      { id: 'A', text: 'Create an integer variable named capacity and bind 50 to it.' },
      { id: 'B', text: 'Create a double variable named fillRate and bind 0.75 to it.' },
      { id: 'C', text: 'Evaluate capacity, then bind that copied value to startingCapacity.' },
      { id: 'D', text: 'Bind 60 to the existing capacity variable.' },
      { id: 'E', text: 'Evaluate startingCapacity and display the result in the console.' },
    ],
    outputAnswers: {
      output: '50',
      why: 'startingCapacity has its own copied int value',
    },
    valueChoices: ['50', '60', '0.75', '-'],
    outputChoices: ['50', '60', '0.75', '(no output)'],
    reasonPrompt: 'Why does startingCapacity keep that value?',
    reasonChoices: [
      'startingCapacity has its own copied int value',
      'startingCapacity points to capacity',
      'Console.WriteLine changes capacity',
    ],
  },
  exercises: {
    title: 'Numeric Data Practice Set',
    label: 'Exercises',
    intro: 'Use these prompts to practice numeric type choice, declaration translation, and copied numeric state.',
    items: CH2_EXERCISES,
  },
};

const CH2_LOOP_CODE = {
  lines: [
    {
      id: 'loop-line-1',
      text: 'int count = 0;',
      translation: 'Create the loop-control variable count and start it at 0.',
    },
    {
      id: 'loop-line-2',
      text: 'while (count < 3) {',
      badge: 'condition',
      badgeBg: '#fffbeb',
      badgeBorder: '#f59e0b',
      badgeColor: '#92400e',
      translation: 'Check the loop condition before deciding whether the body runs.',
      scope: [
        {
          id: 'loop-line-2-print',
          text: 'Console.WriteLine(count);',
          badge: 'body',
          translation: 'Run the first body statement for the current count value.',
        },
        {
          id: 'loop-line-2-progress',
          text: 'count = count + 1;',
          badge: 'progress',
          translation: 'Change count so the next condition check can eventually become false.',
        },
      ],
      close: {
        text: '}',
        translation: 'Return to the while condition after the body finishes.',
      },
    },
    {
      id: 'loop-line-3',
      text: 'Console.WriteLine("done");',
      translation: 'Run after the loop condition becomes false.',
    },
  ],
  tokens: {
    int: { tone: 'type', description: 'A whole-number type used here for the loop-control variable.' },
    count: { tone: 'name', description: 'The loop-control variable. It changes each iteration.' },
    while: { tone: 'op', description: 'A loop header. Check the condition before each possible body run.' },
    'count < 3': { tone: 'op', description: 'The loop condition. If it is true, run the body. If false, leave the loop.' },
    'Console.WriteLine': { tone: 'call', description: 'Evaluate the argument and display it in the console.' },
    '"done"': { tone: 'value', description: 'A string literal printed after the loop finishes.' },
    '0': { tone: 'value', description: 'The starting value for count.' },
    '1': { tone: 'value', description: 'The amount added to count after each body run.' },
    '3': { tone: 'value', description: 'The stopping boundary for this loop.' },
    '=': { tone: 'op', description: 'Assignment. Evaluate the right side first, then bind the result.' },
    '+': { tone: 'op', description: 'Numeric addition.' },
    '<': { tone: 'op', description: 'A numeric comparison that produces a bool.' },
  },
};

const CH2_LOOP_TRACE_STEPS = [
  {
    id: 'loop-trace-check-0',
    label: 'line 2',
    sourceLabel: 'check condition: count is 0',
    rowKey: 'loop-line-2',
    iteration: 'iteration 1',
    phase: 'Check condition',
    outcome: 'true',
    note: 'Evaluate count < 3. Since 0 is less than 3, the loop body runs.',
    memory: [{ name: 'count', type: 'int', value: '0' }],
    console: [],
  },
  {
    id: 'loop-trace-print-0',
    label: 'line 2.1',
    sourceLabel: 'body: print count',
    rowKey: 'loop-line-2-print',
    iteration: 'iteration 1',
    phase: 'Execute body',
    note: 'Run the first body line with the current count value.',
    memory: [{ name: 'count', type: 'int', value: '0' }],
    console: ['0'],
  },
  {
    id: 'loop-trace-progress-0',
    label: 'line 2.2',
    sourceLabel: 'body: update count',
    rowKey: 'loop-line-2-progress',
    iteration: 'iteration 1',
    phase: 'Update progress',
    note: 'Add 1 to count. The next check sees count as 1.',
    memory: [{ name: 'count', type: 'int', value: '1' }],
    console: ['0'],
  },
  {
    id: 'loop-trace-check-1',
    label: 'line 2',
    sourceLabel: 'check condition: count is 1',
    rowKey: 'loop-line-2',
    iteration: 'iteration 2',
    phase: 'Check condition',
    outcome: 'true',
    note: 'Return to the header and check again. Since 1 is less than 3, the body runs again.',
    memory: [{ name: 'count', type: 'int', value: '1' }],
    console: ['0'],
  },
  {
    id: 'loop-trace-print-1',
    label: 'line 2.1',
    sourceLabel: 'body: print count',
    rowKey: 'loop-line-2-print',
    iteration: 'iteration 2',
    phase: 'Execute body',
    note: 'The body prints the current count value before it changes.',
    memory: [{ name: 'count', type: 'int', value: '1' }],
    console: ['0', '1'],
  },
  {
    id: 'loop-trace-progress-1',
    label: 'line 2.2',
    sourceLabel: 'body: update count',
    rowKey: 'loop-line-2-progress',
    iteration: 'iteration 2',
    phase: 'Update progress',
    note: 'Add 1 again. The next check sees count as 2.',
    memory: [{ name: 'count', type: 'int', value: '2' }],
    console: ['0', '1'],
  },
  {
    id: 'loop-trace-check-2',
    label: 'line 2',
    sourceLabel: 'check condition: count is 2',
    rowKey: 'loop-line-2',
    iteration: 'iteration 3',
    phase: 'Check condition',
    outcome: 'true',
    note: 'Since 2 is still less than 3, the body runs one more time.',
    memory: [{ name: 'count', type: 'int', value: '2' }],
    console: ['0', '1'],
  },
  {
    id: 'loop-trace-print-2',
    label: 'line 2.1',
    sourceLabel: 'body: print count',
    rowKey: 'loop-line-2-print',
    iteration: 'iteration 3',
    phase: 'Execute body',
    note: 'Print the last value that satisfies the condition.',
    memory: [{ name: 'count', type: 'int', value: '2' }],
    console: ['0', '1', '2'],
  },
  {
    id: 'loop-trace-progress-2',
    label: 'line 2.2',
    sourceLabel: 'body: update count',
    rowKey: 'loop-line-2-progress',
    iteration: 'iteration 3',
    phase: 'Update progress',
    note: 'Add 1. The next condition check sees count as 3.',
    memory: [{ name: 'count', type: 'int', value: '3' }],
    console: ['0', '1', '2'],
  },
  {
    id: 'loop-trace-check-3',
    label: 'line 2',
    sourceLabel: 'check condition: count is 3',
    rowKey: 'loop-line-2',
    iteration: 'exit check',
    phase: 'Check condition',
    outcome: 'false',
    note: 'Check the condition one final time. Since 3 is not less than 3, skip the body and continue after the loop.',
    memory: [{ name: 'count', type: 'int', value: '3' }],
    console: ['0', '1', '2'],
  },
  {
    id: 'loop-trace-after',
    label: 'line 3',
    sourceLabel: 'after loop',
    rowKey: 'loop-line-3',
    iteration: 'after loop',
    phase: 'Continue',
    note: 'The loop is finished, so execution moves to the next line after the block.',
    memory: [{ name: 'count', type: 'int', value: '3' }],
    console: ['0', '1', '2', 'done'],
  },
];

const CH2_LOOP_LESSON = {
  id: 'ch2-while-loops-progress',
  chapterId: 'ch2',
  source: 'ch2/ch2-3.md',
  stableUrl: 'ch2/while-loops-and-progress',
  order: 3,
  title: 'While Loops And Progress',
  kicker: 'Chapter 2',
  learningTarget: 'Trace a while loop as repeated condition checks, body executions, and progress updates.',
  roadmap: {
    order: 3,
    sourceAnchors: ['ch2/ch2-3.md'],
    reviewConcepts: ['numeric comparison', 'assignment', 'console output'],
  },
  availableSyntax: [
    ...CH2_AVAILABLE_SYNTAX,
    {
      group: 'Loops',
      items: [
        { term: 'while (condition) { ... }', note: 'Check condition before each possible body run.', source: 'ch2-3' },
        { term: 'count = count + 1;', note: 'A progress update that can eventually make a loop condition false.', source: 'ch2-3' },
      ],
    },
  ],
  chapterNav: { chapters: CH2_CHAPTERS },
  chapterExamples: ch2ChapterExamplesFor('ch2-3'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 2',
      exampleTitle: 'Example: While Loops And Progress',
      modeLabel: 'Full Walkthrough',
      instructions: 'Use Run next line for the execution trace, then open the loop stepper to inspect the repeated condition-body-condition cycle.',
      programLabel: 'Program.cs',
      programNote: 'The same while header is highlighted every time control returns to the condition.',
    },
    code: CH2_LOOP_CODE,
    executionTrace: CH2_LOOP_TRACE_STEPS.map(step => ({
      id: step.id,
      label: step.label,
      sourceLabel: step.sourceLabel,
      rowKey: step.rowKey,
      rowState: {
        label: step.sourceLabel,
        desc: step.note,
        memory: step.memory,
        console: step.console,
        loopTrace: {
          title: 'Trace the while loop cycle',
          sourceLine: 'while (count < 3) { ... }',
          steps: CH2_LOOP_TRACE_STEPS,
        },
      },
    })),
    states: [
      { label: 'Before execution', desc: 'count does not exist yet.', memory: [], console: [] },
    ],
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Commit to the control-flow order before opening the loop stepper.',
    answers: { first: 'check condition', second: 'execute body', third: 'check condition' },
    bank: ['check condition', 'execute body', 'update progress'],
    prompts: [
      { slot: 'first', label: 'First action', prompt: 'What does a while loop do before the body can run?', hint: 'The body cannot run until the condition evaluates to true.' },
      { slot: 'second', label: 'True condition', prompt: 'What happens immediately after the condition is true?', hint: 'Control moves inside the braces.' },
      { slot: 'third', label: 'After body', prompt: 'What happens after the body finishes?', hint: 'Control returns to the header, not the next line after the loop.' },
    ],
  },
  mainLesson: {
    title: 'While Loops And Progress',
    label: 'Main Lesson',
    intro: 'A while loop is not a single line that runs once. It is a repeated control cycle: check the condition, run the body if true, update progress inside the body, then check again.',
    acts: [
      {
        n: 1,
        title: 'The Header Is A Question',
        body: [
          'The while header asks whether the body should run now.',
          'Every time control reaches the header, the condition evaluates again using the current memory state.',
        ],
        code: { lines: [CH2_LOOP_CODE.lines[1]], tokens: CH2_LOOP_CODE.tokens },
        memory: [{ name: 'count', type: 'int', value: '0' }],
        translations: ['Check whether count is less than 3 before the body runs.'],
      },
      {
        n: 2,
        title: 'The Body Must Make Progress',
        body: [
          'The body can do useful work, like printing the current value.',
          'A progress update changes memory so the repeated condition check can eventually stop.',
        ],
        code: { lines: [CH2_LOOP_CODE.lines[1]], tokens: CH2_LOOP_CODE.tokens },
        memory: [{ name: 'count', type: 'int', value: '1' }],
        translations: ['Print count, then add 1 to count.'],
      },
      {
        n: 3,
        title: 'False Means Leave The Loop',
        body: [
          'The condition is checked one more time after the last body run.',
          'When the condition is false, execution skips the body and continues after the closing brace.',
        ],
        code: ['Console.WriteLine("done");'],
        memory: [{ name: 'count', type: 'int', value: '3' }],
        translations: ['Run this line only after the loop condition becomes false.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace a nearby countdown loop, translate each line, and predict the output.',
    transferCode: {
      lines: [
        { id: 'quiz-loop-1', text: 'int timer = 2;' },
        {
          id: 'quiz-loop-2',
          text: 'while (timer > 0) {',
          badge: 'condition',
          scope: [
            { id: 'quiz-loop-2-print', text: 'Console.WriteLine(timer);', badge: 'body' },
            { id: 'quiz-loop-2-progress', text: 'timer = timer - 1;', badge: 'progress' },
          ],
          close: '}',
        },
        { id: 'quiz-loop-3', text: 'Console.WriteLine("go");' },
      ],
    },
    stateRows: [
      { after: '1', timer: '2', output: '-' },
      { after: '2 check true', timer: '2', output: '-' },
      { after: 'print 2', timer: '2', output: '2' },
      { after: 'decrement', timer: '1', output: '2' },
      { after: 'exit', timer: '0', output: '2 1 go' },
    ],
    columns: ['timer', 'output'],
    translations: [
      { id: 'A', text: 'Create timer and bind 2 to it.' },
      { id: 'B', text: 'Check whether timer is greater than 0.' },
      { id: 'C', text: 'Print the current timer value.' },
    ],
    outputAnswers: {
      output: '2 1 go',
      why: 'the condition is checked again after each decrement',
    },
    valueChoices: ['2', '1', '0', '-', '2 1', '2 1 go'],
    outputChoices: ['2 1 go', '2 go', '1 go', '(no output)'],
    reasonPrompt: 'Why does the loop stop before printing 0?',
    reasonChoices: [
      'the condition is checked again after each decrement',
      'Console.WriteLine changes timer',
      'the body always runs exactly twice',
    ],
  },
  exercises: {
    title: 'Loop Practice Set',
    label: 'Exercises',
    intro: 'Practice writing loops that make progress and can be traced condition by condition.',
    items: [
      {
        number: '1',
        title: 'Trace A Counter',
        summary: 'Predict every condition check and body run.',
        sample: 'start count at 1, stop before 4',
        prompt: 'Trace a while loop that starts count at 1, prints count, adds 1, and stops when count reaches 4.',
        constraints: ['Show each condition result.', 'Show memory after each body run.', 'Include the final false condition check.'],
      },
      {
        number: '2',
        title: 'Add Progress',
        summary: 'Repair a loop body that never changes its condition variable.',
        sample: 'while (tries < 3) { ... }',
        prompt: 'Given a loop that checks tries < 3 but never changes tries, add the missing progress line and explain why it belongs in the body.',
        constraints: ['Use assignment to update tries.', 'Explain how the update changes the next condition check.'],
      },
    ],
  },
};

const CH2_RECURSION_CODE = {
  lines: [
    {
      id: 'rec-line-1',
      text: 'static int SumTo(int n) {',
      translation: 'Define a method that returns the sum from n down to 1.',
      scope: [
        {
          id: 'rec-line-1-base',
          text: 'if (n == 0) return 0;',
          badge: 'base case',
          badgeBg: '#dcfce7',
          badgeBorder: '#86efac',
          badgeColor: '#166534',
          translation: 'Stop the recursion when n is 0.',
        },
        {
          id: 'rec-line-1-recursive',
          text: 'return n + SumTo(n - 1);',
          badge: 'recursive case',
          badgeBg: '#ede9fe',
          badgeBorder: '#c4b5fd',
          badgeColor: '#6d28d9',
          translation: 'Do one piece of work and ask the same method for the smaller problem.',
        },
      ],
      close: '}',
    },
    {
      id: 'rec-line-2',
      text: 'int answer = SumTo(3);',
      translation: 'Call SumTo with 3 and bind the returned result to answer.',
    },
    {
      id: 'rec-line-3',
      text: 'Console.WriteLine(answer);',
      translation: 'Print the value returned by the recursive method.',
    },
  ],
  tokens: {
    static: { tone: 'type', description: 'Part of this simple method declaration.' },
    int: { tone: 'type', description: 'The method returns a whole-number value.' },
    SumTo: { tone: 'call', description: 'A method that calls itself on a smaller number until it reaches the base case.' },
    n: { tone: 'name', description: 'The parameter for the current recursive call.' },
    answer: { tone: 'name', description: 'The variable that receives the final returned value.' },
    if: { tone: 'op', description: 'A branch that checks for the base case.' },
    return: { tone: 'op', description: 'Send a value back to the caller.' },
    'n == 0': { tone: 'op', description: 'The base-case test.' },
    'n - 1': { tone: 'op', description: 'The smaller problem for the recursive call.' },
    '0': { tone: 'value', description: 'The value that stops the recursion.' },
    '1': { tone: 'value', description: 'The amount removed from n in the recursive case.' },
    '3': { tone: 'value', description: 'The first argument for this example call.' },
    '+': { tone: 'op', description: 'Combine the current n with the result of the smaller recursive call.' },
    'Console.WriteLine': { tone: 'call', description: 'Evaluate the argument and display it in the console.' },
  },
};

const CH2_RECURSION_LESSON = {
  id: 'ch2-recursive-numeric-methods',
  chapterId: 'ch2',
  source: 'ch2/ch2-4.md',
  stableUrl: 'ch2/recursive-numeric-methods',
  order: 4,
  title: 'Recursive Numeric Methods',
  kicker: 'Chapter 2',
  learningTarget: 'Trace a recursive method by separating its base case from its recursive case.',
  roadmap: {
    order: 4,
    sourceAnchors: ['ch2/ch2-4.md'],
    reviewConcepts: ['method call', 'return value', 'numeric expression'],
  },
  availableSyntax: [
    ...CH2_AVAILABLE_SYNTAX,
    {
      group: 'Recursive methods',
      items: [
        { term: 'if (baseCase) return value;', note: 'Stop making recursive calls.', source: 'ch2-4' },
        { term: 'return work + Method(smaller);', note: 'Solve one piece and call the same method on a smaller problem.', source: 'ch2-4' },
      ],
    },
  ],
  chapterNav: { chapters: CH2_CHAPTERS },
  chapterExamples: ch2ChapterExamplesFor('ch2-4'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 2',
      exampleTitle: 'Example: Recursive Numeric Methods',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the program line by line. Open evaluation steps on the call to see recursive calls expand down, then return back up.',
      programLabel: 'Program.cs',
      programNote: 'The base case and recursive case are labeled inside the method body.',
    },
    code: CH2_RECURSION_CODE,
    states: [
      { label: 'Before execution', desc: 'The method exists in source, but no call has run yet.', memory: [], console: [] },
      { label: 'Method available', desc: 'SumTo is ready to be called. The labeled rows show the two cases the method can take.', memory: [], console: [] },
      {
        label: 'After line 2',
        desc: 'SumTo(3) expands through recursive cases until SumTo(0) hits the base case, then returns back upward.',
        memory: [{ name: 'answer', type: 'int', value: '6' }],
        console: [],
        evalDetail: {
          title: 'Evaluate a recursive call',
          sourceLine: 'int answer = SumTo(3);',
          steps: [
            { label: 'Expression', note: 'Start with the assignment. The value for SumTo(3) is not known yet.' },
            { label: 'Evaluate', note: 'Evaluate SumTo(3). It returns the expression 3 + SumTo(2), not a value, so the returned expression must be evaluated next.' },
            { label: 'Evaluate', note: 'Evaluate SumTo(2) inside 3 + SumTo(2). It returns 2 + SumTo(1), not a value, so keep evaluating.' },
            { label: 'Evaluate', note: 'Evaluate SumTo(1) inside 2 + SumTo(1). It returns 1 + SumTo(0), not a value, so keep evaluating.' },
            { label: 'Evaluate', note: 'Evaluate SumTo(0). The base case returns the value 0.' },
            { label: 'Substitute', note: 'Replace SumTo(0) with 0.' },
            { label: 'Evaluate', note: 'Evaluate 1 + 0 to the value 1.' },
            { label: 'Substitute', note: 'Now that 1 + 0 has become the value 1, collapse it to that value.' },
            { label: 'Substitute', note: 'Substitute the value 1 into the waiting expression 2 + SumTo(1).' },
            { label: 'Evaluate', note: 'Evaluate 2 + 1 to the value 3.' },
            { label: 'Substitute', note: 'Now that 2 + 1 has become the value 3, collapse it to that value.' },
            { label: 'Substitute', note: 'Substitute the value 3 into the waiting expression 3 + SumTo(2).' },
            { label: 'Evaluate', note: 'Evaluate 3 + 3 to the value 6.' },
            { label: 'Substitute', note: 'Now that 3 + 3 has become the value 6, collapse it to that value.' },
            { label: 'Substitute', note: 'Substitute the final value 6 into the original assignment.' },
            { label: 'Bind', note: 'Bind the final value 6 to answer.' },
          ],
          layout: 'verticalStack',
          charWidth: 7.3,
          fontSize: 12.8,
          levelGap: 30,
          lineOffset: 17,
          blockPad: 26,
          arrowWidth: 24,
          minCanvasWidth: 1040,
          stackSlots: [
            { expression: 'int answer = SumTo(3)', evalSpan: [13, 21], label: 'eval', lineActiveAt: [] },
            { expression: '3 + SumTo(2)', evalSpan: [4, 12], label: 'eval', lineActiveAt: [] },
            { expression: '2 + SumTo(1)', evalSpan: [4, 12], label: 'eval', lineActiveAt: [] },
            { expression: '1 + SumTo(0)', evalSpan: [4, 12], label: 'base', lineActiveAt: [] },
          ],
          blocks: [
            {
              showAt: 0,
              levels: [
                { expression: 'int answer = SumTo(3)', slot: 0, showAt: 0, activeAt: [0, 1], evalSpan: [13, 21], lineShowAt: 1, label: 'eval' },
                { expression: '3 + SumTo(2)', slot: 1, showAt: 1, activeAt: [1, 2], evalSpan: [4, 12], lineShowAt: 2, label: 'eval' },
                { expression: '2 + SumTo(1)', slot: 2, showAt: 2, activeAt: [2, 3], evalSpan: [4, 12], lineShowAt: 3, label: 'eval' },
                { expression: '1 + SumTo(0)', slot: 3, showAt: 3, activeAt: [3, 4, 5], evalSpan: [4, 12], lineShowAt: 4, label: 'base', strike: { showAt: 5, activeAt: [5], span: [4, 12] } },
                { expression: '0', showAt: 4, activeAt: [4] },
              ],
              arrowAfter: { showAt: 5, activeAt: [5], level: 3 },
            },
            {
              showAt: 5,
              levels: [
                { expression: 'int answer = SumTo(3)', slot: 0, showAt: 5, activeAt: [] },
                { expression: '3 + SumTo(2)', slot: 1, showAt: 5, activeAt: [] },
                { expression: '2 + SumTo(1)', slot: 2, showAt: 5, activeAt: [], strike: { showAt: 8, activeAt: [8], span: [4, 12] } },
                { expression: '1 + 0', slot: 3, showAt: 5, activeAt: [5, 6, 7], evalSpan: [0, 5], lineShowAt: 6, label: '+', strike: { showAt: 7, activeAt: [7], span: [0, 5] } },
                { expression: '1', showAt: 6, activeAt: [6] },
              ],
              arrowAfter: { showAt: 8, activeAt: [8], level: 2 },
            },
            {
              showAt: 8,
              levels: [
                { expression: 'int answer = SumTo(3)', slot: 0, showAt: 8, activeAt: [] },
                { expression: '3 + SumTo(2)', slot: 1, showAt: 8, activeAt: [], strike: { showAt: 11, activeAt: [11], span: [4, 12] } },
                { expression: '2 + 1', slot: 2, showAt: 8, activeAt: [8, 9, 10, 11], evalSpan: [0, 5], lineShowAt: 9, label: '+', strike: { showAt: 10, activeAt: [10], span: [0, 5] } },
                { expression: '3', showAt: 9, activeAt: [9, 10] },
              ],
              arrowAfter: { showAt: 11, activeAt: [11], level: 1 },
            },
            {
              showAt: 11,
              levels: [
                { expression: 'int answer = SumTo(3)', slot: 0, showAt: 11, activeAt: [], strike: { showAt: 14, activeAt: [14], span: [13, 21] } },
                { expression: '3 + 3', slot: 1, showAt: 11, activeAt: [11, 12, 13], evalSpan: [0, 5], lineShowAt: 12, label: '+', strike: { showAt: 13, activeAt: [13], span: [0, 5] } },
                { expression: '6', showAt: 12, activeAt: [12, 13] },
              ],
              arrowAfter: { showAt: 14, activeAt: [14], level: 0 },
            },
            {
              showAt: 14,
              levels: [
                { expression: 'int answer = 6', slot: 0, slotAlign: 'start', showAt: 14, activeAt: [14, 15] },
              ],
            },
          ],
        },
      },
      {
        label: 'After line 3',
        desc: 'The final returned value is printed.',
        memory: [{ name: 'answer', type: 'int', value: '6' }],
        console: ['6'],
      },
    ],
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Identify which line stops recursion and which line keeps it going.',
    answers: { base: 'if (n == 0) return 0;', recursive: 'return n + SumTo(n - 1);' },
    bank: ['if (n == 0) return 0;', 'return n + SumTo(n - 1);'],
    prompts: [
      { slot: 'base', label: 'Base case', prompt: 'Which line stops the recursive calls?', hint: 'Look for the line that returns without calling SumTo again.' },
      { slot: 'recursive', label: 'Recursive case', prompt: 'Which line calls SumTo on a smaller problem?', hint: 'Look for the method name inside its own body.' },
    ],
  },
  mainLesson: {
    title: 'Recursive Numeric Methods',
    label: 'Main Lesson',
    intro: 'Recursion has two jobs. A base case stops the chain. A recursive case does one piece of work and asks the same method to solve a smaller problem.',
    acts: [
      {
        n: 1,
        title: 'Base Case Stops The Chain',
        body: [
          'A recursive method needs at least one path that does not call itself.',
          'Here n == 0 returns 0 immediately, so the chain has a bottom.',
        ],
        code: ['if (n == 0) return 0;'],
        memory: [{ name: 'n', type: 'int', value: '0' }],
        translations: ['When n is 0, return 0 without another SumTo call.'],
      },
      {
        n: 2,
        title: 'Recursive Case Shrinks The Problem',
        body: [
          'The recursive case uses the current n and then calls SumTo on n - 1.',
          'The argument must move toward the base case.',
        ],
        code: ['return n + SumTo(n - 1);'],
        memory: [{ name: 'n', type: 'int', value: '3' }],
        translations: ['Return the current n plus the sum of the smaller problem.'],
      },
      {
        n: 3,
        title: 'Returns Come Back Up',
        body: [
          'After the base case returns, each waiting call can finish its addition.',
          'Each returned value substitutes into the caller above it, one waiting expression at a time.',
        ],
        code: ['int answer = SumTo(3);'],
        memory: [{ name: 'answer', type: 'int', value: '6' }],
        translations: ['Evaluate the call, then bind the returned value to answer.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace a factorial-style recursive method and identify its cases.',
    transferCode: {
      lines: [
        {
          id: 'quiz-rec-1',
          text: 'static int ProductTo(int n) {',
          scope: [
            { id: 'quiz-rec-base', text: 'if (n == 1) return 1;', badge: 'base case' },
            { id: 'quiz-rec-recursive', text: 'return n * ProductTo(n - 1);', badge: 'recursive case' },
          ],
          close: '}',
        },
        { id: 'quiz-rec-2', text: 'int product = ProductTo(3);' },
      ],
    },
    stateRows: [
      { after: 'ProductTo(3)', n: '3', returns: '3 * ProductTo(2)' },
      { after: 'ProductTo(2)', n: '2', returns: '2 * ProductTo(1)' },
      { after: 'ProductTo(1)', n: '1', returns: '1' },
      { after: 'final', n: '-', returns: '6' },
    ],
    columns: ['n', 'returns'],
    translations: [
      { id: 'A', text: 'The base case returns a value without another recursive call.' },
      { id: 'B', text: 'The recursive case multiplies n by the smaller recursive result.' },
    ],
    outputAnswers: {
      output: '6',
      why: 'ProductTo(1) is the base case',
    },
    valueChoices: ['3', '2', '1', '-', '3 * ProductTo(2)', '2 * ProductTo(1)', '6'],
    outputChoices: ['6', '3', '1', '(no output)'],
    reasonPrompt: 'Which fact stops the recursive calls?',
    reasonChoices: [
      'ProductTo(1) is the base case',
      'ProductTo(3) is the base case',
      'multiplication automatically stops recursion',
    ],
  },
  exercises: {
    title: 'Recursion Practice Set',
    label: 'Exercises',
    intro: 'Practice naming base cases, recursive cases, and the smaller problem each call creates.',
    items: [
      {
        number: '1',
        title: 'Mark The Cases',
        summary: 'Label base and recursive cases in a method body.',
        sample: 'base: n == 0, recursive: n - 1',
        prompt: 'Given a recursive method that counts down, label the line that stops and the line that calls the method again.',
        constraints: ['Name the base case condition.', 'Name the recursive call.', 'Explain how the argument gets smaller.'],
      },
      {
        number: '2',
        title: 'Trace Returns',
        summary: 'Expand and collapse a small recursive call.',
        sample: 'SumTo(2) -> 2 + SumTo(1) -> 2 + 1',
        prompt: 'Trace SumTo(4) until the base case, then combine the returns back upward.',
        constraints: ['Show each call.', 'Show the base-case return.', 'Show the final arithmetic result.'],
      },
    ],
  },
};

function Ch2NumericDataMemorySequence() {
  const { ConceptLessonSequence } = window;

  return <ConceptLessonSequence lesson={CH2_NUMERIC_DATA_MEMORY_LESSON} />;
}

function Ch2LoopSequence() {
  const { ConceptLessonSequence } = window;

  return <ConceptLessonSequence lesson={CH2_LOOP_LESSON} />;
}

function Ch2RecursionSequence() {
  const { ConceptLessonSequence } = window;

  return <ConceptLessonSequence lesson={CH2_RECURSION_LESSON} />;
}

const FUNCS_CH2_LESSON_FIXTURES = {
  [CH2_NUMERIC_DATA_MEMORY_LESSON.id]: CH2_NUMERIC_DATA_MEMORY_LESSON,
  [CH2_LOOP_LESSON.id]: CH2_LOOP_LESSON,
  [CH2_RECURSION_LESSON.id]: CH2_RECURSION_LESSON,
};

Object.assign(window, {
  FUNCS_CH2_LESSON_FIXTURES,
  CH2_NUMERIC_DATA_MEMORY_LESSON,
  CH2_LOOP_LESSON,
  CH2_RECURSION_LESSON,
  Ch2NumericDataMemorySequence,
  Ch2LoopSequence,
  Ch2RecursionSequence,
});
