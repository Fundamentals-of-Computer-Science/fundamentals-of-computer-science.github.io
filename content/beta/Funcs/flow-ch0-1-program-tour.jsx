/* flow-ch0-1-program-tour.jsx — Chapter 0, Lesson 1.
   One JSON-compatible lesson object; every page renders through the shared flow kit. */

const CH0_PROGRAM_GOALS = {
  interact: {
    id: 'interact',
    n: 'A',
    label: 'Interact with the user through the console.',
    gloss: 'Ask for text, remember the response, and display values back to the user.',
  },
};

const CH0_PROGRAM_SUBGOALS = {
  prompt: {
    id: 'prompt', n: 'A.a', goal: 'interact',
    label: 'Display a prompt for a console value.',
    gloss: 'Tell the user what to enter before the program waits for input.',
  },
  readStore: {
    id: 'readStore', n: 'A.b', goal: 'interact',
    label: 'Read a value from the console and write it to program state.',
    gloss: 'Retrieve the entered text, then store it under a name the program can use.',
  },
  computeDisplay: {
    id: 'computeDisplay', n: 'A.c', goal: 'interact',
    label: 'Compute and display a program value in the console.',
    gloss: 'Evaluate a program-side expression first, then display the resulting value.',
  },
};

const CH0_PROGRAM_CODE = {
  layout: 'frame',
  goals: CH0_PROGRAM_GOALS,
  subgoals: CH0_PROGRAM_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'prompt' },
    { kind: 'seg', subgoal: 'readStore' },
    { kind: 'seg', subgoal: 'computeDisplay' },
  ],
  lines: [
    {
      id: 'tour-line-1', num: '1', indent: 0,
      text: 'Console.Write("Type your name: ");', subgoal: 'prompt',
      translation: 'Display a prompt and leave the cursor on the same console line.',
    },
    {
      id: 'tour-line-2', num: '2', indent: 0,
      text: 'string name = Console.ReadLine();', subgoal: 'readStore',
      translation: 'Read the entered text and store it in name.',
    },
    {
      id: 'tour-line-3', num: '3', indent: 0,
      text: 'Console.WriteLine(name);', subgoal: 'computeDisplay',
      translation: 'Evaluate name and display its stored value.',
    },
    {
      id: 'tour-line-4', num: '4', indent: 0,
      text: 'Console.WriteLine(name.Length);', subgoal: 'computeDisplay',
      translation: 'Evaluate name.Length and display the resulting number.',
    },
    {
      id: 'tour-line-5', num: '5', indent: 0,
      text: 'Console.WriteLine(5 + 3);', subgoal: 'computeDisplay',
      translation: 'Evaluate 5 + 3 and display 8.',
    },
  ],
  tokens: {
    Console: { tone: 'call', description: 'The console displays program text and accepts text entered by the user.' },
    'Console.Write': { tone: 'call', description: 'Display a value without ending the current console line.' },
    'Console.WriteLine': { tone: 'call', description: 'Evaluate its argument, display the resulting value, and end the line.' },
    'Console.ReadLine': { tone: 'call', description: 'Wait for the user to enter one line of text and supply that text as a value.' },
    string: { tone: 'type', description: 'A type for text values.' },
    name: { tone: 'name', description: 'The name under which the program stores the user-entered text.' },
    Length: { tone: 'name', description: 'A property that supplies the number of characters in a string.' },
    '5': { tone: 'value', description: 'The first number in the operator expression.' },
    '3': { tone: 'value', description: 'The second number in the operator expression.' },
    '+': { tone: 'op', description: 'Add the value on the left to the value on the right.' },
  },
};

const CH0_PROGRAM_STATES = [
  {
    label: 'Before execution',
    desc: 'The source is visible, but no instruction has run.',
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'The prompt is visible. The program has not stored a value.',
    memory: [],
    console: ['Type your name: '],
  },
  {
    label: 'After line 2',
    desc: 'The user entered Ada. ReadLine retrieved the text, and the declaration wrote it to name.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada'],
  },
  {
    label: 'After line 3',
    desc: 'The expression name supplied Ada, and WriteLine displayed it.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada', 'Ada'],
  },
  {
    label: 'After line 4',
    desc: 'name.Length supplied 3, and WriteLine displayed it. Program state did not change.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada', 'Ada', '3'],
  },
  {
    label: 'After line 5',
    desc: 'The expression 5 + 3 supplied 8, and WriteLine displayed it.',
    memory: [{ name: 'name', type: 'string', value: '"Ada"' }],
    console: ['Type your name: Ada', 'Ada', '3', '8'],
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
    { id: 'transfer-3', num: '3', text: 'Console.WriteLine(color);' },
    { id: 'transfer-4', num: '4', text: 'Console.WriteLine(color.Length);' },
    { id: 'transfer-5', num: '5', text: 'Console.WriteLine(4 + 2);' },
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
    title: 'Interact with a Program Using the Console',
    href: 'Ch0 1 Programs Input Output Tour.html',
    current: true,
    summary: 'Enter text through the console, inspect what the program stores, and read the values it displays.',
    tags: ['Write', 'ReadLine', 'WriteLine', 'Length'],
  },
];

const CH0_PROGRAM_TOUR_LESSON = {
  id: 'ch0-programs-input-output-tour',
  chapterId: 'ch0',
  source: 'ch0/index.md',
  stableUrl: 'ch0/programs-input-output',
  order: 1,
  title: 'Interact with a Program Using the Console',
  kicker: 'Chapter 0',
  learningTarget: 'Run a straight-line program, enter text through the console, and determine what the program stores and displays.',
  roadmap: {
    order: 1,
    sourceAnchors: [
      'ch0/index.md:9',
      'ch0/index.md:76',
      'ch1/ch1-1.md:298',
      'ch1/ch1-3.md:827',
      'ch1/ch1-3.md:841',
      'ch2/ch2-2.md:42',
      'ch4/ch4-2.md:553',
    ],
    reviewConcepts: ['precise definitions', 'code-to-English translation', 'source', 'program state', 'console'],
  },
  availableSyntax: [
    {
      group: 'Console interaction',
      items: [
        { term: 'Console.Write(value);', note: 'Display a prompt without ending the current line.', source: 'doc-28: support-only addition' },
        { term: 'Console.ReadLine();', note: 'Retrieve one line of text entered by the user.', source: 'ch1/ch1-3.md:841' },
        { term: 'Console.WriteLine(value);', note: 'Display a program value and end the line.', source: 'ch1/ch1-1.md:298; ch1/ch1-3.md:827' },
      ],
    },
    {
      group: 'Stored and computed values',
      items: [
        { term: 'string name = ...;', note: 'Write a text value to program state under a name.', source: 'ch1/ch1-3.md:841' },
        { term: 'name.Length', note: 'Supply the number of characters in the stored text.', source: 'ch4/ch4-2.md:553' },
        { term: '5 + 3', note: 'Compute a value with an operator expression.', source: 'ch2/ch2-2.md:42' },
      ],
    },
  ],
  chapterNav: { chapters: CH0_PROGRAM_CHAPTERS },
  chapterExamples: CH0_PROGRAM_EXAMPLES,

  fullExample: {
    header: {
      chapterLabel: 'Chapter 0',
      exampleTitle: 'Example: Ask for a name and display results',
      modeLabel: 'Full walkthrough',
      instructions: 'Run one line at a time. Watch Source, Program State, and Console after each instruction.',
      programLabel: 'Program.cs',
      programNote: 'Assume the user enters Ada.',
    },
    code: CH0_PROGRAM_CODE,
    subgoals: CH0_PROGRAM_SUBGOALS,
    executionTrace: CH0_PROGRAM_TRACE,
    states: CH0_PROGRAM_STATES,
  },

  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Use the three code jobs and the evidence shown in the interface.',
  },

  mainLesson: {
    title: 'A Console Program Asks, Remembers, and Responds',
    label: 'Main Lesson',
    intro: 'Source shows the instruction available to run. Program State shows remembered values. Console shows the prompt, the text entered by the user, and the values the program displays. Run one instruction, then compare all three panes.',
    acts: [
      {
        n: 1,
        title: 'Display a prompt for a console value.',
        body: [
          'A prompt tells the user what the program expects. The highlighted source row identifies the instruction responsible for the visible text.',
          'Console.Write displays the prompt without ending the line, so the user can enter Rome beside it.',
        ],
        code: ['Console.Write("Type a city: ");'],
        translations: ['Display the request before waiting for the response.'],
      },
      {
        n: 2,
        title: 'Read a value from the console and write it to program state.',
        body: [
          'Console.ReadLine() retrieves Rome after the user enters it. The declaration writes that text to program state under city.',
          'The console call supplies the value; the surrounding declaration stores it. The call alone would not create the city binding.',
        ],
        code: ['string city = Console.ReadLine();'],
        translations: ['Retrieve Rome, then store city = "Rome".'],
      },
      {
        n: 3,
        title: 'Compute and display a program value in the console.',
        body: [
          'The program can display stored text, a property value, or an operator result. Each argument is evaluated before the output call displays it.',
          'city supplies Rome, city.Length supplies 4, and 7 + 2 supplies 9. These output instructions leave city unchanged.',
        ],
        code: [
          'Console.Write("You entered ");',
          'Console.WriteLine(city);',
          'Console.Write("Letters: ");',
          'Console.WriteLine(city.Length);',
          'Console.Write("Seven plus two: ");',
          'Console.WriteLine(7 + 2);',
        ],
        translations: ['Evaluate each program value, then display it as part of the response.'],
      },
    ],
  },

  rigorousQuiz: {
    title: 'Post-Reading Quiz',
    prompt: 'Assume the user enters blue. Apply the same code jobs without line-to-subgoal hints.',
    transferCode: CH0_PROGRAM_TRANSFER_CODE,
  },

  exercises: {
    title: 'Console Interaction Practice',
    label: 'Exercises',
    intro: 'Trace, repair, and write small programs that interact with a user through the console.',
  },

  flow: {
    sequence: [
      { id: 'intro-start', blockType: 'intro', intro: 'start', kicker: 'Start', title: 'How This Lesson Works' },
      { id: 'goal', blockType: 'fullExample', kicker: 'Example', title: 'Full Example' },
      { id: 'intro-pre-quiz', blockType: 'intro', intro: 'preQuiz', kicker: 'Prepare', title: 'How to Answer the Pre-Quiz' },
      { id: 'pre-quiz', blockType: 'preQuiz', kicker: 'Check', title: 'Pre-Quiz' },
      { id: 'main-lesson', blockType: 'mainLesson', kicker: 'Read', title: 'Main Lesson' },
      { id: 'intro-post-quiz', blockType: 'intro', intro: 'postQuiz', kicker: 'Prepare', title: 'Try a New Program' },
      { id: 'rigorous-quiz', blockType: 'rigorousQuiz', kicker: 'Check', title: 'Post-Reading Quiz' },
      { id: 'intro-exercises', blockType: 'intro', intro: 'exercises', kicker: 'Prepare', title: 'Practice Independently' },
      { id: 'exercises', blockType: 'exercises', kicker: 'Practice', title: 'Exercises' },
    ],

    intros: {
      start: {
        eyebrow: 'Before the example',
        title: 'How you interact with a program',
        lede: 'A console lets you enter text while a program is running and read the values the program displays in response.',
        status: 'introduction to the lesson flow',
        nextLabel: 'Next: Full Example',
        sections: [
          {
            id: 'interaction',
            title: 'One short interaction',
            body: [
              'The program displays a prompt. You enter a value. The program can remember that value, compute with values available to it, and display a response.',
            ],
          },
          {
            id: 'interface',
            title: 'Read the interface',
            cards: [
              { id: 'source', label: 'Source', body: 'Shows the program instructions. A visible instruction has not necessarily run.' },
              { id: 'state', label: 'Program State', body: 'Shows values the program currently stores under names.' },
              { id: 'console', label: 'Console', body: 'Shows prompts and program responses along with text entered by the user.' },
              { id: 'run', label: 'Run next line', body: 'Executes only the highlighted instruction, then updates the evidence.' },
            ],
          },
        ],
        callout: {
          label: 'Code labels and question directions',
          body: 'Code labels name what a group of instructions accomplishes. Questions may instead ask you to identify the next instruction, compute a value, or update the evidence.',
        },
      },

      preQuiz: {
        eyebrow: 'Before the Pre-Quiz',
        title: 'How to answer the Pre-Quiz',
        lede: 'Use the same three questions whenever you inspect one step of a straight-line program.',
        status: 'three question routines',
        nextLabel: 'Next: Pre-Quiz',
        sections: [
          {
            id: 'routines',
            title: 'Check one instruction at a time',
            steps: [
              { id: 'next', label: 'Identify the next instruction', body: 'Find the source row that runs next. Source order controls this program because it has no branches or loops.' },
              { id: 'value', label: 'Compute the supplied value', body: 'Work out what the selected expression becomes before deciding what the instruction does with it.' },
              { id: 'evidence', label: 'Update the evidence', body: 'Decide whether the instruction stores entered text or displays a program value, then update Program State or Console.' },
            ],
          },
          {
            id: 'mini-example',
            title: 'Mini-example',
            body: ['Line 2 runs next. word.Length supplies 4. WriteLine displays 4, while word remains "pear" in Program State.'],
            code: ['string word = "pear";', 'Console.WriteLine(word.Length);'],
          },
        ],
        callout: {
          label: 'Keep the two narratives separate',
          body: 'The three routines above describe your work as a reader. The subgoal labels in the code frame describe the program\'s work.',
        },
      },

      postQuiz: {
        eyebrow: 'Before the Post-Reading Quiz',
        title: 'Use the same code jobs in a new program',
        lede: 'The color program changes the prompt, variable, entered text, property receiver, and numbers. The program still asks, remembers, and responds through the console.',
        status: 'transfer to the color program',
        nextLabel: 'Next: Post-Reading Quiz',
        sections: [
          {
            id: 'transfer',
            title: 'What to determine',
            cards: [
              { id: 'order', label: 'Instruction order', body: 'Find the next source row before predicting its effect.' },
              { id: 'stored', label: 'Stored response', body: 'After input, identify the name and value shown in Program State.' },
              { id: 'displayed', label: 'Displayed values', body: 'Evaluate color, color.Length, and 4 + 2 before considering WriteLine.' },
            ],
          },
        ],
        callout: {
          label: 'Assumed input',
          body: 'Use blue as the text entered by the user. No numeric input or parsing is needed.',
        },
      },

      exercises: {
        eyebrow: 'Before the Exercises',
        title: 'Practice the interaction',
        lede: 'The exercises remove support in stages. Predict first, then compare your work with the model answer.',
        status: 'support fades across five exercises',
        nextLabel: 'Next: Exercises',
        sections: [
          {
            id: 'fading',
            title: 'How the support changes',
            steps: [
              { id: 'guided', label: 'Labeled trace', body: 'Use the code jobs to find the next row, stored value, and displayed value.' },
              { id: 'partial', label: 'Partial trace', body: 'Complete the missing Program State and Console evidence.' },
              { id: 'repair', label: 'Repair', body: 'Find which code job is incomplete and change only the faulty instruction.' },
              { id: 'construct', label: 'Construction', body: 'Write a program from a short list of requirements.' },
              { id: 'independent', label: 'Independent transfer', body: 'Choose the details, write the program, and explain the full console interaction.' },
            ],
          },
        ],
        callout: {
          label: 'Before you run',
          body: 'Predict what the user enters, what the program remembers, and what the console will display. Run the code only after recording those predictions.',
        },
      },
    },

    goal: {
      intent: 'Introduce the console interaction and the beta interface with one complete program.',
      badge: 'Full example',
      activeGoal: 'interact',
      activeSubgoal: 'prompt',
      activeKey: 'tour-line-1',
      startLabel: 'Start running the example',
      startStatus: 'example not yet run',
      runLabel: 'Run next line',
      note: 'Source shows the instruction. Program State shows stored values. Console shows the interaction.',
    },

    preQuiz: {
      intent: 'Check the three code jobs and the learner routines introduced on the preceding page.',
      kicker: 'Pre-Quiz · Interact with a Program Using the Console',
      part1Prompt: 'Put the three code jobs in the order used by the name program.',
      part2Prompt: 'Open each code job and answer its question.',
      orderSuccess: 'The program displays a prompt, reads and stores the response, then computes and displays program values.',
      orderRetry: 'Start with the instruction that asks the user for a value. Store the response before later code uses it.',
      categories: [
        {
          id: 'prompt', n: 'A.a',
          label: 'Display a prompt for a console value.',
          why: 'The user needs to know what to enter before the program waits.',
        },
        {
          id: 'readStore', n: 'A.b',
          label: 'Read a value from the console and write it to program state.',
          why: 'The program must retrieve and store the response before later instructions can use it.',
        },
        {
          id: 'computeDisplay', n: 'A.c',
          label: 'Compute and display a program value in the console.',
          why: 'The program evaluates each response value before displaying it.',
        },
      ],
      shuffled: ['computeDisplay', 'prompt', 'readStore'],
      details: {
        prompt: {
          type: 'identify the next instruction', kind: 'choice', mono: true,
          q: 'Which instruction runs first?',
          choices: ['Console.Write("Type your name: ");', 'string name = Console.ReadLine();', 'Console.WriteLine(name);'],
          correct: 0,
          why: 'The prompt must be visible before the program waits for the user\'s response.',
        },
        readStore: {
          type: 'update Program State', kind: 'choice', mono: true,
          q: 'The user enters Ada and line 2 runs. What does Program State contain?',
          choices: ['name = "Ada"', 'name = "name"', 'Program State is empty'],
          correct: 0,
          why: 'ReadLine retrieves Ada. The declaration writes that value to Program State under name.',
        },
        computeDisplay: {
          type: 'compute and display', kind: 'choice', mono: true,
          q: 'Which statement correctly describes Console.WriteLine(name.Length)?',
          choices: ['name.Length supplies 3, then WriteLine displays 3.', 'WriteLine stores 3 in name.', 'WriteLine computes the length without evaluating name.Length.'],
          correct: 0,
          why: 'The inner property access supplies 3. The outer action call displays that value and leaves name unchanged.',
        },
      },
    },

    mainLesson: {
      intent: 'Teach the same code functions with a city program and explain how to use the resource.',
      completeNote: 'You used Source, Program State, and Console to explain the full interaction.',
      checks: [
        {
          type: 'update the evidence', kind: 'choice',
          q: 'What is true immediately after line 1 runs?',
          choices: ['The console shows Type a city: and Program State is empty.', 'city stores "Rome".', 'The console displays 4.'],
          correct: 0,
          why: 'The prompt is visible, but the program has not read or stored the response yet.',
        },
        {
          type: 'update Program State', kind: 'choice', mono: true,
          q: 'The user enters Rome and line 2 runs. What does Program State contain?',
          choices: ['city = "Rome"', 'city = "city"', 'city = 4'],
          correct: 0,
          why: 'ReadLine retrieves Rome, and the declaration writes the text to city.',
        },
        {
          type: 'compute the displayed value', kind: 'chips',
          q: 'What does Console.WriteLine(city.Length) display?',
          chips: ['4', 'Rome', 'city.Length', '9'],
          correct: '4',
          why: 'city.Length supplies 4 because Rome has four characters. WriteLine displays 4 without changing city.',
        },
      ],
    },

    rigorousQuiz: {
      intent: 'Transfer the procedure to a color program with new surface details.',
      codeLabel: 'Color program',
      success: 'You identified the instruction order, stored response, and displayed values in the new program.',
      cards: [
        {
          id: 'order', type: 'order the code jobs', kind: 'order',
          q: 'Put the code jobs in the order used by the color program.',
          bank: [
            'Compute and display a program value in the console.',
            'Read a value from the console and write it to program state.',
            'Display a prompt for a console value.',
          ],
          correct: [
            'Display a prompt for a console value.',
            'Read a value from the console and write it to program state.',
            'Compute and display a program value in the console.',
          ],
          placeholder: 'tap a code job below',
          why: 'The program asks first, stores the response second, and displays program values afterward.',
        },
        {
          id: 'next', type: 'identify the next instruction', kind: 'choice', mono: true,
          q: 'Line 1 has run. Which instruction runs next?',
          choices: ['string color = Console.ReadLine();', 'Console.WriteLine(color.Length);', 'Console.WriteLine(4 + 2);'],
          correct: 0,
          why: 'A straight-line program continues to line 2, where it retrieves and stores the user\'s response.',
        },
        {
          id: 'state', type: 'fill the evidence row', kind: 'row',
          q: 'The user enters blue. Complete the evidence immediately after line 2 runs.',
          rowLabel: 'after line 2',
          columns: ['moment', 'Program State', 'Console'],
          cells: [
            { col: 'Program State', chips: ['color = "blue"', 'color = "color"', 'empty'], correct: 'color = "blue"' },
            { col: 'Console', chips: ['Type a color: blue', '4', '6'], correct: 'Type a color: blue' },
          ],
          why: 'ReadLine retrieves blue, the declaration writes it to color, and the entered text remains visible in the console.',
        },
        {
          id: 'length', type: 'compute the displayed value', kind: 'chips',
          q: 'What does line 4 display?',
          chips: ['4', 'blue', 'color.Length', '6'],
          correct: '4',
          why: 'color.Length supplies 4, then WriteLine displays it.',
        },
        {
          id: 'expression', type: 'explain the display action', kind: 'choice',
          q: 'Why does line 5 display 6?',
          choices: ['4 + 2 is evaluated first, and WriteLine displays the resulting value.', 'WriteLine stores 6 in color.', 'ReadLine converts 4 + 2 into text.'],
          correct: 0,
          why: 'The operator expression supplies 6. WriteLine displays that value; it does not perform the arithmetic or change color.',
        },
      ],
    },

    exercises: {
      intent: 'Fade support from a labeled trace to independent construction without adding numeric input or Boolean evaluation.',
      intro: 'Record your prediction before running each program. Open the model answer after you finish.',
      problems: [
        {
          n: 1, title: 'Trace a food program', tag: 'guided trace',
          statement: 'Assume the user enters kiwi. Identify the next instruction after line 1, the state after line 2, and the value displayed by line 3.',
          given: [
            'Console.Write("Type a food: ");',
            'string food = Console.ReadLine();',
            'Console.WriteLine(food.Length);',
          ],
          constraints: ['Name the next source line.', 'Record the food binding.', 'Compute the displayed length.'],
          model: ['Next instruction: line 2', 'Program State after line 2: food = "kiwi"', 'Console after line 3: 4'],
          feedback: 'If your trace differs, check the first incorrect line against these code jobs: Display a prompt for a console value. Read a value from the console and write it to program state. Compute and display a program value in the console.',
        },
        {
          n: 2, title: 'Complete a team trace', tag: 'partial trace',
          statement: 'Assume the user enters Owls. Complete the missing Program State and Console evidence.',
          given: [
            'Console.Write("Team: ");',
            'string team = Console.ReadLine();',
            'Console.WriteLine(team);',
            'Console.WriteLine(3 + 4);',
          ],
          constraints: ['Record state after line 2.', 'Predict line 3.', 'Evaluate 3 + 4 before line 4 displays it.'],
          model: ['Program State after line 2: team = "Owls"', 'Line 3 displays: Owls', 'Line 4 displays: 7'],
          feedback: 'A quoted word is text. An unquoted variable supplies its stored value. The operator expression supplies 7 before WriteLine displays it.',
        },
        {
          n: 3, title: 'Repair lost input', tag: 'repair',
          statement: 'The program reads a pet name but cannot use it on the last line. Change only the faulty instruction.',
          given: [
            'Console.Write("Pet: ");',
            'Console.ReadLine();',
            'Console.WriteLine(pet);',
          ],
          constraints: ['Keep the prompt.', 'Store the returned text under pet.', 'Change only line 2.'],
          model: ['string pet = Console.ReadLine();'],
          feedback: 'Read a value from the console and write it to program state. This code job was incomplete: ReadLine retrieved the input, but no declaration wrote it to Program State under pet.',
        },
        {
          n: 4, title: 'Write a snack interaction', tag: 'construction',
          statement: 'Write a program that prompts for a snack, stores the response under snack, displays the stored text, and displays its length.',
          constraints: ['Prompt before reading.', 'Use one string variable named snack.', 'Display snack and snack.Length on separate lines.'],
          model: [
            'Console.Write("Snack: ");',
            'string snack = Console.ReadLine();',
            'Console.WriteLine(snack);',
            'Console.WriteLine(snack.Length);',
          ],
          feedback: 'Check that each canonical code job is present and that the output expressions are evaluated before WriteLine displays them.',
        },
        {
          n: 5, title: 'Create a nickname program', tag: 'independent transfer',
          statement: 'Prompt for a nickname, store it, display its length, and display the result of 6 + 3. Explain what the user enters, what Program State remembers, and what the console displays.',
          constraints: ['Choose clear prompt text.', 'Store the response under nickname.', 'Explain the input and both displayed values.'],
          model: [
            'Console.Write("Nickname: ");',
            'string nickname = Console.ReadLine();',
            'Console.WriteLine(nickname.Length);',
            'Console.WriteLine(6 + 3);',
          ],
          feedback: 'A complete explanation names the entered text, the nickname binding, the computed length, and the final displayed value 9.',
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
