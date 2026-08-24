/* chapter-overview-fixtures.jsx - shared student-facing Beta chapter overview data */

const CH1_BETA_CHAPTER_OVERVIEW = {
  id: 'chapter-1',
  number: 1,
  eyebrow: 'Chapter 1',
  title: 'Booleans',
  promise: 'Use true and false values to represent program state, make decisions, control repetition, and define Boolean operations.',
  introduction: [
    'This is your first chapter of real code. We begin with the simplest type: the Boolean.',
    'A Boolean can hold only true or false, but those two values let a program remember what is happening, choose what to do next, and decide whether to keep going.',
  ],
  firstLessonBridge: 'Begin by making Boolean state visible: store a result, compute with it, and print the evidence to the console.',
  primaryRoute: '/ch1/',
  betaOverviewRoute: '/beta/Funcs/Ch1-Chapter-Overview.html',
  lessons: [
    {
      id: 'c1-1',
      number: 1,
      title: 'Boolean Values, State, and Visible Results',
      shortTitle: 'Values and visible state',
      learningTarget: 'Produce Boolean values, store and copy them, evaluate simple Boolean computations, compare terms, and display program state in the console.',
      concepts: ['true and false', 'bool variables', 'comparisons', 'Console.WriteLine'],
      arc: 'Represent state',
      betaRoute: '/beta/Funcs/Ch1-1-Boolean-Values-State-Visible-Results.html',
      primaryRoute: '/ch1/ch1-1.html',
    },
    {
      id: 'c1-2',
      number: 2,
      title: 'Simple Decisions from Input',
      shortTitle: 'Decisions from input',
      learningTarget: 'Read and store input, compare it to produce a Boolean value, and use that stored result to choose a one-way or two-way branch.',
      concepts: ['input', 'stored conditions', 'if', 'if / else'],
      arc: 'Make decisions',
      betaRoute: '/beta/Funcs/Ch1-2-Simple-Decisions-From-Input.html',
    },
    {
      id: 'c1-3',
      number: 3,
      title: 'Truth Tables and Compound Evaluation',
      shortTitle: 'Compound evaluation',
      learningTarget: 'Construct truth tables, evaluate grouped Boolean expressions, and determine which operands execute during short-circuit evaluation.',
      concepts: ['operator inputs', 'truth tables', 'grouping', 'short-circuit evaluation'],
      arc: 'Combine conditions',
      betaRoute: '/beta/Funcs/Ch1-3-Truth-Tables-Compound-Evaluation.html',
    },
    {
      id: 'c1-4',
      number: 4,
      title: 'Ordered and Nested Decisions',
      shortTitle: 'Ordered decisions',
      learningTarget: 'Choose the first matching ordered branch, trace dependent decisions, and compare nesting with compound guards that preserve the same behavior.',
      concepts: ['else if', 'branch order', 'nesting', 'compound guards'],
      arc: 'Structure decisions',
      betaRoute: '/beta/Funcs/Ch1-4-Ordered-Nested-Decisions.html',
    },
    {
      id: 'c1-5',
      number: 5,
      title: 'Boolean Loops and Progress',
      shortTitle: 'Loops and progress',
      learningTarget: 'Establish guard state, evaluate it, run the body when true, update every value the guard depends on, and evaluate the guard again.',
      concepts: ['loop guards', 'body', 'state updates', 'termination'],
      arc: 'Control repetition',
      betaRoute: '/beta/Funcs/Ch1-5-Boolean-Loops-Progress.html',
    },
    {
      id: 'c1-6',
      number: 6,
      title: 'Boolean Methods and Operations',
      shortTitle: 'Methods and operations',
      learningTarget: 'Trace a Boolean method call and return, define interfaces with different inputs and result types, and build and verify new Boolean operations.',
      concepts: ['method calls', 'parameters', 'returns', 'Boolean operations'],
      arc: 'Define operations',
      betaRoute: '/beta/Funcs/Ch1-6-Boolean-Methods-Operations.html',
    },
  ],
};

const FUNCS_BETA_CHAPTER_OVERVIEWS = {
  ch1: CH1_BETA_CHAPTER_OVERVIEW,
};

Object.assign(window, {
  CH1_BETA_CHAPTER_OVERVIEW,
  FUNCS_BETA_CHAPTER_OVERVIEWS,
});
