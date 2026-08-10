/* flow-ch0-1-program-tour.jsx — Chapter 0, Lesson 1: Programs, Input, and Output.
   One JSON-compatible lesson object; every page renders through the shared flow kit. */

const CH0_PROGRAM_GOALS = {
  exchange: {
    id: 'exchange',
    n: 'A',
    label: 'Exchange information with the user',
    gloss: 'Prompt for text, capture the response, and use the stored value in visible output.',
  },
  compute: {
    id: 'compute',
    n: 'B',
    label: 'Compute and report a value',
    gloss: 'Evaluate an expression, store the finished value, and deliberately display it.',
  },
};

const CH0_PROGRAM_SUBGOALS = {
  prompt: {
    id: 'prompt', n: 'A.a', goal: 'exchange',
    label: 'Prompt for input',
    gloss: 'Tell the user what information the program expects before waiting for it.',
  },
  capture: {
    id: 'capture', n: 'A.b', goal: 'exchange',
    label: 'Capture input',
    gloss: 'Read one line of text and store it so later code can use the value.',
  },
  useInput: {
    id: 'useInput', n: 'A.c', goal: 'exchange',
    label: 'Use captured input',
    gloss: 'Read the stored text and make it part of the program response.',
  },
  evaluate: {
    id: 'evaluate', n: 'B.a', goal: 'compute',
    label: 'Evaluate an expression',
    gloss: 'Finish the arithmetic on the right before storing its value.',
  },
  report: {
    id: 'report', n: 'B.b', goal: 'compute',
    label: 'Report the result',
    gloss: 'Read the stored result and send it to the console.',
  },
};

const CH0_PROGRAM_CODE = {
  layout: 'frame',
  goals: CH0_PROGRAM_GOALS,
  subgoals: CH0_PROGRAM_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'prompt' },
    { kind: 'seg', subgoal: 'capture' },
    { kind: 'seg', subgoal: 'useInput' },
    { kind: 'seg', subgoal: 'evaluate' },
    { kind: 'seg', subgoal: 'report' },
  ],
  lines: [
    {
      id: 'tour-line-1', num: '1', indent: 0,
      text: 'Console.Write("Type your name: ");', subgoal: 'prompt',
      translation: 'Display a prompt and keep the cursor on the same console line.',
    },
    {
      id: 'tour-line-2', num: '2', indent: 0,
      text: 'string name = Console.ReadLine();', subgoal: 'capture',
      translation: 'Wait for one line of text, then store that text in name.',
    },
    {
      id: 'tour-line-3', num: '3', indent: 0,
      text: 'Console.Write("Hello, ");', subgoal: 'useInput',
      translation: 'Start the response without moving to a new console line.',
    },
    {
      id: 'tour-line-4', num: '4', indent: 0,
      text: 'Console.WriteLine(name);', subgoal: 'useInput',
      translation: 'Read the text stored in name, display it, and finish the line.',
    },
    {
      id: 'tour-line-5', num: '5', indent: 0,
      text: 'int total = 2 + 3;', subgoal: 'evaluate',
      translation: 'Evaluate 2 + 3 first, then store the finished value 5 in total.',
    },
    {
      id: 'tour-line-6', num: '6', indent: 0,
      text: 'Console.WriteLine(total);', subgoal: 'report',
      translation: 'Read the value stored in total and display 5 on a new line.',
    },
  ],
  tokens: {
    Console: { tone: 'call', description: 'The console is where this program exchanges text with its user.' },
    'Console.Write': { tone: 'call', description: 'Display a value without automatically ending the current console line.' },
    'Console.WriteLine': { tone: 'call', description: 'Display a value and then move to the next console line.' },
    'Console.ReadLine': { tone: 'call', description: 'Wait for the user to enter one line of text and return that string.' },
    string: { tone: 'type', description: 'A type for text values.' },
    int: { tone: 'type', description: 'A type for whole-number values.' },
    name: { tone: 'name', description: 'The variable that stores the user-entered text.' },
    total: { tone: 'name', description: 'The variable that stores the result of 2 + 3.' },
    '2': { tone: 'value', description: 'The first number in the expression.' },
    '3': { tone: 'value', description: 'The second number in the expression.' },
    '+': { tone: 'op', description: 'Add the value on the left to the value on the right.' },
  },
};

const CH0_PROGRAM_STATES = [
  {
    label: 'Before execution',
    desc: 'The source is visible, but no line has run. Use the footer to advance one program event at a time.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'Write displays the prompt and leaves the cursor on that same line.',
    memory: [],
    console: ['Type your name: '],
  },
  {
    label: 'After line 2',
    desc: 'The user enters Ada. ReadLine returns that text, and name now stores it.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada'],
  },
  {
    label: 'After line 3',
    desc: 'A second Write begins the response without ending the line.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada', 'Hello, '],
  },
  {
    label: 'After line 4',
    desc: 'WriteLine reads name, adds Ada to the visible response, and ends the line.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada', 'Hello, Ada'],
  },
  {
    label: 'After line 5',
    desc: 'The expression 2 + 3 becomes 5 before total receives the value.',
    memory: [
      { name: 'name', type: 'string', value: '"Ada"' },
      { name: 'total', type: 'int', value: '5' },
    ],
    console: ['Type your name: Ada', 'Hello, Ada'],
  },
  {
    label: 'After line 6',
    desc: 'The final output line reports the value stored in total.',
    memory: [
      { name: 'name', type: 'string', value: '"Ada"' },
      { name: 'total', type: 'int', value: '5' },
    ],
    console: ['Type your name: Ada', 'Hello, Ada', '5'],
  },
];

const CH0_PROGRAM_TRACE = CH0_PROGRAM_CODE.lines.map((line, index) => ({
  id: `tour-step-${index + 1}`,
  rowKey: line.id,
  subgoal: line.subgoal,
  goal: CH0_PROGRAM_SUBGOALS[line.subgoal].goal,
  stateIndex: index + 1,
  rowState: CH0_PROGRAM_STATES[index + 1],
}));

const CH0_PROGRAM_TRANSFER_CODE = {
  lines: [
    { id: 'transfer-1', num: '1', text: 'Console.Write("Type a color: ");' },
    { id: 'transfer-2', num: '2', text: 'string color = Console.ReadLine();' },
    { id: 'transfer-3', num: '3', text: 'Console.Write("You chose ");' },
    { id: 'transfer-4', num: '4', text: 'Console.WriteLine(color);' },
    { id: 'transfer-5', num: '5', text: 'int points = 4 + 1;' },
    { id: 'transfer-6', num: '6', text: 'Console.WriteLine(points);' },
  ],
};

const CH0_PROGRAM_CHAPTERS = (window.FUNCS_CHAPTERS || []).map(chapter => ({
  ...chapter,
  current: chapter.id === 'ch0',
}));

const CH0_PROGRAM_EXAMPLES = [
  {
    label: 'Lesson 1',
    source: 'ch0-1',
    title: 'Programs, Input, and Output',
    href: 'Ch0 1 Programs Input Output Tour.html',
    current: true,
    summary: 'Tour a program from source code through input, memory, computation, and console output.',
    tags: ['Write', 'ReadLine', 'WriteLine', '2 + 3'],
  },
];

const CH0_PROGRAM_TOUR_LESSON = {
  id: 'ch0-programs-input-output-tour',
  chapterId: 'ch0',
  source: 'ch0/ch0-1.md',
  stableUrl: 'ch0/programs-input-output',
  order: 1,
  title: 'Programs, Input, and Output',
  kicker: 'Chapter 0',
  learningTarget: 'Trace how a console program prompts, stores text input, computes a value, and deliberately produces output.',
  roadmap: {
    order: 1,
    sourceAnchors: ['ch0/ch0-1.md'],
    reviewConcepts: ['program order', 'console interaction', 'stored values', 'expression evaluation'],
  },
  availableSyntax: [
    {
      group: 'Console interaction',
      items: [
        { term: 'Console.Write(value);', note: 'Display a value and stay on the current line.', source: 'ch0-1' },
        { term: 'Console.ReadLine();', note: 'Wait for one line of user-entered text.', source: 'ch0-1' },
        { term: 'Console.WriteLine(value);', note: 'Display a value and then move to the next line.', source: 'ch0-1' },
      ],
    },
    {
      group: 'Values and computation',
      items: [
        { term: 'string name = ...;', note: 'Store a text value under a useful name.', source: 'ch0-1' },
        { term: 'int total = 2 + 3;', note: 'Evaluate an arithmetic expression, then store its whole-number result.', source: 'ch0-1' },
      ],
    },
  ],
  chapterNav: { chapters: CH0_PROGRAM_CHAPTERS },
  chapterExamples: CH0_PROGRAM_EXAMPLES,
  fullExample: {
    header: {
      chapterLabel: 'Chapter 0',
      exampleTitle: 'Example: A Program Exchanges And Computes',
      modeLabel: 'Full walkthrough',
      instructions: 'Use the footer to run one line at a time. Watch source, state, and console evidence change together.',
      programLabel: 'Program.cs',
      programNote: 'This first example doubles as a tour of the lesson interface.',
    },
    code: CH0_PROGRAM_CODE,
    subgoals: CH0_PROGRAM_SUBGOALS,
    executionTrace: CH0_PROGRAM_TRACE,
    states: CH0_PROGRAM_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Commit to the order of a small console program before the lesson explains each part.',
  },
  mainLesson: {
    title: 'Programs Follow Values Through Time',
    label: 'Main Lesson',
    intro: 'The interface keeps three kinds of evidence together: source code shows the instruction, state shows stored values, and the console shows the exchange with the user.',
    acts: [
      {
        n: 1,
        title: 'The Console Takes Turns With The User',
        body: [
          'Console.Write displays a prompt without ending the line. Console.ReadLine then pauses the program until the user enters text.',
          'The console pane records that exchange while the highlighted source row shows which instruction caused it.',
        ],
        code: ['Console.Write("Type your name: ");', 'string name = Console.ReadLine();'],
        translations: ['Prompt first; capture the returned text second.'],
      },
      {
        n: 2,
        title: 'Stored Input Can Be Used Later',
        body: [
          'ReadLine returns text. Binding that text to name keeps the value available after the input moment has passed.',
          'A variable read uses the stored value. Quotation marks would instead print the literal word inside them.',
        ],
        code: ['Console.Write("Hello, ");', 'Console.WriteLine(name);'],
        translations: ['Use the value in name, not the text "name".'],
      },
      {
        n: 3,
        title: 'Expressions Finish Before Their Results Are Reported',
        body: [
          'The right side of an assignment is evaluated before the variable receives anything. Here 2 + 3 becomes 5, and then total stores 5.',
          'Assignment changes state; it does not print. A later WriteLine deliberately makes the result visible.',
        ],
        code: ['int total = 2 + 3;', 'Console.WriteLine(total);'],
        translations: ['Compute 5, store 5, then report 5.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Program Tour Transfer',
    prompt: 'Trace the same program shape with a different text input and a different arithmetic expression.',
    transferCode: CH0_PROGRAM_TRANSFER_CODE,
  },
  exercises: {
    title: 'First Program Practice',
    label: 'Exercises',
    intro: 'Practice the straight-line input, state, computation, and output pattern before Chapter 1 introduces true/false computations.',
  },
  flow: {
    goal: {
      intent: 'The walkthrough teaches the program and the interface together: source is the instruction, state is stored evidence, console is visible interaction, and the footer controls time.',
      badge: 'Interface tour',
      activeGoal: 'exchange',
      activeSubgoal: 'prompt',
      activeKey: 'tour-line-1',
      startLabel: 'Continue — tour the first line',
      startStatus: 'tour · nothing has run',
      runLabel: 'Run next line',
      note: 'source shows what can run · state shows what is stored · console shows what the user sees',
    },
    preQuiz: {
      intent: 'The learner first commits to the reusable input-compute-output order, then answers one local question per subgoal.',
      kicker: 'Pre-Quiz · Programs, Input, and Output',
      part1Prompt: 'Put the five program jobs in the order this example performs them.',
      part2Prompt: 'The program shape is set. Open each job and answer its one question.',
      orderSuccess: 'That is the straight-line shape: prompt, capture, use the input, compute a value, and report the result.',
      orderRetry: 'Use the source rows and visible console exchange to rebuild the program order.',
      categories: [
        { id: 'prompt', n: 'A.a', label: 'Prompt for input', why: 'The user needs to know what to enter before the program waits.' },
        { id: 'capture', n: 'A.b', label: 'Capture input', why: 'The response must be returned and stored before later code can read it.' },
        { id: 'useInput', n: 'A.c', label: 'Use captured input', why: 'The program can only respond with name after name exists.' },
        { id: 'evaluate', n: 'B.a', label: 'Evaluate an expression', why: 'The result must be computed before it can be reported.' },
        { id: 'report', n: 'B.b', label: 'Report the result', why: 'Output comes after total stores the finished value.' },
      ],
      shuffled: ['report', 'capture', 'evaluate', 'prompt', 'useInput'],
      details: {
        prompt: {
          type: 'choose the console action', kind: 'choice', mono: true,
          q: 'Which call displays a prompt without automatically moving to a new line?',
          choices: ['Console.Write("Type your name: ");', 'Console.ReadLine();', 'Console.WriteLine(total);'], correct: 0,
          why: 'Write displays its argument and leaves the cursor on the current line.',
        },
        capture: {
          type: 'pick the line', kind: 'choice', mono: true,
          q: 'Which line waits for text and stores the returned string?',
          choices: ['string name = Console.ReadLine();', 'Console.WriteLine(name);', 'int total = 2 + 3;'], correct: 0,
          why: 'ReadLine returns text, and the assignment binds that text to name.',
        },
        useInput: {
          type: 'predict output', kind: 'chips',
          q: 'The user entered Ada. What does Console.WriteLine(name) add to the console?',
          chips: ['Ada', 'name', '"name"', '5'], correct: 'Ada',
          why: 'Without quotation marks, name is read as a variable and supplies its stored value.',
        },
        evaluate: {
          type: 'fill the value', kind: 'chips',
          q: 'What value is stored in total after int total = 2 + 3;?',
          chips: ['5', '2 + 3', '23', 'Ada'], correct: '5',
          why: 'The expression is evaluated before the assignment stores its result.',
        },
        report: {
          type: 'predict output', kind: 'chips',
          q: 'What is the final line printed by the program?',
          chips: ['5', 'total', '2 + 3', '(no output)'], correct: '5',
          why: 'WriteLine reads the current value of total, which is 5.',
        },
      },
    },
    mainLesson: {
      intent: 'Three gated acts align the interface tour with the reusable program procedure: console exchange, stored state, then computation and deliberate output.',
      completeNote: 'You have followed the same value through source code, memory, and console output. Chapter 1 will use that flow for values that become true or false.',
      checks: [
        {
          type: 'multiple choice', kind: 'choice',
          q: 'Why does this example use Write for the prompt?',
          choices: ['So the user types on the same console line as the prompt', 'So the prompt is stored in memory', 'So the program skips ReadLine'], correct: 0,
          why: 'Write displays text without ending the console line; it does not store input or skip the wait.',
        },
        {
          type: 'multiple choice', kind: 'choice', mono: true,
          q: 'Which argument prints the stored input rather than a literal word?',
          choices: ['name', '"name"', 'Console.ReadLine'], correct: 0,
          why: 'The variable read name supplies "Ada"; the quoted text would supply the four letters n-a-m-e.',
        },
        {
          type: 'fill the value', kind: 'chips',
          q: 'What is in memory immediately after int total = 2 + 3;?',
          chips: ['total = 5', 'total = 2 + 3', 'console = 5', 'nothing'], correct: 'total = 5',
          why: 'The expression finishes first. Printing is a separate later instruction.',
        },
      ],
    },
    rigorousQuiz: {
      intent: 'The transfer program keeps the same procedure while changing the prompt, stored text, and arithmetic values.',
      codeLabel: 'Transfer program',
      success: 'Full marks: you kept input, stored state, computation, and output in the correct order.',
      cards: [
        {
          id: 'order', type: 'order the jobs', kind: 'order',
          q: 'Order these lines from first to last in the transfer program.',
          bank: ['Console.WriteLine(points);', 'string color = Console.ReadLine();', 'int points = 4 + 1;', 'Console.Write("Type a color: ");'],
          correct: ['Console.Write("Type a color: ");', 'string color = Console.ReadLine();', 'int points = 4 + 1;', 'Console.WriteLine(points);'],
          placeholder: 'tap a line below',
          why: 'The prompt precedes input; the arithmetic precedes reporting its result.',
        },
        {
          id: 'input', type: 'pick the line', kind: 'choice', mono: true,
          q: 'Which line waits for the user and stores the returned text?',
          choices: ['Console.Write("Type a color: ");', 'string color = Console.ReadLine();', 'Console.WriteLine(color);'], correct: 1,
          why: 'ReadLine is the call that waits. The surrounding assignment preserves what it returns.',
        },
        {
          id: 'row', type: 'fill the state row', kind: 'row',
          q: 'Fill the state immediately after int points = 4 + 1; runs.',
          rowLabel: 'after line 5',
          columns: ['moment', 'color', 'points'],
          cells: [
            { col: 'color', chips: ['"blue"', 'blue', '-'], correct: '"blue"' },
            { col: 'points', chips: ['5', '4 + 1', '-'], correct: '5' },
          ],
          why: 'The text is still stored, and the arithmetic expression has already become 5.',
        },
        {
          id: 'output', type: 'predict the value', kind: 'chips',
          q: 'What is the final line displayed by the transfer program?',
          chips: ['5', 'points', '4 + 1', 'blue'], correct: '5',
          why: 'points stores 5 before WriteLine reads it.',
        },
        {
          id: 'why', type: 'explain why', kind: 'choice',
          q: 'Why does the program display 5 instead of the text 4 + 1?',
          choices: ['The expression is evaluated before points receives the result', 'WriteLine performs every arithmetic operation in the program', 'ReadLine converts 4 + 1 into a number'], correct: 0,
          why: 'Evaluation happens at the assignment. WriteLine later reads the finished stored value.',
        },
      ],
    },
    exercises: {
      intent: 'The practice stays open-ended and keeps numeric parsing out of scope. The final stretch only previews a true/false result for the next lesson.',
      intro: 'Write and trace five tiny straight-line programs. Keep user text as text; numeric input conversion comes later.',
      problems: [
        {
          n: 1, title: 'Stay or move?', tag: 'warm-up',
          statement: 'For each call below, state whether the console cursor stays on the same line or moves to the next line.',
          given: ['Console.Write("Ready: ");', 'Console.WriteLine("go");'],
          constraints: ['Name the behavior of both calls.', 'Sketch the single visible console line.', 'Do not run the program first.'],
        },
        {
          n: 2, title: 'Prompt and capture', tag: 'core',
          statement: 'Write two lines that ask for a favorite color and store the entered text in a string named color.',
          example: { inLabel: 'entered text', in: 'green', out: 'color stores "green"' },
          constraints: ['Prompt before ReadLine.', 'Use Console.Write for the prompt.', 'Use one string variable.'],
        },
        {
          n: 3, title: 'Repair the lost input', tag: 'core',
          statement: 'This program waits for input but cannot use it later. Explain what is missing and repair it.',
          given: ['Console.Write("Type a city: ");', 'Console.ReadLine();', 'Console.WriteLine(city);'],
          constraints: ['Store the returned text.', 'Use the variable name city.', 'Change only the line that reads input.'],
        },
        {
          n: 4, title: 'Compute, then report', tag: 'core',
          statement: 'Write one assignment that stores 7 + 4 in an int named result, then write one line that displays result.',
          example: { inLabel: 'expression', in: '7 + 4', out: '11' },
          constraints: ['Store the computed value before printing.', 'Use exactly one + operator.', 'Predict the final console line.'],
        },
        {
          n: 5, title: 'Preview the next kind of value', tag: 'stretch',
          statement: 'Predict what Console.WriteLine(2 + 3 == 5); displays. The next lesson will explain how a comparison becomes a boolean value.',
          given: ['Console.WriteLine(2 + 3 == 5);'],
          constraints: ['Evaluate the addition before the comparison.', 'Choose true or false.', 'Explain the evaluation order in one sentence.'],
        },
      ],
    },
  },
};

Object.assign(window, {
  CH0_PROGRAM_GOALS,
  CH0_PROGRAM_SUBGOALS,
  CH0_PROGRAM_CODE,
  CH0_PROGRAM_STATES,
  CH0_PROGRAM_TRACE,
  CH0_PROGRAM_TRANSFER_CODE,
  CH0_PROGRAM_TOUR_LESSON,
});
