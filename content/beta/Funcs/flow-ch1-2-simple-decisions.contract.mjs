import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, 'flow-ch1-2-simple-decisions.jsx');
const pagePath = path.join(here, 'Ch1-2-Simple-Decisions-From-Input.html');
const stagesPath = path.join(here, 'lesson-kit', 'flow-lesson-stages.jsx');
const conceptKitPath = path.join(here, 'lesson-kit', 'concept-lesson-kit.jsx');
const activeEvaluationFixturePaths = [
  'flow-ch1-1-boolean-values.jsx',
  'flow-ch1-2-simple-decisions.jsx',
  'tb-ch1-sequence.jsx',
  'tb-ch1-2-sequence.jsx',
  'tb-ch1-v1-sequence.jsx',
  'tb-ch2-sequence.jsx',
  'tb-grammar-proof-sequence.jsx',
].map(name => path.join(here, name));

assert.ok(fs.existsSync(fixturePath), 'Create the C1.2 fixture before this contract can pass.');
assert.ok(fs.existsSync(pagePath), 'Create the C1.2 standalone page before this contract can pass.');

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

function count(source, pattern) {
  return (source.match(pattern) || []).length;
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

const lesson = sandbox.window.CH1_SIMPLE_DECISIONS_LESSON;
assert.ok(lesson, 'The fixture must expose window.CH1_SIMPLE_DECISIONS_LESSON.');
assert.equal(lesson.id, 'ch1-2-simple-decisions-from-input');
assert.equal(lesson.stableUrl, '/ch1/ch1-3.html');
assert.equal(lesson.source, 'ch1/ch1-3.md');

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
    'A.a Retrieve console input.',
    'A.b Create a branching value.',
    'B.a Choose which scope executes.',
  ],
);

const openingLines = lesson.fullExample.code.lines;
assert.equal(openingLines.length, 11);
assert.equal(lesson.fullExample.executionTrace.length, 5);
assert.equal(lesson.fullExample.states.length, 6);
assert.deepEqual(
  Array.from(lesson.fullExample.executionTrace, step => step.rowKey),
  ['ready-line-1', 'ready-line-2', 'ready-line-3', 'ready-line-4', 'ready-line-6'],
  'The yes-input trace must select the first scope and omit the skipped else output row.',
);
assert.deepEqual(
  Array.from(lesson.fullExample.states.at(-1).console),
  ['Ready? (yes/no)', '> yes', 'Ready'],
);
assert.deepEqual(
  Array.from(lesson.fullExample.states.at(3).memory, row => `${row.name}=${row.value}`),
  ['answer="yes"', 'isReady=true'],
);
const comparisonDetail = lesson.fullExample.states.at(3).evalDetail;
assert.ok(comparisonDetail, 'The comparison step must expose reduction/evalDetail data.');
assert.equal(comparisonDetail.layout, 'verticalStack', 'The comparison must evaluate upward before simplifying across.');
assert.ok(comparisonDetail.blocks.length >= 2, 'The comparison must simplify across at least two evaluation blocks.');
assert.equal(Object.hasOwn(comparisonDetail, 'frames'), false, 'The comparison must not use the horizontal frames payload.');
assert.ok(
  comparisonDetail.blocks.some(block => block.levels.length >= 2),
  'The comparison must include an upward evaluation block.',
);
const atomicComparison = sandbox.window.funcsBuildAtomicEvaluationDetail(comparisonDetail);
assert.equal(atomicComparison.revealCount, 5, 'The comparison must use base lookup substitution comparison substitution.');
assert.equal(comparisonDetail.steps.length, atomicComparison.revealCount);
assert.deepEqual(
  Array.from(atomicComparison.blocks, block => block.showAt),
  [0, 2, 4],
  'Right-hand blocks must remain hidden until their substitution actions.',
);
assert.deepEqual(
  Array.from(atomicComparison.blocks[0].levels, level => level.showAt),
  [0, 1],
  'The opening state must show the bottom expression first and the lookup result on the first Next action.',
);
assert.equal(atomicComparison.blocks[0].arrowAfter.showAt, 2);
assert.equal(atomicComparison.blocks[1].levels[1].showAt, 3);
assert.equal(atomicComparison.blocks[1].arrowAfter.showAt, 4);
assert.match(lesson.fullExample.states.at(4).desc, /selects the first scope.*skips the else scope/i);

for (const activeFixturePath of activeEvaluationFixturePaths) {
  const activeFixtureSource = fs.readFileSync(activeFixturePath, 'utf8');
  assert.doesNotMatch(
    activeFixtureSource,
    /\bframes\s*:/,
    `${path.basename(activeFixturePath)} must use verticalStack blocks instead of horizontal frames.`,
  );
}

const mainText = [
  lesson.mainLesson.intro,
  ...lesson.mainLesson.acts.flatMap(act => act.body),
  ...lesson.mainLesson.acts.flatMap(act => act.definitions.flatMap(definition => [definition.term, definition.definition])),
  ...lesson.mainLesson.acts.flatMap(act => act.translations.flatMap(translation => [translation.code, translation.text])),
  ...lesson.mainLesson.acts.flatMap(act => act.recall.cards.flatMap(card => [card.prompt, card.answer])),
].join(' ');
for (const term of [
  'String literals appear inside quotation marks',
  'Console.WriteLine(message)',
  'Console.ReadLine() accepts no arguments',
  'The path execution takes through a program',
  'A Boolean expression that determines whether a scope executes',
  'A region of code bounded by',
  'Exactly one scope executes',
  'Braces, not indentation',
]) {
  assert.match(mainText, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `Main Lesson must include the source-backed definition: ${term}`);
}
assert.equal(lesson.mainLesson.acts.length, 3);
assert.equal(lesson.flow.mainLesson.checks.length, 3, 'Each Main Lesson subsection must end with one attention check.');
assert.match(lesson.flow.mainLesson.intent, /reveal two denser forms only after the jobs are understood/i);
for (const act of lesson.mainLesson.acts) {
  assert.equal(new Set(act.code || []).size, (act.code || []).length, `${act.title} must use unique rendered code rows.`);
}

const forms = lesson.mainLesson.comparisonForms;
assert.deepEqual(Array.from(forms, form => form.id), ['explicit', 'balanced', 'compressed']);
assert.deepEqual(Array.from(forms, form => form.subgoals.length), [3, 2, 1]);
assert.match(forms[1].label, /recommended middle form/i);
assert.match(forms[1].judgment, /recommended/i);
assert.match(forms[2].label, /legal but over-compressed/i);
assert.match(forms[2].judgment, /discouraged.*three code jobs/i);
assert.equal(
  forms[2].subgoals[0],
  'Retrieve console input, create a branching value, and choose which scope executes.',
  'The compressed form must display the truthful but unwieldy combined label.',
);
for (const form of forms) {
  const code = form.code.join('\n');
  assert.equal(count(code, /Console\.ReadLine\(\)/g), 1, `${form.id} must retrieve input exactly once.`);
  assert.equal(count(code, /== "yes"/g), 1, `${form.id} must perform the same comparison exactly once.`);
  assert.match(code, /Console\.WriteLine\("Ready"\)/);
  assert.match(code, /Console\.WriteLine\("Not ready"\)/);
}
assert.match(forms[0].code.join('\n'), /bool isReady = answer == "yes";[\s\S]*if \(isReady\)/);
assert.match(forms[1].code.join('\n'), /string answer = Console\.ReadLine\(\);[\s\S]*if \(answer == "yes"\)/);
assert.match(forms[2].code.join('\n'), /if \(Console\.ReadLine\(\) == "yes"\)/);
assert.match(lesson.mainLesson.acts[2].code.join('\n'), /Choose which scope executes from an input comparison/);
assert.match(lesson.mainLesson.acts[2].code.join('\n'), /Retrieve console input, create a branching value, and choose which scope executes/);

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
const choiceCorrectPositions = quizQuestions.filter(question => question.kind === 'choice').map(question => question.correct);
assert.ok(new Set(choiceCorrectPositions).size >= 3, 'Correct choice positions must vary across the lesson.');
assert.equal(lesson.flow.preQuiz.categories.length, 3);
assert.deepEqual(Array.from(lesson.flow.preQuiz.shuffled), ['chooseScope', 'retrieve', 'branchingValue']);
assert.match(lesson.flow.preQuiz.details.retrieve.why, /WriteLine needs the message argument; ReadLine accepts no arguments/i);
assert.equal(lesson.flow.rigorousQuiz.cards.length, 8);
assert.equal(lesson.flow.exercises.problems.length, 5);
assert.match(lesson.flow.exercises.problems[2].constraints.join(' '), /recommended middle form/i);
assert.match(lesson.flow.exercises.problems[4].constraints.join(' '), /Do not move ReadLine into the condition/i);

const transferCode = lesson.rigorousQuiz.transferCode.lines.map(line => line.text).join('\n');
assert.equal(count(transferCode, /Console\.ReadLine\(\)/g), 1);
assert.match(transferCode, /bool grantsAccess = password == "secret";/);
assert.match(transferCode, /if \(grantsAccess\)/);
assert.match(transferCode, /Console\.WriteLine\("Attempt checked"\);/);

assert.deepEqual(Array.from(lesson.roadmap.sourceAnchors), [
  'ch1-3-ci-001',
  'ch1-3-ci-002',
  'ch1-3-ci-003',
  'ch1-3-ci-004',
  'ch1-3-ci-005',
  'ch1-3-ci-014',
]);

const productionCode = [
  ...openingLines.map(line => line.text),
  ...lesson.rigorousQuiz.transferCode.lines.map(line => line.text),
  ...forms.flatMap(form => form.code),
  ...lesson.flow.exercises.problems.flatMap(problem => problem.model || []),
].join('\n');
assert.doesNotMatch(productionCode, /\|\||\belse\s+if\b|\bwhile\s*\(|\bfor\s*\(|\.ToLower\s*\(|\bstatic\b/, 'Keep C1.2 inside its approved syntax boundary.');

function assertDataOnly(value, trail = 'lesson') {
  if (typeof value === 'function') assert.fail(`${trail} contains a function.`);
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) assertDataOnly(child, `${trail}.${key}`);
}
assertDataOnly(lesson);
assert.doesNotThrow(() => JSON.stringify(lesson));
assert.match(fixtureSource, /Object\.assign\(window,/);
assert.match(stagesSource, /flowValidateLesson/);
assert.match(stagesSource, /FlowDefinitionCallout/);
assert.match(stagesSource, /FlowTranslationCallout/);
assert.match(stagesSource, /FlowLessonRecall/);

assert.match(pageSource, /candidate-shell flow-authoring-canonical/);
assert.match(pageSource, /lesson-kit\/concept-lesson-kit\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/flow-lesson-stages\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /flow-ch1-2-simple-decisions\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/chapter-overview\.css\?v=task-78-2-3/);
assert.match(pageSource, /chapter-overview-fixtures\.jsx\?v=task-78-2/);
assert.match(pageSource, /lesson-kit\/chapter-overview-kit\.jsx\?v=task-78-2/);
assert.match(pageSource, /tb-ch1-sequence\.jsx\?v=task-72-6-1/);
assert.match(pageSource, /className="funcs-edition-page"/);
assert.match(pageSource, /Reading: <strong>Beta<\/strong>/);
assert.match(pageSource, /href="\/ch1\/ch1-3\.html">Switch to Primary<\/a>/);
assert.match(pageSource, /window\.CH1_SIMPLE_DECISIONS_LESSON/);
assert.match(pageSource, /lesson-kit\/concept-lesson-kit\.jsx/);
assert.match(pageSource, /lesson-kit\/flow-lesson-stages\.jsx/);

console.log('C1.2 Simple Decisions from Input fixture contract passed.');
