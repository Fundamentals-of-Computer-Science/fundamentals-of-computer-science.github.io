/* flow-ch2-4-authoring.jsx — Ch2.4 Recursive Numeric Methods, expressed as authored data
   for the revised flow. No components here: every screen the reader sees is produced by
   the flow kit from the object below. */

const CH2_4_FLOW = {
  goal: {
    intent: 'Reverted to the shipped ch2.4 walkthrough. The only change: while nothing has executed the primary button reads Continue in reading tone; it becomes Run next line the moment execution starts. Goal and subgoal labels stay where they already are — outside the code, never inside a line — and no new color is introduced.',
    badge: 'Full walkthrough',
    activeGoal: 'define',
    activeSubgoal: 'signature',
    activeKey: 'rec-line-1',
    startLabel: 'Continue — start running',
    startStatus: 'goal · nothing has run',
    runLabel: 'Run next line',
    note: 'the footer says Continue, not Run — nothing executes until the learner leaves the goal',
  },

  preQuiz: {
    intent: 'Part 1 asks only for the shape: put the categories in the order they run. Part 2 opens each category — now sitting in a sequence the learner already committed to — and asks one detail question in whatever form suits it (pick a line, multiple choice, fill a value, predict output).',
    kicker: 'Pre-Quiz · Recursive Numeric Methods',
    part1Prompt: 'Put the four categories in the order they run when this program executes. Guessing is fine — the walkthrough revisits every one.',
    part2Prompt: 'The order is set. Open each category and answer its one question.',
    orderSuccess: 'That is the shape: one call goes down through recursive cases, the base case stops it, the value comes back up, then it is reported. Part 2 fills in the details.',
    orderRetry: 'Red rows carry the reason they belong elsewhere. Fix your picture of the order, then move to the details.',
    categories: [
      { id: 'call', n: 'B.a', label: 'Kick off the recursion', why: 'Nothing recursive happens until the first call runs.' },
      { id: 'recursive', n: 'A.c', label: 'Reduce to a smaller problem', why: 'Each call hits the recursive case and asks for a smaller problem.' },
      { id: 'base', n: 'A.b', label: 'Handle the base case', why: 'The chain only stops when a call reaches the base case.' },
      { id: 'report', n: 'B.b', label: 'Report the result', why: 'Printing happens after the returned value comes back up.' },
    ],
    shuffled: ['base', 'report', 'call', 'recursive'],
    details: {
      call: {
        type: 'pick line', kind: 'choice', mono: true,
        q: 'Which line starts the chain?',
        choices: ['static int SumTo(int n) {', 'int answer = SumTo(3);', 'Console.WriteLine(answer);'], correct: 1,
        why: 'The method only exists until something calls it. SumTo(3) is that call.',
      },
      recursive: {
        type: 'multiple choice', kind: 'choice', mono: true,
        q: 'SumTo(3) returns an expression, not a value yet. Which expression?',
        choices: ['3 + SumTo(2)', '3', 'SumTo(2) - 1'], correct: 0,
        why: 'The recursive case returns n + SumTo(n - 1), so the work waits on a smaller call.',
      },
      base: {
        type: 'fill the value', kind: 'chips',
        q: 'SumTo(0) returns which value?',
        chips: ['0', '1', '3', '6'], correct: '0',
        why: 'The base case returns 0 immediately, with no further call.',
      },
      report: {
        type: 'predict output', kind: 'chips',
        q: 'What does the program print?',
        chips: ['6', '3', '0', '(no output)'], correct: '6',
        why: '3 + 2 + 1 + 0 collapses to 6, and that value is what gets printed.',
      },
    },
  },

  mainLesson: {
    intent: 'One page, one scroll. The reading below the current check stays on screen but blurred and inert — the learner can see how much lesson is left without being able to jump it. Answering unlocks; being wrong only adds an explanation.',
    completeNote: 'Every check was answered, so the whole page is now readable end to end for review.',
    checks: [
      {
        type: 'multiple choice', kind: 'choice', mono: true,
        q: 'Which line gives the chain a bottom?',
        choices: ['if (n == 0) return 0;', 'return n + SumTo(n - 1);', 'int answer = SumTo(3);'], correct: 0,
        why: 'It returns without calling SumTo again — that is what a base case is.',
      },
      {
        type: 'fill the value', kind: 'chips',
        q: 'With n = 3, the recursive case returns 3 + SumTo( ? ).',
        chips: ['2', '3', '4', '0'], correct: '2',
        why: 'The argument must move toward the base case, so it is n - 1.',
      },
      {
        type: 'multiple choice', kind: 'choice',
        q: 'Which value is substituted into a waiting expression first?',
        choices: ['0, returned by SumTo(0)', '6, the final answer', '3, the original argument'], correct: 0,
        why: 'The deepest call finishes first, so its 0 is the first value that can replace a call.',
      },
    ],
  },

  rigorousQuiz: {
    intent: 'Volume kept, friction removed: no letter tokens, no wall of empty cells. Each question is scoped to one moment of the trace and uses the assessment type that fits it — ordering, picking a line, filling a row, predicting a value, explaining why.',
    success: 'Full marks: call order, cases, the waiting expression, and the collapsed value all line up.',
    cards: [
      {
        id: 'order', type: 'order the calls', kind: 'order',
        q: 'Order the calls in the order they are made.',
        bank: ['ProductTo(2)', 'ProductTo(1)', 'ProductTo(3)'],
        correct: ['ProductTo(3)', 'ProductTo(2)', 'ProductTo(1)'],
        placeholder: 'tap a call below',
        why: 'The first call is made from the assignment, and each call asks for n - 1.',
      },
      {
        id: 'base', type: 'pick the line', kind: 'choice', mono: true,
        q: 'Which line stops this method from calling itself again?',
        choices: ['static int ProductTo(int n) {', 'if (n == 1) return 1;', 'return n * ProductTo(n - 1);'], correct: 1,
        why: 'It returns a value with no further call — the base case.',
      },
      {
        id: 'row', type: 'fill the trace row', kind: 'row',
        q: 'Fill the row for the second call.',
        rowLabel: 'ProductTo(2)',
        columns: ['call', 'n', 'returns'],
        cells: [
          { col: 'n', chips: ['3', '2', '1'], correct: '2' },
          { col: 'returns', chips: ['2 * ProductTo(1)', '3 * ProductTo(2)', '1'], correct: '2 * ProductTo(1)' },
        ],
        why: 'With n = 2, the recursive case returns 2 * ProductTo(1) and waits.',
      },
      {
        id: 'output', type: 'predict the value', kind: 'chips',
        q: 'What does product hold when the chain finishes?',
        chips: ['6', '3', '1', '(nothing)'], correct: '6',
        why: '3 * 2 * 1 collapses upward to 6.',
      },
      {
        id: 'why', type: 'explain why', kind: 'choice',
        q: 'Which fact stops the recursive calls?',
        choices: ['ProductTo(1) is the base case', 'ProductTo(3) is the base case', 'Multiplication automatically stops recursion'], correct: 0,
        why: 'Only a base case ends a chain; the operator has nothing to do with stopping.',
      },
    ],
  },

  exercises: {
    intent: 'Exercises are stated, not staged. Each problem is numbered, self-contained, and written the way a quiz or a coding-site prompt is written: what to produce, one worked example, and the constraints an answer must satisfy. No blanks, no chips, no inline grading.',
    problems: [
      {
        n: 1, title: 'Name the cases', tag: 'warm-up',
        statement: 'A recursive method is given below. Identify the line that ends the chain of calls, the line that continues it, and state how the argument changes between calls.',
        given: ['static int SumTo(int n) {', '    if (n == 0) return 0;', '    return n + SumTo(n - 1);', '}'],
        constraints: ['Quote the base-case line exactly.', 'Quote the recursive-case line exactly.', 'State in one sentence why the argument reaches the base case.'],
      },
      {
        n: 2, title: 'Trace the returns', tag: 'core',
        statement: 'Trace SumTo(4) by hand. Write every call in the order it is made, then write each returned value as it is substituted back into the expression that was waiting on it.',
        example: { in: 'SumTo(4)', out: '10' },
        constraints: ['Show all five calls, down to the base case.', 'Show each substitution as a separate line.', 'End with the single value bound to the caller.'],
      },
      {
        n: 3, title: 'Count down', tag: 'core',
        statement: 'Write a recursive method CountDown(int n) that prints each number from n down to 1, one per line, and prints nothing when n is 0 or less. It must not use a loop.',
        example: { in: 'CountDown(3)', out: '3\n2\n1' },
        constraints: ['Exactly one base case.', 'Exactly one recursive call.', 'No while or for statement.'],
      },
      {
        n: 4, title: 'Repair the chain', tag: 'core',
        statement: 'The method below never finishes. State what happens when it runs, name the missing piece, and rewrite the method so it returns the correct sum.',
        given: ['static int SumTo(int n) {', '    return n + SumTo(n - 1);', '}'],
        example: { in: 'SumTo(3)', out: '6' },
        constraints: ['Describe the failure in terms of calls, not just "it crashes".', 'Add the smallest change that fixes it.', 'State the value your fixed method returns for SumTo(0).'],
      },
      {
        n: 5, title: 'Product instead of sum', tag: 'stretch',
        statement: 'Write ProductTo(int n) that returns the product of every whole number from n down to 1. Then state what your method returns for ProductTo(0) and justify the choice.',
        example: { in: 'ProductTo(4)', out: '24' },
        constraints: ['Base case must return a value that keeps the multiplication correct.', 'One recursive call only.', 'Justify the ProductTo(0) result in one sentence.'],
      },
    ],
  },
};

const CH2_4_FLOW_LESSON = { ...window.CH2_RECURSION_LESSON, flow: CH2_4_FLOW };

Object.assign(window, { CH2_4_FLOW, CH2_4_FLOW_LESSON });
