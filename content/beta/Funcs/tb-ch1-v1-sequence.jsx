/* tb-ch1-v1-sequence.jsx - Chapter 1 V1 roadmap and remaining lesson fixtures */

const CH1_V1_CHAPTERS = [
  { n: 0, id: 'ch0', label: 'Chapter 0', title: 'Before You Begin', href: '../../ch0/' },
  { n: 1, id: 'ch1', label: 'Chapter 1', title: 'Booleans', href: 'Ch1 Roadmap.html', current: true },
  { n: 2, id: 'ch2', label: 'Chapter 2', title: 'Integers and Doubles', href: 'Ch2 Numeric Data Memory Sequence.html' },
  { n: 3, id: 'ch3', label: 'Chapter 3', title: 'Arrays', href: '../../ch3/' },
  { n: 4, id: 'ch4', label: 'Chapter 4', title: 'Classes and Linked Lists', href: '../../ch4/' },
];

const CH1_V1_TOKEN_SPEC = {
  'Console.WriteLine': { tone: 'call', description: 'Evaluates an argument and displays the result in the console.' },
  Console: { tone: 'call', description: 'The console class used for input and output.' },
  WriteLine: { tone: 'call', description: 'A console method that prints one evaluated value.' },
  bool: { tone: 'type', description: 'A boolean type with exactly two values: true and false.' },
  string: { tone: 'type', description: 'A text type. This lesson uses strings as simple input-like data.' },
  void: { tone: 'type', description: 'A method return type meaning the method does not return a value.' },
  struct: { tone: 'type', description: 'A value type that groups fields under one name.' },
  public: { tone: 'type', description: 'A field or method modifier that makes a member accessible.' },
  return: { tone: 'op', description: 'Stops a value-returning method and sends a value back to the caller.' },
  if: { tone: 'op', description: 'Runs a block only when its condition evaluates to true.' },
  else: { tone: 'op', description: 'Runs an alternate branch when earlier branch conditions fail.' },
  while: { tone: 'op', description: 'Repeats a block while its condition evaluates to true.' },
  new: { tone: 'op', description: 'Creates a new value from a type.' },
  true: { tone: 'value', description: 'A boolean literal value.' },
  false: { tone: 'value', description: 'A boolean literal value.' },
  '&&': { tone: 'op', description: 'AND. Produces true only when both operands evaluate to true.' },
  '||': { tone: 'op', description: 'OR. Produces true when at least one operand evaluates to true.' },
  '!': { tone: 'op', description: 'NOT. Evaluates one bool and flips it.' },
  '==': { tone: 'op', description: 'Equality. Produces true when both sides have the same value.' },
  '!=': { tone: 'op', description: 'Inequality. Produces true when the two sides have different values.' },
  '=': { tone: 'op', description: 'Assignment. Evaluate the right side first, then bind the result.' },
  IsOpen: { tone: 'call', description: 'A boolean method that computes whether a door is open.' },
  PrintAccess: { tone: 'call', description: 'A void method that prints a value instead of returning one.' },
  Door: { tone: 'type', description: 'A struct type that groups door-related boolean fields.' },
  Open: { tone: 'name', description: 'A field that stores whether a door is open.' },
  Locked: { tone: 'name', description: 'A field that stores whether a door is locked.' },
};

const CH1_V1_SYNTAX_PROGRESS = [
  {
    group: 'Boolean data',
    fromOrder: 1,
    items: [
      { term: 'bool name = true;', note: 'Declare a boolean variable and bind true.', source: 'ch1-1' },
      { term: 'bool name = false;', note: 'Declare a boolean variable and bind false.', source: 'ch1-1' },
      { term: 'name = value;', note: 'Rebind an existing variable after the right side evaluates.', source: 'ch1-1' },
      { term: 'Console.WriteLine(value);', note: 'Print the evaluated argument.', source: 'ch1-1' },
    ],
  },
  {
    group: 'Boolean expressions',
    fromOrder: 2,
    items: [
      { term: '!expr', note: 'Flip one evaluated bool.', source: 'ch1-2' },
      { term: 'left && right', note: 'AND combines two bool operands.', source: 'ch1-2' },
      { term: 'left || right', note: 'OR combines two bool operands.', source: 'ch1-2' },
    ],
  },
  {
    group: 'Compound conditions',
    fromOrder: 3,
    items: [
      { term: '(expr)', note: 'Parentheses make grouping explicit.', source: 'ch1-2' },
      { term: 'left == right', note: 'Compare two evaluated values for equality.', source: 'ch1-2' },
      { term: 'short-circuit', note: 'Skip the right operand when the left already decides && or ||.', source: 'ch1-2' },
    ],
  },
  {
    group: 'Branches',
    fromOrder: 4,
    items: [
      { term: 'if (condition) { ... }', note: 'Run a block when condition is true.', source: 'ch1-3' },
      { term: '{ ... }', note: 'A block groups statements and controls scope.', source: 'ch1-3' },
    ],
  },
  {
    group: 'Ordered cases',
    fromOrder: 5,
    items: [
      { term: 'else if (condition) { ... }', note: 'Check the next case only when earlier cases fail.', source: 'ch1-3' },
      { term: 'else { ... }', note: 'Run a fallback when no earlier branch ran.', source: 'ch1-3' },
      { term: 'string input = "...";', note: 'Represent simple input-like text for branch conditions.', source: 'ch1-3' },
    ],
  },
  {
    group: 'Loops',
    fromOrder: 6,
    items: [
      { term: 'while (condition) { ... }', note: 'Repeat a block while the guard remains true.', source: 'ch1-3' },
      { term: 'progress update', note: 'Change state inside the loop so the guard can eventually become false.', source: 'ch1-3' },
    ],
  },
  {
    group: 'Boolean methods',
    fromOrder: 7,
    items: [
      { term: 'bool Name(bool arg) { return expr; }', note: 'Name a reusable boolean computation.', source: 'ch1-4' },
      { term: 'return expr;', note: 'Send an evaluated value back to the caller.', source: 'ch1-4' },
    ],
  },
  {
    group: 'Void methods',
    fromOrder: 8,
    items: [
      { term: 'void Name(bool arg) { ... }', note: 'Name reusable actions that do not return a value.', source: 'ch1-4' },
      { term: 'Name(value);', note: 'Call a method after evaluating its arguments.', source: 'ch1-4' },
    ],
  },
  {
    group: 'Structs',
    fromOrder: 9,
    items: [
      { term: 'struct Door { public bool Open; }', note: 'Define a value type with fields.', source: 'ch1-5' },
      { term: 'door.Open = true;', note: 'Write to a field through dot notation.', source: 'ch1-5' },
      { term: 'Door door = new Door();', note: 'Create a new struct value.', source: 'ch1-5' },
    ],
  },
  {
    group: 'Struct copies',
    fromOrder: 10,
    items: [
      { term: 'Door copy = original;', note: 'Copy the current field values into a separate struct value.', source: 'ch1-5' },
      { term: 'bool Method(Door door) { ... }', note: 'Pass a struct value into a boolean method.', source: 'ch1-5' },
    ],
  },
];

function ch1SyntaxUpTo(order) {
  return CH1_V1_SYNTAX_PROGRESS
    .filter(group => group.fromOrder <= order)
    .map(({ group, items }) => ({ group, items }));
}

const CH1_V1_LESSON_MAP = [
  {
    id: 'ch1-boolean-data-memory',
    order: 1,
    title: 'Boolean Data and Memory',
    source: 'ch1/ch1-1.md',
    href: 'Ch1 Data Memory Sequence.html',
    learningTarget: 'Trace boolean declarations, assignments, value copies, and console output as changes to program memory.',
    reviewConcepts: [],
  },
  {
    id: 'ch1-boolean-expressions',
    order: 2,
    title: 'Boolean Expressions',
    source: 'ch1/ch1-2.md',
    href: 'Ch1 Boolean Expressions Sequence.html',
    learningTarget: 'Evaluate ! and && expressions by reading variables, substituting values, applying operators, and binding the final bool.',
    reviewConcepts: ['Boolean data', 'value copy'],
  },
  {
    id: 'ch1-compound-short-circuit',
    order: 3,
    title: 'Compound Conditions and Short-Circuiting',
    source: 'ch1/ch1-2.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-compound-short-circuit',
    learningTarget: 'Predict compound boolean results by applying grouping, precedence, and short-circuit evaluation.',
    reviewConcepts: ['!', '&&', 'variable lookup'],
  },
  {
    id: 'ch1-branching-scope',
    order: 4,
    title: 'Branching and Scope',
    source: 'ch1/ch1-3.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-branching-scope',
    learningTarget: 'Use an evaluated bool to choose a branch and explain which variables remain visible after the block.',
    reviewConcepts: ['Boolean expressions', 'assignment'],
  },
  {
    id: 'ch1-ordered-branches-input',
    order: 5,
    title: 'Ordered Branches and Input',
    source: 'ch1/ch1-3.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-ordered-branches-input',
    learningTarget: 'Trace ordered if/else-if/else branches from input-like values and explain why only one branch runs.',
    reviewConcepts: ['Branch conditions', 'scope'],
  },
  {
    id: 'ch1-while-progress',
    order: 6,
    title: 'While Loops and Progress',
    source: 'ch1/ch1-3.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-while-progress',
    learningTarget: 'Trace a while loop by checking the guard before each pass and identifying the progress update.',
    reviewConcepts: ['Branch guards', 'assignment'],
  },
  {
    id: 'ch1-boolean-methods-return',
    order: 7,
    title: 'Boolean Methods and Return Values',
    source: 'ch1/ch1-4.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-boolean-methods-return',
    learningTarget: 'Call a value-returning boolean method by evaluating arguments, executing return, and binding the returned bool.',
    reviewConcepts: ['Boolean expressions', 'operator evaluation'],
  },
  {
    id: 'ch1-void-methods-operations',
    order: 8,
    title: 'Void Methods and Built Boolean Operations',
    source: 'ch1/ch1-4.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-void-methods-operations',
    learningTarget: 'Distinguish methods that return bool values from void methods that perform output actions.',
    reviewConcepts: ['Method calls', 'Console output'],
  },
  {
    id: 'ch1-struct-basics-fields',
    order: 9,
    title: 'Struct Basics and Fields',
    source: 'ch1/ch1-5.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-struct-basics-fields',
    learningTarget: 'Represent related boolean facts as fields inside a struct value and trace field writes with dot notation.',
    reviewConcepts: ['Boolean storage', 'assignment'],
  },
  {
    id: 'ch1-struct-copy-methods',
    order: 10,
    title: 'Struct Copy and Methods Over Structs',
    source: 'ch1/ch1-5.md',
    href: 'Ch1 Lesson Sequence.html?lesson=ch1-struct-copy-methods',
    learningTarget: 'Trace struct value copies and pass struct fields into boolean methods for synthesis-style checks.',
    reviewConcepts: ['Struct fields', 'boolean methods', 'value copy'],
  },
];

function ch1ChapterExamples(currentId) {
  return CH1_V1_LESSON_MAP.map(item => ({
    label: `Lesson ${item.order}`,
    source: item.source.replace('ch1/', '').replace('.md', ''),
    title: item.title,
    href: item.href,
    current: item.id === currentId,
    summary: item.learningTarget,
    tags: item.reviewConcepts.length ? item.reviewConcepts : ['foundation'],
  }));
}

function ch1Lines(lines) {
  return lines.map((line, index) => ({
    ...line,
    id: `line-${index + 1}`,
    text: line.text,
    translation: line.translation,
  }));
}

function ch1Lesson(config) {
  return {
    id: config.id,
    chapterId: 'ch1',
    source: config.source,
    stableUrl: `ch1/${config.id.replace(/^ch1-/, '')}`,
    order: config.order,
    title: config.title,
    kicker: 'Chapter 1',
    learningTarget: config.learningTarget,
    roadmap: {
      order: config.order,
      sourceAnchors: config.sourceAnchors || [config.source],
      reviewConcepts: config.reviewConcepts || [],
    },
    availableSyntax: ch1SyntaxUpTo(config.order),
    chapterNav: { chapters: CH1_V1_CHAPTERS },
    chapterExamples: ch1ChapterExamples(config.id),
    fullExample: {
      header: {
        chapterLabel: 'Chapter 1',
        exampleTitle: `Example: ${config.shortTitle || config.title}`,
        modeLabel: 'Full Walkthrough',
        instructions: 'Run the program line by line. Click any line for its translation; hover highlighted tokens for definitions.',
        programLabel: 'Program.cs',
        programNote: config.programNote || 'The active line is the most recent executed line. Future lines are dimmed.',
      },
      code: {
        lines: ch1Lines(config.lines),
        tokens: { ...CH1_V1_TOKEN_SPEC, ...(config.tokens || {}) },
      },
      states: config.states,
    },
    preQuiz: config.preQuiz,
    mainLesson: config.mainLesson,
    rigorousQuiz: config.rigorousQuiz,
    exercises: config.exercises,
  };
}

const CH1_REMAINING_LESSON_CONFIGS = [
  {
    id: 'ch1-compound-short-circuit',
    order: 3,
    source: 'ch1/ch1-2.md',
    title: 'Compound Conditions and Short-Circuiting',
    shortTitle: 'Compound Conditions',
    learningTarget: CH1_V1_LESSON_MAP[2].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[2].reviewConcepts,
    sourceAnchors: ['ch1/ch1-2.md', 'doc-16:Compound precedence and short-circuit evaluation'],
    lines: [
      { text: 'bool hasKey = true;', translation: 'Create hasKey and bind true.' },
      { text: 'bool knowsCode = false;', translation: 'Create knowsCode and bind false.' },
      { text: 'bool canEnter = hasKey || knowsCode;', translation: 'Evaluate OR. The left side is already true, so the result is true.' },
      { text: 'bool needsHelp = !hasKey && !knowsCode;', translation: 'Evaluate both NOT expressions, then combine them with AND.' },
      { text: 'Console.WriteLine(canEnter);', translation: 'Print the value stored in canEnter.' },
    ],
    states: [
      { label: 'Before execution', desc: 'No variables exist yet.', memory: [], console: [] },
      { label: 'After line 1', desc: 'hasKey stores true.', memory: [{ name: 'hasKey', type: 'bool', value: 'true' }], console: [] },
      { label: 'After line 2', desc: 'knowsCode stores false.', memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'knowsCode', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 3', desc: 'OR short-circuits after hasKey evaluates to true.', memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'knowsCode', type: 'bool', value: 'false' }, { name: 'canEnter', type: 'bool', value: 'true' }], console: [], evalDetail: { title: 'OR short-circuit', sourceLine: 'bool canEnter = hasKey || knowsCode;', steps: [{ label: 'Left', note: 'Evaluate hasKey first.' }, { label: 'Decide', note: 'OR is already true when the left operand is true.' }, { label: 'Bind', note: 'Bind true to canEnter without needing the right operand.' }], frames: [{ expression: 'bool canEnter = hasKey || knowsCode', showAt: 0, stack: [{ showAt: 0, span: [16, 22], label: 'var', value: 'true' }], strike: { showAt: 1, span: [16, 35] }, arrowAfter: { showAt: 1 } }, { expression: 'bool canEnter = true', showAt: 1 }], minCanvasWidth: 940 } },
      { label: 'After line 4', desc: '!hasKey is false, so AND produces false.', memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'knowsCode', type: 'bool', value: 'false' }, { name: 'canEnter', type: 'bool', value: 'true' }, { name: 'needsHelp', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 5', desc: 'The console prints true.', memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'knowsCode', type: 'bool', value: 'false' }, { name: 'canEnter', type: 'bool', value: 'true' }, { name: 'needsHelp', type: 'bool', value: 'false' }], console: ['true'] },
    ],
    preQuiz: {
      title: 'Predict Compound Conditions',
      prompt: 'Use the left-to-right rule and decide which side matters.',
      answers: { orResult: 'true', andResult: 'false', skip: 'right side skipped' },
      bank: ['true', 'false', 'right side skipped', 'both sides required'],
      prompts: [
        { slot: 'orResult', label: 'true || false', prompt: 'What does true || false evaluate to?', hint: 'OR needs at least one true.' },
        { slot: 'andResult', label: 'false && true', prompt: 'What does false && true evaluate to?', hint: 'AND needs both true.' },
        { slot: 'skip', label: 'Short-circuit', prompt: 'In true || something, what happens to something?', hint: 'The left side already decides OR.' },
      ],
    },
    mainLesson: {
      title: 'Grouping Decides What Gets Evaluated',
      label: 'Main Lesson',
      intro: 'Compound conditions are still expressions. The difference is that the result may depend on grouping and on whether the left operand already decides the operator.',
      acts: [
        { n: 1, title: 'OR can stop early', body: ['OR produces true when at least one operand is true.', 'If the left operand is true, the whole OR expression is already true.', 'That early stop is short-circuit evaluation.'], code: [{ text: 'bool canEnter = hasKey || knowsCode;', translation: 'Read hasKey first. If it is true, bind true.' }], memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'canEnter', type: 'bool', value: 'true' }] },
        { n: 2, title: 'Parentheses make the plan visible', body: ['Parentheses tell the reader which expression should be evaluated as a unit.', 'They matter most when a condition mixes !, &&, and ||.', 'A good trace writes the grouped subresult before moving on.'], code: [{ text: 'bool blocked = !(hasKey || knowsCode);', translation: 'Evaluate the grouped OR, then apply NOT.' }], memory: [{ name: 'hasKey', type: 'bool', value: 'true' }, { name: 'knowsCode', type: 'bool', value: 'false' }, { name: 'blocked', type: 'bool', value: 'false' }] },
      ],
    },
    rigorousQuiz: {
      title: 'Short-Circuit Transfer',
      prompt: 'Trace the branch-ready expression.',
      transferCode: { lines: [{ text: 'bool paid = false;' }, { text: 'bool hasPass = true;' }, { text: 'bool admitted = paid || hasPass;' }, { text: 'Console.WriteLine(admitted);' }] },
      columns: ['paid', 'hasPass', 'admitted'],
      stateRows: [{ after: 1, paid: 'false', hasPass: '-', admitted: '-' }, { after: 2, paid: 'false', hasPass: 'true', admitted: '-' }, { after: 3, paid: 'false', hasPass: 'true', admitted: 'true' }, { after: 4, paid: 'false', hasPass: 'true', admitted: 'true' }],
      translations: [{ id: 'A', text: 'Bind false to paid.' }, { id: 'B', text: 'Bind true to hasPass.' }, { id: 'C', text: 'Evaluate paid || hasPass and bind the OR result.' }, { id: 'D', text: 'Print admitted.' }],
      outputAnswers: { output: 'true', why: 'the right side of OR is true' },
      valueChoices: ['true', 'false', '-'],
      outputChoices: ['true', 'false', '(no output)'],
      reasonChoices: ['the right side of OR is true', 'paid changes to true', 'WriteLine flips the bool'],
    },
    exercises: {
      title: 'Compound Condition Practice',
      label: 'Exercises',
      intro: 'Practice writing grouped conditions and explaining short-circuit decisions.',
      items: [
        { number: 1, title: 'Badge or code', summary: 'Allow entry with either credential.', sample: 'badge || code', prompt: 'Write a program that stores badge and code booleans, computes allowed with ||, and prints allowed.', starter: ['bool badge = true;', 'bool code = false;', 'bool allowed = ___;', 'Console.WriteLine(allowed);'], constraints: ['Use || once.', 'Store the result before printing.'] },
        { number: 2, title: 'Not both missing', summary: 'Use parentheses with NOT.', sample: '!(badge || code)', prompt: 'Compute a bool named lockedOut that is true only when neither credential exists.', starter: ['bool badge = false;', 'bool code = false;', 'bool lockedOut = ___;'], constraints: ['Use parentheses.', 'Use ! exactly once.'] },
        { number: 3, title: 'Explain the skip', summary: 'Describe when OR short-circuits.', sample: 'true || expensiveCheck', prompt: 'Write a one-sentence explanation for why a right operand might not be evaluated.', constraints: ['Name the operator.', 'Name the left operand result.'] },
      ],
    },
  },
  {
    id: 'ch1-branching-scope',
    order: 4,
    source: 'ch1/ch1-3.md',
    title: 'Branching and Scope',
    learningTarget: CH1_V1_LESSON_MAP[3].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[3].reviewConcepts,
    sourceAnchors: ['ch1/ch1-3.md', 'doc-16:Conditional branch and scope'],
    lines: [
      { text: 'bool loggedIn = true;', translation: 'Bind true to loggedIn.' },
      { text: 'bool canEnter = false;', translation: 'Start canEnter as false outside the branch.' },
      { text: 'if (loggedIn) {', translation: 'Evaluate loggedIn. Because it is true, run the block.', scope: [{ text: 'canEnter = true;', translation: 'Write true into canEnter inside the block.' }], close: '}' },
      { text: 'Console.WriteLine(canEnter);', translation: 'Print the value visible after the branch.' },
    ],
    states: [
      { label: 'Before execution', desc: 'No variables exist yet.', memory: [], console: [] },
      { label: 'After line 1', desc: 'loggedIn is true.', memory: [{ name: 'loggedIn', type: 'bool', value: 'true' }], console: [] },
      { label: 'After line 2', desc: 'canEnter begins false outside the block.', memory: [{ name: 'loggedIn', type: 'bool', value: 'true' }, { name: 'canEnter', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 3', desc: 'The if condition is true, so the assignment inside the block runs.', memory: [{ name: 'loggedIn', type: 'bool', value: 'true' }, { name: 'canEnter', type: 'bool', value: 'true' }], console: [], evalDetail: { title: 'Choose the branch', sourceLine: 'if (loggedIn) { canEnter = true; }', steps: [{ label: 'Condition', note: 'Evaluate loggedIn.' }, { label: 'Decision', note: 'The condition is true, so the block runs.' }, { label: 'Write', note: 'The block writes true into canEnter.' }], frames: [{ expression: 'if (loggedIn)', showAt: 0, stack: [{ showAt: 0, span: [4, 12], label: 'var', value: 'true' }], strike: { showAt: 1, span: [4, 12] }, arrowAfter: { showAt: 1 } }, { expression: 'canEnter = true', showAt: 2 }], minCanvasWidth: 760 } },
      { label: 'After line 4', desc: 'The console prints true.', memory: [{ name: 'loggedIn', type: 'bool', value: 'true' }, { name: 'canEnter', type: 'bool', value: 'true' }], console: ['true'] },
    ],
    preQuiz: {
      title: 'Predict The Branch',
      prompt: 'Commit to the branch outcome before the explanation.',
      answers: { runs: 'yes', printed: 'true', visible: 'canEnter' },
      bank: ['yes', 'no', 'true', 'false', 'canEnter', 'temporary'],
      prompts: [
        { slot: 'runs', label: 'Condition', prompt: 'loggedIn is true. Does the if block run?', hint: 'if runs only on true.' },
        { slot: 'printed', label: 'Output', prompt: 'What will canEnter be when printed?', hint: 'The variable was declared outside the block.' },
        { slot: 'visible', label: 'Scope', prompt: 'Which variable is still visible after the block?', hint: 'Look for the declaration outside braces.' },
      ],
    },
    mainLesson: {
      title: 'A Branch Chooses Whether A Block Runs',
      label: 'Main Lesson',
      intro: 'An if statement evaluates a bool, then either runs or skips a block. Variables declared outside the block remain available afterward.',
      acts: [
        { n: 1, title: 'The guard is a bool expression', body: ['The condition inside parentheses is evaluated first.', 'The block runs only when that value is true.', 'Skipping a block means none of its assignments happen.'], code: [{ text: 'if (loggedIn) {', translation: 'Read loggedIn, then choose whether to run the block.', scope: [{ text: 'canEnter = true;', translation: 'This write happens only when the guard is true.' }], close: '}' }], memory: [{ name: 'loggedIn', type: 'bool', value: 'true' }, { name: 'canEnter', type: 'bool', value: 'true' }] },
        { n: 2, title: 'Declare state where you need it later', body: ['canEnter is declared before the branch because the program prints it after the branch.', 'A variable created only inside a block is local to that block.', 'The simplest beginner pattern is declare the result first, then update it in branches.'], code: [{ text: 'bool canEnter = false;', translation: 'Create the result before the branch.' }, { text: 'if (loggedIn) {', translation: 'Update the existing result inside the branch.', scope: [{ text: 'canEnter = true;', translation: 'Write the new value into the existing variable.' }], close: '}' }], memory: [{ name: 'canEnter', type: 'bool', value: 'true' }] },
      ],
    },
    rigorousQuiz: {
      title: 'Branch Trace',
      prompt: 'Trace a branch that does not run.',
      transferCode: { lines: [{ text: 'bool ready = false;' }, { text: 'bool showMessage = false;' }, { text: 'if (ready) {', scope: [{ text: 'showMessage = true;' }], close: '}' }, { text: 'Console.WriteLine(showMessage);' }] },
      columns: ['ready', 'showMessage'],
      stateRows: [{ after: 1, ready: 'false', showMessage: '-' }, { after: 2, ready: 'false', showMessage: 'false' }, { after: 3, ready: 'false', showMessage: 'false' }, { after: 4, ready: 'false', showMessage: 'false' }],
      translations: [{ id: 'A', text: 'Bind false to ready.' }, { id: 'B', text: 'Bind false to showMessage.' }, { id: 'C', text: 'Evaluate ready; skip the block because it is false.' }, { id: 'D', text: 'Print showMessage.' }],
      outputAnswers: { output: 'false', why: 'the if block is skipped' },
      valueChoices: ['true', 'false', '-'],
      outputChoices: ['true', 'false', '(no output)'],
      reasonChoices: ['the if block is skipped', 'the block always runs', 'WriteLine declares showMessage'],
    },
    exercises: {
      title: 'Branching Practice',
      label: 'Exercises',
      intro: 'Use branches to update existing state.',
      items: [
        { number: 1, title: 'Unlock flag', summary: 'Update one result from a condition.', sample: 'if (hasKey) { unlocked = true; }', prompt: 'Write a program that starts unlocked as false, then sets it true only when hasKey is true.', starter: ['bool hasKey = true;', 'bool unlocked = false;', 'if (___) { ___ = true; }'], constraints: ['Declare unlocked before the branch.', 'Print unlocked after the branch.'] },
        { number: 2, title: 'Skipped branch', summary: 'Show a false condition preserving state.', sample: 'if (ready) { sent = true; }', prompt: 'Create a branch that skips its block and explain why the result remains false.', constraints: ['Use one false condition.', 'Print the result variable.'] },
        { number: 3, title: 'Scope check', summary: 'Place declarations intentionally.', sample: 'bool result = false;', prompt: 'Rewrite a branch so the value printed after the branch was declared before the branch.', constraints: ['No variable printed after the branch may be declared only inside braces.'] },
      ],
    },
  },
  {
    id: 'ch1-ordered-branches-input',
    order: 5,
    source: 'ch1/ch1-3.md',
    title: 'Ordered Branches and Input',
    learningTarget: CH1_V1_LESSON_MAP[4].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[4].reviewConcepts,
    sourceAnchors: ['ch1/ch1-3.md', 'doc-16:Input and ordered conditional cases'],
    lines: [
      { text: 'string role = "guest";', translation: 'Store an input-like role value.' },
      { text: 'bool canEdit = false;', translation: 'Start the result as false.' },
      { text: 'if (role == "admin") {', translation: 'Check the first case. It fails for guest.', scope: [{ text: 'canEdit = true;', translation: 'This write is skipped because role is not admin.' }], close: '}' },
      { text: 'else if (role == "guest") {', translation: 'Check the next case only because the first case failed.', scope: [{ text: 'canEdit = false;', translation: 'This write runs for the guest case.' }], close: '}' },
      { text: 'Console.WriteLine(canEdit);', translation: 'Print the final result.' },
    ],
    states: [
      { label: 'Before execution', desc: 'No variables exist yet.', memory: [], console: [] },
      { label: 'After line 1', desc: 'role stores guest.', memory: [{ name: 'role', type: 'string', value: '"guest"' }], console: [] },
      { label: 'After line 2', desc: 'canEdit starts false.', memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 3', desc: 'role is not admin, so the first block does not run.', memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 4', desc: 'role is guest, so the else-if case runs and leaves canEdit false.', memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 5', desc: 'The console prints false.', memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }], console: ['false'] },
    ],
    preQuiz: { title: 'Choose The First Matching Case', prompt: 'Ordered branches stop after one matching case.', answers: { first: 'skips', second: 'runs', output: 'false' }, bank: ['runs', 'skips', 'true', 'false'], prompts: [{ slot: 'first', label: 'admin case', prompt: 'role is guest. What happens to the admin branch?', hint: 'Compare role to admin.' }, { slot: 'second', label: 'guest case', prompt: 'What happens to the guest branch?', hint: 'This case is checked after admin fails.' }, { slot: 'output', label: 'output', prompt: 'What value is printed?', hint: 'canEdit starts false and remains false.' }] },
    mainLesson: { title: 'Order Makes Cases Exclusive', label: 'Main Lesson', intro: 'An if/else-if chain checks cases in order. Once one branch runs, later cases are skipped.', acts: [{ n: 1, title: 'Input is just stored data in the trace', body: ['The prototype uses a string literal to stand in for input.', 'The branch logic does not care where the stored value came from.', 'Trace the value before evaluating each condition.'], code: [{ text: 'string role = "guest";', translation: 'Store the input-like value.' }, { text: 'if (role == "admin") {', translation: 'Compare the stored value to admin.', scope: [{ text: 'canEdit = true;', translation: 'This body line is skipped for guest.' }], close: '}' }], memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }] }, { n: 2, title: 'Only one branch in the chain runs', body: ['else-if means check this only if earlier conditions were false.', 'else is the final fallback.', 'Use this shape when cases should be mutually exclusive.'], code: [{ text: 'else if (role == "guest") {', translation: 'Check guest after admin fails.', scope: [{ text: 'canEdit = false;', translation: 'This body line runs for the guest case.' }], close: '}' }], memory: [{ name: 'role', type: 'string', value: '"guest"' }, { name: 'canEdit', type: 'bool', value: 'false' }] }] },
    rigorousQuiz: { title: 'Ordered Case Transfer', prompt: 'Trace the selected branch.', transferCode: { lines: [{ text: 'string state = "open";' }, { text: 'bool alarm = true;' }, { text: 'if (state == "closed") {', scope: [{ text: 'alarm = false;' }], close: '}' }, { text: 'else if (state == "open") {', scope: [{ text: 'alarm = true;' }], close: '}' }, { text: 'Console.WriteLine(alarm);' }] }, columns: ['state', 'alarm'], stateRows: [{ after: 1, state: '"open"', alarm: '-' }, { after: 2, state: '"open"', alarm: 'true' }, { after: 3, state: '"open"', alarm: 'true' }, { after: 4, state: '"open"', alarm: 'true' }, { after: 5, state: '"open"', alarm: 'true' }], translations: [{ id: 'A', text: 'Store the state text.' }, { id: 'B', text: 'Start alarm as true.' }, { id: 'C', text: 'Skip the closed case.' }, { id: 'D', text: 'Run the open case.' }, { id: 'E', text: 'Print alarm.' }], outputAnswers: { output: 'true', why: 'the open else-if branch runs' }, valueChoices: ['true', 'false', '-', '"open"'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['the open else-if branch runs', 'the closed branch runs first', 'no branch is checked'] },
    exercises: { title: 'Ordered Branch Practice', label: 'Exercises', intro: 'Model simple input-like categories with ordered cases.', items: [{ number: 1, title: 'Role cases', summary: 'Choose access from a role.', sample: 'admin -> true', prompt: 'Write an if/else-if chain that sets canEdit from a role string.', starter: ['string role = "admin";', 'bool canEdit = false;', 'if (role == "admin") { ___ }'], constraints: ['Include admin and guest cases.', 'Print canEdit.'] }, { number: 2, title: 'Fallback branch', summary: 'Use else for unknown input.', sample: 'else { allowed = false; }', prompt: 'Add a fallback branch for any unrecognized role.', constraints: ['Use exactly one else.', 'Leave the result false for unknown input.'] }, { number: 3, title: 'Order explanation', summary: 'Explain why earlier cases matter.', sample: 'first matching branch wins', prompt: 'Write a short explanation for why a broad case should usually come after a more specific case.', constraints: ['Mention order.', 'Mention skipped later branches.'] }] },
  },
  {
    id: 'ch1-while-progress',
    order: 6,
    source: 'ch1/ch1-3.md',
    title: 'While Loops and Progress',
    learningTarget: CH1_V1_LESSON_MAP[5].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[5].reviewConcepts,
    sourceAnchors: ['ch1/ch1-3.md', 'doc-16:While loops and progress'],
    lines: [
      { text: 'bool done = false;', translation: 'Create the loop guard and start it false.' },
      { text: 'bool triedOnce = false;', translation: 'Track whether the loop body has run.' },
      { text: 'while (!done) {', translation: 'Check !done before deciding whether the body runs.', state: { label: 'Line 3 guard', desc: '!done evaluates to true, so execution enters the loop body. No body assignment has run yet.', memory: [{ name: 'done', type: 'bool', value: 'false' }, { name: 'triedOnce', type: 'bool', value: 'false' }], console: [], evalDetail: { title: 'Evaluate the loop guard', sourceLine: 'while (!done) {', steps: [{ label: 'Lookup', note: 'Read done from memory before running the body.' }, { label: 'Not', note: '!false evaluates to true.' }, { label: 'Decision', note: 'Because the guard is true, the next executed line is the first body line.' }], frames: [{ expression: 'while (!done)', showAt: 0, stack: [{ showAt: 0, span: [8, 12], label: 'var', value: 'false' }], strike: { showAt: 1, span: [7, 12] }, arrowAfter: { showAt: 1 } }, { expression: 'while (true)', showAt: 1 }, { expression: 'enter the loop body', showAt: 2 }], minCanvasWidth: 720 } }, scope: [{ text: 'triedOnce = true;', translation: 'Record that the loop body ran once.', state: { label: 'After line 3.1', desc: 'triedOnce changes to true. done is still false until the progress line runs.', memory: [{ name: 'done', type: 'bool', value: 'false' }, { name: 'triedOnce', type: 'bool', value: 'true' }], console: [], evalDetail: { title: 'Write the body marker', sourceLine: 'triedOnce = true;', steps: [{ label: 'Right side', note: 'Evaluate the literal true.' }, { label: 'Write', note: 'Store true in triedOnce.' }], frames: [{ expression: 'triedOnce = true', showAt: 0 }, { expression: 'triedOnce stores true', showAt: 1 }], minCanvasWidth: 620 } } }, { text: 'done = true;', translation: 'Update the guard variable so the next check can stop.', state: { label: 'After line 3.2', desc: 'done changes to true. The next guard check would now stop the loop.', memory: [{ name: 'done', type: 'bool', value: 'true' }, { name: 'triedOnce', type: 'bool', value: 'true' }], console: [], evalDetail: { title: 'Write the progress update', sourceLine: 'done = true;', steps: [{ label: 'Right side', note: 'Evaluate the literal true.' }, { label: 'Write', note: 'Store true in done.' }, { label: 'Future guard', note: 'On the next check, !done is !true, which is false.' }], frames: [{ expression: 'done = true', showAt: 0 }, { expression: 'done stores true', showAt: 1 }, { expression: 'next guard: !true -> false', showAt: 2 }], minCanvasWidth: 720 } } }], close: '}' },
      { text: 'Console.WriteLine(triedOnce);', translation: 'Print whether the body ran.' },
    ],
    states: [
      { label: 'Before execution', desc: 'No variables exist yet.', memory: [], console: [] },
      { label: 'After line 1', desc: 'done starts false.', memory: [{ name: 'done', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 2', desc: 'triedOnce starts false.', memory: [{ name: 'done', type: 'bool', value: 'false' }, { name: 'triedOnce', type: 'bool', value: 'false' }], console: [] },
      { label: 'After line 3.2', desc: 'The loop body has run once and changed done to true.', memory: [{ name: 'done', type: 'bool', value: 'true' }, { name: 'triedOnce', type: 'bool', value: 'true' }], console: [] },
      { label: 'After line 4', desc: 'The console prints true.', memory: [{ name: 'done', type: 'bool', value: 'true' }, { name: 'triedOnce', type: 'bool', value: 'true' }], console: ['true'] },
    ],
    preQuiz: { title: 'Loop Guard Prediction', prompt: 'A while loop checks its guard before each pass.', answers: { first: 'runs', progress: 'done', output: 'true' }, bank: ['runs', 'skips', 'done', 'triedOnce', 'true', 'false'], prompts: [{ slot: 'first', label: 'first check', prompt: 'done is false. Does while (!done) run once?', hint: '!false is true.' }, { slot: 'progress', label: 'progress', prompt: 'Which variable must change so the loop can stop?', hint: 'Look at the guard.' }, { slot: 'output', label: 'output', prompt: 'What does triedOnce print?', hint: 'The body ran once.' }] },
    mainLesson: { title: 'A Loop Needs A Changing Guard', label: 'Main Lesson', intro: 'while repeats a block, but only after checking the guard. A trace must show both the guard value and the state update that changes future checks.', acts: [{ n: 1, title: 'Check before running', body: ['The guard expression is evaluated before the body runs.', 'If the guard is false immediately, the body runs zero times.', 'This makes while different from just repeating a block by hand.'], code: [{ text: 'while (!done) {', translation: 'Check !done before the body.', scope: [{ text: 'triedOnce = true;', translation: 'This body line runs only if the guard is true.' }], close: '}' }], memory: [{ name: 'done', type: 'bool', value: 'false' }, { name: 'triedOnce', type: 'bool', value: 'true' }] }, { n: 2, title: 'Progress changes a future check', body: ['A loop that never changes its guard can run forever.', 'The progress update writes to state used by the guard.', 'Here, done becomes true so !done becomes false next time.'], code: [{ text: 'while (!done) {', translation: 'The guard is checked before each pass.', scope: [{ text: 'triedOnce = true;', translation: 'Record that the body ran.' }, { text: 'done = true;', translation: 'Change the guard variable for the next check.' }], close: '}' }], memory: [{ name: 'done', type: 'bool', value: 'true' }, { name: 'triedOnce', type: 'bool', value: 'true' }] }] },
    rigorousQuiz: { title: 'Loop Trace', prompt: 'Trace one loop pass.', transferCode: { lines: [{ text: 'bool waiting = true;' }, { text: 'bool rang = false;' }, { text: 'while (waiting) {', scope: [{ text: 'rang = true;' }, { text: 'waiting = false;' }], close: '}' }, { text: 'Console.WriteLine(rang);' }] }, columns: ['waiting', 'rang'], stateRows: [{ after: 1, waiting: 'true', rang: '-' }, { after: 2, waiting: 'true', rang: 'false' }, { after: 3, waiting: 'false', rang: 'true' }, { after: 4, waiting: 'false', rang: 'true' }], translations: [{ id: 'A', text: 'Start waiting as true.' }, { id: 'B', text: 'Start rang as false.' }, { id: 'C', text: 'Run the loop once and update waiting to false.' }, { id: 'D', text: 'Print rang.' }], outputAnswers: { output: 'true', why: 'the body runs once before waiting becomes false' }, valueChoices: ['true', 'false', '-'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['the body runs once before waiting becomes false', 'the body never runs', 'Console.WriteLine changes waiting'] },
    exercises: { title: 'Loop Progress Practice', label: 'Exercises', intro: 'Write loops whose guards can eventually become false.', items: [{ number: 1, title: 'One-pass loop', summary: 'Run once and stop.', sample: 'while (waiting) { waiting = false; }', prompt: 'Write a loop that starts active as true, writes seen to true, then sets active to false.', starter: ['bool active = true;', 'bool seen = false;', 'while (___) { ___; ___; }'], constraints: ['The guard must use active.', 'The body must update active.'] }, { number: 2, title: 'Zero-pass loop', summary: 'Show a loop that skips.', sample: 'bool active = false;', prompt: 'Write a trace where the while body never runs because the guard starts false.', constraints: ['Include the final output.', 'Explain why the body skipped.'] }, { number: 3, title: 'Find the progress update', summary: 'Identify the line that stops the loop.', sample: 'done = true;', prompt: 'Given a short loop, mark which assignment changes the guard for the next pass.', constraints: ['Name the guard variable.', 'Name the updated value.'] }] },
  },
  {
    id: 'ch1-boolean-methods-return',
    order: 7,
    source: 'ch1/ch1-4.md',
    title: 'Boolean Methods and Return Values',
    learningTarget: CH1_V1_LESSON_MAP[6].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[6].reviewConcepts,
    sourceAnchors: ['ch1/ch1-4.md', 'doc-16:Value-returning methods'],
    lines: [
      { text: 'bool IsOpen(bool locked) {', translation: 'Define a method that returns a bool.', scope: [{ text: 'return !locked;', translation: 'Evaluate !locked and return that bool to the caller.' }], close: '}' },
      { text: 'bool locked = true;', translation: 'Store true in locked.' },
      { text: 'bool open = IsOpen(locked);', translation: 'Evaluate the argument, call IsOpen, and bind the returned bool.' },
      { text: 'Console.WriteLine(open);', translation: 'Print the returned value stored in open.' },
    ],
    states: [
      { label: 'Before execution', desc: 'No names exist yet.', memory: [], console: [] },
      { label: 'After line 1', desc: 'The method name IsOpen is available for calls.', memory: [{ name: 'IsOpen', type: 'method', value: 'bool(bool)' }], console: [] },
      { label: 'After line 2', desc: 'locked stores true.', memory: [{ name: 'IsOpen', type: 'method', value: 'bool(bool)' }, { name: 'locked', type: 'bool', value: 'true' }], console: [] },
      { label: 'After line 3', desc: 'IsOpen receives true, returns false, and open stores false.', memory: [{ name: 'IsOpen', type: 'method', value: 'bool(bool)' }, { name: 'locked', type: 'bool', value: 'true' }, { name: 'open', type: 'bool', value: 'false' }], console: [], evalDetail: { title: 'Call and return a bool', sourceLine: 'bool open = IsOpen(locked);', steps: [{ label: 'Argument', note: 'Evaluate locked before the call.' }, { label: 'Parameter', note: 'The method receives true as locked.' }, { label: 'Return', note: 'return !locked evaluates to false.' }, { label: 'Bind', note: 'Bind the returned value to open.' }], frames: [{ expression: 'bool open = IsOpen(locked)', showAt: 0, stack: [{ showAt: 0, span: [19, 25], label: 'arg', value: 'true' }], strike: { showAt: 1, span: [19, 25] }, arrowAfter: { showAt: 1 } }, { expression: 'return !true -> false', showAt: 2 }, { expression: 'bool open = false', showAt: 3 }], minCanvasWidth: 900 } },
      { label: 'After line 4', desc: 'The console prints false.', memory: [{ name: 'IsOpen', type: 'method', value: 'bool(bool)' }, { name: 'locked', type: 'bool', value: 'true' }, { name: 'open', type: 'bool', value: 'false' }], console: ['false'] },
    ],
    preQuiz: { title: 'Method Return Prediction', prompt: 'A value-returning method can be used on the right side of assignment.', answers: { arg: 'true', returned: 'false', printed: 'false' }, bank: ['true', 'false', 'locked', 'open'], prompts: [{ slot: 'arg', label: 'argument', prompt: 'What value is passed into IsOpen(locked)?', hint: 'Read locked before the call.' }, { slot: 'returned', label: 'return', prompt: 'What does return !locked produce?', hint: 'The parameter value is true.' }, { slot: 'printed', label: 'output', prompt: 'What does open print?', hint: 'open stores the returned value.' }] },
    mainLesson: { title: 'A Returned Bool Becomes A Value', label: 'Main Lesson', intro: 'A boolean method packages an expression behind a name. Calling it still follows the same evaluate-then-bind rule.', acts: [{ n: 1, title: 'Arguments are evaluated first', body: ['The caller evaluates each argument before the method starts.', 'The parameter receives that value.', 'Inside the method, the parameter is just a local name for the passed value.'], code: [{ text: 'bool open = IsOpen(locked);', translation: 'Read locked, then call IsOpen.' }], memory: [{ name: 'locked', type: 'bool', value: 'true' }, { name: 'open', type: 'bool', value: 'false' }] }, { n: 2, title: 'return sends back one value', body: ['A bool method must return a bool.', 'The returned value replaces the call expression.', 'The assignment then binds that returned value.'], code: [{ text: 'bool IsOpen(bool locked) {', translation: 'The method header declares the return type, name, and parameter.', scope: [{ text: 'return !locked;', translation: 'The returned expression is the method result.' }], close: '}' }], memory: [{ name: 'IsOpen', type: 'method', value: 'bool(bool)' }] }] },
    rigorousQuiz: { title: 'Write A Boolean Method Call', prompt: 'Trace the method and fill in a reusable method definition.', transferCode: { lines: [{ text: 'bool HasAccess(bool badge) {', scope: [{ text: 'return badge;' }], close: '}' }, { text: 'bool badge = true;' }, { text: 'bool allowed = HasAccess(badge);' }, { text: 'Console.WriteLine(allowed);' }] }, columns: ['badge', 'allowed'], stateRows: [{ after: 1, badge: '-', allowed: '-' }, { after: 2, badge: 'true', allowed: '-' }, { after: 3, badge: 'true', allowed: 'true' }, { after: 4, badge: 'true', allowed: 'true' }], translations: [{ id: 'A', text: 'Define a method that returns its badge parameter.' }, { id: 'B', text: 'Bind true to badge.' }, { id: 'C', text: 'Call HasAccess and bind the returned bool.' }, { id: 'D', text: 'Print allowed.' }], outputAnswers: { output: 'true', why: 'the method returns the argument value' }, valueChoices: ['true', 'false', '-'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['the method returns the argument value', 'void methods return true', 'the argument is ignored'], fillInCode: { id: 'access-method', title: 'Structured Code Blank', prompt: 'Complete a bool method that returns true only when a door is not locked.', correctAnswers: { returnType: 'bool', methodName: 'IsOpen', parameterType: 'bool', returnKeyword: 'return', expression: '!locked' }, bank: ['bool', 'void', 'IsOpen', 'PrintAccess', 'return', '!locked', 'locked'], feedback: { success: 'The method returns a bool computed from the parameter.', retry: 'Check the return type, method name, parameter type, and returned expression.' }, lines: [[{ blank: 'returnType' }, ' ', { blank: 'methodName' }, '(', { blank: 'parameterType' }, ' locked) {'], ['  ', { blank: 'returnKeyword' }, ' ', { blank: 'expression' }, ';'], ['}']] } },
    exercises: { title: 'Boolean Method Practice', label: 'Exercises', intro: 'Write methods that return bool values and use them in assignments.', items: [{ number: 1, title: 'Not locked', summary: 'Return the opposite of a parameter.', sample: 'return !locked;', prompt: 'Write a bool method IsOpen that takes locked and returns !locked.', starter: ['bool IsOpen(bool locked) {', '  return ___;', '}'], constraints: ['The return type must be bool.', 'Use the parameter in the return expression.'] }, { number: 2, title: 'Badge access', summary: 'Return a stored argument.', sample: 'return hasBadge;', prompt: 'Write HasAccess so it returns the value of hasBadge.', constraints: ['Call the method once.', 'Bind the returned value before printing.'] }, { number: 3, title: 'Explain replacement', summary: 'Describe a method call as a value.', sample: 'IsOpen(locked) -> false', prompt: 'Explain how a method call on the right side becomes a value before assignment.', constraints: ['Mention argument evaluation.', 'Mention return.'] }] },
  },
];

const CH1_EXTRA_CONFIGS = [
  {
    id: 'ch1-void-methods-operations',
    order: 8,
    source: 'ch1/ch1-4.md',
    title: 'Void Methods and Built Boolean Operations',
    learningTarget: CH1_V1_LESSON_MAP[7].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[7].reviewConcepts,
    lines: [{ text: 'void PrintAccess(bool allowed) {', translation: 'Define a method that prints its argument and returns no value.', scope: [{ text: 'Console.WriteLine(allowed);', translation: 'Print the evaluated parameter inside the method body.' }], close: '}' }, { text: 'bool hasBadge = true;', translation: 'Store true in hasBadge.' }, { text: 'bool hasPin = false;', translation: 'Store false in hasPin.' }, { text: 'bool allowed = hasBadge && hasPin;', translation: 'AND the two booleans and bind the result.' }, { text: 'PrintAccess(allowed);', translation: 'Call the void method for its output action.' }],
    states: [{ label: 'Before execution', desc: 'No names exist yet.', memory: [], console: [] }, { label: 'After line 1', desc: 'PrintAccess is available.', memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }], console: [] }, { label: 'After line 2', desc: 'hasBadge is true.', memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }, { name: 'hasBadge', type: 'bool', value: 'true' }], console: [] }, { label: 'After line 3', desc: 'hasPin is false.', memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }, { name: 'hasBadge', type: 'bool', value: 'true' }, { name: 'hasPin', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 4', desc: 'AND produces false.', memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }, { name: 'hasBadge', type: 'bool', value: 'true' }, { name: 'hasPin', type: 'bool', value: 'false' }, { name: 'allowed', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 5', desc: 'The method prints false and returns no value.', memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }, { name: 'hasBadge', type: 'bool', value: 'true' }, { name: 'hasPin', type: 'bool', value: 'false' }, { name: 'allowed', type: 'bool', value: 'false' }], console: ['false'] }],
    preQuiz: { title: 'Return Or Action', prompt: 'Separate computed bool values from output actions.', answers: { allowed: 'false', method: 'void action', printed: 'false' }, bank: ['true', 'false', 'void action', 'returned bool'], prompts: [{ slot: 'allowed', label: 'AND result', prompt: 'What does true && false produce?', hint: 'AND needs both true.' }, { slot: 'method', label: 'PrintAccess', prompt: 'What kind of method is PrintAccess?', hint: 'Its return type is void.' }, { slot: 'printed', label: 'output', prompt: 'What value is printed?', hint: 'The method prints its argument.' }] },
    mainLesson: { title: 'Void Methods Do Work Instead Of Returning Values', label: 'Main Lesson', intro: 'A void method can still receive evaluated arguments. The difference is that the call is used as a statement, not as a value in an assignment.', acts: [{ n: 1, title: 'Compute before the action', body: ['allowed is computed with && before the method call.', 'The method receives a finished bool value.', 'The output action happens inside the void method.'], code: [{ text: 'bool allowed = hasBadge && hasPin;', translation: 'Compute the bool first.' }, { text: 'PrintAccess(allowed);', translation: 'Pass the computed bool to an output method.' }], memory: [{ name: 'allowed', type: 'bool', value: 'false' }] }, { n: 2, title: 'void is not a value', body: ['A void method cannot be assigned into a bool variable.', 'Use a bool method when the caller needs a value.', 'Use a void method when the caller needs an action such as printing.'], code: [{ text: 'void PrintAccess(bool allowed) {', translation: 'This method performs output and returns no value.', scope: [{ text: 'Console.WriteLine(allowed);', translation: 'The body performs the output action.' }], close: '}' }], memory: [{ name: 'PrintAccess', type: 'method', value: 'void(bool)' }] }] },
    rigorousQuiz: { title: 'Void Method Transfer', prompt: 'Trace an action method.', transferCode: { lines: [{ text: 'void PrintReady(bool ready) {', scope: [{ text: 'Console.WriteLine(ready);' }], close: '}' }, { text: 'bool pluggedIn = true;' }, { text: 'bool charged = true;' }, { text: 'bool ready = pluggedIn && charged;' }, { text: 'PrintReady(ready);' }] }, columns: ['pluggedIn', 'charged', 'ready'], stateRows: [{ after: 1, pluggedIn: '-', charged: '-', ready: '-' }, { after: 2, pluggedIn: 'true', charged: '-', ready: '-' }, { after: 3, pluggedIn: 'true', charged: 'true', ready: '-' }, { after: 4, pluggedIn: 'true', charged: 'true', ready: 'true' }, { after: 5, pluggedIn: 'true', charged: 'true', ready: 'true' }], translations: [{ id: 'A', text: 'Define a void output method.' }, { id: 'B', text: 'Bind true to pluggedIn.' }, { id: 'C', text: 'Bind true to charged.' }, { id: 'D', text: 'AND both inputs and bind ready.' }, { id: 'E', text: 'Print ready through the void method.' }], outputAnswers: { output: 'true', why: 'the void method prints its evaluated argument' }, valueChoices: ['true', 'false', '-'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['the void method prints its evaluated argument', 'void returns true', 'charged is skipped'] },
    exercises: { title: 'Void Method Practice', label: 'Exercises', intro: 'Use void methods for repeated output actions.', items: [{ number: 1, title: 'Print one flag', summary: 'Wrap WriteLine in a method.', sample: 'void PrintFlag(bool flag)', prompt: 'Write a void method that prints a bool parameter and call it once.', starter: ['void PrintFlag(bool flag) {', '  ___', '}'], constraints: ['Return type must be void.', 'Use Console.WriteLine inside the method.'] }, { number: 2, title: 'Compute then print', summary: 'Keep computation outside the void method.', sample: 'bool ready = a && b;', prompt: 'Compute ready from two booleans, then pass ready to a void print method.', constraints: ['Store ready before the call.', 'Do not assign the void call to a variable.'] }, { number: 3, title: 'Choose method type', summary: 'Decide bool versus void.', sample: 'needs a value -> bool', prompt: 'For three short scenarios, label whether the method should return bool or be void.', constraints: ['Explain each label in one sentence.'] }] },
  },
  {
    id: 'ch1-struct-basics-fields',
    order: 9,
    source: 'ch1/ch1-5.md',
    title: 'Struct Basics and Fields',
    learningTarget: CH1_V1_LESSON_MAP[8].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[8].reviewConcepts,
    lines: [{ text: 'struct Door {', translation: 'Start the Door struct definition.', scope: [{ text: 'public bool Open;', translation: 'Define the Open field as a bool inside Door.' }, { text: 'public bool Locked;', translation: 'Define the Locked field as a bool inside Door.' }], close: { text: '}', translation: 'Close the Door struct body.' } }, { text: 'Door front = new Door();', translation: 'Create a new Door value named front.' }, { text: 'front.Open = true;', translation: 'Write true into the Open field.' }, { text: 'front.Locked = false;', translation: 'Write false into the Locked field.' }, { text: 'Console.WriteLine(front.Open);', translation: 'Read the Open field and print it.' }],
    states: [{ label: 'Before execution', desc: 'No struct type or values exist yet.', memory: [], console: [] }, { label: 'After line 1', desc: 'Door is a type with Open and Locked fields.', memory: [{ name: 'Door', type: 'struct', value: 'Open, Locked' }], console: [] }, { label: 'After line 2', desc: 'front is a Door value with default boolean fields.', memory: [{ name: 'Door', type: 'struct', value: 'Open, Locked' }, { name: 'front.Open', type: 'bool', value: 'false' }, { name: 'front.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 3', desc: 'front.Open is true.', memory: [{ name: 'front.Open', type: 'bool', value: 'true' }, { name: 'front.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 4', desc: 'front.Locked remains false explicitly.', memory: [{ name: 'front.Open', type: 'bool', value: 'true' }, { name: 'front.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 5', desc: 'The console prints the Open field value.', memory: [{ name: 'front.Open', type: 'bool', value: 'true' }, { name: 'front.Locked', type: 'bool', value: 'false' }], console: ['true'] }],
    preQuiz: { title: 'Field Prediction', prompt: 'A field is a named value inside a struct value.', answers: { open: 'true', locked: 'false', printed: 'true' }, bank: ['true', 'false', 'front', 'Door'], prompts: [{ slot: 'open', label: 'Open field', prompt: 'After front.Open = true, what does front.Open store?', hint: 'Dot notation selects the field.' }, { slot: 'locked', label: 'Locked field', prompt: 'What does front.Locked store?', hint: 'Look at line 4.' }, { slot: 'printed', label: 'output', prompt: 'What value prints?', hint: 'The program prints front.Open.' }] },
    mainLesson: { title: 'A Struct Groups Related Fields', label: 'Main Lesson', intro: 'A struct lets one value carry multiple named fields. Dot notation reads or writes one field at a time.', acts: [{ n: 1, title: 'The type defines the fields', body: ['The struct declaration lists the fields every Door value has.', 'Each field has its own type.', 'A Door value groups those fields under one variable name.'], code: [{ text: 'struct Door {', translation: 'Start a struct type named Door.', scope: [{ text: 'public bool Open;', translation: 'Add a bool field named Open to the Door scope.' }, { text: 'public bool Locked;', translation: 'Add a bool field named Locked to the Door scope.' }], close: { text: '}', translation: 'Close the Door struct definition.' } }], memory: [{ name: 'Door', type: 'struct', value: 'Open, Locked' }] }, { n: 2, title: 'Dot notation selects one field', body: ['front.Open names the Open field inside front.', 'Writing one field does not rewrite every field.', 'Reading a field produces the value stored in that field.'], code: [{ text: 'front.Open = true;', translation: 'Write one field.' }, { text: 'Console.WriteLine(front.Open);', translation: 'Read that field.' }], memory: [{ name: 'front.Open', type: 'bool', value: 'true' }, { name: 'front.Locked', type: 'bool', value: 'false' }] }] },
    rigorousQuiz: { title: 'Struct Field Transfer', prompt: 'Trace field writes.', transferCode: { lines: [{ text: 'struct Switch {', scope: [{ text: 'public bool On;' }, { text: 'public bool Broken;' }], close: '}' }, { text: 'Switch lamp = new Switch();' }, { text: 'lamp.On = true;' }, { text: 'lamp.Broken = false;' }, { text: 'Console.WriteLine(lamp.On);' }] }, columns: ['lamp.On', 'lamp.Broken'], stateRows: [{ after: 1, 'lamp.On': '-', 'lamp.Broken': '-' }, { after: 2, 'lamp.On': 'false', 'lamp.Broken': 'false' }, { after: 3, 'lamp.On': 'true', 'lamp.Broken': 'false' }, { after: 4, 'lamp.On': 'true', 'lamp.Broken': 'false' }, { after: 5, 'lamp.On': 'true', 'lamp.Broken': 'false' }], translations: [{ id: 'A', text: 'Define a struct type.' }, { id: 'B', text: 'Create a new struct value.' }, { id: 'C', text: 'Write true into the On field.' }, { id: 'D', text: 'Write false into the Broken field.' }, { id: 'E', text: 'Print the On field.' }], outputAnswers: { output: 'true', why: 'lamp.On stores true' }, valueChoices: ['true', 'false', '-'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['lamp.On stores true', 'lamp.Broken prints instead', 'new Switch prints true'] },
    exercises: { title: 'Struct Field Practice', label: 'Exercises', intro: 'Create small structs with boolean fields and trace field writes.', items: [{ number: 1, title: 'Door fields', summary: 'Define and write fields.', sample: 'door.Open = true;', prompt: 'Define a Door struct with Open and Locked fields, create one Door, and print Open.', starter: ['struct Door { public bool ___; public bool ___; }'], constraints: ['Use two bool fields.', 'Use dot notation for field writes.'] }, { number: 2, title: 'Independent fields', summary: 'Show that fields change separately.', sample: 'front.Locked = true;', prompt: 'Write a trace where one field changes and the other stays the same.', constraints: ['Include a state table.', 'Print the unchanged field.'] }, { number: 3, title: 'Name the field', summary: 'Translate dot notation.', sample: 'front.Open means Open inside front', prompt: 'Translate three field read/write lines into English.', constraints: ['Mention the struct variable.', 'Mention the field name.'] }] },
  },
  {
    id: 'ch1-struct-copy-methods',
    order: 10,
    source: 'ch1/ch1-5.md',
    title: 'Struct Copy and Methods Over Structs',
    learningTarget: CH1_V1_LESSON_MAP[9].learningTarget,
    reviewConcepts: CH1_V1_LESSON_MAP[9].reviewConcepts,
    lines: [{ text: 'Door first = new Door();', translation: 'Create a Door value named first.' }, { text: 'first.Open = true;', translation: 'Set first.Open to true.' }, { text: 'Door copy = first;', translation: 'Copy the current field values from first into copy.' }, { text: 'first.Open = false;', translation: 'Change first.Open after the copy.' }, { text: 'Console.WriteLine(copy.Open);', translation: 'Print the copied field value.' }],
    states: [{ label: 'Before execution', desc: 'Door is available from the previous lesson.', memory: [{ name: 'Door', type: 'struct', value: 'Open, Locked' }], console: [] }, { label: 'After line 1', desc: 'first has default field values.', memory: [{ name: 'first.Open', type: 'bool', value: 'false' }, { name: 'first.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 2', desc: 'first.Open is true.', memory: [{ name: 'first.Open', type: 'bool', value: 'true' }, { name: 'first.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 3', desc: 'copy receives the current field values from first.', memory: [{ name: 'first.Open', type: 'bool', value: 'true' }, { name: 'first.Locked', type: 'bool', value: 'false' }, { name: 'copy.Open', type: 'bool', value: 'true' }, { name: 'copy.Locked', type: 'bool', value: 'false' }], console: [], evalDetail: { title: 'Struct value copy', sourceLine: 'Door copy = first;', steps: [{ label: 'Read', note: 'Read the current fields of first.' }, { label: 'Copy', note: 'Create copy with the same field values.' }, { label: 'Separate', note: 'Later writes to first do not rewrite copy.' }], frames: [{ expression: 'Door copy = first', showAt: 0, stack: [{ showAt: 0, span: [12, 17], label: 'fields', value: 'Open=true' }], strike: { showAt: 1, span: [12, 17] }, arrowAfter: { showAt: 1 } }, { expression: 'copy.Open = true; copy.Locked = false', showAt: 1 }], minCanvasWidth: 920 } }, { label: 'After line 4', desc: 'first changes, but copy stays true.', memory: [{ name: 'first.Open', type: 'bool', value: 'false' }, { name: 'first.Locked', type: 'bool', value: 'false' }, { name: 'copy.Open', type: 'bool', value: 'true' }, { name: 'copy.Locked', type: 'bool', value: 'false' }], console: [] }, { label: 'After line 5', desc: 'The console prints the copied true value.', memory: [{ name: 'first.Open', type: 'bool', value: 'false' }, { name: 'first.Locked', type: 'bool', value: 'false' }, { name: 'copy.Open', type: 'bool', value: 'true' }, { name: 'copy.Locked', type: 'bool', value: 'false' }], console: ['true'] }],
    preQuiz: { title: 'Struct Copy Prediction', prompt: 'A struct copy receives field values at the moment of copying.', answers: { copied: 'true', firstLater: 'false', output: 'true' }, bank: ['true', 'false', 'same storage', 'separate copy'], prompts: [{ slot: 'copied', label: 'copy.Open', prompt: 'What value does copy.Open receive when first.Open is true?', hint: 'Copy happens before first changes.' }, { slot: 'firstLater', label: 'first.Open', prompt: 'What is first.Open after line 4?', hint: 'Line 4 writes to first.' }, { slot: 'output', label: 'output', prompt: 'What does copy.Open print?', hint: 'copy is separate after line 3.' }] },
    mainLesson: { title: 'Struct Copies Preserve Field Values', label: 'Main Lesson', intro: 'Copying a struct copies its current fields. This is the same value-copy idea from booleans, now with a grouped value.', acts: [{ n: 1, title: 'Copy the group, not a link', body: ['Door copy = first reads the current field values.', 'copy receives its own field values.', 'Later writes to first do not rewrite copy.'], code: [{ text: 'Door copy = first;', translation: 'Copy the current Door value.' }, { text: 'first.Open = false;', translation: 'Change first after the copy.' }], memory: [{ name: 'first.Open', type: 'bool', value: 'false' }, { name: 'copy.Open', type: 'bool', value: 'true' }] }, { n: 2, title: 'Methods can read fields', body: ['A method that receives a Door can read door.Open or door.Locked.', 'The method returns a bool computed from the fields.', 'This is synthesis material for the door-checker exercises.'], code: [{ text: 'bool CanEnter(Door door) {', translation: 'Define a bool method that receives a Door value.', scope: [{ text: 'return door.Open && !door.Locked;', translation: 'Return a bool computed from fields.' }], close: '}' }], memory: [{ name: 'CanEnter', type: 'method', value: 'bool(Door)' }] }] },
    rigorousQuiz: { title: 'Door Checker Transfer', prompt: 'Trace copied fields and output.', transferCode: { lines: [{ text: 'Door front = new Door();' }, { text: 'front.Locked = true;' }, { text: 'Door snapshot = front;' }, { text: 'front.Locked = false;' }, { text: 'Console.WriteLine(snapshot.Locked);' }] }, columns: ['front.Locked', 'snapshot.Locked'], stateRows: [{ after: 1, 'front.Locked': 'false', 'snapshot.Locked': '-' }, { after: 2, 'front.Locked': 'true', 'snapshot.Locked': '-' }, { after: 3, 'front.Locked': 'true', 'snapshot.Locked': 'true' }, { after: 4, 'front.Locked': 'false', 'snapshot.Locked': 'true' }, { after: 5, 'front.Locked': 'false', 'snapshot.Locked': 'true' }], translations: [{ id: 'A', text: 'Create a Door value.' }, { id: 'B', text: 'Write true into front.Locked.' }, { id: 'C', text: 'Copy the current Door fields into snapshot.' }, { id: 'D', text: 'Change front.Locked after the copy.' }, { id: 'E', text: 'Print snapshot.Locked.' }], outputAnswers: { output: 'true', why: 'snapshot copied the earlier locked value' }, valueChoices: ['true', 'false', '-'], outputChoices: ['true', 'false', '(no output)'], reasonChoices: ['snapshot copied the earlier locked value', 'snapshot follows front automatically', 'WriteLine changes front'] },
    exercises: { title: 'Struct Synthesis Practice', label: 'Exercises', intro: 'Use struct copies and methods as a small door-checker synthesis.', items: [{ number: 1, title: 'Snapshot door', summary: 'Copy before changing.', sample: 'Door snapshot = front;', prompt: 'Write a program that copies a Door, changes the original, and prints a copied field.', starter: ['Door front = new Door();', 'front.Open = true;', 'Door snapshot = ___;'], constraints: ['Change the original after copying.', 'Print a field from the snapshot.'] }, { number: 2, title: 'Door method', summary: 'Return a bool from fields.', sample: 'return door.Open && !door.Locked;', prompt: 'Write CanEnter(Door door) so it returns true when the door is open and not locked.', constraints: ['Return bool.', 'Use both fields.'] }, { number: 3, title: 'Door-checker explanation', summary: 'Explain copied state in a scenario.', sample: 'snapshot stayed locked', prompt: 'Given a door snapshot and later door changes, explain which values a method should read.', constraints: ['Mention the copied value.', 'Mention the current value.'] }] },
  },
];

const CH1_V1_LESSON_FIXTURES = [
  ...CH1_REMAINING_LESSON_CONFIGS,
  ...CH1_EXTRA_CONFIGS,
].map(ch1Lesson);

const CH1_V1_LESSONS_BY_ID = CH1_V1_LESSON_FIXTURES.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {});

function Ch1V1LessonSequence() {
  const { ConceptLessonSequence } = window;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lesson') || 'ch1-compound-short-circuit';
  const lesson = (window.FUNCS_LESSON_FIXTURES || {})[requested] || CH1_V1_LESSONS_BY_ID[requested];

  if (!lesson) {
    return (
      <div style={{ padding: 24, color: '#991b1b', fontFamily: "'Source Sans 3', sans-serif" }}>
        Unknown Chapter 1 lesson: {requested}. Return to <a href="Ch1 Roadmap.html">the Chapter 1 roadmap</a>.
      </div>
    );
  }

  return <ConceptLessonSequence lesson={lesson} />;
}

function Ch1RoadmapPrototype() {
  const fixtures = window.FUNCS_LESSON_FIXTURES || {};
  const lessons = CH1_V1_LESSON_MAP.map(item => {
    const fixture = fixtures[item.id] || CH1_V1_LESSONS_BY_ID[item.id];
    return {
      ...item,
      availableSyntax: fixture?.availableSyntax || ch1SyntaxUpTo(item.order),
      sourceAnchors: fixture?.roadmap?.sourceAnchors || [item.source],
    };
  });

  return (
    <div style={{
      height: '100%',
      overflow: 'auto',
      background: '#f8fafc',
      color: '#1e293b',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        minHeight: 42,
        borderBottom: '1px solid #e2e8f0',
        background: '#fff',
      }}>
        <div style={{ height: 42 }}>
          <TBChapterStrip chapters={CH1_V1_CHAPTERS} />
        </div>
      </div>
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '22px 22px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 6 }}>
              Chapter 1 Roadmap
            </div>
            <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.05, color: '#0f172a' }}>Booleans V1 Prototype Path</h1>
            <p style={{ margin: '8px 0 0', maxWidth: 720, fontSize: 14.5, lineHeight: 1.5, color: '#475569' }}>
              Ten compact lessons cover the Chapter 1 concept clusters. The door-checker program is used as synthesis material in quizzes and exercises, not as one oversized walkthrough.
            </p>
          </div>
          <a href="Ch1 Data Memory Sequence.html" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 34,
            padding: '7px 12px',
            borderRadius: 6,
            background: '#2563eb',
            color: '#fff',
            fontWeight: 850,
            fontSize: 12.5,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>Start lesson 1</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {lessons.map(lesson => (
            <a key={lesson.id} href={lesson.href} style={{
              minHeight: 248,
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr auto',
              gap: 9,
              border: '1px solid #dbe4ef',
              borderRadius: 8,
              background: '#fff',
              padding: 14,
              color: 'inherit',
              textDecoration: 'none',
              boxShadow: '0 1px 5px rgba(15, 23, 42, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 900,
                  color: '#2563eb',
                  background: '#dbeafe',
                  borderRadius: 4,
                  padding: '3px 7px',
                }}>lesson {lesson.order}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94a3b8' }}>{lesson.source}</span>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, lineHeight: 1.12, color: '#0f172a' }}>{lesson.title}</h2>
                <p style={{ margin: '7px 0 0', fontSize: 13, lineHeight: 1.4, color: '#475569' }}>{lesson.learningTarget}</p>
              </div>
              <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 4 }}>
                    Review/support
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {(lesson.reviewConcepts.length ? lesson.reviewConcepts : ['first exposure']).map(tag => (
                      <span key={tag} style={{ border: '1px solid #dbe4ef', borderRadius: 999, background: '#f8fafc', color: '#475569', padding: '2px 7px', fontSize: 11, fontWeight: 750 }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 4 }}>
                    Syntax available
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {lesson.availableSyntax.slice(-2).flatMap(group => group.items.slice(0, 2)).map(item => (
                      <code key={`${lesson.id}-${item.term}`} style={{ border: '1px solid #dbeafe', borderRadius: 5, background: '#eff6ff', color: '#1d4ed8', padding: '2px 5px', fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace" }}>{item.term}</code>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #edf2f7', paddingTop: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ fontSize: 11.5, color: '#64748b' }}>{lesson.sourceAnchors.join(' + ')}</span>
                <span style={{ fontSize: 12, color: '#2563eb', fontWeight: 850 }}>Open</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

const FUNCS_LESSON_FIXTURES_V1_NEXT = {
  ...(window.FUNCS_LESSON_FIXTURES || {}),
  ...CH1_V1_LESSONS_BY_ID,
};

Object.assign(window, {
  FUNCS_LESSON_FIXTURES: FUNCS_LESSON_FIXTURES_V1_NEXT,
  CH1_V1_CHAPTERS,
  CH1_V1_LESSON_MAP,
  CH1_V1_SYNTAX_PROGRESS,
  CH1_V1_LESSON_FIXTURES,
  CH1_V1_LESSONS_BY_ID,
  Ch1RoadmapPrototype,
  Ch1V1LessonSequence,
});
