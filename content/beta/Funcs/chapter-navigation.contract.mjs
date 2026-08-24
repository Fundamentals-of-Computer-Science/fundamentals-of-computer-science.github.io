import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const funcsDir = path.dirname(fileURLToPath(import.meta.url));
const read = (filename) => fs.readFileSync(path.join(funcsDir, filename), 'utf8');

const routes = [
  ['/beta/Funcs/Ch0-1-Programs-Input-Output-Tour.html', 'Ch0 1 Programs Input Output Tour.html'],
  ['/beta/Funcs/Ch1-Chapter-Overview.html', 'Ch1-Chapter-Overview.html'],
  ['/beta/Funcs/Ch2-Numeric-Data-Memory-Sequence.html', 'Ch2 Numeric Data Memory Sequence.html'],
  ['/beta/Funcs/Ch3-Array-Memory-Sequence.html', 'Ch3 Array Memory Sequence.html'],
  ['/beta/Funcs/Ch4-Linked-Node-Chain-Sequence.html', 'Ch4 Linked Node Chain Sequence.html'],
];

const routeTables = [
  ['Chapter 1', read('tb-ch1-sequence.jsx'), 'FUNCS_CHAPTERS', null],
  ['Chapter 2', read('tb-ch2-sequence.jsx'), 'CH2_CHAPTERS', 2],
  ['Chapter 3+', read('tb-grammar-proof-sequence.jsx'), 'GRAMMAR_CHAPTERS_CH3', 3],
];

function arraySource(source, constantName) {
  const match = source.match(new RegExp(`const ${constantName} = \\[([\\s\\S]*?)\\n\\];`));
  assert.ok(match, `${constantName} route table exists.`);
  return match[1];
}

for (const [label, source, constantName, anchoredChapter] of routeTables) {
  const table = arraySource(source, constantName);
  for (const [route] of routes.filter((_, index) => index !== anchoredChapter)) {
    assert.ok(table.includes(route), `${label} links to ${route}.`);
  }
  if (anchoredChapter !== null) {
    assert.match(table, new RegExp(`id: 'ch${anchoredChapter}'[\\s\\S]*?href: '#[a-z-]+'[\\s\\S]*?current: true`), `${label} keeps its current chapter on the local sequence.`);
  }
  assert.doesNotMatch(table, /\.\.\/\.\.\/(?:ch0|ch1|ch2|ch3|ch4)\//, `${label} does not cross from Beta into Primary routes.`);
  assert.doesNotMatch(table, /Ch[0-4]%20|Ch[0-4] [A-Za-z]/, `${label} uses normalized Beta filenames.`);
}

const grammarSource = read('tb-grammar-proof-sequence.jsx');
assert.match(
  grammarSource,
  /chapter\.id === 'ch3' \? '\/beta\/Funcs\/Ch3-Array-Memory-Sequence\.html' : chapter\.href/,
  'Chapter 4 links back to the normalized Chapter 3 Beta entry.',
);

for (const [route, sourceFilename] of routes) {
  assert.ok(fs.existsSync(path.join(funcsDir, sourceFilename)), `${sourceFilename} exists as the active Beta source entry.`);
  const normalizedFilename = path.basename(sourceFilename).trim().replace(/\s+/g, '-');
  assert.equal(route, `/beta/Funcs/${normalizedFilename}`, `${sourceFilename} generates the declared normalized route.`);
}

const consumers = [
  ['Ch0 1 Programs Input Output Tour.html', 'tb-ch1-sequence.jsx'],
  ['Ch1-1-Boolean-Values-State-Visible-Results.html', 'tb-ch1-sequence.jsx'],
  ['Ch1-2-Simple-Decisions-From-Input.html', 'tb-ch1-sequence.jsx'],
  ['Ch1-3-Truth-Tables-Compound-Evaluation.html', 'tb-ch1-sequence.jsx'],
  ['Ch2 Numeric Data Memory Sequence.html', 'tb-ch2-sequence.jsx'],
  ['Ch3 Array Memory Sequence.html', 'tb-grammar-proof-sequence.jsx'],
  ['Ch4 Linked Node Chain Sequence.html', 'tb-grammar-proof-sequence.jsx'],
  ['Ch4 Linked Traversal Sequence.html', 'tb-grammar-proof-sequence.jsx'],
];

for (const [htmlFilename, routeScript] of consumers) {
  const html = read(htmlFilename);
  const escapedScript = routeScript.replaceAll('.', '\\.');
  assert.match(html, new RegExp(`${escapedScript}\\?v=task-72-6-1`), `${htmlFilename} cache-busts the shared route table.`);
}

console.log('Active Beta chapter navigation contract passed.');
