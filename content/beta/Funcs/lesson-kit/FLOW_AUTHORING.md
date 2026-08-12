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
   evidence produced by each executable step.
6. Write the three `mainLesson.acts[]`, one idea per act, then one local check
   per act in `flow.mainLesson.checks[]`.
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
  mainLesson: { title: '', label: 'Main Lesson', intro: '', acts: [] },
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

The page wrapper loads the shared kit, the fixture, and then renders:

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
filename, and use that exact filename in fixture and roadmap links. The same
relative link must work from the source HTTP preview and the generated Pages
output. Cache-bust a roadmap fixture when its destination data changes.

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
- Pre-quiz ordering gates details; all details gate Main Lesson.
- Quiz questions include their own required source, avoid ordinal and
  answer-position cues, and keep reference code at full opacity.
- Each lesson act has one check; later acts stay locked until it is answered.
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
