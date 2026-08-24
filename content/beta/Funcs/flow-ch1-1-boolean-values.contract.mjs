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
evaluateJsx(conceptKitPath, context);
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
assert.equal(lesson.stableUrl, '/ch1/ch1-1.html');

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
const lessonWithoutLanguageSupport = JSON.parse(JSON.stringify(lesson));
for (const act of lessonWithoutLanguageSupport.mainLesson.acts) {
  delete act.definitions;
  delete act.translations;
  delete act.recall;
}
assert.equal(
  sandbox.window.flowValidateLesson(lessonWithoutLanguageSupport).valid,
  true,
  'Definition, translation, and recall fields must remain optional for lessons that do not use them.',
);
const malformedLanguageSupport = JSON.parse(JSON.stringify(lesson));
delete malformedLanguageSupport.mainLesson.acts[0].definitions[0].term;
assert.ok(
  sandbox.window.flowValidateLesson(malformedLanguageSupport).missing.includes('mainLesson.acts[0].definitions[0].term'),
  'The shared validator must identify an incomplete definition callout.',
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
const expectedAtomicRevealCounts = new Map([[4, 5], [5, 7], [6, 7]]);
for (const stateIndex of [4, 5, 6]) {
  const detail = lesson.fullExample.states[stateIndex].evalDetail;
  assert.ok(detail, `State ${stateIndex} must include reduction/evalDetail data.`);
  assert.equal(typeof detail.title, 'string');
  assert.equal(typeof detail.sourceLine, 'string');
  assert.ok(detail.steps.length >= 3);
  assert.equal(detail.layout, 'verticalStack', `State ${stateIndex} must evaluate upward before simplifying across.`);
  assert.ok(detail.blocks.length >= 2, `State ${stateIndex} must simplify across at least two evaluation blocks.`);
  assert.equal(Object.hasOwn(detail, 'frames'), false, `State ${stateIndex} must not use the horizontal frames payload.`);
  assert.ok(
    detail.blocks.some(block => block.levels.length >= 2),
    `State ${stateIndex} must include an upward evaluation block.`,
  );
  const atomicDetail = sandbox.window.funcsBuildAtomicEvaluationDetail(detail);
  assert.equal(atomicDetail.revealCount, expectedAtomicRevealCounts.get(stateIndex));
  assert.equal(detail.steps.length, atomicDetail.revealCount, `State ${stateIndex} needs one caption per atomic reveal.`);
  const openingVisible = atomicDetail.blocks.flatMap((block, blockIndex) =>
    block.levels
      .filter(level => level.showAt === 0)
      .map(level => `${blockIndex}:${level.expression}`),
  );
  assert.deepEqual(
    Array.from(openingVisible),
    [`0:${detail.blocks[0].levels[0].expression}`],
    `State ${stateIndex} must open with only its bottom base expression.`,
  );
  assert.equal(atomicDetail.blocks[0].levels[1].showAt, 1, `State ${stateIndex} must reveal one upward result on the first Next action.`);
  assert.equal(atomicDetail.blocks[0].arrowAfter.showAt, 2, `State ${stateIndex} must substitute only after the first upward result.`);
  assert.equal(atomicDetail.blocks[1].showAt, 2, `State ${stateIndex} must reveal the next block with its substitution arrow.`);
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
  ...lesson.mainLesson.acts.flatMap(act => act.definitions.flatMap(definition => [definition.term, definition.definition])),
  ...lesson.mainLesson.acts.flatMap(act => act.translations.flatMap(translation => [translation.code, translation.text])),
  ...lesson.mainLesson.acts.flatMap(act => act.recall.cards.flatMap(card => [card.prompt, card.answer])),
].join(' ');
for (const term of ['variable', 'binding', 'state', 'initializes', 'Rebinding', 'value type', 'expression', 'unary', 'binary', 'equality', 'inequality']) {
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
assert.match(stagesSource, /FlowDefinitionCallout/);
assert.match(stagesSource, /FlowTranslationCallout/);
assert.match(stagesSource, /FlowLessonRecall/);
assert.match(stagesSource, /checkDoneFor\(i\).*<FlowLessonRecall/s, 'Recall must appear only after the act attention check is answered.');
assert.match(stagesSource, /!checkDoneFor\(i\) \|\| !recallDoneFor\(i\)/, 'The next act must remain locked until both the attention check and recall reveal are complete.');
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
assert.match(pageSource, /lesson-kit\/concept-lesson-kit\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/flow-lesson-stages\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /flow-ch1-1-boolean-values\.jsx\?v=task-72-5-1/);
assert.match(pageSource, /lesson-kit\/chapter-overview\.css\?v=task-78-2-3/);
assert.match(pageSource, /chapter-overview-fixtures\.jsx\?v=task-78-2/);
assert.match(pageSource, /lesson-kit\/chapter-overview-kit\.jsx\?v=task-78-2/);
assert.match(pageSource, /tb-ch1-sequence\.jsx\?v=task-72-6-1/);
assert.match(pageSource, /className="funcs-edition-page"/);
assert.match(pageSource, /Reading: <strong>Beta<\/strong>/);
assert.match(pageSource, /href="\/ch1\/ch1-1\.html">Switch to Primary<\/a>/);
assert.match(
  presentationSource,
  /\.flow-authoring-canonical\s*\{[\s\S]*?padding:\s*0\s*!important;/,
  'Canonical standalone lessons must fill the viewport without an inset shell.',
);
assert.match(
  presentationSource,
  /\.funcs-edition-page\s*\{[\s\S]*?height:\s*100dvh;[\s\S]*?grid-template-rows:\s*auto minmax\(0, 1fr\);[\s\S]*?overflow:\s*hidden;/,
  'The edition bar and canonical lesson must share one full viewport without page overflow.',
);
assert.match(
  presentationSource,
  /\.flow-authoring-canonical \.candidate-frame\s*\{[\s\S]*?width:\s*100%\s*!important;[\s\S]*?border:\s*0\s*!important;[\s\S]*?border-radius:\s*0;[\s\S]*?box-shadow:\s*none\s*!important;/,
  'Canonical standalone lesson frames must not render as floating windows.',
);

console.log('C1.1 Boolean values fixture contract passed.');
