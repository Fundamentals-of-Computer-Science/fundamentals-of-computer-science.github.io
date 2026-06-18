/* tb-grammar-proof-sequence.jsx - source-backed visualizer grammar proof lessons */

const GRAMMAR_CHAPTERS_CH3 = [
  { n: 0, id: 'ch0', label: 'Chapter 0', title: 'Before You Begin', href: '../../ch0/' },
  { n: 1, id: 'ch1', label: 'Chapter 1', title: 'Booleans', href: 'Ch1 Data Memory Sequence.html' },
  { n: 2, id: 'ch2', label: 'Chapter 2', title: 'Integers and Doubles', href: 'Ch2 Numeric Data Memory Sequence.html' },
  { n: 3, id: 'ch3', label: 'Chapter 3', title: 'Arrays', href: '#array-memory', current: true },
  { n: 4, id: 'ch4', label: 'Chapter 4', title: 'Classes and Linked Lists', href: 'Ch4 Linked Node Chain Sequence.html' },
];

const GRAMMAR_CHAPTERS_CH4 = GRAMMAR_CHAPTERS_CH3.map(chapter => ({
  ...chapter,
  current: chapter.id === 'ch4',
  href: chapter.id === 'ch3' ? 'Ch3 Array Memory Sequence.html' : chapter.href,
}));

const GRAMMAR_TOKEN_SPEC = {
  Console: { tone: 'call', description: 'The console class used for output.' },
  WriteLine: { tone: 'call', description: 'A method that prints one evaluated value.' },
  'Console.WriteLine': { tone: 'call', description: 'Evaluates its argument and prints the result.' },
  double: { tone: 'type', description: 'A numeric type for decimal values.' },
  int: { tone: 'type', description: 'A whole-number numeric type.' },
  class: { tone: 'type', description: 'Defines a reference type whose objects live on the heap.' },
  public: { tone: 'type', description: 'Makes a field accessible from outside the class.' },
  new: { tone: 'op', description: 'Creates a new heap object and returns a reference to it.' },
  while: { tone: 'op', description: 'Repeats a body while its condition evaluates to true.' },
  null: { tone: 'value', description: 'A reference value that points to no object.' },
  LinkedListNode: { tone: 'type', description: 'A class whose objects store a Value and a Next reference.' },
  temperatures: { tone: 'name', description: 'A stack variable that stores a reference to a heap array.' },
  scores: { tone: 'name', description: 'A stack variable that stores a reference to a heap array.' },
  today: { tone: 'name', description: 'A local double that receives one array element value.' },
  head: { tone: 'name', description: 'A stack reference to the first node in a chain.' },
  current: { tone: 'name', description: 'A traversal reference that moves from node to node.' },
  a: { tone: 'name', description: 'A stack reference used as the front of the node chain.' },
  b: { tone: 'name', description: 'A stack reference to the second node.' },
  c: { tone: 'name', description: 'A stack reference to the third node.' },
  newFront: { tone: 'name', description: 'A stack reference to the new node added at the front.' },
  Next: { tone: 'name', description: 'A field that stores a reference to the next node, or null.' },
  Value: { tone: 'name', description: 'A field that stores the node value.' },
  '=': { tone: 'op', description: 'Assignment. Evaluate the right side first, then bind or write the result.' },
  '!=': { tone: 'op', description: 'Inequality. Produces true when two values differ.' },
};

const CH3_ARRAY_EXAMPLES = [
  {
    label: 'Memory',
    source: 'ch3-1',
    title: 'Array Allocation And Indexing',
    href: 'Ch3 Array Memory Sequence.html',
    summary: 'Create a heap array, store its reference on the stack, then read and write indexed cells.',
    tags: ['memory', 'array strip', 'reference'],
    current: true,
  },
  {
    label: 'Flow',
    source: 'ch3-2',
    title: 'Array Traversal',
    href: '../../ch3/ch3-2/',
    summary: 'Use a loop variable as an index while moving across an array.',
    tags: ['loop', 'index', 'Length'],
  },
  {
    label: 'Aliasing',
    source: 'ch3-1',
    title: 'Array Aliasing',
    href: '../../ch3/ch3-1/',
    summary: 'Copying an array variable copies the reference, not the elements.',
    tags: ['alias', 'mutation'],
  },
];

const CH4_LINKED_EXAMPLES = [
  {
    label: 'Memory',
    source: 'ch4-1',
    title: 'Linked Node Chain',
    href: 'Ch4 Linked Node Chain Sequence.html',
    summary: 'Build heap node objects and wire their Next fields into a chain.',
    tags: ['node', 'heap', 'Next'],
    current: true,
  },
  {
    label: 'Flow',
    source: 'ch4-3',
    title: 'Linked Traversal',
    href: 'Ch4 Linked Traversal Sequence.html',
    summary: 'Move a current reference along the chain until it becomes null.',
    tags: ['while', 'current', 'null'],
  },
];

function grammarExamples(items, currentHref) {
  return items.map(item => ({ ...item, current: item.href === currentHref }));
}

const CH3_ARRAY_SYNTAX = [
  {
    group: 'Array memory',
    items: [
      { term: 'double[] name = new double[n];', note: 'Allocate a heap array and store its reference in a stack variable.', source: 'ch3-1' },
      { term: 'array[index] = value;', note: 'Go to the array, shift by the index, and write a value.', source: 'ch3-1' },
      { term: 'double x = array[index];', note: 'Go to the array, shift by the index, read a value, then bind it.', source: 'ch3-1' },
    ],
  },
];

const CH4_LINKED_SYNTAX = [
  {
    group: 'Linked memory',
    items: [
      { term: 'new LinkedListNode(value)', note: 'Create a node object on the heap.', source: 'ch4-1' },
      { term: 'node.Next = other;', note: 'Write a reference into a node field.', source: 'ch4-1' },
      { term: 'while (current != null)', note: 'Repeat while the traversal reference points to a node.', source: 'ch4-3' },
    ],
  },
];

const CH3_ARRAY_CODE = {
  lines: [
    { id: 'array-line-1', text: 'double[] temperatures = new double[7];', translation: 'Create a double array of size 7 and store a reference to it in temperatures.' },
    { id: 'array-line-2', text: 'temperatures[0] = 72.3;', translation: 'Go to the array, shift by 0, and store 72.3 in the first cell.' },
    { id: 'array-line-3', text: 'temperatures[3] = 71.5;', translation: 'Go to the array, shift by 3, and store 71.5 in the fourth cell.' },
    { id: 'array-line-4', text: 'double today = temperatures[3];', translation: 'Read the value at index 3 and bind that copied double to today.' },
    { id: 'array-line-5', text: 'Console.WriteLine(today);', translation: 'Evaluate today and display the copied value.' },
  ],
};

const CH3_ARRAY_STATES = [
  { label: 'Before execution', desc: 'No stack variables or heap arrays exist yet.', memory: [], console: [] },
  {
    label: 'After line 1',
    desc: 'temperatures stores a reference. The seven double cells live in one heap array object.',
    stack: [{ name: 'temperatures', type: 'double[]', ref: 'arr1', addr: '0x200', isNew: true }],
    heap: [{ id: 'arr1', addr: '0x200', type: 'double[7]', shape: 'array', elements: ['0.0', '0.0', '0.0', '0.0', '0.0', '0.0', '0.0'], active: true }],
    memory: [{ name: 'temperatures', type: 'double[]', value: 'ref 0x200' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'Index 0 means no shift. The first cell receives 72.3.',
    stack: [{ name: 'temperatures', type: 'double[]', ref: 'arr1', addr: '0x200' }],
    heap: [{ id: 'arr1', addr: '0x200', type: 'double[7]', shape: 'array', elements: ['72.3', '0.0', '0.0', '0.0', '0.0', '0.0', '0.0'], changed: [0], activeIndex: 0 }],
    memory: [{ name: 'temperatures', type: 'double[]', value: 'ref 0x200' }],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'Index 3 shifts past three cells and writes into the fourth cell.',
    stack: [{ name: 'temperatures', type: 'double[]', ref: 'arr1', addr: '0x200' }],
    heap: [{ id: 'arr1', addr: '0x200', type: 'double[7]', shape: 'array', elements: ['72.3', '0.0', '0.0', '71.5', '0.0', '0.0', '0.0'], changed: [3], activeIndex: 3 }],
    memory: [{ name: 'temperatures', type: 'double[]', value: 'ref 0x200' }],
    console: [],
  },
  {
    label: 'After line 4',
    desc: 'The array cell is read, then the copied value is bound to today on the stack.',
    stack: [
      { name: 'temperatures', type: 'double[]', ref: 'arr1', addr: '0x200' },
      { name: 'today', type: 'double', value: '71.5', isNew: true },
    ],
    heap: [{ id: 'arr1', addr: '0x200', type: 'double[7]', shape: 'array', elements: ['72.3', '0.0', '0.0', '71.5', '0.0', '0.0', '0.0'], activeIndex: 3 }],
    memory: [
      { name: 'temperatures', type: 'double[]', value: 'ref 0x200' },
      { name: 'today', type: 'double', value: '71.5' },
    ],
    console: [],
    evalDetail: {
      title: 'Read one array cell before binding',
      sourceLine: 'double today = temperatures[3];',
      steps: [
        { label: 'Expression', note: 'Start with the array access on the right side.' },
        { label: 'Shift', note: 'Use the reference in temperatures and shift by index 3.' },
        { label: 'Read', note: 'The cell at index 3 currently stores 71.5.' },
        { label: 'Bind', note: 'Bind the copied double value to today.' },
      ],
      frames: [
        {
          expression: 'double today = temperatures[3]',
          showAt: 0,
          activeAt: [0, 1, 2],
          stack: [{ showAt: 1, activeAt: [1], span: [15, 30], label: 'array[3]', value: '71.5' }],
          strike: { showAt: 2, activeAt: [2], span: [15, 30] },
          arrowAfter: { showAt: 2, activeAt: [2] },
        },
        { expression: 'double today = 71.5', showAt: 2, activeAt: [2, 3] },
      ],
      minCanvasWidth: 860,
    },
  },
  {
    label: 'After line 5',
    desc: 'WriteLine prints the copied value from today. The heap array is unchanged.',
    stack: [
      { name: 'temperatures', type: 'double[]', ref: 'arr1', addr: '0x200' },
      { name: 'today', type: 'double', value: '71.5' },
    ],
    heap: [{ id: 'arr1', addr: '0x200', type: 'double[7]', shape: 'array', elements: ['72.3', '0.0', '0.0', '71.5', '0.0', '0.0', '0.0'] }],
    memory: [
      { name: 'temperatures', type: 'double[]', value: 'ref 0x200' },
      { name: 'today', type: 'double', value: '71.5' },
    ],
    console: ['71.5'],
  },
];

const CH3_ARRAY_MEMORY_LESSON = {
  id: 'ch3-array-memory',
  chapterId: 'ch3',
  source: 'ch3/ch3-1.md',
  stableUrl: 'ch3/array-allocation-and-indexing',
  order: 1,
  title: 'Array Allocation And Indexing',
  kicker: 'Chapter 3',
  learningTarget: 'Explain array variables as stack references to heap arrays, then trace indexed reads and writes with the shift model.',
  roadmap: { order: 1, sourceAnchors: ['ch3/ch3-1.md:24', 'ch3/ch3-1.md:40', 'ch3/ch3-1.md:98'], reviewConcepts: ['value memory', 'assignment'] },
  availableSyntax: CH3_ARRAY_SYNTAX,
  chapterNav: { chapters: GRAMMAR_CHAPTERS_CH3 },
  chapterExamples: grammarExamples(CH3_ARRAY_EXAMPLES, 'Ch3 Array Memory Sequence.html'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 3',
      exampleTitle: 'Example: Array Allocation And Indexing',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the program line by line. Watch the stack reference point to one heap array.',
      programLabel: 'Program.cs',
      programNote: 'The array variable stores a reference. The cells live in the heap object.',
    },
    code: { ...CH3_ARRAY_CODE, tokens: GRAMMAR_TOKEN_SPEC },
    tokens: GRAMMAR_TOKEN_SPEC,
    states: CH3_ARRAY_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Before the walkthrough, predict where each value lives.',
    answers: { variable: 'stack reference', elements: 'heap array', index3: 'fourth cell' },
    bank: ['stack reference', 'heap array', 'fourth cell', 'separate variable'],
    prompts: [
      { slot: 'variable', label: 'temperatures', prompt: 'What does the variable temperatures hold?', hint: 'It does not hold seven doubles directly.' },
      { slot: 'elements', label: 'array cells', prompt: 'Where do the seven double cells live?', hint: 'new double[7] creates an object.' },
      { slot: 'index3', label: '[3]', prompt: 'Which cell is temperatures[3]?', hint: 'Indexing starts at 0.' },
    ],
  },
  mainLesson: {
    title: 'Arrays Are Heap Objects',
    label: 'Main Lesson',
    intro: 'An array variable is a stack binding that stores a reference. The array elements are cells inside one heap object.',
    acts: [
      {
        n: 1,
        title: 'Allocate The Array',
        body: ['The expression new double[7] creates one heap object with seven cells.', 'The stack variable temperatures stores the reference to that object.'],
        code: ['double[] temperatures = new double[7];'],
        memory: [{ name: 'temperatures', type: 'double[]', value: 'ref 0x200' }],
        translations: ['Create a double array of size 7 and store a reference to it in temperatures.'],
      },
      {
        n: 2,
        title: 'Write By Shifting',
        body: ['temperatures[3] means go to the array and shift by three cells.', 'Because index 0 is the first cell, index 3 is the fourth cell.'],
        code: ['temperatures[3] = 71.5;'],
        memory: [{ name: 'temperatures[3]', type: 'double cell', value: '71.5' }],
        translations: ['Go to the location of temperatures, shift by 3 doubles, and store 71.5 there.'],
      },
      {
        n: 3,
        title: 'Read Then Bind',
        body: ['On the right side of =, an array access reads a value.', 'That copied value can then be bound to an ordinary local variable.'],
        code: ['double today = temperatures[3];'],
        memory: [{ name: 'today', type: 'double', value: '71.5' }],
        translations: ['Read the value at index 3 and bind that value to today.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace a smaller array and fill the state table.',
    transferCode: ['int[] scores = new int[4];', 'scores[0] = 85;', 'scores[2] = 91;', 'int best = scores[2];'],
    stateRows: [
      { after: '1', scores: 'ref 0x300', heap: '[0,0,0,0]', best: '-' },
      { after: '2', scores: 'ref 0x300', heap: '[85,0,0,0]', best: '-' },
      { after: '3', scores: 'ref 0x300', heap: '[85,0,91,0]', best: '-' },
      { after: '4', scores: 'ref 0x300', heap: '[85,0,91,0]', best: '91' },
    ],
    columns: ['scores', 'heap', 'best'],
    translations: [
      { id: 'A', text: 'Create an int array of size 4 and store a reference to it in scores.' },
      { id: 'B', text: 'Write 85 into the cell at index 0.' },
      { id: 'C', text: 'Write 91 into the cell at index 2.' },
      { id: 'D', text: 'Read scores[2] and bind the copied value to best.' },
    ],
    outputAnswers: { output: '(no output)', why: 'the code never calls Console.WriteLine' },
    valueChoices: ['ref 0x300', '[0,0,0,0]', '[85,0,0,0]', '[85,0,91,0]', '91', '-'],
    outputChoices: ['(no output)', '85', '91'],
    reasonPrompt: 'Why is nothing printed?',
    reasonChoices: ['the code never calls Console.WriteLine', 'arrays cannot print values', 'best is not initialized'],
  },
  exercises: {
    title: 'Array Memory Practice',
    label: 'Exercises',
    intro: 'Practice drawing stack references, heap arrays, and indexed reads/writes.',
    items: [
      { number: '1', title: 'Draw The Heap Array', summary: 'Allocate an array and label default values.', sample: 'scores -> [0][0][0]', prompt: 'Draw memory after int[] scores = new int[3];', constraints: ['Show scores on the stack.', 'Show one heap array.', 'Label indices 0 through 2.'] },
      { number: '2', title: 'Trace Indexed Writes', summary: 'Update two cells without changing the reference.', sample: 'scores[1] = 10', prompt: 'Trace two array writes and mark which cells changed.', constraints: ['Keep the same heap object.', 'Highlight the written indices.'] },
    ],
  },
};

const CH4_CHAIN_CODE = {
  lines: [
    { id: 'node-line-1', text: 'LinkedListNode a = new LinkedListNode(85);', translation: 'Create a node holding 85 and store its reference in a.' },
    { id: 'node-line-2', text: 'LinkedListNode b = new LinkedListNode(92);', translation: 'Create a second node holding 92 and store its reference in b.' },
    { id: 'node-line-3', text: 'LinkedListNode c = new LinkedListNode(78);', translation: 'Create a third node holding 78 and store its reference in c.' },
    { id: 'node-line-4', text: 'a.Next = b;', translation: 'Write b\'s reference into the Next field of a\'s node.' },
    { id: 'node-line-5', text: 'b.Next = c;', translation: 'Write c\'s reference into the Next field of b\'s node.' },
    { id: 'node-line-6', text: 'LinkedListNode newFront = new LinkedListNode(90);', translation: 'Create a new node that will become the front of the chain.' },
    { id: 'node-line-7', text: 'newFront.Next = a;', translation: 'Link the new node to the old front.' },
    { id: 'node-line-8', text: 'a = newFront;', translation: 'Rebind a so it points to the new front node.' },
  ],
};

const CH4_NODE_ADDRS = {
  node85: '0x500',
  node92: '0x520',
  node78: '0x540',
  node90: '0x560',
};

function nodeObj(id, addr, value, nextRef, active = false, highlightFields = null) {
  return {
    id,
    addr,
    type: 'LinkedListNode',
    shape: 'node',
    active,
    fields: {
      Value: value,
      Next: nextRef ? { ref: nextRef, addr: CH4_NODE_ADDRS[nextRef] } : 'null',
    },
    highlight: highlightFields || (active ? ['Next'] : []),
  };
}

const CH4_CHAIN_STATES = [
  { label: 'Before execution', desc: 'No node references exist yet.', memory: [], console: [] },
  {
    label: 'After line 1',
    desc: 'a points to a heap node whose Value is 85 and whose Next is null.',
    stack: [{ name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500', isNew: true }],
    heap: [nodeObj('node85', '0x500', '85', null, true)],
    memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x500' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'b points to a separate heap node. The nodes are not linked yet.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520', isNew: true },
    ],
    heap: [nodeObj('node85', '0x500', '85'), nodeObj('node92', '0x520', '92', null, true)],
    memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x500' }, { name: 'b', type: 'LinkedListNode', value: 'ref 0x520' }],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'c points to the third independent node.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540', isNew: true },
    ],
    heap: [nodeObj('node85', '0x500', '85'), nodeObj('node92', '0x520', '92'), nodeObj('node78', '0x540', '78', null, true)],
    memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x500' }, { name: 'b', type: 'LinkedListNode', value: 'ref 0x520' }, { name: 'c', type: 'LinkedListNode', value: 'ref 0x540' }],
    console: [],
  },
  {
    label: 'After line 4',
    desc: 'a.Next now holds the same reference as b.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540' },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92', true), nodeObj('node92', '0x520', '92'), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'a.Next', type: 'LinkedListNode?', value: 'ref 0x520' }],
    console: [],
  },
  {
    label: 'After line 5',
    desc: 'b.Next points to c, so a reaches b and then c.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540' },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92'), nodeObj('node92', '0x520', '92', 'node78', true), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'b.Next', type: 'LinkedListNode?', value: 'ref 0x540' }],
    console: [],
  },
  {
    label: 'After line 6',
    desc: 'newFront points to a new node that is not linked into the chain yet.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540' },
      { name: 'newFront', type: 'LinkedListNode', ref: 'node90', addr: '0x560', isNew: true },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92'), nodeObj('node92', '0x520', '92', 'node78'), nodeObj('node78', '0x540', '78'), nodeObj('node90', '0x560', '90', null, true)],
    memory: [{ name: 'newFront', type: 'LinkedListNode', value: 'ref 0x560' }],
    console: [],
  },
  {
    label: 'After line 7',
    desc: 'The new node points to the old front. The old chain is untouched.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540' },
      { name: 'newFront', type: 'LinkedListNode', ref: 'node90', addr: '0x560' },
    ],
    heap: [nodeObj('node90', '0x560', '90', 'node85', true), nodeObj('node85', '0x500', '85', 'node92'), nodeObj('node92', '0x520', '92', 'node78'), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'newFront.Next', type: 'LinkedListNode?', value: 'ref 0x500' }],
    console: [],
  },
  {
    label: 'After line 8',
    desc: 'a is rebound to the new front, so following a now visits 90, 85, 92, 78.',
    stack: [
      { name: 'a', type: 'LinkedListNode', ref: 'node90', addr: '0x560', active: true },
      { name: 'b', type: 'LinkedListNode', ref: 'node92', addr: '0x520' },
      { name: 'c', type: 'LinkedListNode', ref: 'node78', addr: '0x540' },
      { name: 'newFront', type: 'LinkedListNode', ref: 'node90', addr: '0x560' },
    ],
    heap: [nodeObj('node90', '0x560', '90', 'node85', true), nodeObj('node85', '0x500', '85', 'node92'), nodeObj('node92', '0x520', '92', 'node78'), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x560' }],
    console: [],
  },
];

const CH4_LINKED_NODE_LESSON = {
  id: 'ch4-linked-node-chain',
  chapterId: 'ch4',
  source: 'ch4/ch4-1.md',
  stableUrl: 'ch4/linked-node-chain',
  order: 1,
  title: 'Linked Node Chain',
  kicker: 'Chapter 4',
  learningTarget: 'Build a linked node chain by storing references in node fields and rebinding the front reference.',
  roadmap: { order: 1, sourceAnchors: ['ch4/ch4-1.md:482', 'ch4/ch4-1.md:588'], reviewConcepts: ['reference memory', 'class objects'] },
  availableSyntax: CH4_LINKED_SYNTAX,
  chapterNav: { chapters: GRAMMAR_CHAPTERS_CH4 },
  chapterExamples: grammarExamples(CH4_LINKED_EXAMPLES, 'Ch4 Linked Node Chain Sequence.html'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 4',
      exampleTitle: 'Example: Linked Node Chain',
      modeLabel: 'Full Walkthrough',
      instructions: 'Run the node-building code. Watch stack references and heap Next fields form the chain.',
      programLabel: 'Program.cs',
      programNote: 'The chain exists because heap node fields store references to other heap nodes.',
    },
    code: { ...CH4_CHAIN_CODE, tokens: GRAMMAR_TOKEN_SPEC },
    tokens: GRAMMAR_TOKEN_SPEC,
    states: CH4_CHAIN_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Predict which assignments change stack bindings and which change heap fields.',
    answers: { stack: 'a = newFront;', heap: 'newFront.Next = a;' },
    bank: ['a = newFront;', 'newFront.Next = a;', 'new LinkedListNode(90);'],
    prompts: [
      { slot: 'heap', label: 'Heap field write', prompt: 'Which line writes a reference into a node field?', hint: 'Look for dot notation with Next on the left.' },
      { slot: 'stack', label: 'Stack rebinding', prompt: 'Which line changes what the stack variable a points to?', hint: 'Look for a on the left by itself.' },
    ],
  },
  mainLesson: {
    title: 'Linked Lists Are Heap Shapes',
    label: 'Main Lesson',
    intro: 'A linked list is not a new kind of visualizer. It is the stack/heap memory view with node objects whose Next fields point at other node objects.',
    acts: [
      {
        n: 1,
        title: 'Each Node Is A Heap Object',
        body: ['new LinkedListNode(85) creates one node object.', 'The stack variable a stores a reference to that object.'],
        code: ['LinkedListNode a = new LinkedListNode(85);'],
        memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x500' }],
        translations: ['Create a node holding 85 and store its reference in a.'],
      },
      {
        n: 2,
        title: 'Next Stores A Reference',
        body: ['a.Next = b writes b\'s reference into a heap field.', 'No node is copied. Two paths now reach b: the variable b and the field a.Next.'],
        code: ['a.Next = b;'],
        memory: [{ name: 'a.Next', type: 'LinkedListNode?', value: 'ref 0x520' }],
        translations: ['Write b into the Next field of the object referred to by a.'],
      },
      {
        n: 3,
        title: 'Rebind The Front',
        body: ['Adding at the front creates one new node, links it to the old front, then rebinds the front reference.', 'The old nodes do not move. Only references change.'],
        code: ['newFront.Next = a;', 'a = newFront;'],
        memory: [{ name: 'a', type: 'LinkedListNode', value: 'ref 0x560' }],
        translations: ['Point the new node at the old front, then make a point at the new node.'],
      },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace a two-node chain and predict the final front.',
    transferCode: ['LinkedListNode first = new LinkedListNode(10);', 'LinkedListNode second = new LinkedListNode(20);', 'second.Next = first;', 'first = second;'],
    stateRows: [
      { after: '1', first: 'ref 0x700', second: '-', chain: '10 -> null' },
      { after: '2', first: 'ref 0x700', second: 'ref 0x720', chain: '10 and 20 separate' },
      { after: '3', first: 'ref 0x700', second: 'ref 0x720', chain: '20 -> 10' },
      { after: '4', first: 'ref 0x720', second: 'ref 0x720', chain: '20 -> 10' },
    ],
    columns: ['first', 'second', 'chain'],
    translations: [
      { id: 'A', text: 'Create the first node and store its reference in first.' },
      { id: 'B', text: 'Create the second node and store its reference in second.' },
      { id: 'C', text: 'Write first into second.Next.' },
      { id: 'D', text: 'Rebind first to the same node as second.' },
    ],
    outputAnswers: { output: '(no output)', why: 'the code changes references but never prints' },
    valueChoices: ['ref 0x700', 'ref 0x720', '-', '10 -> null', '10 and 20 separate', '20 -> 10'],
    outputChoices: ['(no output)', '10', '20'],
    reasonPrompt: 'Why is there no output?',
    reasonChoices: ['the code changes references but never prints', 'linked lists cannot print', 'first is null'],
  },
  exercises: {
    title: 'Linked Memory Practice',
    label: 'Exercises',
    intro: 'Practice drawing node objects and explaining which references changed.',
    items: [
      { number: '1', title: 'Draw Two Nodes', summary: 'Create two independent node objects.', sample: 'x -> node(4), y -> node(9)', prompt: 'Draw memory after two LinkedListNode constructor calls.', constraints: ['Show two stack references.', 'Show two heap nodes.', 'Set each Next field to null.'] },
      { number: '2', title: 'Wire A Chain', summary: 'Store one node reference in another node field.', sample: 'x.Next = y', prompt: 'Draw memory after x.Next = y.', constraints: ['Do not copy y.', 'Write the reference into x.Next.', 'Show that y still points to the same node.'] },
    ],
  },
};

const CH4_TRAVERSAL_CODE = {
  lines: [
    { id: 'trav-line-1', text: 'LinkedListNode head = new LinkedListNode(85);', translation: 'Create the first node and bind head to it.' },
    { id: 'trav-line-2', text: 'head.Next = new LinkedListNode(92);', translation: 'Create the second node and store its reference in head.Next.' },
    { id: 'trav-line-3', text: 'head.Next.Next = new LinkedListNode(78);', translation: 'Create the third node and store its reference in the second node\'s Next field.' },
    { id: 'trav-line-4', text: 'LinkedListNode? current = head;', translation: 'Copy the head reference into current.' },
    {
      id: 'trav-line-5',
      text: 'while (current != null) {',
      badge: 'condition',
      translation: 'Check whether current still points to a node.',
      scope: [
        { id: 'trav-body-print', text: 'Console.WriteLine(current.Value);', badge: 'body', translation: 'Print the value in the current node.' },
        { id: 'trav-body-progress', text: 'current = current.Next;', badge: 'progress', translation: 'Advance current to the next node.' },
      ],
      close: '}',
    },
  ],
};

const TRAVERSAL_HEAP = [
  nodeObj('node85', '0x500', '85', 'node92'),
  nodeObj('node92', '0x520', '92', 'node78'),
  nodeObj('node78', '0x540', '78'),
];

function traversalStack(currentRef, active = true) {
  const stack = [
    { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
  ];

  if (currentRef) {
    stack.push({
      name: 'current',
      type: 'LinkedListNode?',
      ref: currentRef,
      addr: CH4_NODE_ADDRS[currentRef],
      active,
    });
  } else {
    stack.push({ name: 'current', type: 'LinkedListNode?', value: 'null', active });
  }

  return stack;
}

function traversalHeap(activeRef = null, highlightFields = []) {
  return [
    nodeObj('node85', '0x500', '85', 'node92', activeRef === 'node85', activeRef === 'node85' ? highlightFields : []),
    nodeObj('node92', '0x520', '92', 'node78', activeRef === 'node92', activeRef === 'node92' ? highlightFields : []),
    nodeObj('node78', '0x540', '78', null, activeRef === 'node78', activeRef === 'node78' ? highlightFields : []),
  ];
}

function traversalTraceStep({ rowKey, iteration, phase, outcome, note, currentRef, activeRef = currentRef, highlight = [], console = [] }) {
  const currentAddr = currentRef ? CH4_NODE_ADDRS[currentRef] : 'null';
  return {
    rowKey,
    iteration,
    phase,
    outcome,
    note,
    stack: traversalStack(currentRef),
    heap: traversalHeap(activeRef, highlight),
    memory: [{ name: 'current', type: 'LinkedListNode?', value: currentAddr }],
    console,
  };
}

const CH4_TRAVERSAL_STATES = [
  {
    label: 'Before execution',
    desc: 'No local references or heap nodes exist yet.',
    stack: [],
    heap: [],
    memory: [],
    console: [],
  },
  {
    label: 'After line 1',
    desc: 'head points at the first heap node. Its Next field is null for now.',
    stack: [
      { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500', isNew: true },
    ],
    heap: [nodeObj('node85', '0x500', '85', null, true)],
    memory: [{ name: 'head', type: 'LinkedListNode', value: 'ref 0x500' }],
    console: [],
  },
  {
    label: 'After line 2',
    desc: 'head.Next now points to a second heap node.',
    stack: [
      { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92', true), nodeObj('node92', '0x520', '92', null, true)],
    memory: [{ name: 'head.Next', type: 'LinkedListNode?', value: 'ref 0x520' }],
    console: [],
  },
  {
    label: 'After line 3',
    desc: 'The second node points to the third node, completing the chain 85 -> 92 -> 78.',
    stack: [
      { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92'), nodeObj('node92', '0x520', '92', 'node78', true), nodeObj('node78', '0x540', '78', null, true)],
    memory: [{ name: 'head.Next.Next', type: 'LinkedListNode?', value: 'ref 0x540' }],
    console: [],
  },
  {
    label: 'After line 4',
    desc: 'current starts at the same node as head. No nodes are copied.',
    stack: [
      { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'current', type: 'LinkedListNode?', ref: 'node85', addr: '0x500', isNew: true },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92', true), nodeObj('node92', '0x520', '92', 'node78'), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'current', type: 'LinkedListNode?', value: 'ref 0x500' }],
    console: [],
  },
  {
    label: 'Line 5',
    desc: 'The loop repeatedly checks current, prints the node value, then advances to current.Next.',
    stack: [
      { name: 'head', type: 'LinkedListNode', ref: 'node85', addr: '0x500' },
      { name: 'current', type: 'LinkedListNode?', ref: 'node85', addr: '0x500', active: true },
    ],
    heap: [nodeObj('node85', '0x500', '85', 'node92', true), nodeObj('node92', '0x520', '92', 'node78'), nodeObj('node78', '0x540', '78')],
    memory: [{ name: 'current', type: 'LinkedListNode?', value: 'ref 0x500' }],
    console: [],
    loopTrace: {
      title: 'Trace linked-list traversal',
      sourceLine: 'while (current != null) { ... }',
      steps: [
        traversalTraceStep({
          rowKey: 'trav-line-5',
          iteration: 'iteration 1',
          phase: 'check',
          outcome: 'true',
          note: 'current holds 0x500, so it points to the first heap node and the body runs.',
          currentRef: 'node85',
        }),
        traversalTraceStep({
          rowKey: 'trav-body-print',
          iteration: 'iteration 1',
          phase: 'body',
          outcome: 'print',
          note: 'Read Value from the heap object at 0x500 and print 85.',
          currentRef: 'node85',
          highlight: ['Value'],
          console: ['85'],
        }),
        traversalTraceStep({
          rowKey: 'trav-body-progress',
          iteration: 'iteration 1',
          phase: 'progress',
          outcome: 'advance',
          note: 'Read Next from 0x500. It stores 0x520, so current becomes 0x520.',
          currentRef: 'node92',
          activeRef: 'node85',
          highlight: ['Next'],
          console: ['85'],
        }),
        traversalTraceStep({
          rowKey: 'trav-line-5',
          iteration: 'iteration 2',
          phase: 'check',
          outcome: 'true',
          note: 'current holds 0x520, so it points to the second heap node and the body runs again.',
          currentRef: 'node92',
          console: ['85'],
        }),
        traversalTraceStep({
          rowKey: 'trav-body-print',
          iteration: 'iteration 2',
          phase: 'body',
          outcome: 'print',
          note: 'Read Value from the heap object at 0x520 and print 92.',
          currentRef: 'node92',
          highlight: ['Value'],
          console: ['85', '92'],
        }),
        traversalTraceStep({
          rowKey: 'trav-body-progress',
          iteration: 'iteration 2',
          phase: 'progress',
          outcome: 'advance',
          note: 'Read Next from 0x520. It stores 0x540, so current becomes 0x540.',
          currentRef: 'node78',
          activeRef: 'node92',
          highlight: ['Next'],
          console: ['85', '92'],
        }),
        traversalTraceStep({
          rowKey: 'trav-line-5',
          iteration: 'iteration 3',
          phase: 'check',
          outcome: 'true',
          note: 'current holds 0x540, so it points to the third heap node and the body runs one more time.',
          currentRef: 'node78',
          console: ['85', '92'],
        }),
        traversalTraceStep({
          rowKey: 'trav-body-print',
          iteration: 'iteration 3',
          phase: 'body',
          outcome: 'print',
          note: 'Read Value from the heap object at 0x540 and print 78.',
          currentRef: 'node78',
          highlight: ['Value'],
          console: ['85', '92', '78'],
        }),
        traversalTraceStep({
          rowKey: 'trav-body-progress',
          iteration: 'iteration 3',
          phase: 'progress',
          outcome: 'advance',
          note: 'Read Next from 0x540. It stores null, so current becomes null.',
          currentRef: null,
          activeRef: 'node78',
          highlight: ['Next'],
          console: ['85', '92', '78'],
        }),
        traversalTraceStep({
          rowKey: 'trav-line-5',
          iteration: 'after loop',
          phase: 'check',
          outcome: 'false',
          note: 'current is null, so the loop exits.',
          currentRef: null,
          activeRef: null,
          console: ['85', '92', '78'],
        }),
      ],
    },
  },
];

const CH4_LINKED_TRAVERSAL_LESSON = {
  id: 'ch4-linked-traversal',
  chapterId: 'ch4',
  source: 'ch4/ch4-3.md',
  stableUrl: 'ch4/linked-traversal',
  order: 2,
  title: 'Linked Traversal',
  kicker: 'Chapter 4',
  learningTarget: 'Trace a linked-list traversal by checking current, reading current.Value, and advancing current to current.Next.',
  roadmap: { order: 2, sourceAnchors: ['ch4/ch4-3.md:17'], reviewConcepts: ['while loops', 'node chains'] },
  availableSyntax: CH4_LINKED_SYNTAX,
  chapterNav: { chapters: GRAMMAR_CHAPTERS_CH4 },
  chapterExamples: grammarExamples(CH4_LINKED_EXAMPLES, 'Ch4 Linked Traversal Sequence.html'),
  fullExample: {
    header: {
      chapterLabel: 'Chapter 4',
      exampleTitle: 'Example: Linked Traversal',
      modeLabel: 'Full Walkthrough',
      instructions: 'Build the sample chain, copy head into current, then open the loop stepper to inspect each current != null check and advance.',
      programLabel: 'Program.cs',
      programNote: 'The setup builds the heap chain. The traversal moves by rebinding current to each Next reference.',
    },
    code: { ...CH4_TRAVERSAL_CODE, tokens: GRAMMAR_TOKEN_SPEC },
    tokens: GRAMMAR_TOKEN_SPEC,
    states: CH4_TRAVERSAL_STATES,
  },
  preQuiz: {
    title: 'Pre-Quiz',
    prompt: 'Predict how traversal moves through a chain.',
    answers: { guard: 'current != null', progress: 'current = current.Next;' },
    bank: ['current != null', 'current = current.Next;', 'Console.WriteLine(current.Value);'],
    prompts: [
      { slot: 'guard', label: 'Loop guard', prompt: 'Which expression decides whether traversal continues?', hint: 'It is in the while header.' },
      { slot: 'progress', label: 'Progress update', prompt: 'Which line moves current to the next node?', hint: 'Look for an assignment to current.' },
    ],
  },
  mainLesson: {
    title: 'Traversal Follows Next',
    label: 'Main Lesson',
    intro: 'Array traversal moves an index. Linked-list traversal moves a reference.',
    acts: [
      { n: 1, title: 'Start At Head', body: ['current starts by copying the head reference.', 'head stays fixed while current moves.'], code: ['LinkedListNode? current = head;'], memory: [{ name: 'current', type: 'LinkedListNode?', value: 'ref 0x500' }], translations: ['Copy the head reference into current.'] },
      { n: 2, title: 'Visit Current', body: ['When current is not null, it points to a node.', 'The body can read current.Value.'], code: ['Console.WriteLine(current.Value);'], memory: [{ name: 'current.Value', type: 'int', value: '85' }], translations: ['Display the value stored in the current node.'] },
      { n: 3, title: 'Advance By Next', body: ['current = current.Next moves to the next node.', 'When the last node has Next = null, current becomes null and the next condition check exits.'], code: ['current = current.Next;'], memory: [{ name: 'current', type: 'LinkedListNode?', value: 'next ref or null' }], translations: ['Bind current to the reference stored in current.Next.'] },
    ],
  },
  rigorousQuiz: {
    title: 'Rigorous Quiz',
    prompt: 'Trace the output of a traversal over nodes 10, 20, 30.',
    transferCode: ['LinkedListNode? current = head;', 'while (current != null) {', '  Console.WriteLine(current.Value * 2);', '  current = current.Next;', '}'],
    stateRows: [
      { after: '1', current: 'node(10)', output: '-' },
      { after: 'iter 1', current: 'node(20)', output: '20' },
      { after: 'iter 2', current: 'node(30)', output: '20 40' },
      { after: 'iter 3', current: 'null', output: '20 40 60' },
    ],
    columns: ['current', 'output'],
    translations: [
      { id: 'A', text: 'Start current at head.' },
      { id: 'B', text: 'Print twice the current node value.' },
      { id: 'C', text: 'Advance current to current.Next.' },
    ],
    outputAnswers: { output: '20 40 60', why: 'the traversal visits 10, then 20, then 30' },
    valueChoices: ['node(10)', 'node(20)', 'node(30)', 'null', '-', '20', '20 40', '20 40 60'],
    outputChoices: ['20 40 60', '10 20 30', '(no output)'],
    reasonPrompt: 'Why is the output in that order?',
    reasonChoices: ['the traversal visits 10, then 20, then 30', 'the nodes are sorted first', 'current never changes'],
  },
  exercises: {
    title: 'Linked Traversal Practice',
    label: 'Exercises',
    intro: 'Practice tracing current as it follows Next references.',
    items: [
      { number: '1', title: 'Trace Current', summary: 'List what current points to each iteration.', sample: 'node(5) -> node(8) -> null', prompt: 'Trace current for a two-node list.', constraints: ['Include the final null check.', 'Show output after each body execution.'] },
      { number: '2', title: 'Find The Progress Line', summary: 'Identify the line that makes traversal terminate.', sample: 'current = current.Next;', prompt: 'Explain why removing current = current.Next creates an infinite loop.', constraints: ['Refer to the loop guard.', 'Explain what current would keep pointing to.'] },
    ],
  },
};

function Ch3ArrayMemorySequence() {
  const { ConceptLessonSequence } = window;
  return <ConceptLessonSequence lesson={CH3_ARRAY_MEMORY_LESSON} />;
}

function Ch4LinkedNodeSequence() {
  const { ConceptLessonSequence } = window;
  return <ConceptLessonSequence lesson={CH4_LINKED_NODE_LESSON} />;
}

function Ch4LinkedTraversalSequence() {
  const { ConceptLessonSequence } = window;
  return <ConceptLessonSequence lesson={CH4_LINKED_TRAVERSAL_LESSON} />;
}

Object.assign(window, {
  CH3_ARRAY_MEMORY_LESSON,
  CH4_LINKED_NODE_LESSON,
  CH4_LINKED_TRAVERSAL_LESSON,
  Ch3ArrayMemorySequence,
  Ch4LinkedNodeSequence,
  Ch4LinkedTraversalSequence,
});
