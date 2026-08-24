import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const here = path.dirname(fileURLToPath(import.meta.url));
const conceptKitPath = path.join(here, 'lesson-kit', 'concept-lesson-kit.jsx');
const fixturePaths = [
  'flow-ch1-1-boolean-values.jsx',
  'flow-ch1-2-simple-decisions.jsx',
  'flow-ch1-3-truth-tables-compound-evaluation.jsx',
  'tb-ch1-sequence.jsx',
  'tb-ch1-2-sequence.jsx',
  'tb-ch1-v1-sequence.jsx',
  'tb-ch2-sequence.jsx',
  'tb-grammar-proof-sequence.jsx',
].map(name => path.join(here, name));

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

function collectEvaluationDetails(root) {
  const seen = new WeakSet();
  const details = new Set();

  function visit(value) {
    if (!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);

    if (value.evalDetail && typeof value.evalDetail === 'object') {
      details.add(value.evalDetail);
    }

    for (const child of Object.values(value)) visit(child);
  }

  visit(root);
  return Array.from(details);
}

function showAt(definition, fallback = 0) {
  return definition?.showAt ?? fallback;
}

function assertAtomicTimeline(detail, index) {
  const label = `${index + 1}: ${detail.title || detail.sourceLine || 'untitled evaluation'}`;
  assert.equal(detail.layout, 'verticalStack', `${label} must use the vertical stack layout.`);
  assert.ok(Array.isArray(detail.blocks) && detail.blocks.length >= 1, `${label} must provide blocks.`);
  assert.ok(Array.isArray(detail.steps) && detail.steps.length >= 2, `${label} must provide base and reveal captions.`);

  const revealEvents = [];

  detail.blocks.forEach((block, blockIndex) => {
    assert.ok(Array.isArray(block.levels) && block.levels.length >= 1, `${label} block ${blockIndex} needs levels.`);
    const baseLevelCount = block.baseLevelCount ?? 1;
    assert.ok(
      Number.isInteger(baseLevelCount) && baseLevelCount >= 1 && baseLevelCount <= block.levels.length,
      `${label} block ${blockIndex} needs a valid baseLevelCount.`,
    );
    if (blockIndex === 0) {
      assert.equal(baseLevelCount, 1, `${label} must open with one bottom base expression.`);
    }
    assert.equal(
      showAt(block, blockIndex === 0 ? 0 : -1),
      showAt(block.levels[0], block.showAt ?? 0),
      `${label} block ${blockIndex} and its base expression must appear together.`,
    );
    for (let levelIndex = 0; levelIndex < baseLevelCount; levelIndex += 1) {
      assert.equal(
        showAt(block.levels[levelIndex], block.showAt ?? 0),
        block.showAt,
        `${label} block ${blockIndex} base context must appear with the substitution event.`,
      );
    }

    block.levels.forEach((level, levelIndex) => {
      revealEvents.push({
        kind: levelIndex < baseLevelCount ? 'base' : 'upward',
        blockIndex,
        levelIndex,
        showAt: showAt(level, block.showAt ?? 0),
      });
    });

    if (block.arrowAfter) {
      revealEvents.push({
        kind: 'substitution',
        blockIndex,
        showAt: showAt(block.arrowAfter, block.showAt ?? 0),
      });
    }
  });

  const firstBase = revealEvents.find(event => event.kind === 'base' && event.blockIndex === 0);
  assert.equal(firstBase?.showAt, 0, `${label} must open with the first base expression.`);
  assert.deepEqual(
    revealEvents.filter(event => event.showAt === 0).map(event => event.kind),
    ['base'],
    `${label} must initially show only the bottom base expression.`,
  );

  for (let blockIndex = 0; blockIndex < detail.blocks.length - 1; blockIndex += 1) {
    const block = detail.blocks[blockIndex];
    const nextBlock = detail.blocks[blockIndex + 1];
    const terminalShowAt = Math.max(...block.levels.map(level => showAt(level, block.showAt ?? 0)));
    const substitutionShowAt = showAt(block.arrowAfter, block.showAt ?? 0);
    const nextBaseShowAt = showAt(nextBlock.levels[0], nextBlock.showAt ?? 0);

    assert.ok(
      substitutionShowAt > terminalShowAt,
      `${label} block ${blockIndex} must reveal its terminal upward result before substituting right.`,
    );
    assert.equal(
      nextBaseShowAt,
      substitutionShowAt,
      `${label} block ${blockIndex} must reveal the arrow and next containing expression as one substitution event.`,
    );
  }

  const maxShowAt = Math.max(...revealEvents.map(event => event.showAt));
  assert.equal(
    detail.steps.length,
    maxShowAt + 1,
    `${label} must provide one learner-facing caption for every reveal state.`,
  );

  for (let step = 1; step <= maxShowAt; step += 1) {
    const events = revealEvents.filter(event => event.showAt === step);
    const upward = events.filter(event => event.kind === 'upward');
    const substitutions = events.filter(event => event.kind === 'substitution');
    const laterBases = events.filter(event => event.kind === 'base' && event.blockIndex > 0);
    const isAtomicUpward = upward.length === 1 && substitutions.length === 0 && laterBases.length === 0;
    const nextBlock = substitutions.length === 1 ? detail.blocks[substitutions[0].blockIndex + 1] : null;
    const isAtomicSubstitution = (
      upward.length === 0
      && substitutions.length === 1
      && laterBases.length >= 1
      && laterBases.every(event => event.blockIndex === substitutions[0].blockIndex + 1)
      && laterBases.length === (nextBlock?.baseLevelCount ?? 1)
    );

    assert.ok(
      isAtomicUpward || isAtomicSubstitution,
      `${label} step ${step + 1} must reveal one upward result or one rightward substitution event.`,
    );
  }
}

const groupedRevealExample = {
  layout: 'verticalStack',
  title: 'Grouped reveal regression example',
  sourceLine: 'bool result = left == right;',
  steps: [{ label: 'Start' }, { label: 'Grouped results' }, { label: 'Substitute' }],
  blocks: [
    {
      showAt: 0,
      levels: [
        { expression: 'bool result = left == right;', showAt: 0 },
        { expression: '"yes" == right', showAt: 1 },
        { expression: '"yes" == "yes"', showAt: 1 },
      ],
      arrowAfter: { showAt: 2 },
    },
    {
      showAt: 2,
      levels: [{ expression: 'bool result = true;', showAt: 2 }],
    },
  ],
};

const earlySubstitutionExample = {
  layout: 'verticalStack',
  title: 'Early substitution regression example',
  sourceLine: 'bool result = answer == "yes";',
  steps: [{ label: 'Start' }, { label: 'Result and substitution' }],
  blocks: [
    {
      showAt: 0,
      levels: [
        { expression: 'bool result = answer == "yes";', showAt: 0 },
        { expression: '"yes"', showAt: 1 },
      ],
      arrowAfter: { showAt: 1 },
    },
    {
      showAt: 1,
      levels: [{ expression: 'bool result = "yes" == "yes";', showAt: 1 }],
    },
  ],
};

assert.throws(
  () => assertAtomicTimeline(groupedRevealExample, 100),
  /one upward result or one rightward substitution event/,
  'The permanent contract must reject two upward results grouped onto one click.',
);
assert.throws(
  () => assertAtomicTimeline(earlySubstitutionExample, 101),
  /terminal upward result before substituting right/,
  'The permanent contract must reject a substitution revealed with its terminal upward result.',
);

const sandbox = {
  console,
  window: {
    FUNCS_CHAPTERS: [
      { id: 'ch0', label: 'Chapter 0' },
      { id: 'ch1', label: 'Chapter 1' },
      { id: 'ch2', label: 'Chapter 2' },
      { id: 'ch3', label: 'Chapter 3' },
      { id: 'ch4', label: 'Chapter 4' },
    ],
  },
};
const context = vm.createContext(sandbox);
evaluateJsx(conceptKitPath, context);
for (const fixturePath of fixturePaths) evaluateJsx(fixturePath, context);

const details = collectEvaluationDetails(sandbox.window);
assert.equal(details.length, 24, 'The active evaluation inventory must contain all 24 walkthroughs.');

for (const [index, detail] of details.entries()) {
  const atomicDetail = sandbox.window.funcsBuildAtomicEvaluationDetail(detail);
  assertAtomicTimeline(atomicDetail, index);
  const validation = sandbox.window.funcsValidateStackedEvaluationDetail(detail);
  assert.equal(validation.valid, true, `${detail.title} must pass the shared validator: ${validation.missing.join(', ')}`);
}

console.log(`Atomic evaluation stepping contract passed for ${details.length} walkthroughs.`);
