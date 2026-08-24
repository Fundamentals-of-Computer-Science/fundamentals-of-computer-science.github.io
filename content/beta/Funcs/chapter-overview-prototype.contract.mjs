import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const funcsDir = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(funcsDir, 'chapter-overview-fixtures.jsx');
const kitPath = path.join(funcsDir, 'lesson-kit', 'chapter-overview-kit.jsx');
const cssPath = path.join(funcsDir, 'lesson-kit', 'chapter-overview.css');
const htmlPath = path.join(funcsDir, 'Ch1 Chapter Overview Prototype.html');

const fixtureSource = fs.readFileSync(fixturePath, 'utf8');
const kitSource = fs.readFileSync(kitPath, 'utf8');
const cssSource = fs.readFileSync(cssPath, 'utf8');
const htmlSource = fs.readFileSync(htmlPath, 'utf8');
const context = { window: {} };
vm.runInNewContext(fixtureSource, context, { filename: fixturePath });
const chapter = context.window.CH1_BETA_CHAPTER_OVERVIEW;

assert.equal(chapter.lessons.length, 6, 'Chapter 1 uses the approved six-lesson Core Path.');
assert.deepEqual(
  Array.from(chapter.lessons, (lesson) => lesson.id).join(','),
  'c1-1,c1-2,c1-3,c1-4,c1-5,c1-6',
  'Lessons stay in canonical order.',
);
assert.ok(chapter.lessons.every((lesson) => /^\/beta\/Funcs\/[A-Za-z0-9-]+\.html$/.test(lesson.betaRoute)), 'Every lesson names a normalized beta route.');
assert.ok(chapter.lessons.every((lesson) => !Object.hasOwn(lesson, 'available') && !Object.hasOwn(lesson, 'published')), 'Availability is not fixture-authored.');

const bannedStudentFields = ['source', 'sourceAnchors', 'disposition', 'reviewTags', 'fixtureName', 'provenance'];
for (const lesson of chapter.lessons) {
  for (const field of bannedStudentFields) {
    assert.ok(!Object.hasOwn(lesson, field), `Student lesson data does not expose ${field}.`);
  }
}

const existingRoutes = chapter.lessons.filter((lesson) => {
  const filename = lesson.betaRoute.split('/').at(-1);
  return fs.existsSync(path.join(funcsDir, filename));
});
assert.equal(existingRoutes.length, 1, 'Exactly one approved Chapter 1 lesson currently resolves in the source tree.');
assert.equal(existingRoutes[0].id, 'c1-1', 'C1.1 is the currently published lesson.');

assert.match(kitSource, /method:\s*'HEAD'/, 'The browser checks the current route instead of a fixture flag.');
assert.match(kitSource, /URLSearchParams/, 'The chosen variant is shareable in the URL.');
assert.match(kitSource, /FuncsVariantPath/, 'Guided-path variant exists.');
assert.match(kitSource, /FuncsVariantIndex/, 'Working-index variant exists.');
assert.match(kitSource, /FuncsVariantMap/, 'Concept-map variant exists.');
assert.match(kitSource, /FuncsChapterOverviewClickover/, 'The compact clickover uses the shared model.');
assert.match(kitSource, /ArrowLeft/, 'Keyboard variant switching is present.');

assert.match(htmlSource, /Prototype: Chapter 1 Overview/, 'The page is clearly identified as a prototype.');
assert.match(htmlSource, /chapter-overview-fixtures\.jsx/, 'The page loads the shared chapter model.');
assert.match(htmlSource, /chapter-overview-kit\.jsx/, 'The page loads the prototype components.');
assert.match(cssSource, /\[data-variant="path"\]/, 'Guided-path styles are present.');
assert.match(cssSource, /\[data-variant="index"\]/, 'Working-index styles are present.');
assert.match(cssSource, /\[data-variant="map"\]/, 'Concept-map styles are present.');

console.log('Chapter overview prototype contract passed.');
