/* flow-ch1-2-simple-decisions.jsx - Chapter 1, Lesson 2.
   One JSON-compatible lesson object; every page renders through the shared flow kit. */

const CH1_SIMPLE_DECISION_GOALS = {
  decide: {
    id: 'decide',
    n: 'A',
    label: 'Turn console input into a Boolean decision.',
    gloss: 'Retrieve text, compare it with the expected response, and make the resulting Boolean value available to the branch.',
  },
  branch: {
    id: 'branch',
    n: 'B',
    label: 'Run the scope selected by the decision.',
    gloss: 'Evaluate the condition and execute exactly the scope selected by its Boolean value.',
  },
};

const CH1_SIMPLE_DECISION_SUBGOALS = {
  retrieve: {
    id: 'retrieve', n: 'A.a', goal: 'decide',
    label: 'Retrieve console input.',
    gloss: 'Display a useful prompt, call ReadLine with no arguments, and bind the returned text.',
  },
  branchingValue: {
    id: 'branchingValue', n: 'A.b', goal: 'decide',
    label: 'Create a branching value.',
    gloss: 'Compare the response with the expected text and produce the Boolean value used by the condition.',
  },
  chooseScope: {
    id: 'chooseScope', n: 'B.a', goal: 'branch',
    label: 'Choose which scope executes.',
    gloss: 'Evaluate the condition and execute the selected scope while skipping the other path.',
  },
};

const CH1_SIMPLE_DECISION_CODE = {
  layout: 'frame',
  goals: CH1_SIMPLE_DECISION_GOALS,
  subgoals: CH1_SIMPLE_DECISION_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'retrieve' },
    { kind: 'seg', subgoal: 'branchingValue' },
    { kind: 'seg', subgoal: 'chooseScope' },
  ],
  lines: [
    {
      id: 'ready-line-1', num: '1', indent: 0,
      text: 'Console.WriteLine("Ready? (yes/no)");', subgoal: 'retrieve',
      translation: 'Display a message that identifies the expected response.',
    },
    {
      id: 'ready-line-2', num: '2', indent: 0,
      text: 'string answer = Console.ReadLine();', subgoal: 'retrieve',
      translation: 'Call ReadLine with no arguments and bind the returned text to answer.',
    },
    {
      id: 'ready-line-3', num: '3', indent: 0,
      text: 'bool isReady = answer == "yes";', subgoal: 'branchingValue',
      translation: 'Compare answer with the string "yes" and bind the Boolean result to isReady.',
    },
    {
      id: 'ready-line-4', num: '4', indent: 0,
      text: 'if (isReady)', subgoal: 'chooseScope',
      translation: 'If isReady evaluates to true, execute the first scope. Otherwise, execute the second scope.',
    },
    { id: 'ready-line-5', num: '5', indent: 0, text: '{', subgoal: 'chooseScope' },
    {
      id: 'ready-line-6', num: '6', indent: 1,
      text: 'Console.WriteLine("Ready");', subgoal: 'chooseScope',
      translation: 'The selected first scope displays "Ready".',
    },
    { id: 'ready-line-7', num: '7', indent: 0, text: '}', subgoal: 'chooseScope' },
    { id: 'ready-line-8', num: '8', indent: 0, text: 'else', subgoal: 'chooseScope' },
    { id: 'ready-line-9', num: '9', indent: 0, text: '{', subgoal: 'chooseScope' },
    {
      id: 'ready-line-10', num: '10', indent: 1,
      text: 'Console.WriteLine("Not ready");', subgoal: 'chooseScope',
      translation: 'The alternative scope would display "Not ready" if the condition were false.',
    },
    { id: 'ready-line-11', num: '11', indent: 0, text: '}', subgoal: 'chooseScope' },
  ],
  tokens: {
    string: { tone: 'type', description: 'The type used for text values.' },
    bool: { tone: 'type', description: 'The type whose only values are true and false.' },
    answer: { tone: 'name', description: 'The text retrieved from the console.' },
    isReady: { tone: 'name', description: 'The Boolean value used by the condition.' },
    '==': { tone: 'op', description: 'Compare two values and produce true when they are equal.' },
    if: { tone: 'keyword', description: 'Execute a scope only when its condition evaluates to true.' },
    else: { tone: 'keyword', description: 'Provide the scope selected when the if condition is false.' },
    'Console.WriteLine': { tone: 'call', description: 'Display the value supplied as its argument.' },
    'Console.ReadLine': { tone: 'call', description: 'Accept no arguments and produce the text entered at the console.' },
  },
};

const CH1_SIMPLE_DECISION_STATES = [
  {
    label: 'Before execution',
    desc: 'No prompt has been displayed, no input has been retrieved, and neither scope has been selected.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'WriteLine displays the prompt before the program waits for input.',
    memory: [],
    console: ['Ready? (yes/no)'],
  },
  {
    label: 'After line 2',
    desc: 'For this walkthrough, the user enters yes. ReadLine produces that text and answer stores it.',
    memory: [{ name: 'answer', type: 'string', value: '"yes"' }],
    console: ['Ready? (yes/no)', '> yes'],
  },
  {
    label: 'After line 3',
    desc: 'answer == "yes" evaluates to true, so isReady stores true as the branching value.',
    memory: [
      { name: 'answer', type: 'string', value: '"yes"' },
      { name: 'isReady', type: 'bool', value: 'true' },
    ],
    console: ['Ready? (yes/no)', '> yes'],
    evalDetail: {
      title: 'Create the branching value',
      sourceLine: 'bool isReady = answer == "yes";',
      steps: [
        { label: 'Start', note: 'Start with the complete declaration. The evaluation bar marks answer as the first term to evaluate.' },
        { label: 'Read', note: 'Read the string "yes" from answer. This one-step result appears above the declaration.' },
        { label: 'Substitute', note: 'Substitute "yes" for answer in the declaration to the right.' },
        { label: 'Compare', note: 'Evaluate "yes" == "yes" to the Boolean value true.' },
        { label: 'Substitute', note: 'Substitute true into the declaration. The completed declaration stores true in isReady.' },
      ],
      layout: 'verticalStack',
      blocks: [
        {
          showAt: 0,
          levels: [
            {
              expression: 'bool isReady = answer == "yes"',
              showAt: 0,
              activeAt: [0],
              evalSpan: [15, 21],
              label: 'var',
              lineShowAt: 0,
              lineActiveAt: [0],
              strike: { showAt: 0, activeAt: [0], span: [15, 21] },
            },
            { expression: '"yes"', showAt: 0, activeAt: [0] },
          ],
          arrowAfter: { showAt: 0, activeAt: [0] },
        },
        {
          showAt: 0,
          levels: [
            {
              expression: 'bool isReady = "yes" == "yes"',
              showAt: 0,
              activeAt: [0, 1],
              evalSpan: [15, 29],
              label: '==',
              lineShowAt: 1,
              lineActiveAt: [1],
              strike: { showAt: 1, activeAt: [1], span: [15, 29] },
            },
            { expression: 'true', showAt: 1, activeAt: [1] },
          ],
          arrowAfter: { showAt: 1, activeAt: [1] },
        },
        {
          showAt: 1,
          levels: [
            {
              expression: 'bool isReady = true',
              showAt: 1,
              activeAt: [1, 2],
              evalSpan: [15, 19],
              label: 'value',
              lineShowAt: 1,
              lineActiveAt: [1, 2],
            },
          ],
        },
      ],
      minCanvasWidth: 620,
    },
  },
  {
    label: 'After line 4',
    desc: 'The condition is true. Execution selects the first scope and skips the else scope.',
    memory: [
      { name: 'answer', type: 'string', value: '"yes"' },
      { name: 'isReady', type: 'bool', value: 'true' },
    ],
    console: ['Ready? (yes/no)', '> yes'],
  },
  {
    label: 'After line 6',
    desc: 'The selected scope displays Ready. The skipped scope does not display anything.',
    memory: [
      { name: 'answer', type: 'string', value: '"yes"' },
      { name: 'isReady', type: 'bool', value: 'true' },
    ],
    console: ['Ready? (yes/no)', '> yes', 'Ready'],
  },
];

const CH1_SIMPLE_DECISION_TRACE = [
  { id: 'ready-step-1', rowKey: 'ready-line-1', subgoal: 'retrieve', goal: 'decide', stateIndex: 1 },
  { id: 'ready-step-2', rowKey: 'ready-line-2', subgoal: 'retrieve', goal: 'decide', stateIndex: 2 },
  { id: 'ready-step-3', rowKey: 'ready-line-3', subgoal: 'branchingValue', goal: 'decide', stateIndex: 3 },
  { id: 'ready-step-4', rowKey: 'ready-line-4', subgoal: 'chooseScope', goal: 'branch', stateIndex: 4 },
  { id: 'ready-step-5', rowKey: 'ready-line-6', subgoal: 'chooseScope', goal: 'branch', stateIndex: 5 },
];

const CH1_SIMPLE_DECISION_FORMS = [
  {
    id: 'explicit',
    label: 'Fully explicit teaching form',
    judgment: 'useful while learning or debugging',
    subgoals: [
      'Retrieve console input.',
      'Create a branching value.',
      'Choose which scope executes.',
    ],
    code: [
      'Console.WriteLine("Ready? (yes/no)");',
      'string answer = Console.ReadLine();',
      'bool isReady = answer == "yes";',
      'if (isReady) { Console.WriteLine("Ready"); }',
      'else { Console.WriteLine("Not ready"); }',
    ],
  },
  {
    id: 'balanced',
    label: 'Recommended middle form',
    judgment: 'recommended after the separate jobs are understood',
    subgoals: [
      'Retrieve console input.',
      'Choose which scope executes from an input comparison.',
    ],
    code: [
      'Console.WriteLine("Ready? (yes/no)");',
      'string answer = Console.ReadLine();',
      'if (answer == "yes") { Console.WriteLine("Ready"); }',
      'else { Console.WriteLine("Not ready"); }',
    ],
  },
  {
    id: 'compressed',
    label: 'Legal but over-compressed form',
    judgment: 'discouraged because one condition line combines three code jobs',
    subgoals: [
      'Retrieve console input, create a branching value, and choose which scope executes.',
    ],
    code: [
      'Console.WriteLine("Ready? (yes/no)");',
      'if (Console.ReadLine() == "yes") { Console.WriteLine("Ready"); }',
      'else { Console.WriteLine("Not ready"); }',
    ],
  },
];

const CH1_SIMPLE_DECISION_TRANSFER_CODE = {
  lines: [
    { id: 'access-line-1', num: '1', text: 'Console.WriteLine("Enter password:");' },
    { id: 'access-line-2', num: '2', text: 'string password = Console.ReadLine();' },
    { id: 'access-line-3', num: '3', text: 'bool grantsAccess = password == "secret";' },
    { id: 'access-line-4', num: '4', text: 'if (grantsAccess)' },
    { id: 'access-line-5', num: '5', text: '{' },
    { id: 'access-line-6', num: '6', indent: 1, text: 'Console.WriteLine("Access granted");' },
    { id: 'access-line-7', num: '7', text: '}' },
    { id: 'access-line-8', num: '8', text: 'else' },
    { id: 'access-line-9', num: '9', text: '{' },
    { id: 'access-line-10', num: '10', indent: 1, text: 'Console.WriteLine("Access denied");' },
    { id: 'access-line-11', num: '11', text: '}' },
    { id: 'access-line-12', num: '12', text: 'Console.WriteLine("Attempt checked");' },
  ],
};

const CH1_SIMPLE_DECISION_CHAPTERS = (window.FUNCS_CHAPTERS || []).map(chapter => ({
  ...chapter,
  current: chapter.id === 'ch1',
}));

const CH1_SIMPLE_DECISION_EXAMPLES = [
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
    current: true,
    summary: 'Retrieve input, produce a Boolean decision, and execute the selected scope.',
    tags: ['ReadLine', 'condition', 'if', 'else', 'scope'],
  },
];

const CH1_SIMPLE_DECISIONS_LESSON = {
  id: 'ch1-2-simple-decisions-from-input',
  chapterId: 'ch1',
  source: 'ch1/ch1-3.md',
  stableUrl: '/ch1/ch1-3.html',
  order: 2,
  title: 'Simple Decisions from Input',
  kicker: 'Chapter 1',
  learningTarget: 'Retrieve console input, compare it to produce a Boolean value, and use that value to choose which scope executes.',
  roadmap: {
    order: 2,
    sourceAnchors: [
      'ch1-3-ci-001',
      'ch1-3-ci-002',
      'ch1-3-ci-003',
      'ch1-3-ci-004',
      'ch1-3-ci-005',
      'ch1-3-ci-014',
    ],
    reviewConcepts: [
      'ch1-3-ci-006',
      'ch1-3-ci-011',
      'ch1-3-ci-012',
      'ch1-3-ci-013',
      'C0.1 console input and output',
      'C1.1 Boolean state and equality',
    ],
  },
  availableSyntax: [
    {
      group: 'Console input and decision state',
      items: [
        { term: 'Console.WriteLine(message);', note: 'Display a prompt or result.', source: 'review' },
        { term: 'string answer = Console.ReadLine();', note: 'Retrieve one line of text and bind it to answer.', source: 'ch1-3-ci-011-013' },
        { term: 'bool matches = answer == "yes";', note: 'Compare text and store the Boolean result.', source: 'review' },
      ],
    },
    {
      group: 'Simple conditional execution',
      items: [
        { term: 'if (condition) { ... }', note: 'Execute a scope when its condition is true; otherwise skip it.', source: 'ch1-3-ci-001-004' },
        { term: 'if (condition) { ... } else { ... }', note: 'Execute exactly one of two scopes.', source: 'ch1-3-ci-005' },
      ],
    },
  ],
  chapterNav: { chapters: CH1_SIMPLE_DECISION_CHAPTERS },
  chapterExamples: CH1_SIMPLE_DECISION_EXAMPLES,

  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Respond to a readiness answer',
      modeLabel: 'Full walkthrough',
      instructions: 'Run the yes-input path one source row at a time. Watch the text value, branching value, selected scope, and console.',
      programLabel: 'Program.cs',
      programNote: 'This opening form keeps one code job visible on each important line.',
    },
    code: CH1_SIMPLE_DECISION_CODE,
    goals: CH1_SIMPLE_DECISION_GOALS,
    subgoals: CH1_SIMPLE_DECISION_SUBGOALS,
    executionTrace: CH1_SIMPLE_DECISION_TRACE,
    states: CH1_SIMPLE_DECISION_STATES,
  },

  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Review console input, equality, and Boolean state before tracing conditional execution.',
  },

  mainLesson: {
    title: 'From Console Text to a Selected Scope',
    label: 'Main Lesson',
    intro: 'A program can respond to console input by retrieving text, producing a Boolean value from that text, and using the value as a condition. Keeping those jobs visible first makes the later, denser forms easier to judge.',
    comparisonForms: CH1_SIMPLE_DECISION_FORMS,
    acts: [
      {
        n: 1,
        title: 'Retrieve text and create the branching value.',
        body: [
          'When someone types at a keyboard, the input arrives as text. The declaration string answer = Console.ReadLine(); stores the text returned by the console under the name answer.',
          'Console.WriteLine(message) displays its argument. Console.ReadLine() accepts no arguments, waits for one line of input, and produces that text as a string. Display the prompt before calling ReadLine so the user knows what response the program expects.',
          'For an input of yes, line 2 binds the string "yes" to answer. The comparison on line 3 produces true and binds that result to isReady. We call this result the branching value because the condition will use it; branching value is a code-purpose label, not a new C# term.',
        ],
        definitions: [
          { term: 'String', definition: 'A sequence of text characters. String literals appear inside quotation marks.' },
          { term: 'Branching value', definition: 'A lesson label for the Boolean value that a condition will use to choose a path.' },
        ],
        code: [
          'Console.WriteLine("Ready? (yes/no)");',
          'string answer = Console.ReadLine();',
          'bool isReady = answer == "yes";',
        ],
        translations: [
          {
            code: 'string answer = Console.ReadLine();',
            text: 'Call ReadLine with no arguments, then create a string variable named answer and bind the returned text to it.',
          },
          {
            code: 'bool isReady = answer == "yes";',
            text: 'Compare answer with the string "yes", then create isReady and bind the Boolean result to it.',
          },
        ],
        recall: {
          cards: [
            { id: 'readline-result', prompt: 'What type of value does Console.ReadLine() produce?', answer: 'Console.ReadLine() produces a string value.' },
            { id: 'equality-translation', prompt: 'How do you read answer == "yes" in English?', answer: 'answer equals the string "yes"' },
          ],
        },
      },
      {
        n: 2,
        title: 'Use the condition to choose a scope.',
        body: [
          'An if statement uses one Boolean condition to choose whether its scope executes.',
          'For a one-way if, a false condition skips the scope. Both paths continue with the code after the if statement.',
          'An else supplies a second scope. Exactly one scope executes. With isReady equal to true, the first scope displays Ready and the else scope is skipped.',
          'Braces, not indentation, define the scope. A variable declared inside a scope cannot be used after that scope ends. If later code needs the value, declare and initialize its variable before the if, then replace its value inside a selected scope.',
        ],
        definitions: [
          { term: 'Control flow', definition: 'The path execution takes through a program.' },
          { term: 'Condition', definition: 'A Boolean expression that determines whether a scope executes.' },
          { term: 'If statement', definition: 'A control structure that executes its scope only when its condition evaluates to true.' },
          { term: 'Scope', definition: 'A region of code bounded by { and }.' },
        ],
        code: [
          'if (isReady)',
          '{ // first scope',
          '    Console.WriteLine("Ready");',
          '} // end first scope',
          'else',
          '{ // second scope',
          '    Console.WriteLine("Not ready");',
          '} // end second scope',
          'Console.WriteLine("Checked");',
        ],
        translations: [
          {
            code: 'if (isReady) { ... }',
            text: 'If isReady evaluates to true, execute the scope. Otherwise, skip the scope.',
          },
          {
            code: 'if (isReady) { ... } else { ... }',
            text: 'If isReady evaluates to true, execute the first scope. Otherwise, execute the second scope.',
          },
        ],
        recall: {
          cards: [
            { id: 'condition-definition', prompt: 'What is a condition?', answer: 'A condition is a Boolean expression that determines whether a scope executes.' },
            { id: 'false-two-way', prompt: 'Which scope executes when an if/else condition is false?', answer: 'The else scope executes.' },
          ],
        },
      },
      {
        n: 3,
        title: 'Compare three behavior-equivalent forms.',
        body: [
          'The fully explicit form gives each code job its own important line: retrieve console input, create a branching value, and choose which scope executes. This form is useful while learning, tracing state, or debugging because answer and isReady can both be inspected.',
          'After those jobs are understood, the recommended middle form keeps answer in program state but places answer == "yes" directly in the if condition. Its two labels are Retrieve console input and Choose which scope executes from an input comparison. At a glance, if (answer == "yes") states both the test and the decision it controls.',
          'The final form, if (Console.ReadLine() == "yes"), is legal and behaves the same for this program, but it is over-compressed. A truthful label for that condition line becomes Retrieve console input, create a branching value, and choose which scope executes. The label is unwieldy because the line now performs three code jobs and the entered text is no longer available under a name.',
          'Each form displays the prompt, calls ReadLine exactly once, compares the returned text with "yes", and produces the same two possible outputs. Fewer lines make a form denser; they do not automatically make it clearer. Prefer the middle form here because its condition reads naturally while the retrieved input remains inspectable.',
        ],
        definitions: [
          { term: 'Behavior-equivalent forms', definition: 'Different code forms that produce the same observable behavior for the same inputs.' },
          { term: 'Inspectable state', definition: 'Stored values that remain available under variable names while the program runs.' },
        ],
        code: [
          '// Run each of these three forms as a separate program.',
          '// Form 1 - three visible subgoals',
          'Console.WriteLine("Ready? (yes/no)");    // Explicit form prompt.',
          'string answer = Console.ReadLine();       // Retrieve input explicitly.',
          'bool isReady = answer == "yes";          // Create a branching value.',
          'if (isReady) { Console.WriteLine("Ready"); } // Choose which scope executes.',
          'else { Console.WriteLine("Not ready"); } // Explicit alternative.',
          '// End form 1.',
          '// Form 2 - recommended balance',
          'Console.WriteLine("Ready? (yes/no)");    // Balanced form prompt.',
          'string answer = Console.ReadLine();       // Keep input inspectable.',
          'if (answer == "yes") { Console.WriteLine("Ready"); } // Choose which scope executes from an input comparison.',
          'else { Console.WriteLine("Not ready"); } // Balanced alternative.',
          '// End form 2.',
          '// Form 3 - legal but over-compressed',
          'Console.WriteLine("Ready? (yes/no)");    // Compressed form prompt.',
          '// Retrieve console input, create a branching value, and choose which scope executes.',
          'if (Console.ReadLine() == "yes") { Console.WriteLine("Ready"); }',
          'else { Console.WriteLine("Not ready"); } // Compressed alternative.',
        ],
        translations: [
          {
            code: 'if (isReady)',
            text: 'If the Boolean value stored in isReady is true, execute the scope.',
          },
          {
            code: 'if (answer == "yes")',
            text: 'If answer equals the string "yes", execute the scope.',
          },
          {
            code: 'if (Console.ReadLine() == "yes")',
            text: 'If the text returned by ReadLine equals the string "yes", execute the scope.',
          },
        ],
        recall: {
          cards: [
            { id: 'balanced-form', prompt: 'Which form keeps the input inspectable while placing the comparison in the condition?', answer: 'Store the input in answer, then use if (answer == "yes").' },
            { id: 'equivalent-check', prompt: 'What must stay the same before two forms are called behavior-equivalent here?', answer: 'They must read once, compare the same input, and select the same output for each input.' },
          ],
        },
      },
    ],
  },

  rigorousQuiz: {
    title: 'Password Decision Transfer',
    prompt: 'Trace the password program with one stated input at a time. Identify the stored values, selected scope, rejoined path, and one scope repair.',
    transferCode: CH1_SIMPLE_DECISION_TRANSFER_CODE,
  },

  exercises: {
    title: 'Simple Decision Practice',
    label: 'Exercises',
    intro: 'Trace, complete, repair, and write input-driven decisions before choosing whether to combine any code jobs.',
  },

  flow: {
    goal: {
      intent: 'Show the three code jobs in one explicit readiness decision.',
      badge: 'Full example',
      activeGoal: 'decide',
      activeSubgoal: 'retrieve',
      activeKey: 'ready-line-1',
      startLabel: 'Start example',
      startStatus: 'example not yet run',
      runLabel: 'Run next executed row',
      note: 'This trace uses the input yes. Source-row stepping shows that the true scope runs and the else scope is skipped.',
    },

    preQuiz: {
      intent: 'Check the input, comparison, and scope-selection jobs before defining conditional execution.',
      kicker: 'Pre-Quiz - Simple Decisions from Input',
      part1Prompt: 'Put the three code jobs in the order used by this explicit decision.',
      part1Code: [
        'string response = Console.ReadLine();',
        'bool accepts = response == "yes";',
        'if (accepts) { Console.WriteLine("Accepted"); }',
      ],
      part2Prompt: 'Open each code job and answer its short question.',
      orderSuccess: 'The program retrieves text, creates a Boolean value, then uses that value to choose a scope.',
      orderRetry: 'Begin with the call that produces text. The comparison needs that text, and the if needs the comparison result.',
      categories: [
        {
          id: 'retrieve', n: 'A.a',
          label: 'Retrieve console input.',
          why: 'WriteLine displays the prompt; ReadLine returns the response as text.',
        },
        {
          id: 'branchingValue', n: 'A.b',
          label: 'Create a branching value.',
          why: 'The comparison produces the Boolean value used by the condition.',
        },
        {
          id: 'chooseScope', n: 'B.a',
          label: 'Choose which scope executes.',
          why: 'The condition selects the scope whose instructions run.',
        },
      ],
      hideOrderOrdinals: true,
      shuffled: ['chooseScope', 'retrieve', 'branchingValue'],
      details: {
        retrieve: {
          type: 'choose the input pair', kind: 'choice', mono: true,
          q: 'Which pair displays a useful prompt and then retrieves one line of input?',
          choices: [
            'Console.WriteLine();\nstring answer = Console.ReadLine("Ready?");',
            'Console.WriteLine("Ready?");\nstring answer = Console.ReadLine();',
            'Console.ReadLine("Ready?");\nstring answer = Console.WriteLine();',
          ],
          correct: 1,
          why: 'A.a retrieves console input. WriteLine needs the message argument; ReadLine accepts no arguments and returns the response.',
        },
        branchingValue: {
          type: 'choose the Boolean result', kind: 'choice', mono: true,
          q: 'If answer stores "yes", what does answer == "yes" produce?',
          choices: ['true', 'the string "yes"', 'false'],
          correct: 0,
          why: 'A.b creates the branching value. Equality compares the two string values and produces true because they match.',
        },
        chooseScope: {
          type: 'choose the executed scope', kind: 'choice', mono: true,
          q: 'If the condition of an if/else is false, which scope executes?',
          choices: ['both scopes', 'the first scope', 'the else scope'],
          correct: 2,
          why: 'B.a chooses which scope executes. A false condition skips the first scope and selects the else scope.',
        },
      },
    },

    mainLesson: {
      intent: 'Define input-driven conditional execution, walk through the explicit example, and reveal two denser forms only after the jobs are understood.',
      completeNote: 'You traced input into a Boolean decision, followed the selected scope, and distinguished visible, balanced, and over-compressed forms.',
      checks: [
        {
          type: 'complete the state row', kind: 'row',
          q: 'The user enters yes. Complete program state after line 3 of the opening example.',
          rowLabel: 'after line 3',
          columns: ['moment', 'answer', 'isReady'],
          cells: [
            { col: 'answer', chips: ['"yes"', 'true', '"no"'], correct: '"yes"' },
            { col: 'isReady', chips: ['true', 'false', '"yes"'], correct: 'true' },
          ],
          why: 'A.a binds the returned text "yes" to answer. A.b compares that text with "yes" and binds true to isReady.',
        },
        {
          type: 'choose the path', kind: 'choice', mono: true,
          q: 'If isReady is false, what happens before Console.WriteLine("Checked") runs?',
          choices: [
            'The first scope is skipped, the else scope displays Not ready, and both paths rejoin.',
            'Both scopes display their messages, then execution rejoins.',
            'The whole program stops because the condition is false.',
          ],
          correct: 0,
          why: 'B.a chooses the else scope for a false condition. Exactly one scope executes, then execution continues after the if/else.',
        },
        {
          type: 'choose the recommended form', kind: 'choice', mono: true,
          q: 'After the three separate jobs are understood, which condition keeps the input inspectable while making the decision readable at a glance?',
          choices: [
            'bool isReady = answer == "yes";\nif (isReady)',
            'if (Console.ReadLine() == "yes")',
            'string answer = Console.ReadLine();\nif (answer == "yes")',
          ],
          correct: 2,
          why: 'The recommended middle form keeps A.a Retrieve console input on its own line, then combines A.b and B.a in a readable condition. It reads once, preserves the input for inspection, and makes the test visible where the scope is selected.',
        },
      ],
    },

    rigorousQuiz: {
      intent: 'Transfer the three jobs to a password decision without subgoal labels on the reference code.',
      codeLabel: 'Password program',
      success: 'You followed both paths, found the rejoin point, and repaired a scope error.',
      cards: [
        {
          id: 'password-state', type: 'choose the stored input', kind: 'choice', mono: true,
          q: 'For this question, the user enters secret. Which binding exists immediately after line 2?',
          choices: [
            'password = true',
            'password = "secret"',
            'grantsAccess = "secret"',
          ],
          correct: 1,
          why: 'A.a Retrieve console input: ReadLine returns text, so line 2 binds the string "secret" to password.',
        },
        {
          id: 'access-value', type: 'fill the Boolean value', kind: 'chips',
          q: 'The user entered secret. What value does line 3 bind to grantsAccess?',
          chips: ['true', 'false'],
          correct: 'true',
          why: 'A.b Create a branching value: password and "secret" are equal strings, so the comparison produces true.',
        },
        {
          id: 'true-scope', type: 'choose the output', kind: 'choice', mono: true,
          q: 'With grantsAccess equal to true, which branch output is displayed?',
          choices: ['Access denied', 'both branch messages', 'Access granted'],
          correct: 2,
          why: 'B.a Choose which scope executes: a true condition selects the first scope and skips the else scope.',
        },
        {
          id: 'decision-order', type: 'order the path', kind: 'order',
          q: 'The user enters guest. Put the decision work in execution order.',
          bank: [
            'Display Access denied.',
            'Compare password with "secret".',
            'Retrieve guest and bind it to password.',
            'Select the else scope.',
          ],
          correct: [
            'Retrieve guest and bind it to password.',
            'Compare password with "secret".',
            'Select the else scope.',
            'Display Access denied.',
          ],
          placeholder: 'tap the next operation',
          why: 'A.a retrieves text before A.b compares it. The false value then lets B.a select the else scope, whose instruction displays Access denied.',
        },
        {
          id: 'rejoin-row', type: 'complete the false-path row', kind: 'row',
          q: 'Complete the path summary when the user enters guest.',
          rowLabel: 'password = "guest"',
          columns: ['input', 'grantsAccess', 'selected scope', 'final output'],
          cells: [
            { col: 'grantsAccess', chips: ['true', 'false'], correct: 'false' },
            { col: 'selected scope', chips: ['first', 'else'], correct: 'else' },
            { col: 'final output', chips: ['Access denied', 'Attempt checked'], correct: 'Attempt checked' },
          ],
          why: 'B.a chooses the else scope because the comparison is false. Both paths then rejoin at line 12, which displays Attempt checked last.',
        },
        {
          id: 'scope-repair', type: 'choose the scope repair', kind: 'choice', mono: true,
          q: 'Which repair lets line 5 display message after the if statement?',
          choices: [
            'if (grantsAccess) { string message = "Access granted"; }\nConsole.WriteLine(message);',
            'string message = "Access denied";\nif (grantsAccess) { message = "Access granted"; }\nConsole.WriteLine(message);',
            'if (grantsAccess) string message = "Access granted";\nConsole.WriteLine(message);',
          ],
          correct: 1,
          why: 'B.a scope repair: declare and initialize message before the if so its binding remains in scope afterward. The true path may then replace its value.',
        },
        {
          id: 'signature-repair', type: 'choose the input repair', kind: 'choice', mono: true,
          q: 'Which line correctly retrieves a password after a separate prompt has been displayed?',
          choices: [
            'string password = Console.ReadLine();',
            'string password = Console.ReadLine("Enter password:");',
            'Console.WriteLine();',
          ],
          correct: 0,
          why: 'A.a input repair: ReadLine accepts no arguments and returns text. WriteLine, not ReadLine, displays the prompt.',
        },
        {
          id: 'balanced-transfer', type: 'choose the balanced condition', kind: 'choice', mono: true,
          q: 'Which condition is the recommended middle form after password has already been stored?',
          choices: [
            'bool grantsAccess = password == "secret"; if (grantsAccess)',
            'if (password == "secret")',
            'if (Console.ReadLine() == "secret")',
          ],
          correct: 1,
          why: 'A.a keeps password inspectable, while the combined A.b/B.a condition makes the comparison visible where the scope is chosen.',
        },
      ],
    },

    exercises: {
      intent: 'Fade support from explicit subgoal labels to independent construction and an optional balanced compression.',
      intro: 'Keep each program to one input read. Predict the selected scope and final console output before checking the model.',
      problems: [
        {
          n: 1, title: 'Complete an explicit light decision', tag: 'guided labels',
          statement: 'Complete the program using A.a Retrieve console input, A.b Create a branching value, and B.a Choose which scope executes.',
          given: [
            'Console.WriteLine("Turn light on? (yes/no)");',
            'string answer = Console.___();',
            'bool turnOn = answer ___ "yes";',
            'if (___) { Console.WriteLine("Light on"); }',
            'else { Console.WriteLine("Light off"); }',
          ],
          constraints: [
            'A.a: call ReadLine with no argument.',
            'A.b: compare answer with "yes" using equality.',
            'B.a: use the stored Boolean as the condition.',
          ],
          model: [
            'string answer = Console.ReadLine();',
            'bool turnOn = answer == "yes";',
            'if (turnOn) { Console.WriteLine("Light on"); }',
            'else { Console.WriteLine("Light off"); }',
          ],
          feedback: 'Check the failed code job: ReadLine retrieves text, == creates turnOn, and the if uses turnOn to select one scope.',
        },
        {
          n: 2, title: 'Add a one-way confirmation', tag: 'one-way branch',
          statement: 'Complete a one-way if that displays Saved only when answer equals yes, then always displays Finished.',
          given: [
            'Console.WriteLine("Save? (yes/no)");',
            'string answer = Console.ReadLine();',
            'bool save = answer == "yes";',
            'if (___)',
            '{',
            '    Console.WriteLine("Saved");',
            '}',
            'Console.WriteLine("Finished");',
          ],
          constraints: [
            'Use save as the condition.',
            'For input no, skip the scope and continue with Finished.',
            'Do not add an else scope.',
          ],
          model: [
            'if (save)',
            '{',
            '    Console.WriteLine("Saved");',
            '}',
            'Console.WriteLine("Finished");',
          ],
          feedback: 'If Saved still appears for input no, check B.a Choose which scope executes. A false one-way condition skips its scope, and both paths rejoin before Finished.',
        },
        {
          n: 3, title: 'Write a balanced two-way decision', tag: 'reduced guidance',
          statement: 'Store one menu response, then use the recommended middle form to display Soup for soup and Salad otherwise.',
          given: [
            'Console.WriteLine("Choose soup or salad:");',
            'string choice = Console.ReadLine();',
            '// write the if/else',
          ],
          constraints: [
            'Use the recommended middle form.',
            'Put choice == "soup" directly in the if condition.',
            'Read input exactly once.',
            'Display exactly one menu result.',
          ],
          model: [
            'if (choice == "soup")',
            '{',
            '    Console.WriteLine("Soup");',
            '}',
            'else',
            '{',
            '    Console.WriteLine("Salad");',
            '}',
          ],
          feedback: 'If both or neither result can display, check B.a Choose which scope executes. The middle form keeps choice available while its if/else condition selects exactly one scope.',
        },
        {
          n: 4, title: 'Repair five decision errors', tag: 'repair',
          statement: 'Repair the prompt, input signature, equality operator, repeated input, and scope lifetime errors.',
          given: [
            'Console.WriteLine();',
            'string answer = Console.ReadLine("Continue?");',
            'if (answer = "yes")',
            '{',
            '    string message = Console.ReadLine();',
            '}',
            'Console.WriteLine(message);',
          ],
          constraints: [
            'Display Continue? (yes/no) before reading.',
            'Call ReadLine with no arguments and only once.',
            'Use == in the condition.',
            'Declare message before the if so it remains in scope afterward.',
          ],
          model: [
            'Console.WriteLine("Continue? (yes/no)");',
            'string answer = Console.ReadLine();',
            'string message = "Stopping";',
            'if (answer == "yes")',
            '{',
            '    message = "Continuing";',
            '}',
            'Console.WriteLine(message);',
          ],
          feedback: 'Check A.a for the prompt and single no-argument read, A.b for ==, and B.a for message scope. The repaired program keeps message in the outer scope used by the final line.',
        },
        {
          n: 5, title: 'Build and then compress an access decision', tag: 'independent transfer',
          statement: 'Write an explicit badge-code decision, predict both paths, then optionally rewrite only the condition into the recommended middle form.',
          constraints: [
            'Display a prompt and retrieve one badge code.',
            'In the explicit version, store the equality result in a bool.',
            'Display Welcome for code alpha and Try again otherwise.',
            'For the optional rewrite, keep the stored string and move only the comparison into the if condition.',
            'Do not move ReadLine into the condition.',
          ],
          model: [
            'Console.WriteLine("Badge code:");',
            'string code = Console.ReadLine();',
            'bool recognized = code == "alpha";',
            'if (recognized) { Console.WriteLine("Welcome"); }',
            'else { Console.WriteLine("Try again"); }',
            '// Recommended rewrite: if (code == "alpha")',
          ],
          feedback: 'Check A.a for one stored input and B.a for the selected output. Both versions read once and choose the same scope; the rewrite removes the stored bool but keeps code available and the comparison visible in the if.',
        },
      ],
    },
  },
};

Object.assign(window, {
  CH1_SIMPLE_DECISION_GOALS,
  CH1_SIMPLE_DECISION_SUBGOALS,
  CH1_SIMPLE_DECISION_CODE,
  CH1_SIMPLE_DECISION_STATES,
  CH1_SIMPLE_DECISION_TRACE,
  CH1_SIMPLE_DECISION_FORMS,
  CH1_SIMPLE_DECISION_TRANSFER_CODE,
  CH1_SIMPLE_DECISIONS_LESSON,
});
