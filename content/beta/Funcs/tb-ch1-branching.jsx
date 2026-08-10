/* tb-ch1-branching.jsx — Chapter 1, Lesson 4: Branching and Scope.
   A new lesson authored entirely as data for the flow kit: no lesson-specific components. */

const CH1_BRANCH_GOALS = {
  state: {
    id: 'state',
    n: 'A',
    label: 'Store the facts',
    gloss: 'A bool holds the simplest possible piece of state: one fact that is either true or false.',
  },
  branch: {
    id: 'branch',
    n: 'B',
    label: 'Let the fact choose a path',
    gloss: 'The same program can behave differently, because a bool decides which lines run.',
  },
};

const CH1_BRANCH_SUBGOALS = {
  flag: { id: 'flag', n: 'A.a', label: 'Store the deciding fact', gloss: 'Create the bool the branch will read.', goal: 'state' },
  amount: { id: 'amount', n: 'A.b', label: 'Store the value that may change', gloss: 'The branch can only change a value that already exists.', goal: 'state' },
  test: { id: 'test', n: 'B.a', label: 'Test the condition', gloss: 'Read the bool and choose whether the guarded lines run.', goal: 'branch' },
  guarded: { id: 'guarded', n: 'B.b', label: 'Run the guarded line', gloss: 'These lines run only on the true path.', goal: 'branch' },
  report: { id: 'report', n: 'B.c', label: 'Report the result', gloss: 'Show what the chosen path left in memory.', goal: 'branch' },
};

const CH1_BRANCH_CODE = {
  layout: 'frame',
  goals: CH1_BRANCH_GOALS,
  subgoals: CH1_BRANCH_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'flag' },
    { kind: 'seg', subgoal: 'amount' },
    {
      kind: 'wrap',
      subgoal: 'test',
      header: 'br-line-3',
      footer: 'br-line-close',
      hint: 'owns the guarded line',
      body: [{ kind: 'seg', subgoal: 'guarded' }],
    },
    { kind: 'seg', subgoal: 'report' },
  ],
  lines: [
    { id: 'br-line-1', num: '1', indent: 0, text: 'bool isMember = true;', subgoal: 'flag', translation: 'Store one fact: this customer is a member.' },
    { id: 'br-line-2', num: '2', indent: 0, text: 'double total = 40.0;', subgoal: 'amount', translation: 'Store the order total the branch may change.' },
    {
      id: 'br-line-3', num: '3', indent: 0, text: 'if (isMember) {', subgoal: 'test',
      badge: 'condition', badgeBg: '#fef3c7', badgeBorder: '#fcd34d', badgeColor: '#92400e',
      translation: 'Read isMember. Run the lines inside the block only when it holds true.',
    },
    {
      id: 'br-line-3-body', num: '4', indent: 1, text: 'total = total - 5.0;', subgoal: 'guarded',
      badge: 'true path', badgeBg: '#dcfce7', badgeBorder: '#86efac', badgeColor: '#166534',
      translation: 'Take five off the total. This line exists only on the true path.',
    },
    { id: 'br-line-close', num: '5', indent: 0, text: '}', translation: 'Close the guarded block. Execution continues here either way.' },
    { id: 'br-line-6', num: '6', indent: 0, text: 'Console.WriteLine(total);', subgoal: 'report', translation: 'Print the total the chosen path left behind.' },
  ],
  tokens: {
    bool: { tone: 'type', description: 'A type with exactly two values: true and false.' },
    double: { tone: 'type', description: 'A number that can hold a fractional part.' },
    isMember: { tone: 'name', description: 'The stored fact the branch reads.' },
    total: { tone: 'name', description: 'The value the branch may change.' },
    if: { tone: 'op', description: 'Choose whether the block below runs.' },
    true: { tone: 'value', description: 'One of the two boolean values.' },
    '40.0': { tone: 'value', description: 'The order total before any discount.' },
    '5.0': { tone: 'value', description: 'The member discount.' },
    'Console.WriteLine': { tone: 'call', description: 'Evaluate the argument and display it in the console.' },
  },
};

const CH1_BRANCH_TRANSFER_CODE = {
  lines: [
    { id: 'tr-1', num: '1', text: 'bool isLate = false;' },
    { id: 'tr-2', num: '2', text: 'double fee = 0.0;' },
    { id: 'tr-3', num: '3', text: 'if (isLate) {' },
    { id: 'tr-3-body', num: '4', text: '    fee = fee + 2.5;' },
    { id: 'tr-close', num: '5', text: '}' },
    { id: 'tr-6', num: '6', text: 'Console.WriteLine(fee);' },
  ],
};

const CH1_BRANCH_STATES = [
  { label: 'Before execution', desc: 'Nothing is stored yet, so there is no fact for the branch to read.', memory: [], console: [] },
  { label: 'After line 1', desc: 'isMember holds the one fact this program branches on.', memory: [{ name: 'isMember', type: 'bool', value: 'true' }], console: [] },
  {
    label: 'After line 2',
    desc: 'Both variables exist. The total is still the undiscounted amount.',
    memory: [{ name: 'isMember', type: 'bool', value: 'true' }, { name: 'total', type: 'double', value: '40.0' }],
    console: [],
  },
  {
    label: 'After line 4',
    desc: 'The condition was true, so the guarded line ran and changed the total.',
    memory: [{ name: 'isMember', type: 'bool', value: 'true' }, { name: 'total', type: 'double', value: '35.0' }],
    console: [],
  },
  {
    label: 'After line 6',
    desc: 'Execution continues past the block and prints whatever the chosen path left in total.',
    memory: [{ name: 'isMember', type: 'bool', value: 'true' }, { name: 'total', type: 'double', value: '35.0' }],
    console: ['35'],
  },
];

const CH1_BRANCHING_LESSON = {
  id: 'ch1-branching-scope',
  chapterId: 'ch1',
  source: 'ch1/ch1-3.md',
  stableUrl: 'ch1/branching-and-scope',
  order: 4,
  title: 'Branching And Scope',
  kicker: 'Chapter 1',
  learningTarget: 'Use a stored bool to choose which lines run, and read the resulting state.',
  roadmap: { order: 4, sourceAnchors: ['ch1/ch1-3.md'], reviewConcepts: ['boolean data', 'assignment', 'console output'] },
  availableSyntax: [
    {
      group: 'Boolean data',
      items: [
        { term: 'bool name = true;', note: 'Store one fact that is either true or false.', source: 'ch1-1' },
        { term: 'true / false', note: 'The only two boolean values.', source: 'ch1-1' },
      ],
    },
    {
      group: 'Branching',
      items: [
        { term: 'if (condition) { ... }', note: 'Run the block only when the condition holds.', source: 'ch1-3' },
        { term: '{ ... }', note: 'A block groups the lines a branch guards.', source: 'ch1-3' },
      ],
    },
  ],
  chapterNav: { chapters: window.FUNCS_CHAPTERS || [] },
  chapterExamples: (window.CH1_CHAPTER_EXAMPLES || []).map(item => ({ ...item, current: item.title === 'Branching and Scope' })),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 1',
      exampleTitle: 'Example: Branching And Scope',
      modeLabel: 'Full walkthrough',
      instructions: 'Run the program line by line. Watch the condition decide whether the guarded line ever runs.',
      programLabel: 'Program.cs',
      programNote: 'The condition and the line it guards are labeled outside the code.',
    },
    code: CH1_BRANCH_CODE,
    subgoals: CH1_BRANCH_SUBGOALS,
    states: CH1_BRANCH_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Commit to what the branch does before the walkthrough explains it.',
  },
  mainLesson: {
    title: 'Branching And Scope',
    label: 'Main Lesson',
    intro: 'A bool is the smallest piece of state a program can hold: one fact, true or false. That is enough to stop a program from running the same way every time.',
    acts: [
      {
        n: 1,
        title: 'One Fact, Stored',
        body: [
          'Every program so far ran straight through: line 1, then 2, then 3, in that order, every time.',
          'A bool records a single fact — member or not, late or not — and that fact is what a branch will read.',
        ],
        code: ['bool isMember = true;'],
        translations: ['Store one fact the rest of the program can ask about.'],
      },
      {
        n: 2,
        title: 'The Condition Picks A Path',
        body: [
          'An if statement reads the bool and chooses. When it holds true the guarded lines run; when it holds false they are skipped entirely.',
          'The straight line 1 → 2 → 3 → 4 becomes a fork, and only one path is ever taken.',
        ],
        code: ['if (isMember) {', '    total = total - 5.0;', '}'],
        translations: ['Take five off the total only when isMember is true.'],
      },
      {
        n: 3,
        title: 'After The Block, One State',
        body: [
          'Both paths rejoin at the line after the closing brace, so the rest of the program is written once.',
          'What differs is the state left behind: the printed total is the evidence of which path ran.',
        ],
        code: ['Console.WriteLine(total);'],
        translations: ['Print 35 on the true path, 40 on the false one.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace a nearby branch whose condition is false, and say what that leaves in memory.',
    transferCode: CH1_BRANCH_TRANSFER_CODE,
  },
  exercises: {
    title: 'Branching Practice Set',
    label: 'Exercises',
    intro: 'Five problems on choosing a path with a stored bool. Work them away from this page.',
  },
  flow: {
    goal: {
      intent: 'Same walkthrough shell as ch2.4, rendered from this lesson\'s data. The footer reads Continue while nothing has run, then becomes Run next line once execution starts.',
      badge: 'Full walkthrough',
      activeGoal: 'state',
      activeSubgoal: 'flag',
      activeKey: 'br-line-1',
      startLabel: 'Continue — start running',
      startStatus: 'goal · nothing has run',
      runLabel: 'Run next line',
      note: 'the branch has not been tested yet — the guarded line may never run at all',
    },
    preQuiz: {
      intent: 'Part 1 asks for the shape of a branching program: which categories run, in what order. Part 2 opens each one for a single detail question.',
      kicker: 'Pre-Quiz · Branching And Scope',
      part1Prompt: 'Put the five categories in the order they run for this program. Guessing is fine — the walkthrough revisits every one.',
      part2Prompt: 'The order is set. Open each category and answer its one question.',
      orderSuccess: 'That is the shape: store the facts, test one of them, run the guarded line only if the test held, then report what is left.',
      orderRetry: 'Red rows carry the reason they belong elsewhere. Fix your picture of the order, then move to the details.',
      categories: [
        { id: 'flag', n: 'A.a', label: 'Store the deciding fact', why: 'Nothing can be tested before the fact exists.' },
        { id: 'amount', n: 'A.b', label: 'Store the value that may change', why: 'The guarded line changes a value that must already exist.' },
        { id: 'test', n: 'B.a', label: 'Test the condition', why: 'The condition is read before any guarded line can run.' },
        { id: 'guarded', n: 'B.b', label: 'Run the guarded line', why: 'This runs only after the condition is found true.' },
        { id: 'report', n: 'B.c', label: 'Report the result', why: 'Printing happens after the branch has finished.' },
      ],
      shuffled: ['test', 'report', 'amount', 'guarded', 'flag'],
      details: {
        flag: {
          type: 'pick line', kind: 'choice', mono: true,
          q: 'Which line stores the fact the branch reads?',
          choices: ['bool isMember = true;', 'double total = 40.0;', 'if (isMember) {'], correct: 0,
          why: 'A bool holds one fact. That is the value the condition will ask about.',
        },
        amount: {
          type: 'fill the value', kind: 'chips',
          q: 'What does total hold when the condition is tested?',
          chips: ['40.0', '35.0', '5.0', 'true'], correct: '40.0',
          why: 'Line 2 stored 40.0 and nothing has changed it yet — the guarded line has not run.',
        },
        test: {
          type: 'multiple choice', kind: 'choice',
          q: 'What does if (isMember) actually check?',
          choices: ['Whether the value stored in isMember is true', 'Whether isMember was declared as a bool', 'Whether total is greater than zero'], correct: 0,
          why: 'The condition reads the stored value. Nothing about the declaration or the total is involved.',
        },
        guarded: {
          type: 'fill the value', kind: 'chips',
          q: 'How many times does line 4 run in this program?',
          chips: ['0', '1', '2'], correct: '1',
          why: 'isMember is true, so the guarded line runs exactly once. A branch is not a loop.',
        },
        report: {
          type: 'predict output', kind: 'chips',
          q: 'What does the program print?',
          chips: ['35', '40', '5', 'true'], correct: '35',
          why: 'The true path took five off 40.0, so the line after the block prints 35.',
        },
      },
    },
    mainLesson: {
      intent: 'One page, one scroll, with the same gate as ch2.4: the reading below the current check stays visible but blurred, so nothing gets skipped.',
      completeNote: 'Every check was answered, so the whole page is now readable end to end for review.',
      checks: [
        {
          type: 'multiple choice', kind: 'choice', mono: true,
          q: 'Which line stores a fact rather than a number?',
          choices: ['bool isMember = true;', 'double total = 40.0;', 'Console.WriteLine(total);'], correct: 0,
          why: 'bool holds one of two values. That is the whole of what it can say.',
        },
        {
          type: 'fill the value', kind: 'chips',
          q: 'isMember is true, so after line 4 total holds ?',
          chips: ['35.0', '40.0', '5.0', '45.0'], correct: '35.0',
          why: 'The guarded line ran once and took 5.0 off the stored 40.0.',
        },
        {
          type: 'multiple choice', kind: 'choice',
          q: 'If isMember held false instead, what would the program print?',
          choices: ['40 — the guarded line is skipped entirely', '35 — the discount happens anyway', 'Nothing — the program stops at the condition'], correct: 0,
          why: 'A false condition skips the block and continues at the line after it, with total untouched.',
        },
      ],
    },
    rigorousQuiz: {
      intent: 'Five questions, one in view at a time, each scoped to one moment of a branch whose condition is false — the case learners get wrong most often.',
      codeLabel: 'Transfer program',
      success: 'Full marks: you traced a branch that never ran and still said exactly what it left behind.',
      cards: [
        {
          id: 'order', type: 'order the lines', kind: 'order',
          q: 'Order the lines that actually run, first to last. One of these never runs.',
          bank: ['Console.WriteLine(fee);', 'fee = fee + 2.5;', 'bool isLate = false;', 'if (isLate) {', 'double fee = 0.0;'],
          correct: ['bool isLate = false;', 'double fee = 0.0;', 'if (isLate) {', 'Console.WriteLine(fee);'],
          placeholder: 'tap a line below',
          why: 'The condition is false, so the guarded line is skipped and never belongs in the run order.',
        },
        {
          id: 'guard', type: 'pick the line', kind: 'choice', mono: true,
          q: 'Which line decides whether fee ever changes?',
          choices: ['bool isLate = false;', 'if (isLate) {', 'fee = fee + 2.5;'], correct: 1,
          why: 'The condition is the decision. The line above only stores the fact it reads.',
        },
        {
          id: 'row', type: 'fill the trace row', kind: 'row',
          q: 'Fill the row for the moment the condition is tested.',
          rowLabel: 'if (isLate)',
          columns: ['at line', 'isLate', 'fee'],
          cells: [
            { col: 'isLate', chips: ['true', 'false'], correct: 'false' },
            { col: 'fee', chips: ['0.0', '2.5', 'nothing yet'], correct: '0.0' },
          ],
          why: 'isLate was stored as false on line 1, and fee still holds the 0.0 from line 2.',
        },
        {
          id: 'output', type: 'predict the value', kind: 'chips',
          q: 'What does the program print?',
          chips: ['0', '2.5', 'false', '(no output)'], correct: '0',
          why: 'The guarded line never ran, so fee is still 0.0 and prints as 0.',
        },
        {
          id: 'why', type: 'explain why', kind: 'choice',
          q: 'Why does fee keep its starting value?',
          choices: ['The condition was false, so the guarded line was skipped', 'Adding 2.5 to 0.0 leaves 0.0', 'A double cannot be changed after it is stored'], correct: 0,
          why: 'Skipping is the mechanism. The addition never happened at all.',
        },
      ],
    },
    exercises: {
      intent: 'Stated problems, worked away from the page: what to produce, one worked example, and the constraints an answer must satisfy.',
      intro: 'Five problems on choosing a path with a stored bool. Nothing is solved inline.',
      problems: [
        {
          n: 1, title: 'Name the parts', tag: 'warm-up',
          statement: 'For the program below, identify the line that stores the deciding fact, the line that tests it, and every line the test guards.',
          given: ['bool isMember = true;', 'double total = 40.0;', 'if (isMember) {', '    total = total - 5.0;', '}', 'Console.WriteLine(total);'],
          constraints: ['Quote each line exactly.', 'State which lines are skipped when the condition is false.', 'Say in one sentence where the two paths rejoin.'],
        },
        {
          n: 2, title: 'Trace both paths', tag: 'core',
          statement: 'Trace the same program twice by hand: once with isMember true, once with isMember false. Write the value of total after every line that runs.',
          example: { inLabel: 'input', in: 'isMember = false', out: '40' },
          constraints: ['Show the two traces side by side.', 'Skip the guarded line in the false trace rather than crossing it out.', 'End each trace with the printed value.'],
        },
        {
          n: 3, title: 'Add the other path', tag: 'core',
          statement: 'Rewrite the program so a non-member is charged a 2.0 surcharge instead of receiving the discount. Members must still get five off.',
          example: { inLabel: 'input', in: 'isMember = false', out: '42' },
          constraints: ['Exactly one condition.', 'Each path changes total exactly once.', 'The printing line appears only once in your program.'],
        },
        {
          n: 4, title: 'Repair the block', tag: 'core',
          statement: 'The program below always applies the discount, member or not. State what the author meant, explain what the code actually does, and fix it.',
          given: ['bool isMember = false;', 'double total = 40.0;', 'if (isMember)', '    Console.WriteLine("member");', '    total = total - 5.0;', 'Console.WriteLine(total);'],
          example: { inLabel: 'input', in: 'isMember = false', out: '40' },
          constraints: ['Explain the failure in terms of what the condition guards, not indentation.', 'Make the smallest change that fixes it.', 'State the printed value before and after your fix.'],
        },
        {
          n: 5, title: 'Condition from a computation', tag: 'stretch',
          statement: 'A program stores an order total. Write the lines that give free shipping when the total is above 100.0, and print the shipping cost either way.',
          example: { inLabel: 'input', in: 'total = 120.0', out: '0' },
          constraints: ['Store the condition as a named bool before testing it.', 'Justify in one sentence why naming the bool is clearer than testing inline.', 'State what your program prints for a total of exactly 100.0.'],
        },
      ],
    },
  },
};

Object.assign(window, { CH1_BRANCH_GOALS, CH1_BRANCH_SUBGOALS, CH1_BRANCH_CODE, CH1_BRANCH_STATES, CH1_BRANCHING_LESSON });
