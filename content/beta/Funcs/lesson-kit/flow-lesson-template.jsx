/* flow-lesson-template.jsx — copy this, rename it, fill it in.
   A lesson is one JSON-compatible object; the flow kit draws every screen.
   Read FLOW_AUTHORING.md and Backlog doc-22 alongside this template.
   Run flowValidateLesson(LESSON) after flow-lesson-stages.jsx loads. */

const TEMPLATE_GOALS = {
  // Two or three top-level goals. n is the letter shown in the code pane.
  first: { id: 'first', n: 'A', label: '', gloss: '' },
  second: { id: 'second', n: 'B', label: '', gloss: '' },
};

const TEMPLATE_SUBGOALS = {
  // Every code line points at one of these. n reads as "A.a", "A.b", "B.a"...
  step1: { id: 'step1', n: 'A.a', label: '', gloss: '', goal: 'first' },
  step2: { id: 'step2', n: 'A.b', label: '', gloss: '', goal: 'first' },
  step3: { id: 'step3', n: 'B.a', label: '', gloss: '', goal: 'second' },
};

const TEMPLATE_CODE = {
  layout: 'frame',            // 'frame' groups lines under their subgoal labels
  goals: TEMPLATE_GOALS,
  subgoals: TEMPLATE_SUBGOALS,
  frame: [
    { kind: 'seg', subgoal: 'step1' },
    { kind: 'seg', subgoal: 'step2' },
    // A block that owns indented lines:
    // { kind: 'wrap', subgoal: 'step3', header: 'line-3', footer: 'line-close',
    //   hint: 'owns the lines below', body: [{ kind: 'seg', subgoal: 'step4' }] },
    { kind: 'seg', subgoal: 'step3' },
  ],
  lines: [
    { id: 'line-1', num: '1', indent: 0, text: '', subgoal: 'step1', translation: '' },
    { id: 'line-2', num: '2', indent: 0, text: '', subgoal: 'step2', translation: '' },
    { id: 'line-3', num: '3', indent: 0, text: '', subgoal: 'step3', translation: '',
      // optional pill on the line itself:
      // badge: 'condition', badgeBg: '#fef3c7', badgeBorder: '#fcd34d', badgeColor: '#92400e',
    },
  ],
  tokens: {
    // token text → { tone: 'type' | 'name' | 'op' | 'value' | 'call', description }
  },
};

const TEMPLATE_TRANSFER_CODE = {
  // Same shape as the example, different values — and ideally the opposite outcome.
  lines: [
    { id: 'tr-1', num: '1', text: '' },
  ],
};

const TEMPLATE_LESSON = {
  id: '',
  chapterId: '',
  source: '',                 // authoring source, e.g. 'ch1/ch1-3.md'
  stableUrl: '',
  order: 1,
  title: '',
  kicker: '',
  learningTarget: '',
  roadmap: { order: 1, sourceAnchors: [], reviewConcepts: [] },
  availableSyntax: [
    { group: '', items: [{ term: '', note: '', source: '' }] },
  ],
  chapterNav: { chapters: window.FUNCS_CHAPTERS || [] },
  chapterExamples: [],

  fullExample: {
    header: {
      chapterLabel: '',
      exampleTitle: '',
      modeLabel: 'Full walkthrough',
      instructions: '',
      programLabel: 'Program.cs',
      programNote: '',
    },
    code: TEMPLATE_CODE,
    subgoals: TEMPLATE_SUBGOALS,
    states: [
      { label: 'Before execution', desc: '', memory: [], console: [] },
      { label: 'After line 1', desc: '', memory: [{ name: '', type: '', value: '' }], console: [] },
    ],
  },

  preQuiz: { title: 'Pre-Quiz', prompt: '' },

  mainLesson: {
    title: '',
    label: 'Main Lesson',
    intro: '',
    acts: [
      { n: 1, title: '', body: ['', ''], code: [''], translations: [''] },
      { n: 2, title: '', body: ['', ''], code: [''], translations: [''] },
      { n: 3, title: '', body: ['', ''], code: [''], translations: [''] },
    ],
  },

  rigorousQuiz: { title: 'Rigorous Quiz', prompt: '', transferCode: TEMPLATE_TRANSFER_CODE },

  exercises: { title: '', label: 'Exercises', intro: '' },

  /* Everything below is what the revised flow adds. */
  flow: {
    /* Omit sequence and intros for the standard five-page lesson. Chapter 0
       uses a data-only sequence like the one below, with exactly one of each
       canonical blockType and any number of shared intro pages.

    sequence: [
      { id: 'intro-start', blockType: 'intro', intro: 'start', kicker: 'Start', title: 'How This Lesson Works' },
      { id: 'goal', blockType: 'fullExample' },
      { id: 'intro-pre-quiz', blockType: 'intro', intro: 'preQuiz', kicker: 'Prepare', title: 'How to Answer the Pre-Quiz' },
      { id: 'pre-quiz', blockType: 'preQuiz' },
      { id: 'main-lesson', blockType: 'mainLesson' },
      { id: 'intro-rigorous-quiz', blockType: 'intro', intro: 'rigorousQuiz', kicker: 'Prepare', title: 'Try the Same Procedure' },
      { id: 'rigorous-quiz', blockType: 'rigorousQuiz', title: 'Post-Reading Quiz' },
      { id: 'intro-exercises', blockType: 'intro', intro: 'exercises', kicker: 'Prepare', title: 'Practice Independently' },
      { id: 'exercises', blockType: 'exercises' },
    ],
    intros: {
      start: {
        title: '', lede: '', nextLabel: '',
        sections: [{ id: '', title: '', body: [''], cards: [{ label: '', body: '' }], steps: [{ label: '', body: '' }], code: [''] }],
        callout: { label: '', body: '' },
      },
    },
    */

    goal: {
      intent: '',                       // review-only note; drop in production
      badge: 'Full walkthrough',
      activeGoal: 'first',
      activeSubgoal: 'step1',
      activeKey: 'line-1',
      startLabel: 'Continue — start running',
      startStatus: 'goal · nothing has run',
      runLabel: 'Run next line',
      note: '',
    },

    preQuiz: {
      intent: '',
      kicker: 'Pre-Quiz · ',
      part1Prompt: '',
      part2Prompt: 'The order is set. Open each category and answer its one question.',
      orderSuccess: '',
      orderRetry: 'Red rows carry the reason they belong elsewhere.',
      categories: [                     // written in the CORRECT run order
        { id: 'step1', n: 'A.a', label: '', why: '' },
        { id: 'step2', n: 'A.b', label: '', why: '' },
        { id: 'step3', n: 'B.a', label: '', why: '' },
      ],
      shuffled: ['step3', 'step1', 'step2'],
      details: {
        step1: { type: 'pick line', kind: 'choice', mono: true, q: '', choices: ['', '', ''], correct: 0, why: '' },
        step2: { type: 'fill the value', kind: 'chips', q: '', chips: ['', ''], correct: '', why: '' },
        step3: { type: 'predict output', kind: 'chips', q: '', chips: ['', ''], correct: '', why: '' },
      },
    },

    mainLesson: {
      intent: '',
      completeNote: 'Every check was answered, so the whole page is now readable end to end for review.',
      checks: [                         // one per act, in order
        { type: 'multiple choice', kind: 'choice', mono: true, q: '', choices: ['', '', ''], correct: 0, why: '' },
        { type: 'fill the value', kind: 'chips', q: '', chips: ['', ''], correct: '', why: '' },
        { type: 'multiple choice', kind: 'choice', q: '', choices: ['', '', ''], correct: 0, why: '' },
      ],
    },

    rigorousQuiz: {
      intent: '',
      codeLabel: 'Transfer program',
      success: '',
      cards: [
        { id: 'order', type: 'order the lines', kind: 'order', q: '',
          bank: [''], correct: [''], placeholder: 'tap a line below', why: '' },
        { id: 'pick', type: 'pick the line', kind: 'choice', mono: true, q: '', choices: ['', '', ''], correct: 0, why: '' },
        { id: 'row', type: 'fill the trace row', kind: 'row', q: '', rowLabel: '',
          columns: ['', '', ''], cells: [{ col: '', chips: [''], correct: '' }], why: '' },
        { id: 'value', type: 'predict the value', kind: 'chips', q: '', chips: [''], correct: '', why: '' },
        { id: 'why', type: 'explain why', kind: 'choice', q: '', choices: ['', '', ''], correct: 0, why: '' },
      ],
    },

    exercises: {
      intent: '',
      intro: '',
      problems: [
        { n: 1, title: '', tag: 'warm-up', statement: '', given: [''], constraints: ['', '', ''], model: [''], feedback: '' },
        { n: 2, title: '', tag: 'core', statement: '', example: { in: '', out: '' }, constraints: ['', '', ''], model: [''], feedback: '' },
        { n: 3, title: '', tag: 'core', statement: '', example: { in: '', out: '' }, constraints: ['', '', ''], model: [''], feedback: '' },
        { n: 4, title: '', tag: 'core', statement: '', given: [''], constraints: ['', '', ''], model: [''], feedback: '' },
        { n: 5, title: '', tag: 'stretch', statement: '', example: { in: '', out: '' }, constraints: ['', '', ''], model: [''], feedback: '' },
      ],
    },
  },
};

Object.assign(window, { TEMPLATE_LESSON });
