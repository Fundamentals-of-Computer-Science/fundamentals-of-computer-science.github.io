/* flow-ch1-1-boolean-values.jsx — Chapter 1, Lesson 1.
   One JSON-compatible lesson object; every page renders through the shared flow kit. */

const CH1_BOOLEAN_VALUES_GOALS = {
  produceDisplay: {
    id: 'produceDisplay',
    n: 'A',
    label: 'Produce and display Boolean values.',
    gloss: 'Store Boolean values, compute new values from them, and display the results.',
  },
};

const CH1_BOOLEAN_VALUES_SUBGOALS = {
  store: {
    id: 'store', n: 'A.a', goal: 'produceDisplay',
    label: 'Store Boolean values in separate variables.',
    gloss: 'Create, copy, and update Boolean bindings so each variable keeps its own current value.',
  },
  compute: {
    id: 'compute', n: 'A.b', goal: 'produceDisplay',
    label: 'Compute new Boolean values from stored values.',
    gloss: 'Apply Boolean operators to stored values and bind each computed result.',
  },
  display: {
    id: 'display', n: 'A.c', goal: 'produceDisplay',
    label: 'Display Boolean results in the console.',
    gloss: 'Evaluate each argument, then display its resulting Boolean value.',
  },
};

const CH1_BOOLEAN_VALUES_CODE = {
  layout: 'frame',
  goals: CH1_BOOLEAN_VALUES_GOALS,
  subgoals: CH1_BOOLEAN_VALUES_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'store' },
    { kind: 'seg', subgoal: 'compute' },
    { kind: 'seg', subgoal: 'display' },
  ],
  lines: [
    {
      id: 'door-line-1', num: '1', indent: 0,
      text: 'bool doorClosed = true;', subgoal: 'store',
      translation: 'Create doorClosed and store true.',
    },
    {
      id: 'door-line-2', num: '2', indent: 0,
      text: 'bool recordedDoorClosed = doorClosed;', subgoal: 'store',
      translation: 'Read true from doorClosed and copy it into recordedDoorClosed.',
    },
    {
      id: 'door-line-3', num: '3', indent: 0,
      text: 'doorClosed = false;', subgoal: 'store',
      translation: 'Replace the value in doorClosed with false. The recorded copy stays true.',
    },
    {
      id: 'door-line-4', num: '4', indent: 0,
      text: 'bool doorOpen = !doorClosed;', subgoal: 'compute',
      translation: 'Negate false and store true in doorOpen.',
    },
    {
      id: 'door-line-5', num: '5', indent: 0,
      text: 'bool safeToStart = doorClosed && recordedDoorClosed;', subgoal: 'compute',
      translation: 'Combine false and true with &&, then store false in safeToStart.',
    },
    {
      id: 'door-line-6', num: '6', indent: 0,
      text: 'bool sameStatus = doorClosed == recordedDoorClosed;', subgoal: 'compute',
      translation: 'Compare false with true, then store false in sameStatus.',
    },
    {
      id: 'door-line-7', num: '7', indent: 0,
      text: 'Console.WriteLine(recordedDoorClosed);', subgoal: 'display',
      translation: 'Read recordedDoorClosed and display True.',
    },
    {
      id: 'door-line-8', num: '8', indent: 0,
      text: 'Console.WriteLine(doorOpen);', subgoal: 'display',
      translation: 'Read doorOpen and display True.',
    },
    {
      id: 'door-line-9', num: '9', indent: 0,
      text: 'Console.WriteLine(safeToStart);', subgoal: 'display',
      translation: 'Read safeToStart and display False.',
    },
    {
      id: 'door-line-10', num: '10', indent: 0,
      text: 'Console.WriteLine(sameStatus);', subgoal: 'display',
      translation: 'Read sameStatus and display False.',
    },
  ],
  tokens: {
    bool: { tone: 'type', description: 'The type whose only valid values are true and false.' },
    true: { tone: 'value', description: 'One of the two Boolean values.' },
    false: { tone: 'value', description: 'One of the two Boolean values.' },
    doorClosed: { tone: 'name', description: 'The current stored door status.' },
    recordedDoorClosed: { tone: 'name', description: 'A separate copy of the earlier doorClosed value.' },
    doorOpen: { tone: 'name', description: 'The result of negating doorClosed.' },
    safeToStart: { tone: 'name', description: 'The result of combining both stored status values with &&.' },
    sameStatus: { tone: 'name', description: 'The result of comparing the two status values with ==.' },
    '!': { tone: 'op', description: 'Negate a Boolean value: true becomes false, and false becomes true.' },
    '&&': { tone: 'op', description: 'Produce true only when both operand values are true.' },
    '==': { tone: 'op', description: 'Produce true when the two operand values are equal.' },
    '!=': { tone: 'op', description: 'Produce true when the two operand values differ.' },
    'Console.WriteLine': { tone: 'call', description: 'Evaluate its argument, display the resulting value, and end the console line.' },
  },
};

const CH1_BOOLEAN_VALUES_STATES = [
  {
    label: 'Before execution',
    desc: 'The source is visible, but no instruction has run.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'doorClosed has its own storage location containing true.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'true' },
    ],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'recordedDoorClosed receives a copy of the value currently stored in doorClosed.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'true' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
    ],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'doorClosed changes to false. recordedDoorClosed remains true in its separate storage location.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
    ],
    console: [],
  },
  {
    label: 'After line 4',
    desc: '!doorClosed becomes true, and that result is stored in doorOpen.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate Boolean NOT',
      sourceLine: 'bool doorOpen = !doorClosed;',
      steps: [
        { label: 'Read', note: 'Read false from doorClosed.' },
        { label: 'NOT', note: '!false evaluates to true.' },
        { label: 'Bind', note: 'Store true in doorOpen.' },
      ],
      frames: [
        {
          expression: 'bool doorOpen = !doorClosed',
          showAt: 0,
          stack: [{ showAt: 0, span: [17, 27], label: 'var', value: 'false' }],
          strike: { showAt: 1, span: [16, 27] },
          arrowAfter: { showAt: 1 },
        },
        { expression: 'bool doorOpen = true', showAt: 1 },
        { expression: 'doorOpen stores true', showAt: 2 },
      ],
      minCanvasWidth: 680,
    },
  },
  {
    label: 'After line 5',
    desc: 'false && true becomes false, and that result is stored in safeToStart.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate Boolean AND',
      sourceLine: 'bool safeToStart = doorClosed && recordedDoorClosed;',
      steps: [
        { label: 'Read left', note: 'Read false from doorClosed.' },
        { label: 'Read right', note: 'Read true from recordedDoorClosed.' },
        { label: 'AND', note: 'false && true evaluates to false.' },
        { label: 'Bind', note: 'Store false in safeToStart.' },
      ],
      frames: [
        { expression: 'doorClosed && recordedDoorClosed', showAt: 0 },
        { expression: 'false && recordedDoorClosed', showAt: 0 },
        { expression: 'false && true', showAt: 1 },
        { expression: 'false', showAt: 2 },
        { expression: 'safeToStart stores false', showAt: 3 },
      ],
      minCanvasWidth: 760,
    },
  },
  {
    label: 'After line 6',
    desc: 'false == true becomes false, and that result is stored in sameStatus.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
      { name: 'sameStatus', type: 'bool', value: 'false' },
    ],
    console: [],
    evalDetail: {
      title: 'Evaluate Boolean equality',
      sourceLine: 'bool sameStatus = doorClosed == recordedDoorClosed;',
      steps: [
        { label: 'Read left', note: 'Read false from doorClosed.' },
        { label: 'Read right', note: 'Read true from recordedDoorClosed.' },
        { label: 'Compare', note: 'false == true evaluates to false.' },
        { label: 'Bind', note: 'Store false in sameStatus.' },
      ],
      frames: [
        { expression: 'doorClosed == recordedDoorClosed', showAt: 0 },
        { expression: 'false == recordedDoorClosed', showAt: 0 },
        { expression: 'false == true', showAt: 1 },
        { expression: 'false', showAt: 2 },
        { expression: 'sameStatus stores false', showAt: 3 },
      ],
      minCanvasWidth: 760,
    },
  },
  {
    label: 'After line 7',
    desc: 'WriteLine reads recordedDoorClosed and displays its value.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
      { name: 'sameStatus', type: 'bool', value: 'false' },
    ],
    console: ['True'],
  },
  {
    label: 'After line 8',
    desc: 'WriteLine reads doorOpen and displays its value.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
      { name: 'sameStatus', type: 'bool', value: 'false' },
    ],
    console: ['True', 'True'],
  },
  {
    label: 'After line 9',
    desc: 'WriteLine reads safeToStart and displays its value.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
      { name: 'sameStatus', type: 'bool', value: 'false' },
    ],
    console: ['True', 'True', 'False'],
  },
  {
    label: 'After line 10',
    desc: 'WriteLine reads sameStatus and displays its value.',
    memory: [
      { name: 'doorClosed', type: 'bool', value: 'false' },
      { name: 'recordedDoorClosed', type: 'bool', value: 'true' },
      { name: 'doorOpen', type: 'bool', value: 'true' },
      { name: 'safeToStart', type: 'bool', value: 'false' },
      { name: 'sameStatus', type: 'bool', value: 'false' },
    ],
    console: ['True', 'True', 'False', 'False'],
  },
];

const CH1_BOOLEAN_VALUES_TRACE = CH1_BOOLEAN_VALUES_CODE.lines.map((line, index) => ({
  id: 'boolean-values-step-' + (index + 1),
  rowKey: line.id,
  subgoal: line.subgoal,
  goal: CH1_BOOLEAN_VALUES_SUBGOALS[line.subgoal].goal,
  stateIndex: index + 1,
  rowState: CH1_BOOLEAN_VALUES_STATES[index + 1],
}));

const CH1_BOOLEAN_VALUES_TRANSFER_CODE = {
  lines: [
    { id: 'status-line-1', num: '1', text: 'bool primaryOnline = true;' },
    { id: 'status-line-2', num: '2', text: 'bool backupOnline = true;' },
    { id: 'status-line-3', num: '3', text: 'bool savedPrimaryOnline = primaryOnline;' },
    { id: 'status-line-4', num: '4', text: 'primaryOnline = false;' },
    { id: 'status-line-5', num: '5', text: '' },
    { id: 'status-line-6', num: '6', text: 'bool primaryOffline = !primaryOnline;' },
    { id: 'status-line-7', num: '7', text: 'bool systemsReady = primaryOnline && backupOnline;' },
    { id: 'status-line-8', num: '8', text: 'bool primaryChanged = primaryOnline != savedPrimaryOnline;' },
    { id: 'status-line-9', num: '9', text: '' },
    { id: 'status-line-10', num: '10', text: 'Console.WriteLine(primaryOffline);' },
    { id: 'status-line-11', num: '11', text: 'Console.WriteLine(systemsReady);' },
    { id: 'status-line-12', num: '12', text: 'Console.WriteLine(primaryChanged);' },
  ],
};

const CH1_BOOLEAN_VALUES_CHAPTERS = (window.FUNCS_CHAPTERS || []).map(chapter => ({
  ...chapter,
  current: chapter.id === 'ch1',
}));

const CH1_BOOLEAN_VALUES_EXAMPLES = [
  {
    label: 'Lesson 1',
    source: 'ch1/ch1-1.md',
    title: 'Boolean Values, State, and Visible Results',
    href: 'Ch1 1 Boolean Values State Visible Results.html',
    current: true,
    summary: 'Store Boolean values, compute new values, and display the results.',
    tags: ['bool', 'value copy', '!', '&&', '==', '!='],
  },
];

const CH1_BOOLEAN_VALUES_LESSON = {
  id: 'ch1-1-boolean-values-state-visible-results',
  chapterId: 'ch1',
  source: 'ch1/ch1-1.md',
  stableUrl: 'ch1/boolean-values-state-visible-results',
  order: 1,
  title: 'Boolean Values, State, and Visible Results',
  kicker: 'Chapter 1',
  learningTarget: 'Store Boolean values, compute new Boolean values from them, and determine what a program displays.',
  roadmap: {
    order: 1,
    sourceAnchors: [
      'ch1-1-ci-001',
      'ch1-1-ci-002',
      'ch1-1-ci-003',
      'ch1-1-ci-004',
      'ch1-1-ci-005',
      'ch1-1-ci-006',
      'ch1-1-ci-007',
      'ch1-1-ci-008',
      'ch1-1-ci-010',
      'ch1-2-ci-001',
      'ch1-2-ci-002',
      'ch1-2-ci-003',
      'ch1-2-ci-004',
      'ch1-2-ci-005',
      'ch1-2-ci-007',
    ],
    reviewConcepts: [
      'ch1-1-ci-009',
      'ch1-1-ci-011',
      'ch1-1-ci-012',
      'Console.WriteLine',
      'Result-Producing Forms',
    ],
  },
  availableSyntax: [
    {
      group: 'Boolean values and storage',
      items: [
        { term: 'bool name = true;', note: 'Create a Boolean variable and store true.', source: 'ch1-1-ci-001–008' },
        { term: 'bool copy = name;', note: 'Read a stored Boolean value and copy it into separate storage.', source: 'ch1-1-ci-010' },
        { term: 'name = false;', note: 'Replace the value stored under an existing name.', source: 'ch1-1-ci-009' },
      ],
    },
    {
      group: 'Boolean computation and display',
      items: [
        { term: '!value', note: 'Produce the opposite Boolean value.', source: 'ch1-2-ci-001' },
        { term: 'left && right', note: 'Produce true only when both values are true.', source: 'ch1-2-ci-002–003' },
        { term: 'left == right', note: 'Produce true when the values are equal.', source: 'ch1-2-ci-004' },
        { term: 'left != right', note: 'Produce true when the values differ.', source: 'ch1-2-ci-005' },
        { term: 'Console.WriteLine(value);', note: 'Display a Boolean result in the console.', source: 'review' },
      ],
    },
  ],
  chapterNav: { chapters: CH1_BOOLEAN_VALUES_CHAPTERS },
  chapterExamples: CH1_BOOLEAN_VALUES_EXAMPLES,

  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Track a door status and display the results',
      modeLabel: 'Full walkthrough',
      instructions: 'Run one line at a time. Watch each stored value and each console result.',
      programLabel: 'Program.cs',
      programNote: 'The recorded status is copied before the current status changes.',
    },
    code: CH1_BOOLEAN_VALUES_CODE,
    goals: CH1_BOOLEAN_VALUES_GOALS,
    subgoals: CH1_BOOLEAN_VALUES_SUBGOALS,
    executionTrace: CH1_BOOLEAN_VALUES_TRACE,
    states: CH1_BOOLEAN_VALUES_STATES,
  },

  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Use the three code jobs and the values shown in the example.',
  },

  mainLesson: {
    title: 'Boolean Values Move Through Separate Storage',
    label: 'Main Lesson',
    intro: 'A type defines a group of data with a set of valid values. A value is data that cannot be simplified further. Every value belongs to exactly one type. The Boolean type has exactly two valid values: true and false.',
    acts: [
      {
        n: 1,
        title: 'Store Boolean values in separate variables.',
        body: [
          'C# names the Boolean type bool. Its only values are true and false. The quoted text "true" is a string value, not a Boolean value.',
          'A variable is a named location in memory that holds a value of a specific type. A binding associates a variable name with its current value. Program state is the full set of bindings at one point in execution.',
          'The first declaration creates powerAvailable and binds true. The second creates maintenanceMode and binds false. Each line adds one binding to state.',
        ],
        code: [
          'bool powerAvailable = true;',
          'bool maintenanceMode = false;',
        ],
        translations: [
          'Store true in powerAvailable. Store false in maintenanceMode.',
        ],
      },
      {
        n: 2,
        title: 'Copy a stored Boolean value before rebinding the original variable.',
        body: [
          'A variable name on the right side of = is read before the surrounding declaration or assignment stores a result. Evaluating a variable means retrieving the value currently bound to that name.',
          'Line 2 evaluates originalStatus first. At that moment, originalStatus supplies true. The declaration creates savedStatus and binds true to it.',
          'Booleans are value types. Assigning one Boolean variable to another copies the value into a separate binding. Line 3 changes originalStatus to false, but it does not write to savedStatus.',
          'The first line initializes a new variable. Rebinding replaces the value of a variable that already exists, so line 3 omits the bool type.',
        ],
        code: [
          'bool originalStatus = true;',
          'bool savedStatus = originalStatus;',
          'originalStatus = false;',
        ],
        translations: [
          'Read true from originalStatus and copy it. Then replace only originalStatus with false.',
        ],
      },
      {
        n: 3,
        title: 'Compute and display Boolean results.',
        body: [
          'An expression is code that evaluates to a value. A Boolean operator reads one or more Boolean inputs and supplies a Boolean result.',
          'NOT, written !, is unary: it has one input and reverses its Boolean value. AND, written &&, is binary: it has two inputs and supplies true only when both inputs are true.',
          'Equality, written ==, supplies true when two values are the same. Inequality, written !=, supplies true when they differ. Both comparison operators are binary.',
          'The assignment operator = binds a value to a variable. The equality operator == compares two values. The number of symbols changes the operation.',
          'Console.WriteLine reviews the Chapter 0 output procedure. Its argument is evaluated first, then WriteLine displays the supplied value without changing the Boolean binding it reads.',
        ],
        code: [
          'bool opposite = !false;',
          'bool bothReady = true && false;',
          'bool sameValue = true == false;',
          'bool differentValues = true != false;',
          'Console.WriteLine(opposite);',
        ],
        translations: [
          '!false produces true. true && false produces false. true == false produces false. true != false produces true.',
        ],
      },
    ],
  },

  rigorousQuiz: {
    title: 'System Status Transfer',
    prompt: 'Trace the system-status program one line at a time. Each question has a short answer you can check immediately.',
    transferCode: CH1_BOOLEAN_VALUES_TRANSFER_CODE,
  },

  exercises: {
    title: 'Boolean Value Practice',
    label: 'Exercises',
    intro: 'Trace, repair, and write small programs that store, compute, and display Boolean values.',
  },

  flow: {
    goal: {
      intent: 'Show all three code jobs in one door-status program.',
      badge: 'Full example',
      activeGoal: 'produceDisplay',
      activeSubgoal: 'store',
      activeKey: 'door-line-1',
      startLabel: 'Start running the example',
      startStatus: 'example not yet run',
      runLabel: 'Run next line',
      note: 'Source shows the current instruction. State shows each stored bool. Console shows only values already displayed.',
    },

    preQuiz: {
      intent: 'Check the three code jobs before the lesson adds more detail.',
      kicker: 'Pre-Quiz · Boolean Values, State, and Visible Results',
      part1Prompt: 'Put the three code jobs in the order used by the door-status program.',
      part2Prompt: 'Open each code job and answer its short question.',
      orderSuccess: 'The program stores values, computes new values, then displays the results.',
      orderRetry: 'Start with the declarations and assignment. Computations use stored values before WriteLine displays the results.',
      categories: [
        {
          id: 'store', n: 'A.a',
          label: 'Store Boolean values in separate variables.',
          why: 'Declarations and assignments establish the values that later instructions read.',
        },
        {
          id: 'compute', n: 'A.b',
          label: 'Compute new Boolean values from stored values.',
          why: 'Boolean operators produce results that can be stored under new names.',
        },
        {
          id: 'display', n: 'A.c',
          label: 'Display Boolean results in the console.',
          why: 'WriteLine makes a stored result visible without changing it.',
        },
      ],
      shuffled: ['display', 'store', 'compute'],
      details: {
        store: {
          type: 'fill the state pair', kind: 'choice', mono: true,
          q: 'What values are stored after line 3?',
          choices: [
            'doorClosed = false; recordedDoorClosed = true',
            'doorClosed = false; recordedDoorClosed = false',
            'doorClosed = true; recordedDoorClosed = true',
          ],
          correct: 0,
          why: 'Line 2 copies true into separate storage. Line 3 changes only doorClosed.',
        },
        compute: {
          type: 'pick the computing line', kind: 'choice', mono: true,
          q: 'Which line computes and stores a Boolean result?',
          choices: [
            'bool ready = !false;',
            'bool ready = "true";',
            'string ready = "true";',
          ],
          correct: 0,
          why: '!false produces the Boolean value true, and the declaration stores it in ready.',
        },
        display: {
          type: 'identify the display behavior', kind: 'choice', mono: true,
          q: 'Which statement describes Console.WriteLine(2 + 3)?',
          choices: [
            '2 + 3 supplies 5, then WriteLine displays 5.',
            'WriteLine stores 5 in a variable.',
            'WriteLine displays the source text 2 + 3.',
          ],
          correct: 0,
          why: 'The argument is evaluated first. WriteLine displays the resulting value.',
        },
      },
    },

    mainLesson: {
      intent: 'Define Boolean values and trace storage, copying, computation, and display in small steps.',
      completeNote: 'You tracked separate Boolean storage, computed four operator results, and identified what WriteLine displays.',
      checks: [
        {
          type: 'choose the state pair', kind: 'choice', mono: true,
          q: 'Which state is correct after both declarations run?',
          choices: [
            'powerAvailable = true; maintenanceMode = false',
            'powerAvailable = false; maintenanceMode = true',
            'powerAvailable = true; maintenanceMode = true',
          ],
          correct: 0,
          why: 'A.a stores Boolean values in separate variables. Each declaration creates one bool binding with the value on its right side.',
        },
        {
          type: 'choose the state and cause', kind: 'choice', mono: true,
          q: 'Which option gives the state after line 3 and the line that made the values differ?',
          choices: [
            'originalStatus = false; savedStatus = true; line 3 changes only originalStatus',
            'originalStatus = false; savedStatus = false; line 3 changes both variables',
            'originalStatus = true; savedStatus = true; line 2 changes only savedStatus',
          ],
          correct: 0,
          why: 'A.a stores separate Boolean values. Line 2 gives savedStatus its own true value, and line 3 writes only to originalStatus.',
        },
        {
          type: 'match results and display', kind: 'choice', mono: true,
          q: 'Which option matches the four stored results and the value displayed by the final line?',
          choices: [
            'opposite = true; bothReady = false; sameValue = false; differentValues = true; display True',
            'opposite = false; bothReady = true; sameValue = true; differentValues = false; display False',
            'opposite = true; bothReady = true; sameValue = false; differentValues = false; display True',
          ],
          correct: 0,
          why: 'A.b computes each stored result. A.c evaluates opposite, then WriteLine displays True without changing any binding.',
        },
      ],
    },

    rigorousQuiz: {
      intent: 'Transfer the three code jobs to a system-status program without subgoal labels.',
      codeLabel: 'System-status program',
      success: 'You tracked the copied status, computed each result, and matched the three console values.',
      cards: [
        {
          id: 'state-after-rebind', type: 'choose the state triple', kind: 'choice', mono: true,
          q: 'Which state is correct immediately after line 4 runs?',
          choices: [
            'primaryOnline = false; backupOnline = true; savedPrimaryOnline = true',
            'primaryOnline = false; backupOnline = true; savedPrimaryOnline = false',
            'primaryOnline = true; backupOnline = true; savedPrimaryOnline = true',
          ],
          correct: 0,
          why: 'Line 3 copies true into savedPrimaryOnline. Line 4 changes only primaryOnline.',
        },
        {
          id: 'copy-line', type: 'pick the copying line', kind: 'choice', mono: true,
          q: 'Which line creates the saved Boolean binding?',
          choices: [
            'line 3: bool savedPrimaryOnline = primaryOnline;',
            'line 4: primaryOnline = false;',
            'line 6: bool primaryOffline = !primaryOnline;',
          ],
          correct: 0,
          why: 'Line 3 declares savedPrimaryOnline and copies the value read from primaryOnline.',
        },
        {
          id: 'divergence-line', type: 'pick the changing line', kind: 'choice', mono: true,
          q: 'Which line causes primaryOnline and savedPrimaryOnline to hold different values?',
          choices: [
            'line 2: bool backupOnline = true;',
            'line 3: bool savedPrimaryOnline = primaryOnline;',
            'line 4: primaryOnline = false;',
          ],
          correct: 2,
          why: 'Line 4 replaces primaryOnline with false. The saved copy remains true.',
        },
        {
          id: 'offline-result', type: 'fill the value', kind: 'chips',
          q: 'What value is stored in primaryOffline?',
          chips: ['true', 'false'],
          correct: 'true',
          why: 'primaryOnline is false, so !primaryOnline produces true.',
        },
        {
          id: 'ready-result', type: 'fill the value', kind: 'chips',
          q: 'What value is stored in systemsReady?',
          chips: ['true', 'false'],
          correct: 'false',
          why: 'primaryOnline is false, so false && true produces false.',
        },
        {
          id: 'changed-order', type: 'order the computation', kind: 'order',
          q: 'Put the work for line 8 in order.',
          bank: [
            'Store the result in primaryChanged.',
            'Read savedPrimaryOnline.',
            'Compare the values with !=.',
            'Read primaryOnline.',
          ],
          correct: [
            'Read primaryOnline.',
            'Read savedPrimaryOnline.',
            'Compare the values with !=.',
            'Store the result in primaryChanged.',
          ],
          placeholder: 'tap the next operation',
          why: 'The program reads both operand values, compares them, then stores the Boolean result.',
        },
        {
          id: 'changed-result', type: 'fill the value', kind: 'chips',
          q: 'What value is stored in primaryChanged?',
          chips: ['true', 'false'],
          correct: 'true',
          why: 'primaryOnline is false and savedPrimaryOnline is true, so the values differ.',
        },
        {
          id: 'console-row', type: 'fill the console row', kind: 'row',
          q: 'Complete the three console results in display order.',
          rowLabel: 'lines 10–12',
          columns: ['moment', 'first', 'second', 'third'],
          cells: [
            { col: 'first', chips: ['True', 'False'], correct: 'True' },
            { col: 'second', chips: ['True', 'False'], correct: 'False' },
            { col: 'third', chips: ['True', 'False'], correct: 'True' },
          ],
          why: 'The program displays primaryOffline, systemsReady, and primaryChanged in that order.',
        },
      ],
    },

    exercises: {
      intent: 'Fade support from labeled completion to independent construction.',
      intro: 'Predict each stored value and console result before checking the model answer.',
      problems: [
        {
          n: 1, title: 'Complete an open-status program', tag: 'guided labels',
          statement: 'Complete the program using the labels: A.a stores isOpen, A.b computes isClosed, and A.c displays both stored values.',
          given: [
            'bool isOpen = false;',
            'bool isClosed = ___;',
            'Console.WriteLine(___);',
            'Console.WriteLine(___);',
          ],
          constraints: [
            'A.a: keep isOpen bound to false.',
            'A.b: use ! with isOpen.',
            'A.c: display isOpen first and isClosed second.',
            'Predict the two console values.',
          ],
          model: [
            'bool isOpen = false;',
            'bool isClosed = !isOpen;',
            'Console.WriteLine(isOpen);',
            'Console.WriteLine(isClosed);',
            'Console: False, True',
          ],
          feedback: 'If the output differs, check the matching code job. A.a establishes isOpen = false. A.b applies ! and stores true. A.c displays both values in source order.',
        },
        {
          n: 2, title: 'Preserve an earlier signal', tag: 'copy and rebind',
          statement: 'Retain the labels: A.a copies and rebinds the signal values; A.c displays the current and saved values.',
          given: [
            'bool currentSignal = true;',
            'bool savedSignal = ___;',
            'currentSignal = false;',
            'Console.WriteLine(currentSignal);',
            'Console.WriteLine(savedSignal);',
          ],
          constraints: [
            'A.a: copy currentSignal into savedSignal before line 3.',
            'A.a: do not assign a second value to savedSignal.',
            'A.c: predict the two console values.',
          ],
          model: [
            'bool savedSignal = currentSignal;',
            'Console: False, True',
          ],
          feedback: 'A.a creates two independent Boolean bindings, so savedSignal retains true. A.c displays the current value of each binding.',
        },
        {
          n: 3, title: 'Compute two readiness results', tag: 'reduced guidance',
          statement: 'Write the two missing computations and display their results.',
          given: [
            'bool leftReady = true;',
            'bool rightReady = false;',
            'bool bothReady = ___;',
            'bool sameStatus = ___;',
            'Console.WriteLine(bothReady);',
            'Console.WriteLine(sameStatus);',
          ],
          constraints: [
            'Use && for bothReady.',
            'Use == for sameStatus.',
            'Predict both console values.',
          ],
          model: [
            'bool bothReady = leftReady && rightReady;',
            'bool sameStatus = leftReady == rightReady;',
            'Console: False, False',
          ],
          feedback: 'Both results are false: the operands are not both true, and their values are not equal.',
        },
        {
          n: 4, title: 'Repair a saved-status report', tag: 'repair',
          statement: 'Two lines are wrong. Repair them so same records equality and the console displays the saved value followed by same.',
          given: [
            'bool current = true;',
            'bool saved = current;',
            'current = false;',
            'bool same = current != saved;',
            'Console.WriteLine("saved");',
            'Console.WriteLine(same);',
          ],
          constraints: [
            'Change only lines 4 and 5.',
            'Use the equality operator on line 4.',
            'Display the variable saved, not quoted text.',
          ],
          model: [
            'bool same = current == saved;',
            'Console.WriteLine(saved);',
            'Console: True, False',
          ],
          feedback: 'saved contains true. current == saved produces false because current changed to false.',
        },
        {
          n: 5, title: 'Build a sensor-status report', tag: 'independent transfer',
          statement: 'Write a program that saves an earlier sensor status, changes the current status, computes an opposite value, combines two values with &&, compares current and saved values with !=, and displays the three computed results.',
          constraints: [
            'Use bool variables with clear sensor-status names.',
            'Include one copy before one rebind.',
            'Use !, &&, and != once each.',
            'Display the three computed variables on separate lines.',
          ],
          model: [
            'bool sensorOnline = true;',
            'bool backupOnline = true;',
            'bool savedSensorOnline = sensorOnline;',
            'sensorOnline = false;',
            'bool sensorOffline = !sensorOnline;',
            'bool sensorsReady = sensorOnline && backupOnline;',
            'bool sensorChanged = sensorOnline != savedSensorOnline;',
            'Console.WriteLine(sensorOffline);',
            'Console.WriteLine(sensorsReady);',
            'Console.WriteLine(sensorChanged);',
            'Console: True, False, True',
          ],
          feedback: 'The saved copy stays true after the current status becomes false. That makes the opposite true, the && result false, and the != result true.',
        },
      ],
    },
  },
};

Object.assign(window, {
  CH1_BOOLEAN_VALUES_GOALS,
  CH1_BOOLEAN_VALUES_SUBGOALS,
  CH1_BOOLEAN_VALUES_CODE,
  CH1_BOOLEAN_VALUES_STATES,
  CH1_BOOLEAN_VALUES_TRACE,
  CH1_BOOLEAN_VALUES_TRANSFER_CODE,
  CH1_BOOLEAN_VALUES_LESSON,
});
