import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const funcsDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(funcsDir, '..', '..');
const fixturePath = path.join(funcsDir, 'chapter-overview-fixtures.jsx');
const kitPath = path.join(funcsDir, 'lesson-kit', 'chapter-overview-kit.jsx');
const cssPath = path.join(funcsDir, 'lesson-kit', 'chapter-overview.css');
const htmlPath = path.join(funcsDir, 'Ch1-Chapter-Overview.html');
const lessonHtmlPaths = [
  ['C1.1', 'Ch1-1-Boolean-Values-State-Visible-Results.html', '/ch1/ch1-1.html'],
  ['C1.2', 'Ch1-2-Simple-Decisions-From-Input.html', '/ch1/ch1-3.html'],
  ['C1.3', 'Ch1-3-Truth-Tables-Compound-Evaluation.html', '/ch1/ch1-2.html'],
];
const conceptKitPath = path.join(funcsDir, 'lesson-kit', 'concept-lesson-kit.jsx');
const cyclePath = path.join(funcsDir, 'tb-cycle-components.jsx');
const primaryChapterPath = path.join(contentDir, 'ch1', 'index.md');
const betaIndexPath = path.join(contentDir, 'beta', 'index.md');

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
const fixtureSource = read(fixturePath);
const kitSource = read(kitPath);
const cssSource = read(cssPath);
const htmlSource = read(htmlPath);
const lessonHtmlSources = lessonHtmlPaths.map(([label, filename, primaryRoute]) => ({
  label,
  primaryRoute,
  source: read(path.join(funcsDir, filename)),
}));
const conceptKitSource = read(conceptKitPath);
const cycleSource = read(cyclePath);
const primaryChapterSource = read(primaryChapterPath);
const betaIndexSource = read(betaIndexPath);

const context = { window: {} };
vm.runInNewContext(fixtureSource, context, { filename: fixturePath });
const chapter = context.window.CH1_BETA_CHAPTER_OVERVIEW;

assert.equal(chapter.lessons.length, 6, 'The approved Chapter 1 Core Path has six lessons.');
assert.equal(
  Array.from(chapter.lessons, (lesson) => lesson.id).join(','),
  'c1-1,c1-2,c1-3,c1-4,c1-5,c1-6',
  'Lessons stay in canonical order.',
);
assert.equal(chapter.betaOverviewRoute, '/beta/Funcs/Ch1-Chapter-Overview.html');
assert.equal(context.window.FUNCS_BETA_CHAPTER_OVERVIEWS.ch1, chapter, 'The chapter registry reuses the shared model.');
assert.ok(
  chapter.lessons.every((lesson) => /^\/beta\/Funcs\/[A-Za-z0-9-]+\.html$/.test(lesson.betaRoute)),
  'Every lesson names an exact normalized beta route.',
);
assert.ok(
  chapter.lessons.every((lesson) => !Object.hasOwn(lesson, 'available') && !Object.hasOwn(lesson, 'published')),
  'Availability is never fixture-authored.',
);

const bannedStudentFields = ['source', 'sourceAnchors', 'disposition', 'reviewTags', 'fixtureName', 'provenance'];
for (const lesson of chapter.lessons) {
  for (const field of bannedStudentFields) {
    assert.ok(!Object.hasOwn(lesson, field), `Student lesson data does not expose ${field}.`);
  }
}

assert.match(kitSource, /method:\s*'HEAD'/, 'Availability comes from a same-origin route check.');
assert.match(kitSource, /function FuncsChapterOverview\(/, 'The canonical overview renderer exists.');
assert.match(kitSource, /function FuncsAcademicChapterOverviewPanel\(/, 'The canonical lesson clickover exists.');
assert.match(kitSource, /Current lesson/, 'The clickover identifies the current lesson.');
assert.match(kitSource, /Open chapter overview/, 'The clickover links to the full overview.');
assert.match(kitSource, /status === 'available'/, 'Published selector entries branch to an available-row treatment.');
assert.match(kitSource, /className="chapter-clickover-row chapter-clickover-row--available"/, 'Published selector entries use one row-level link.');
assert.match(kitSource, /aria-label=\{`Open Lesson \$\{lesson\.number\}: \$\{lesson\.title\}`\}/, 'The row-level link has a descriptive accessible name.');
assert.match(kitSource, /<span className="chapter-open-action chapter-open-action--compact" aria-hidden="true">/, 'The visible Open beta treatment is not a nested link.');
assert.match(kitSource, /<FuncsOpenBetaAction lesson=\{lesson\} status=\{status\} compact \/>/, 'Checking and unavailable rows keep their disabled action.');
assert.match(kitSource, /<div className="chapter-clickover-row">[\s\S]*?\{rowContent\}[\s\S]*?<\/div>/, 'Checking and unavailable entries remain non-link rows.');
assert.doesNotMatch(kitSource, /No progress tracking/, 'Internal progress-policy copy is not student-facing.');

assert.match(htmlSource, /Chapter 1: Booleans - FunCS Beta/, 'The page has a production title.');
assert.match(htmlSource, /FuncsChapterOverview/, 'The production page renders the canonical component.');
assert.doesNotMatch(htmlSource, /prototype/i, 'The production page does not expose prototype framing.');
assert.match(cssSource, /\.chapter-overview-main--index/, 'The selected academic index styles are present.');
assert.match(cssSource, /\.chapter-lesson-clickover/, 'The in-lesson directory styles are present.');
assert.match(cssSource, /\.chapter-clickover-row--available:hover/, 'Available rows expose a whole-row hover treatment.');
assert.match(cssSource, /\.chapter-clickover-row--available:focus-visible/, 'Available rows expose a whole-row keyboard focus treatment.');
assert.match(cssSource, /prefers-reduced-motion/, 'Motion has a reduced-motion path.');
assert.match(htmlSource, /chapter-overview\.css\?v=task-78-2-3&amp;interaction=task-72-7-1/, 'The production overview cache-busts the row interaction styles.');
assert.match(htmlSource, /chapter-overview-kit\.jsx\?v=task-78-2&amp;interaction=task-72-7-1/, 'The production overview cache-busts the row interaction component.');

for (const { label, primaryRoute, source } of lessonHtmlSources) {
  assert.match(source, /chapter-overview\.css\?v=task-78-2-3/, `${label} loads the shared chapter styles.`);
  assert.match(source, /chapter-overview-fixtures\.jsx\?v=task-78-2/, `${label} loads the shared chapter model.`);
  assert.match(source, /chapter-overview-kit\.jsx\?v=task-78-2/, `${label} loads the shared chapter renderer.`);
  assert.match(source, /chapter-overview\.css\?v=task-78-2-3&amp;interaction=task-72-7-1/, `${label} cache-busts the row interaction styles.`);
  assert.match(source, /chapter-overview-kit\.jsx\?v=task-78-2&amp;interaction=task-72-7-1/, `${label} cache-busts the row interaction component.`);
  assert.match(source, /tb-ch1-sequence\.jsx\?v=task-72-6-1/, `${label} loads the canonical Chapter 1 selector data.`);
  assert.match(source, /className="funcs-edition-page"/, `${label} uses the edition shell.`);
  assert.match(source, /Reading: <strong>Beta<\/strong>/, `${label} identifies the Beta edition.`);
  assert.ok(source.includes(`href="${primaryRoute}">Switch to Primary</a>`), `${label} links to its Primary counterpart.`);
}
assert.match(conceptKitSource, /FuncsAcademicChapterOverviewPanel/, 'The lesson kit delegates to the academic clickover when available.');
assert.match(cycleSource, /React\.cloneElement\(lessonSelector, \{ onClose: closeLessonSelector \}\)/, 'The lesson shell gives the clickover a close action.');
assert.match(cycleSource, /selectorTriggerRef\.current\?\.focus\(\)/, 'Closing restores focus to the chapter trigger.');

assert.match(primaryChapterSource, /betaUrl: \/beta\/Funcs\/Ch1-Chapter-Overview\.html/, 'Primary Chapter 1 maps to the Beta overview.');
assert.match(betaIndexSource, /\/beta\/Funcs\/Ch1-Chapter-Overview\.html/, 'The public Beta index links to the overview.');

console.log('Chapter overview production contract passed.');
