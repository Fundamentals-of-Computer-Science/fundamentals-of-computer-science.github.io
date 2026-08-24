# FunCS Flow Lesson Authoring

The data-authored flow is the canonical beta lesson format. A lesson is one
JSON-compatible JavaScript object. Shared components render the standard five
stages, chapter navigation, code, memory, console, questions, and footer
controls. An optional sequence can insert shared Intro pages while retaining
one copy of every canonical stage.

Start from `flow-lesson-template.jsx`. Use
`flow-ch0-1-program-tour.jsx` as the smallest complete beginner lesson and
`tb-ch1-branching.jsx` as the richer branching example.

## Canonical entry points

- `flow-lesson-kit.jsx`: shared question primitives and presentation helpers.
- `flow-lesson-stages.jsx`: the five canonical stage renderers, shared Intro
  renderer, sequence resolver, validator, and `FlowLessonSequence`.
- `flow-lesson.css`: canonical presentation selected through the design-skill
  comparison.
- `flow-lesson-template.jsx`: empty JSON-compatible fixture skeleton.
- Backlog `doc-21`: exported component reference.
- Backlog `doc-22`: authoring contract and workflow.
- Backlog `doc-23`: local preview and browser-verification workflow.

## Write a lesson in this order

1. State the target procedure and learner prerequisites.
2. Name two or three functional goals and reusable subgoals. Avoid labels that
   merely repeat syntax or interface actions.
3. Write `fullExample.code.lines`; give every executable row an `id`, `num`,
   `text`, `subgoal`, and plain-language `translation`.
4. Add `fullExample.code.goals`, `.subgoals`, and a `frame` that groups rows by
   instructional function.
5. Write `fullExample.states[]` and, when execution order matters,
   `fullExample.executionTrace[]`. State and console output must show the
   evidence produced by each executable step. When a state includes expression
   evaluation, author `evalDetail` with the mandatory vertical stepping rule
   below.
6. Write the three `mainLesson.acts[]`, one idea per act, then one local check
   per act in `flow.mainLesson.checks[]`. When an act introduces vocabulary or
   a reusable code reading, add `definitions[]`, displayed `translations[]`,
   and one or two post-check `recall.cards[]`.
7. Write a transfer program with the same procedure and different surface
   details.
8. Write pre-quiz details and rigorous-quiz cards using only the shared
   `choice`, `chips`, `order`, and `row` question shapes.
9. Write five open-ended exercises: warm-up, core work, repair, and transfer.
   Add a concise model answer and feedback when the lesson requires them.
10. Keep the standard five-page sequence unless the approved Chapter Map calls
    for Intro pages. When it does, author `flow.sequence[]` and `flow.intros{}`
    with data only.
11. Run `flowValidateLesson(lesson)` and fix every missing path before browser
    review.

## Evaluation stepping is a mandatory rule

Every `evalDetail` uses one spatial grammar: **evaluate upward, then simplify
across**.

- Opening the detail shows only the complete base expression at the bottom.
- Draw an evaluation bar over the selected term. Each **Next** action reveals
  exactly one immediate result above the previous layer.
- If an upward result is still an expression, keep evaluating upward inside
  the same block.
- On the **Next** action after the upward result is a value or cannot be
  evaluated further, strike + arrow carries that result across and reveals the
  next containing expression.
- A future upward layer, arrow, or right-hand block never appears early.
- Authors order `blocks[]` and `levels[]`; the shared engine derives reveal
  timing. Do not coordinate click behavior with authored `showAt` numbers.
- Use `layout: 'verticalStack'` and `blocks[]`. The horizontal `frames` payload
  is invalid and is rejected by both the shared validator and
  `flowValidateLesson`.
- Supply at least two blocks, at least one block with two or more levels, and
  `arrowAfter` on every non-final block. Supply one `steps[]` caption for the
  opening base, every higher level, and every rightward substitution.
- When a recursive substitution must repeat several waiting context levels in
  the next block, set `baseLevelCount` on that block. It defaults to `1`; the
  opening block always has one base expression.

```js
evalDetail: {
  title: 'Create the branching value',
  sourceLine: 'bool isReady = answer == "yes";',
  steps: [
    { label: 'Start', note: 'Start with the complete declaration.' },
    { label: 'Read', note: 'Read the string value from answer.' },
    { label: 'Substitute', note: 'Substitute the string into the declaration.' },
    { label: 'Compare', note: 'Compare the two string values.' },
    { label: 'Substitute result', note: 'Substitute the Boolean result into the declaration.' },
  ],
  layout: 'verticalStack',
  blocks: [
    {
      levels: [
        {
          expression: 'bool isReady = answer == "yes"',
          evalSpan: [15, 21],
          label: 'var',
          strike: { span: [15, 21] },
        },
        { expression: '"yes"' },
      ],
      arrowAfter: {},
    },
    {
      levels: [
        {
          expression: 'bool isReady = "yes" == "yes"',
          evalSpan: [15, 29],
          label: '==',
          strike: { span: [15, 29] },
        },
        { expression: 'true' },
      ],
      arrowAfter: {},
    },
    {
      levels: [{ expression: 'bool isReady = true' }],
    },
  ],
}
```

The block array records evaluation structure, not source-row timing. The shared
engine converts the ordered structure above into five reveal states: base,
lookup result, substitution, comparison result, and final substitution.

## Standard and extended sequences

When `flow.sequence` is absent, `FlowLessonSequence` renders the standard order:

1. `fullExample`
2. `preQuiz`
3. `mainLesson`
4. `rigorousQuiz`
5. `exercises`

An extended sequence may add any number of `intro` pages. It must keep the
canonical stage order and include each canonical `blockType` exactly once.
Every page needs a unique `id`. Each Intro descriptor names a key from
`flow.intros`:

```js
flow: {
  sequence: [
    { id: 'intro-start', blockType: 'intro', intro: 'start', title: 'How This Lesson Works' },
    { id: 'goal', blockType: 'fullExample' },
    { id: 'intro-pre-quiz', blockType: 'intro', intro: 'preQuiz', title: 'Prepare for the Pre-Quiz' },
    { id: 'pre-quiz', blockType: 'preQuiz' },
    { id: 'main-lesson', blockType: 'mainLesson' },
    { id: 'intro-rigorous-quiz', blockType: 'intro', intro: 'rigorousQuiz', title: 'Try a New Program' },
    { id: 'rigorous-quiz', blockType: 'rigorousQuiz' },
    { id: 'intro-exercises', blockType: 'intro', intro: 'exercises', title: 'Practice Independently' },
    { id: 'exercises', blockType: 'exercises' },
  ],
  intros: {
    start: {
      title: 'How you interact with a program',
      lede: 'Short opening copy.',
      sections: [
        { id: 'interface', title: 'Read the interface', body: ['One paragraph.'] },
      ],
      callout: { label: 'Remember', body: 'One focused note.' },
    },
  },
}
```

Intro sections support authored `body`, `cards`, `steps`, and `code` arrays.
They do not accept React elements, callbacks, or lesson-specific components.

## Required fixture surface

```js
const LESSON = {
  id: '',
  chapterId: '',
  title: '',
  kicker: '',
  learningTarget: '',
  chapterNav: { chapters: [] },
  chapterExamples: [],
  availableSyntax: [],
  fullExample: {
    header: {},
    code: { layout: 'frame', goals: {}, subgoals: {}, frame: [], lines: [], tokens: {} },
    states: [],
    executionTrace: [],
  },
  preQuiz: { title: '', prompt: '' },
  mainLesson: {
    title: '',
    label: 'Main Lesson',
    intro: '',
    acts: [{
      n: 1,
      title: '',
      body: [],
      definitions: [{ term: '', definition: '' }],
      code: [],
      translations: [{ code: '', text: '' }],
      recall: { cards: [{ id: '', prompt: '', answer: '' }] },
    }],
  },
  rigorousQuiz: { title: '', prompt: '', transferCode: { lines: [] } },
  exercises: { title: '', label: 'Exercises', intro: '' },
  flow: {
    // Optional: sequence: [], intros: {},
    goal: {},
    preQuiz: { categories: [], shuffled: [], details: {} },
    mainLesson: { checks: [] },
    rigorousQuiz: { cards: [] },
    exercises: { problems: [] },
  },
};
```

The fixture must not contain React elements, render callbacks, or
lesson-specific components. Arrays, object fields, call frames, Intro content,
and console values remain data rendered by the shared grammar.

## Main Lesson language support

The shared Main Lesson renderer accepts three optional fields on an act:

- `definitions[]` renders a compact definition callout. Put the exact term in
  `term`; the renderer bolds it. Keep `definition` to one direct sentence.
- `translations[]` renders a displayed translation block. Put the source form
  in `code` and its English reading in `text`; the renderer places them on
  separate lines.
- `recall.cards[]` renders one or two unscored flashcards after the act's
  attention check. Each card needs `id`, `prompt`, and `answer`.

The learner answers the attention check before the recall cards appear. The
next act remains locked until every recall answer has been revealed. Recall is
not scored, and correctness never blocks progress. Lessons that do not use
these fields continue to follow the existing attention-check gate.

Definitions and translations support the code-function subgoals; they do not
become subgoals themselves. Keep labels attached to observable code jobs, and
put definition or translation requests in prose, checks, recall cards, and
Exercises.

## Quiz implementation rules

- Make every quiz question self-contained. Include the source needed to answer
  it on the same page through `part1Code`, `contextCode`, or the transfer-code
  block; do not require recall of an earlier example's exact code.
- Use bounded, immediately checkable `choice`, `chips`, `order`, or `row`
  answers. Put broader explanation and reflection in Main Lesson prose or
  Exercises instead of open quiz responses.
- Do not expose labels, ordinals, ordering, or styling that reveals the answer.
  Use `hideOrderOrdinals: true` when subgoal numbers would cue an order task,
  and distribute correct choice indices so the first option is not a default.
- Keep question evidence visually available. Reference and transfer code used
  to answer a quiz stays at full opacity throughout the quiz; never pass an
  empty `runKeys` set merely to make a code block noninteractive. Dimming or
  blurring is reserved for content that is intentionally gated and not needed
  to answer the current question.
- Goals and subgoals describe observable jobs performed by the code. Learner
  directions such as trace, predict, remember, or explain belong in prose,
  prompts, and Exercises rather than code-frame labels.

## Validation and preview

For Chapter 1 and later, the entry HTML loads `chapter-overview.css`,
`chapter-overview-fixtures.jsx`, and `chapter-overview-kit.jsx` before the
concept kit, stage renderer, and lesson fixture. Wrap the lesson in
`.funcs-edition-page`, identify the Beta edition, and link to that lesson's
Primary counterpart. Every lesson in one chapter must use the same shared
chapter-selector fixture so its available lessons, coming-soon lessons, current
marker, and overview link do not change from page to page.

In the chapter selector, an available lesson is one semantic row-level link.
Its number, title, arc label, whitespace, and visible `Open beta` treatment all
open the same exact lesson route, and the row receives the keyboard focus
outline. Do not nest a second link inside that row. A route that is still being
checked or is unavailable remains a non-link row with a disabled `Open beta`
button.

Cross-chapter route tables use absolute, normalized Beta entry routes. Keep
these routes in the shared chapter data, cache-bust every active HTML consumer
when they change, and verify the complete round trip against the generated
site. The source HTTP preview loads components directly from their authored
filenames; Quartz normalizes generated filenames and owns the publishable route
surface.

The page wrapper then renders:

```jsx
<div className="candidate-shell flow-authoring-canonical">
  <div className="candidate-frame">
    <window.FlowLessonSequence lesson={window.LESSON} />
  </div>
</div>
```

Canonical lesson pages are standalone teaching surfaces, so this wrapper fills
the viewport edge to edge. Do not give `.candidate-shell` page padding or make
`.candidate-frame` look like a floating browser window with a maximum width,
rounded corners, border, or drop shadow. The frozen comparison pages keep their
own experiment-specific wrappers.

Give new standalone lesson HTML files their normalized, hyphenated public
filename, and use that exact filename in fixture and roadmap links. Cache-bust
a roadmap or shared navigation fixture when its destination data changes.

`FlowLessonSequence` calls `flowValidateLesson` before rendering. For an
explicit browser check, evaluate:

```js
flowValidateLesson(CH0_PROGRAM_TOUR_LESSON)
// { valid: true, missing: [] }
```

Serve the `content/` directory over HTTP:

```bash
cd /Users/markholcomb/classes/FunCS/content
python3 -m http.server 8123
```

Then open a page under `http://127.0.0.1:8123/beta/Funcs/`. Do not use
`file://`, and do not add a backend.

## Author review checklist

- The standard flow renders five tabs. An approved extended flow renders its
  authored tab count and still contains all five canonical stages.
- Extended sequences use only known `blockType` values, unique IDs, and shared
  data-authored Intro pages.
- Goal focus precedes executable source steps.
- Code highlighting, memory state, and console output describe the same moment.
- Every `evalDetail` opens base-only, reveals one upward result per action, and
  uses a later action for each rightward substitution; no active lesson fixture
  contains a horizontal `frames` payload.
- Pre-quiz ordering gates details; all details gate Main Lesson.
- Quiz questions include their own required source, avoid ordinal and
  answer-position cues, and keep reference code at full opacity.
- Each lesson act has one check. When recall cards are authored, they appear
  after the check and later acts stay locked until every answer is revealed.
- Rigorous Quiz uses the transfer program and advances one card at a time.
- Exercises are open-ended and do not introduce a new renderer.
- Model answers and feedback diagnose the failed code subgoal when they are
  part of the approved content.
- Keyboard focus is visible and controls retain usable touch targets.
- Desktop and 390px views have no page-level horizontal overflow.
- The fixture and touched JSX files parse; the static route and Quartz build pass.

When the fixture contract, shared renderer, page sequence, or authoring workflow
changes, update this guide, `doc-21`, `doc-22`, `doc-23`, and
`FUNCS_FLOW_LESSON_KIT_DOC_BREADCRUMBS` together.

## Co-authoring governance

Use Backlog `doc-27`, **Beta Lesson Co-authoring Playbook Specification**, for
the human-agent approval gates, Lesson Blueprint contract, curriculum map, and
production sequence. The authoritative source dispositions live in the chapter
Coverage Ledgers:

- `doc-28`: Chapter 0 Beta Coverage Ledger.
- `doc-29`: Chapter 1 Beta Coverage Ledger.
- `doc-30`: Chapter 2 Beta Coverage Ledger.
- `doc-31`: Chapter 3 Beta Coverage Ledger.
- `doc-32`: Chapter 4 Beta Coverage Ledger.

Do not begin student-facing prose before the Lesson Blueprint Gate or fixture
implementation before the Authored Content Gate. Proof prototypes demonstrate
renderer and visualizer capability; they do not determine Concept Lesson
boundaries. This governance layer does not change the fixture or renderer
contract described above.
