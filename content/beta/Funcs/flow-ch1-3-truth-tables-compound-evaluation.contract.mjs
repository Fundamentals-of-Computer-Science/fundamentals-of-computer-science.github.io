import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, 'flow-ch1-3-truth-tables-compound-evaluation.jsx');
const pagePath = path.join(here, 'Ch1-3-Truth-Tables-Compound-Evaluation.html');
const stagesPath = path.join(here, 'lesson-kit', 'flow-lesson-stages.jsx');
const conceptKitPath = path.join(here, 'lesson-kit', 'concept-lesson-kit.jsx');

assert.ok(fs.existsSync(fixturePath), 'Create the C1.3 fixture before this contract can pass.');
assert.ok(fs.existsSync(pagePath), 'Create the C1.3 standalone page before this contract can pass.');

function evaluateJsx(filePath, context) {
  const source = fs.readFileSync(filePath, 'utf8');
  const compiled = transformSync(source, {
    loader: 'jsx',
    format: 'iife',
    target: 'es2020',
  }).code;
  vm.runInContext(compiled, context, { filename: filePath });
  return source;
}

function assertDataOnly(value, trail = 'lesson') {
  if (typeof value === 'function') assert.fail(`${trail} contains a function.`);
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) assertDataOnly(child, `${trail}.${key}`);
}

const sandbox = {
  console,
  window: {
    FUNCS_CHAPTERS: [
      { id: 'ch0', label: 'Chapter 0' },
      { id: 'ch1', label: 'Chapter 1' },
    ],
  },
};
const context = vm.createContext(sandbox);
evaluateJsx(conceptKitPath, context);
const stagesSource = evaluateJsx(stagesPath, context);
const fixtureSource = evaluateJsx(fixturePath, context);
const pageSource = fs.readFileSync(pagePath, 'utf8');

const lesson = sandbox.window.CH1_COMPOUND_BOOLEAN_LESSON;
assert.ok(lesson, 'The fixture must expose window.CH1_COMPOUND_BOOLEAN_LESSON.');
assert.equal(lesson.id, 'ch1-3-truth-tables-compound-evaluation');
assert.equal(lesson.title, 'Truth Tables and Compound Evaluation');
assert.equal(lesson.source, 'ch1/ch1-2.md');
assert.equal(lesson.stableUrl, '/ch1/ch1-2.html');
assert.equal(lesson.order, 3);
assert.deepEqual(Array.from(lesson.roadmap.sourceAnchors), [
  'ch1-2-ci-006',
  'ch1-2-ci-008',
  'ch1-2-ci-009',
]);
assert.ok(lesson.roadmap.reviewConcepts.includes('ch1-2-ci-010'));

const validation = sandbox.window.flowValidateLesson(lesson);
assert.equal(validation.valid, true, `Fixture validator failures: ${Array.from(validation.missing).join(', ')}`);
assert.deepEqual(Array.from(validation.missing), []);
assert.equal(Object.hasOwn(lesson.flow, 'sequence'), false, 'Chapter 1 lessons must use the canonical five-stage default.');
assert.deepEqual(
  Array.from(sandbox.window.flowSequenceDescriptors(lesson), stage => stage.blockType),
  ['fullExample', 'preQuiz', 'mainLesson', 'rigorousQuiz', 'exercises'],
);

for (const [actIndex, act] of lesson.mainLesson.acts.entries()) {
  assert.ok(act.definitions.length >= 1, `Main Lesson act ${actIndex + 1} needs at least one definition callout.`);
  assert.ok(act.definitions.every(definition => definition.term && definition.definition), `Main Lesson act ${actIndex + 1} definitions need a bold term and definition.`);
  assert.ok(act.translations.length >= 1, `Main Lesson act ${actIndex + 1} needs at least one displayed translation.`);
  assert.ok(act.translations.every(translation => translation.code && translation.text), `Main Lesson act ${actIndex + 1} translations need code and English text.`);
  assert.ok(act.recall.cards.length >= 1 && act.recall.cards.length <= 2, `Main Lesson act ${actIndex + 1} needs one or two recall cards.`);
  assert.ok(act.recall.cards.every(card => card.prompt && card.answer), `Main Lesson act ${actIndex + 1} recall cards need prompts and answers.`);
}

assert.deepEqual(
  Object.values(lesson.fullExample.subgoals).map(subgoal => `${subgoal.n} ${subgoal.label}`),
  [
    'A.a Initialize the starting Boolean variables.',
    'A.b Create the test Boolean expression.',
    "A.c Display the expression's value.",
  ],
);
assert.deepEqual(
  Array.from(lesson.fullExample.code.frame, segment => segment.subgoal),
  ['initialize', 'createExpression', 'display'],
);

const openingLines = lesson.fullExample.code.lines;
assert.equal(openingLines.length, 8);
assert.deepEqual(
  Array.from(lesson.fullExample.executionTrace, step => step.rowKey),
  ['entry-line-1', 'entry-line-2', 'entry-line-3', 'entry-line-5', 'entry-line-8'],
);
assert.equal(lesson.fullExample.states.length, 6);
assert.deepEqual(
  Array.from(lesson.fullExample.states.at(-1).console),
  ['True'],
);
assert.deepEqual(
  Array.from(lesson.fullExample.states.at(4).memory, row => `${row.name}=${row.value}`),
  ['hasBadge=true', 'knowsCode=false', 'doorLocked=false', 'canEnter=true'],
);

const detail = lesson.fullExample.states.at(4).evalDetail;
assert.ok(detail, 'The compound declaration must expose reduction/evalDetail data.');
assert.equal(detail.layout, 'verticalStack');
assert.equal(Object.hasOwn(detail, 'frames'), false, 'The evaluation must not use horizontal frames.');
assert.equal(detail.blocks.length, 5);
assert.equal(detail.steps.length, 10);
assert.equal(detail.blocks[0].levels.at(-1).expression, 'true  (knowsCode skipped)');
assert.ok(
  detail.blocks.slice(1).every(block => block.levels.every(level => !level.expression.includes('knowsCode'))),
  'The skipped knowsCode read must not appear as later executed work.',
);
assert.equal(
  detail.blocks.at(-1).levels[0].expression,
  'bool canEnter = true',
);
for (const block of detail.blocks) {
  for (const definition of [block, ...block.levels, block.arrowAfter].filter(Boolean)) {
    assert.equal(Object.hasOwn(definition, 'showAt'), false, 'The shared engine, not the fixture, must own reveal timing.');
  }
}
const atomicDetail = sandbox.window.funcsBuildAtomicEvaluationDetail(detail);
assert.equal(atomicDetail.revealCount, 10);
assert.deepEqual(Array.from(atomicDetail.blocks, block => block.showAt), [0, 3, 5, 7, 9]);
assert.deepEqual(
  Array.from(atomicDetail.blocks[0].levels, level => level.showAt),
  [0, 1, 2],
);
assert.deepEqual(
  Array.from(atomicDetail.blocks.slice(0, -1), block => block.arrowAfter.showAt),
  [3, 5, 7, 9],
);
const detailValidation = sandbox.window.funcsValidateStackedEvaluationDetail(detail);
assert.equal(detailValidation.valid, true, detailValidation.missing.join(', '));

assert.equal(lesson.mainLesson.acts.length, 3);
assert.equal(lesson.flow.mainLesson.checks.length, 3);
const mainText = [
  lesson.mainLesson.intro,
  ...lesson.mainLesson.acts.flatMap(act => act.body),
  ...lesson.mainLesson.acts.flatMap(act => act.definitions.flatMap(definition => [definition.term, definition.definition])),
  ...lesson.mainLesson.acts.flatMap(act => act.translations.flatMap(translation => [translation.code, translation.text])),
  ...lesson.mainLesson.acts.flatMap(act => act.recall.cards.flatMap(card => [card.prompt, card.answer])),
].join(' ');
for (const term of [
  'An operator with one input',
  'An operator with two input positions',
  'lists every possible input combination',
  'inclusive OR',
  '! groups first, && groups next, and || groups last',
  'Precedence describes structure',
  'short-circuit',
  'Initialization and operand evaluation occur at different moments',
]) {
  assert.match(mainText, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `Main Lesson must include: ${term}`);
}
assert.match(lesson.mainLesson.acts[0].code.join('\n'), /true\s+true\s+true\s+\/\/ inclusive OR/);
assert.deepEqual(Array.from(lesson.mainLesson.acts[1].code), [
  'false || !false && true',
  'false || true && true',
  'false || true',
  'true',
]);

const supportedKinds = new Set(['choice', 'chips', 'order', 'row']);
const quizQuestions = [
  ...Object.values(lesson.flow.preQuiz.details),
  ...lesson.flow.mainLesson.checks,
  ...lesson.flow.rigorousQuiz.cards,
];
for (const question of quizQuestions) {
  assert.ok(supportedKinds.has(question.kind), `Unsupported quiz kind: ${question.kind}`);
  assert.doesNotMatch(question.q, /\bexplain\b/i, `Quiz prompt must be immediately answerable: ${question.q}`);
}
assert.equal(lesson.flow.preQuiz.categories.length, 3);
assert.equal(lesson.flow.preQuiz.hideOrderOrdinals, true);
assert.deepEqual(
  Array.from(lesson.flow.preQuiz.categories, category => category.label),
  [
    'Initialize the starting Boolean variables.',
    'Create the test Boolean expression.',
    "Display the expression's value.",
  ],
);
assert.equal(lesson.flow.rigorousQuiz.cards.length, 5);
assert.deepEqual(
  Array.from(lesson.flow.rigorousQuiz.cards[0].cells, cell => cell.correct),
  ['true', 'false', 'false'],
);
assert.deepEqual(
  Array.from(lesson.flow.rigorousQuiz.cards[3].cells, cell => cell.correct),
  ['true', 'True'],
);
assert.equal(lesson.flow.rigorousQuiz.cards[4].choices[lesson.flow.rigorousQuiz.cards[4].correct], 'overrideActive');

assert.equal(lesson.flow.exercises.problems.length, 5);
assert.match(lesson.flow.exercises.problems[0].given.join('\n'), /A\.a Initialize.*A\.b Create.*A\.c Display/s);
assert.match(lesson.flow.exercises.problems[2].feedback, /grouping.*short-circuit/i);
const discovery = lesson.flow.exercises.problems[3];
assert.match(discovery.given.join('\n'), /!\(a && b\).*!a \|\| !b/);
assert.match(discovery.given.join('\n'), /!\(a \|\| b\).*!a && !b/);
assert.match(discovery.model.join('\n'), /De Morgan's laws/);
assert.match(discovery.model.join('\n'), /negates each input and swaps && with \|\|/);
const deMorganAnd = [];
const deMorganOr = [];
for (const a of [false, true]) {
  for (const b of [false, true]) {
    deMorganAnd.push(!(a && b) === (!a || !b));
    deMorganOr.push(!(a || b) === (!a && !b));
  }
}
assert.deepEqual(deMorganAnd, [true, true, true, true]);
assert.deepEqual(deMorganOr, [true, true, true, true]);
assert.deepEqual(Array.from(lesson.flow.exercises.problems[4].model.slice(0, 2)), [
  '!ready || !verified',
  '!blocked && !expired',
]);

const authoredCode = [
  ...openingLines.map(line => line.text),
  ...lesson.rigorousQuiz.transferCode.lines.map(line => line.text),
  ...lesson.mainLesson.acts.flatMap(act => act.code || []),
  ...lesson.flow.exercises.problems.flatMap(problem => [...(problem.given || []), ...(problem.model || [])]),
].join('\n');
assert.doesNotMatch(authoredCode, /\bif\s*\(|\bwhile\s*\(|\bfor\s*\(|\bstatic\s+\w+|Console\.ReadLine/, 'Keep C1.3 inside its approved syntax boundary.');
assert.match(authoredCode, /\|\|/);
assert.match(authoredCode, /&&/);
assert.match(authoredCode, /!/);

assertDataOnly(lesson);
assert.doesNotThrow(() => JSON.stringify(lesson));
assert.match(fixtureSource, /Object\.assign\(window,/);
assert.match(stagesSource, /FuncsStackedEvaluationDetail/);
assert.match(stagesSource, /FlowDefinitionCallout/);
assert.match(stagesSource, /FlowTranslationCallout/);
assert.match(stagesSource, /FlowLessonRecall/);
assert.match(pageSource, /candidate-shell flow-authoring-canonical/);
assert.match(pageSource, /lesson-kit\/concept-lesson-kit\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/flow-lesson-stages\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /flow-ch1-3-truth-tables-compound-evaluation\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/chapter-overview\.css\?v=task-78-2-3/);
assert.match(pageSource, /chapter-overview-fixtures\.jsx\?v=task-78-2/);
assert.match(pageSource, /lesson-kit\/chapter-overview-kit\.jsx\?v=task-78-2/);
assert.match(pageSource, /tb-ch1-sequence\.jsx\?v=task-72-6-1/);
assert.match(pageSource, /className="funcs-edition-page"/);
assert.match(pageSource, /Reading: <strong>Beta<\/strong>/);
assert.match(pageSource, /href="\/ch1\/ch1-2\.html">Switch to Primary<\/a>/);
assert.match(pageSource, /FlowLessonSequence lesson=\{window\.CH1_COMPOUND_BOOLEAN_LESSON\}/);

console.log('C1.3 truth tables and compound evaluation contract passed.');
