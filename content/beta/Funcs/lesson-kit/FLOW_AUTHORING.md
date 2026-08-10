# FunCS Flow Lesson Authoring

The data-authored flow is the canonical beta lesson format. A lesson is one
JSON-compatible JavaScript object; shared components render its five stages,
chapter navigation, code, memory, console, questions, and footer controls.

Start from `flow-lesson-template.jsx`. Use
`flow-ch0-1-program-tour.jsx` as the smallest complete beginner lesson and
`tb-ch1-branching.jsx` as the richer branching example.

## Canonical entry points

- `flow-lesson-kit.jsx`: shared question primitives and presentation helpers.
- `flow-lesson-stages.jsx`: the five stage renderers, validator, and
  `FlowLessonSequence`.
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
10. Run `flowValidateLesson(lesson)` and fix every missing path before browser
    review.

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
    goal: {},
    preQuiz: { categories: [], shuffled: [], details: {} },
    mainLesson: { checks: [] },
    rigorousQuiz: { cards: [] },
    exercises: { problems: [] },
  },
};
```

The fixture must not contain React elements, render callbacks, or
lesson-specific components. Arrays, object fields, call frames, and console
values remain data rendered by the shared grammar.

## Validation and preview

The page wrapper loads the shared kit, the fixture, and then renders:

```jsx
<div className="candidate-shell flow-authoring-canonical">
  <div className="candidate-frame">
    <window.FlowLessonSequence lesson={window.LESSON} />
  </div>
</div>
```

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

- All five stage tabs render and stage boundaries use `TBPageSequence`.
- Goal focus precedes executable source steps.
- Code highlighting, memory state, and console output describe the same moment.
- Pre-quiz ordering gates details; all details gate Main Lesson.
- Each lesson act has one check; later acts stay locked until it is answered.
- Rigorous Quiz uses the transfer program and advances one card at a time.
- Exercises are open-ended and do not introduce a new renderer.
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
