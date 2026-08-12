import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, 'flow-ch1-1-boolean-values.jsx');
const pagePath = path.join(here, 'Ch1-1-Boolean-Values-State-Visible-Results.html');
const roadmapPath = path.join(here, 'tb-ch1-v1-sequence.jsx');
const roadmapPagePath = path.join(here, 'Ch1 Roadmap.html');
const betaIndexPath = path.join(here, '..', 'index.md');
const presentationPath = path.join(here, 'lesson-kit', 'flow-lesson.css');
const stagesPath = path.join(here, 'lesson-kit', 'flow-lesson-stages.jsx');
const flowKitPath = path.join(here, 'lesson-kit', 'flow-lesson-kit.jsx');
const conceptKitPath = path.join(here, 'lesson-kit', 'concept-lesson-kit.jsx');

assert.ok(fs.existsSync(fixturePath), 'Create flow-ch1-1-boolean-values.jsx before this contract can pass.');

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
const stagesSource = evaluateJsx(stagesPath, context);
const fixtureSource = evaluateJsx(fixturePath, context);
const pageSource = fs.readFileSync(pagePath, 'utf8');
const roadmapSource = fs.readFileSync(roadmapPath, 'utf8');
const roadmapPageSource = fs.readFileSync(roadmapPagePath, 'utf8');
const betaIndexSource = fs.readFileSync(betaIndexPath, 'utf8');
const presentationSource = fs.readFileSync(presentationPath, 'utf8');
const flowKitSource = fs.readFileSync(flowKitPath, 'utf8');
const conceptKitSource = fs.readFileSync(conceptKitPath, 'utf8');

const lesson = sandbox.window.CH1_BOOLEAN_VALUES_LESSON;
assert.ok(lesson, 'The fixture must expose window.CH1_BOOLEAN_VALUES_LESSON.');

const validation = sandbox.window.flowValidateLesson(lesson);
assert.equal(validation.valid, true, `Fixture validator failures: ${Array.from(validation.missing).join(', ')}`);
assert.deepEqual(Array.from(validation.missing), []);
assert.equal(Object.hasOwn(lesson.flow, 'sequence'), false, 'Chapter 1 lessons must use the canonical five-stage default.');
assert.deepEqual(
  Array.from(sandbox.window.flowSequenceDescriptors(lesson), stage => stage.blockType),
  ['fullExample', 'preQuiz', 'mainLesson', 'rigorousQuiz', 'exercises'],
);

assert.deepEqual(
  Object.values(lesson.fullExample.code.goals).map(goal => `${goal.n} ${goal.label}`),
  [
    'A Store and compute Boolean values in program state.',
    'B Display program state in the console.',
  ],
);
assert.deepEqual(
  Object.values(lesson.fullExample.subgoals).map(subgoal => `${subgoal.n} ${subgoal.label}`),
  [
    'A.a Store Boolean values in separate variables.',
    'A.b Compute new Boolean values from stored values.',
    'B.a Display Boolean values from program state.',
  ],
);

const openingLines = lesson.fullExample.code.lines;
assert.equal(openingLines.length, 10);
assert.deepEqual(
  openingLines.reduce((counts, line) => ({ ...counts, [line.subgoal]: (counts[line.subgoal] || 0) + 1 }), {}),
  { store: 3, compute: 3, display: 4 },
);
assert.equal(lesson.fullExample.states.length, 11);
assert.equal(lesson.fullExample.executionTrace.length, 10);
assert.deepEqual(
  Array.from(lesson.fullExample.executionTrace, step => step.stateIndex),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
);
assert.deepEqual(
  Array.from(lesson.fullExample.states.at(-1).console),
  ['True', 'True', 'False', 'False'],
);
for (const stateIndex of [4, 5, 6]) {
  const detail = lesson.fullExample.states[stateIndex].evalDetail;
  assert.ok(detail, `State ${stateIndex} must include reduction/evalDetail data.`);
  assert.equal(typeof detail.title, 'string');
  assert.equal(typeof detail.sourceLine, 'string');
  assert.ok(detail.steps.length >= 3);
  assert.ok(detail.frames.length >= 2);
}

const supportedKinds = new Set(['choice', 'chips', 'order', 'row']);
const quizQuestions = [
  ...Object.values(lesson.flow.preQuiz.details),
  ...lesson.flow.mainLesson.checks,
  ...lesson.flow.rigorousQuiz.cards,
];
for (const question of quizQuestions) {
  assert.ok(supportedKinds.has(question.kind), `Unsupported quiz kind: ${question.kind}`);
  assert.doesNotMatch(question.q, /\bexplain\b/i, `Quiz prompt must be immediately answerable: ${question.q}`);
  assert.doesNotMatch(question.type || '', /\bexplain\b/i, `Quiz type must stay bounded: ${question.type}`);
}
const choiceCorrectPositions = quizQuestions.filter(question => question.kind === 'choice').map(question => question.correct);
assert.ok(new Set(choiceCorrectPositions).size >= 3, 'Choice answer positions must vary across the lesson.');
assert.ok(choiceCorrectPositions.filter(position => position === 0).length < choiceCorrectPositions.length / 2, 'The first choice must not be the dominant correct position.');
assert.equal(lesson.flow.preQuiz.categories.length, 3);
assert.equal(lesson.flow.goal.startLabel, 'Start example');
assert.equal(lesson.flow.preQuiz.hideOrderOrdinals, true);
assert.deepEqual(Array.from(lesson.flow.preQuiz.part1Code), [
  'bool active = true;',
  'bool inactive = !active;',
  'Console.WriteLine(inactive);',
]);
assert.deepEqual(Array.from(lesson.flow.preQuiz.details.store.contextCode), [
  'bool original = true;',
  'bool saved = original;',
  'original = false;',
]);
assert.doesNotMatch(lesson.flow.preQuiz.part1Prompt, /door-status program/i);
assert.equal(lesson.flow.mainLesson.checks.length, 3);
assert.equal(lesson.flow.rigorousQuiz.cards.length, 8);
assert.deepEqual(
  Array.from(lesson.flow.rigorousQuiz.cards.at(-1).cells, cell => cell.correct),
  ['True', 'False', 'True'],
);
const mainLessonText = [
  lesson.mainLesson.intro,
  ...lesson.mainLesson.acts.flatMap(act => act.body),
].join(' ');
for (const term of ['variable', 'binding', 'state', 'initializes', 'Rebinding', 'value types', 'expression', 'unary', 'binary', 'equality', 'inequality']) {
  assert.match(mainLessonText, new RegExp(term, 'i'), `Main Lesson must introduce ${term}.`);
}
assert.match(lesson.flow.mainLesson.checks[1].q, /line that made the values differ/i);
assert.match(lesson.flow.mainLesson.checks[2].q, /stored results.*displayed/i);

assert.deepEqual(
  Array.from(lesson.rigorousQuiz.transferCode.lines, line => line.text),
  [
    'bool primaryOnline = true;',
    'bool backupOnline = true;',
    'bool savedPrimaryOnline = primaryOnline;',
    'primaryOnline = false;',
    '',
    'bool primaryOffline = !primaryOnline;',
    'bool systemsReady = primaryOnline && backupOnline;',
    'bool primaryChanged = primaryOnline != savedPrimaryOnline;',
    '',
    'Console.WriteLine(primaryOffline);',
    'Console.WriteLine(systemsReady);',
    'Console.WriteLine(primaryChanged);',
  ],
);
assert.equal(lesson.flow.exercises.problems.length, 5);
assert.match(lesson.flow.exercises.problems[0].statement, /A\.a.*A\.b.*B\.a/);
assert.match(lesson.flow.exercises.problems[1].statement, /A\.a.*B\.a/);

const authoredCode = [
  ...openingLines.map(line => line.text),
  ...lesson.rigorousQuiz.transferCode.lines.map(line => line.text),
  ...lesson.mainLesson.acts.flatMap(act => act.code || []),
  ...lesson.flow.exercises.problems.flatMap(problem => [...(problem.given || []), ...(problem.model || [])]),
].join('\n');
assert.doesNotMatch(authoredCode, /\|\||\bif\s*\(|\bwhile\s*\(|Console\.ReadLine|\bstatic\s+\w+/, 'Keep C1.1 inside its approved syntax boundary.');

function assertDataOnly(value, trail = 'lesson') {
  if (typeof value === 'function') assert.fail(`${trail} contains a function.`);
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) assertDataOnly(child, `${trail}.${key}`);
}
assertDataOnly(lesson);
assert.doesNotThrow(() => JSON.stringify(lesson));
assert.match(fixtureSource, /Object\.assign\(window,/);
assert.match(stagesSource, /hideOrderOrdinals/);
assert.match(stagesSource, /part1Code/);
assert.match(stagesSource, /contextCode/);
assert.match(stagesSource, /state\.evalDetail/);
assert.match(stagesSource, /FuncsStackedEvaluationDetail/);
assert.doesNotMatch(
  stagesSource,
  /<FuncsCodeBlock[^>]*runKeys=\{new Set\(\)\}/,
  'Rigorous Quiz reference code must remain at full opacity; an empty run-key set dims every row.',
);
assert.match(stagesSource, /:\s*'previous page'/);
assert.match(flowKitSource, /overflowWrap:\s*['"]anywhere['"]/);
assert.match(conceptKitSource, /whiteSpace:\s*['"]pre-wrap['"]/);

const publishedLessonPath = 'Ch1-1-Boolean-Values-State-Visible-Results.html';
assert.match(
  betaIndexSource,
  /Chapter 1\.1 Boolean values, state, and visible results.*Ch1-1-Boolean-Values-State-Visible-Results\.html/i,
  'The public beta index must link to the current C1.1 lesson.',
);
assert.equal(
  (roadmapSource.match(new RegExp(publishedLessonPath, 'g')) || []).length,
  2,
  'The Chapter 1 roadmap card and Start lesson 1 button must both open the current C1.1 lesson.',
);
assert.match(
  roadmapPageSource,
  /tb-ch1-v1-sequence\.jsx\?v=task-72-3-4/,
  'The roadmap must cache-bust its updated lesson-map fixture.',
);
assert.match(pageSource, /candidate-shell flow-authoring-canonical/);
assert.match(
  presentationSource,
  /\.flow-authoring-canonical\s*\{[\s\S]*?padding:\s*0\s*!important;/,
  'Canonical standalone lessons must fill the viewport without an inset shell.',
);
assert.match(
  presentationSource,
  /\.flow-authoring-canonical \.candidate-frame\s*\{[\s\S]*?width:\s*100%\s*!important;[\s\S]*?border:\s*0\s*!important;[\s\S]*?border-radius:\s*0;[\s\S]*?box-shadow:\s*none\s*!important;/,
  'Canonical standalone lesson frames must not render as floating windows.',
);

console.log('C1.1 Boolean values fixture contract passed.');
