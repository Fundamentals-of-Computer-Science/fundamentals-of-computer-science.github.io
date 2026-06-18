# Syntax Subset Reference

This reference records the C# subset taught in the canonical FunCS chapter tree:
`ch0` through `ch4`. The older `FunCS/` draft directory is not treated as a
source for this inventory.

The entries below are written for instructor planning. A later task can adapt
the same data into a student-facing "language so far" view.

## Problem-Shape Dictionary

- **Conceptual translation:** describe computation, code behavior, or memory
  state in English before or after writing code.
- **Named state:** create, read, copy, and update named values.
- **Boolean reasoning:** represent true/false state, combine conditions, and
  decide whether code runs.
- **Branching and classification:** choose one path or value from a condition,
  priority order, or pattern list.
- **Input and output:** read values from the console, display values, and format
  simple reports.
- **One-way error signaling:** recognize thrown runtime failures and write
  simple `throw` statements for invalid inputs or invalid state, without
  handling or recovery.
- **Numeric computation:** compute with integers and doubles, including
  arithmetic, comparisons, casts, division, modulo, and numeric limits.
- **Iteration:** repeat work with `while`, `for`, loop variables, loop guards,
  and update statements.
- **Accumulation and search:** count, sum, multiply, track best values, stop
  when found, or report a missing value.
- **Reusable computation:** name logic with ordinary methods, calls,
  parameters, arguments, local variables, block bodies, `void`, and `return`.
- **Recursive computation:** define a result by base case and smaller recursive
  call.
- **Structured data:** group related fields with structs or classes and read or
  write fields through dot notation.
- **Reference and memory reasoning:** track aliases, copies, null references,
  object identity, and mutation visibility.
- **Indexed collections:** create arrays, access elements by index, use length,
  traverse, fill, filter, sort, and build result arrays.
- **Linked structures:** represent a sequence with nodes, nullable next
  references, wrapper classes, and reference rewiring.
- **Higher-order collection processing:** separate traversal from behavior with
  `ForEach`, `Map`, `Filter`, `Fold`, predicates, actions, transforms, and
  combiners.
- **Generic abstraction:** parameterize a class or method over type and reason
  about equality, type inference, and result types.

## Syntax Feature Dictionary

### Foundations

#### Computation arrow notation

- Source: `ch0/index.md` ("What is Programming"; "Summary")
- Role: Frames computation as input transformed into output.
- Example: `data_in -> data_out`, `2 + 2 -> 4`, `5 > 3 -> true`
- Problem shapes: conceptual translation, numeric computation, boolean
  reasoning
- Notes: This is not C# syntax, but it is the book's first notation for
  describing computation.

#### Code-to-English and English-to-code translation

- Source: `ch0/index.md` ("Translations"; "How to Practice")
- Role: Establishes the practice of translating between C# syntax and precise
  English behavior.
- Example: `bool x = true;` -> "Create a boolean variable named x, and store the
  value true in it."
- Problem shapes: conceptual translation, named state
- Notes: This is a practice method rather than a C# feature. It should stay in
  the reference because later tasks may need cumulative student-facing wording.

#### Variable declaration with initialization

- Source: `ch0/index.md`; `ch1/ch1-1.md`; reused throughout `ch2`-`ch4`
- Role: Creates a name and stores an initial value.
- Example: `bool flag = true;`, `int count = 42;`, `double temperature = 98.6;`
- Problem shapes: named state, conceptual translation
- Notes: Declaration is distinct from later reassignment. The book starts with
  booleans, then repeats the same pattern for numbers, strings, structs, arrays,
  and class references.

#### Identifiers and statement terminators

- Source: `ch0/index.md`; visible throughout all later code examples
- Role: Names values and ends ordinary statements.
- Example: `x`, `count`, `flag;`
- Problem shapes: named state, conceptual translation
- Notes: Identifiers and semicolons are exposed early but not treated as a
  separate lesson unit.

#### Assignment and rebinding

- Source: `ch0/index.md`; `ch1/ch1-1.md`; reused in loops, structs, arrays, and
  linked lists
- Role: Stores a value in an existing variable or field.
- Example: `x = false;`, `i = i + 1;`, `frontDoor.IsOpen = false;`
- Problem shapes: named state, iteration, structured data
- Notes: Assignment overlaps with initialization, field writes, and reference
  rewiring. It remains the basic state-update form.

#### Reading a value before binding

- Source: `ch1/ch1-1.md`
- Role: Explains that the right side of an assignment or argument is evaluated
  before use.
- Example: `bool copyOfX = x;`, `x = y;`
- Problem shapes: named state, reference and memory reasoning
- Notes: This read-before-write rule later applies to fields, method
  arguments, array elements, and method calls.

#### Value-type copying

- Source: `ch1/ch1-1.md`; `ch1/ch1-5.md`; `ch2/ch2-5.md`
- Role: Shows that copying booleans, numbers, and structs copies values.
- Example: `bool copy = flag;`, `Door copy = original;`
- Problem shapes: named state, structured data, reference and memory reasoning
- Notes: This later contrasts with array and class reference assignment.

### Boolean Data and Control

#### `bool`, `true`, and `false`

- Source: `ch0/index.md`; `ch1/ch1-1.md`
- Role: Represents true/false data.
- Example: `bool isOpen = true;`
- Problem shapes: boolean reasoning, named state
- Notes: Core type for conditions, predicates, flags, and yes/no questions.

#### Boolean expressions

- Source: `ch1/ch1-2.md`
- Role: Any expression that evaluates to a boolean value.
- Example: `x`, `true`, `!a`, `active && enabled`
- Problem shapes: boolean reasoning, branching and classification, reusable
  computation
- Notes: This is the umbrella category for logical operators, comparisons,
  conditions, predicates, and boolean-returning functions.

#### Logical operators: `!`, `&&`, `||`

- Source: `ch1/ch1-2.md`; reused in `ch2`, `ch3`, and `ch4`
- Role: Negates or combines boolean values.
- Example: `!flag`, `canRead && canWrite`, `isAdmin || isOwner`
- Problem shapes: boolean reasoning, branching and classification, search
- Notes: `&&` and `||` overlap with nested conditionals when the only question
  is whether all or any conditions pass. Nested conditionals are still needed
  when different failed checks need different behavior.

#### Equality and inequality: `==`, `!=`

- Source: `ch1/ch1-2.md`; reused for strings, numbers, arrays, and linked lists
- Role: Compares whether two values are the same or different.
- Example: `x == y`, `answer != "quit"`, `node.Value == value`
- Problem shapes: boolean reasoning, branching and classification, search
- Notes: Later generic code cannot use `==` on unconstrained `T`; the generic
  linked-list section switches to `.Equals()`.

#### Parentheses, precedence, and short-circuit evaluation

- Source: `ch1/ch1-2.md`; `ch2/ch2-2.md`
- Role: Controls grouping and explains when the right side of `&&` or `||` is
  skipped.
- Example: `!(true || false) && true`, `(2 + 3) * 4`
- Problem shapes: boolean reasoning, numeric computation, conceptual
  translation
- Notes: Parentheses are a cross-cutting clarity tool for both boolean and
  numeric expressions.

#### `if`

- Source: `ch1/ch1-3.md`
- Role: Runs a block only when a condition is true.
- Example: `if (ready) { Console.WriteLine("Go!"); }`
- Problem shapes: branching and classification, boolean reasoning
- Notes: Shares condition syntax with `while`; the difference is that `if` runs
  at most once.

#### Curly-brace scope

- Source: `ch1/ch1-3.md`
- Role: Groups statements and controls where local variables exist.
- Example: `if (true) { bool inside = true; }`
- Problem shapes: named state, branching and classification, reusable
  computation
- Notes: Reused by `if`, `while`, method bodies, struct definitions, and class
  definitions. Block lambdas appear later in higher-order calls.

#### `if` / `else` and `else if`

- Source: `ch1/ch1-3.md`; expanded for numeric ranges in `ch2/ch2-3.md`
- Role: Chooses between two or more ordered cases.
- Example: `if (isAdmin) { ... } else if (isMember) { ... } else { ... }`
- Problem shapes: branching and classification, boolean reasoning, numeric
  computation
- Notes: Overlaps with switch expressions for classification. `if` remains the
  natural tool when the condition uses arbitrary boolean logic or the branch
  performs actions.

#### Nested conditionals

- Source: `ch1/ch1-3.md`
- Role: Represents dependent decisions where later checks only make sense after
  earlier checks pass.
- Example: `if (hasPermission) { if (hasQuota) { ... } else { ... } }`
- Problem shapes: branching and classification, boolean reasoning
- Notes: Overlaps with compound `&&`, but nested conditionals preserve separate
  false-case behavior.

#### `while`

- Source: `ch1/ch1-3.md`; expanded in `ch2/ch2-3.md`, `ch3/ch3-2.md`, and
  `ch4/ch4-3.md`
- Role: Repeats a block while a condition remains true.
- Example: `while (password != "secret") { password = Console.ReadLine(); }`
- Problem shapes: iteration, input and output, accumulation and search
- Notes: The book repeatedly emphasizes state progress toward termination.

### Input and Output

#### `Console.WriteLine`

- Source: `ch1/ch1-1.md`; `ch1/ch1-3.md`; reused throughout
- Role: Displays evaluated values or messages.
- Example: `Console.WriteLine(x);`, `Console.WriteLine("Width: " + r.Width);`
- Problem shapes: input and output, conceptual translation
- Notes: This is the primary output mechanism. It also appears inside void
  methods and later `Action` arguments.

#### `string`, string literals, and `Console.ReadLine`

- Source: `ch1/ch1-3.md`
- Role: Stores text from literals or user input.
- Example: `string answer = Console.ReadLine();`
- Problem shapes: input and output, branching and classification
- Notes: Chapter 1 uses strings mainly to support input-driven decisions.

#### String concatenation with `+`

- Source: `ch1/ch1-5.md`; reused in later reporting examples
- Role: Joins label text with values for display.
- Example: `Console.WriteLine("Open: " + d.IsOpen);`
- Problem shapes: input and output, structured data
- Notes: Light exposure only; this is not developed as a full string-processing
  unit.

#### `int.Parse(Console.ReadLine())`

- Source: `ch2/ch2-3.md`; `ch2/ch2-5.md`
- Role: Converts a string input into an integer.
- Example: `int n = int.Parse(Console.ReadLine());`
- Problem shapes: input and output, numeric computation, iteration
- Notes: Invalid numeric input is named as a thrown error. Range validation is
  taught; parse failure recovery is not.

#### Throw-only error signaling

- Source: `ch2/ch2-3.md`; `ch3/ch3-2.md`; `ch4/ch4-3.md`
- Role: Names operations that cannot complete under the current conditions and
  lets student-authored methods signal invalid input or invalid state.
- Example: `throw new InvalidOperationException("Cannot find maximum of an empty list.");`
- Problem shapes: one-way error signaling, branching and classification, linked
  structures
- Notes: The required subset includes throwing an error, not recovering from
  one. `try`, `catch`, custom exception classes, and exception hierarchies are
  outside the current chapters.

### Methods and Reuse

#### Ordinary method definitions

- Source: `ch1/ch1-4.md`; expanded in `ch2/ch2-4.md`; `ch3/ch3-4.md`; `ch4`
- Role: Names reusable computations with typed parameters, block bodies, and
  returned values.
- Example: `bool Not(bool x) { return !x; }`, `static int Twice(int n) { return n * 2; }`
- Problem shapes: reusable computation, boolean reasoning, numeric computation
- Notes: This is now the early reusable-computation path. Method-definition
  translations identify the return type, method name, parameter bindings, and
  returned expression or block result.

#### Method calls, parameters, and arguments

- Source: `ch1/ch1-4.md`; expanded in later chapters
- Role: Evaluates argument values, binds them to parameters, and runs the named
  computation.
- Example: `bool result = Not(true);`, `int result = Twice(x);`
- Problem shapes: reusable computation, conceptual translation
- Notes: Literal-argument translations use "compute Method with the value ...".
  Variable-argument translations first evaluate the variable, then compute the
  method with that value.

#### Void methods

- Source: `ch1/ch1-4.md`; expanded in `ch2`; `ch3`; `ch4`
- Role: Names behavior that performs an action and returns no value.
- Example: `void PrintBool(bool x) { Console.WriteLine(x); }`
- Problem shapes: reusable computation, input and output, mutation
- Notes: Void methods carry the early no-return explanation. `Action<T>` returns
  later as higher-order type notation for effect parameters such as `ForEach`.

#### Block method bodies and `return`

- Source: `ch1/ch1-4.md`; expanded in `ch2/ch2-4.md`, `ch3/ch3-4.md`, and
  `ch4`
- Role: Allows multi-statement method bodies and explicit returned values.
- Example: `bool Nor(bool a, bool b) { if (!a && !b) { return true; } return false; }`
- Problem shapes: reusable computation, branching and classification,
  accumulation and search
- Notes: Block bodies are first taught through ordinary methods. Block lambdas
  are deferred until higher-order calls need inline multi-statement behavior.

#### Methods over custom types

- Source: `ch1/ch1-5.md`; expanded in `ch2/ch2-5.md` and `ch3/ch3-5.md`
- Role: Accepts, returns, constructs, or displays structs.
- Example: `bool IsSecure(Door d) { return !d.IsOpen && d.IsLocked; }`
- Problem shapes: reusable computation, structured data
- Notes: Bridges primitive logic to modeled data.

#### Method-based recursion

- Source: `ch2/ch2-4.md`; linked-list form in `ch4/ch4-4.md`
- Role: Defines a computation through a base case and a recursive call on a
  smaller input.
- Example: `static int Factorial(int n) { if (n <= 1) return 1; return n * Factorial(n - 1); }`
- Problem shapes: recursive computation, reusable computation, numeric
  computation
- Notes: Overlaps with loops for factorial, sum-to-n, count-digits, and powers.
  Loops remain the clearer tool for counters, input validation, mutation, and
  ordinary search. Recursion is emphasized when the problem is naturally a base
  case plus a smaller input; linked lists strengthen this by making `node.Next`
  the smaller rest of the structure.

#### `Func<...>` and `Action<...>` behavior-parameter types

- Source: `ch3/ch3-4.md`; reused in `ch4/ch4-4.md`; generic forms in
  `ch4/ch4-5.md`
- Role: Describes behavior passed as an argument to higher-order collection
  methods.
- Example: `Action<int> action`, `Func<int, bool> predicate`,
  `Func<int, int> transform`, `Func<int, int, int> combine`
- Problem shapes: higher-order collection processing, reusable computation
- Notes: These are no longer the first reusable-computation syntax. They are
  introduced when `ForEach`, `Filter`, `Map`, and `Fold` need behavior
  parameters.

#### Lambda expressions and `=>`

- Source: `ch3/ch3-4.md`; reused in `ch4/ch4-4.md`; `ch4/ch4-5.md`
- Role: Writes compact inline behavior at the call site.
- Example: `x => x >= 80`, `x => x + 10`, `(acc, x) => acc + x`
- Problem shapes: higher-order collection processing, reusable computation
- Notes: Lambdas are introduced as argument syntax for higher-order calls, not
  as the early general-purpose way to define reusable computations.

### Numeric Computation

#### `int` and integer literals

- Source: `ch2/ch2-1.md`
- Role: Stores whole-number data.
- Example: `int count = 42;`
- Problem shapes: numeric computation, iteration, accumulation and search
- Notes: Overlaps with `double` for numeric storage. `int` is the right tool
  when fractional values are not meaningful.

#### `double` and decimal literals

- Source: `ch2/ch2-1.md`; `ch2/ch2-2.md`
- Role: Stores approximate real-number data and fractional results.
- Example: `double temperature = 98.6;`
- Problem shapes: numeric computation, accumulation and search
- Notes: Overlaps with `int`; `double` is needed for averages and measurements.
  The book warns about precision and equality comparisons.

#### Numeric type constraints, promotion, and casts

- Source: `ch2/ch2-1.md`; `ch2/ch2-2.md`; reused in `ch3`
- Role: Explains which numeric assignments compile and how to force double
  division.
- Example: `double y = 3;`, `double average = (double)sum / count;`
- Problem shapes: numeric computation, conceptual translation
- Notes: The explicit cast is unique when students need to avoid integer
  division before the result is stored as a double.

#### Arithmetic operators: `+`, `-`, `*`

- Source: `ch0/index.md`; `ch2/ch2-2.md`; reused throughout
- Role: Computes sums, differences, and products.
- Example: `int area = rect.Width * rect.Height;`
- Problem shapes: numeric computation, accumulation and search, structured data
- Notes: These operators underlie formulas, counters, accumulators, and geometry
  examples.

#### Integer division: `/`

- Source: `ch2/ch2-2.md`
- Role: Computes whole-number quotients when both operands are integers.
- Example: `int result = 7 / 2;`
- Problem shapes: numeric computation, digit processing
- Notes: Pairs with modulo in quotient/remainder and digit problems.

#### Modulo: `%`

- Source: `ch2/ch2-2.md`; reused in `ch2/ch2-3.md`, `ch3`, and `ch4`
- Role: Computes remainders, detects divisibility, and extracts digits.
- Example: `n % 2 == 0`, `n % 10`
- Problem shapes: numeric computation, branching and classification,
  accumulation and search
- Notes: Unique for even/odd tests, divisibility filters, and last-digit
  extraction.

#### Numeric comparisons: `<`, `>`, `<=`, `>=`

- Source: `ch0/index.md`; `ch2/ch2-2.md`; reused in branches, loops, and filters
- Role: Turns numeric relationships into booleans.
- Example: `score >= threshold`, `balance < 0`
- Problem shapes: boolean reasoning, numeric computation, branching and
  classification, search
- Notes: No covered substitute for numeric threshold decisions.

#### Integer bounds and overflow behavior

- Source: `ch2/ch2-1.md`; `ch2/ch2-2.md`
- Role: Shows fixed integer range and wraparound behavior.
- Example: `int.MaxValue + 1`
- Problem shapes: numeric computation, conceptual translation
- Notes: This is mostly a semantic warning rather than a general problem-solving
  tool.

#### Increment, decrement, and compound assignment

- Source: `ch2/ch2-3.md`; reused in `ch3`
- Role: Shortens common update patterns.
- Example: `i++`, `i--`, `sum += i`, `n /= 10`
- Problem shapes: iteration, accumulation and search, numeric computation
- Notes: Pure shorthand. Each form can be expanded to ordinary assignment plus
  an operator.

#### Accumulator and filtered-accumulator loops

- Source: `ch2/ch2-3.md`; expanded in `ch3`
- Role: Builds totals, products, counts, or selected totals across iterations.
- Example: `sum += i;`, `if (i % 2 == 0) { count++; }`
- Problem shapes: iteration, accumulation and search, numeric computation
- Notes: Later `Fold` abstracts the same skeleton.

#### Digit-processing with `/`, `%`, and loop updates

- Source: `ch2/ch2-3.md`
- Role: Peels digits from an integer.
- Example: `digit = n % 10; n /= 10;`
- Problem shapes: numeric computation, iteration, accumulation and search
- Notes: Requires both integer division and modulo.

### Branching and Classification

#### Compound numeric conditions

- Source: `ch2/ch2-2.md`; `ch2/ch2-3.md`; reused in `ch3`
- Role: Combines comparisons into ranges, invalid checks, and multi-exit loop
  guards.
- Example: `score >= 1 && score <= 100`, `i <= n && !found`
- Problem shapes: boolean reasoning, branching and classification, search
- Notes: Unique when the decision depends on multiple constraints.

#### Switch expressions and patterns

- Source: `ch2/ch2-3.md`; reused in `ch3` and `ch4`
- Role: Maps input values or patterns directly to a result value.
- Example: `string grade = score switch { >= 90 => "A", >= 80 => "B", _ => "F" };`
- Problem shapes: branching and classification, numeric computation
- Notes: Overlaps with `if` / `else if`. Switch expressions are strongest for
  compact value-producing mappings. The book includes relational patterns,
  literal patterns, `_`, `or`, and later `null` / `_` recursive cases.

#### Sentinel values

- Source: `ch3/ch3-3.md`; reused in `ch3/ch3-4.md`
- Role: Represents a failed search with a value outside the valid result range.
- Example: `int foundIndex = -1;`
- Problem shapes: accumulation and search, indexed collections
- Notes: This is a convention rather than new C# syntax, but it is part of the
  taught search subset.

### Structured Data

#### Struct definitions with public fields

- Source: `ch1/ch1-5.md`; expanded in `ch2/ch2-5.md` and `ch3/ch3-5.md`
- Role: Groups related values into a custom value type.
- Example: `struct Door { public bool IsOpen; public bool IsLocked; }`
- Problem shapes: structured data, named state
- Notes: Structs solve grouped-state and parallel-array problems. The book says
  fields are public "for now"; private fields are introduced later with classes.

#### Object variables for structs

- Source: `ch1/ch1-5.md`
- Role: Creates a variable whose type is a user-defined struct.
- Example: `Door frontDoor;`
- Problem shapes: structured data, named state
- Notes: Later `new` object creation is for classes; early struct examples use
  declaration plus field assignment.

#### Dot notation for fields

- Source: `ch1/ch1-5.md`; reused in `ch2`, `ch3`, and `ch4`
- Role: Reads or writes a field inside a structured value or object.
- Example: `frontDoor.IsOpen = false;`, `rect.Width`, `roster[2].Name`
- Problem shapes: structured data, named state, indexed collections
- Notes: Field reads and writes mirror variable reads and writes, with object
  context added on the left of the dot.

#### Structs containing arrays and mixed copy behavior

- Source: `ch3/ch3-5.md`
- Role: Shows that copying a struct copies its fields, including any array
  reference stored in a field.
- Example: `Student bob = alice; bob.Grades[0] = 50;`
- Problem shapes: structured data, reference and memory reasoning, indexed
  collections
- Notes: Unique coverage for shallow-copy reasoning.

### Arrays and Indexed Collections

#### Array type declarations: `T[]`

- Source: `ch3/ch3-1.md`
- Role: Declares a variable that refers to a fixed-size collection of one
  element type.
- Example: `double[] temperatures = new double[7];`
- Problem shapes: indexed collections, reference and memory reasoning
- Notes: Arrays are the first same-type collection in the current chapter tree.

#### Array allocation: `new T[n]`

- Source: `ch3/ch3-1.md`
- Role: Creates fixed-size array storage and returns a reference.
- Example: `new int[5]`
- Problem shapes: indexed collections, reference and memory reasoning
- Notes: Size is fixed after allocation.

#### Array indexing: `ar[i]`

- Source: `ch3/ch3-1.md`; `ch3/ch3-2.md`
- Role: Reads or writes one element by index.
- Example: `temperatures[3] = 71.5;`, `double today = temperatures[3];`
- Problem shapes: indexed collections, iteration, mutation
- Notes: Indexing is both a read form and a write target.

#### `.Length`

- Source: `ch3/ch3-1.md`; reused in traversal examples
- Role: Gives the array size for safe index bounds.
- Example: `while (i < numbers.Length)`
- Problem shapes: indexed collections, iteration
- Notes: Essential for avoiding out-of-bounds access.

#### Array reference assignment and aliasing

- Source: `ch3/ch3-1.md`; `ch3/ch3-4.md`
- Role: Shows that assigning an array variable copies the reference, not the
  array.
- Example: `int[] other = ar;`
- Problem shapes: reference and memory reasoning, indexed collections
- Notes: Unique contrast with value-type copying.

#### Indexed `while` traversal

- Source: `ch3/ch3-2.md`
- Role: Traverses arrays with a separate index variable.
- Example: `int i = 0; while (i < numbers.Length) { Console.WriteLine(numbers[i]); i++; }`
- Problem shapes: iteration, indexed collections
- Notes: Later `for` loops compress the same traversal shape.

#### `for` loops

- Source: `ch3/ch3-4.md`
- Role: Conventional compact form for indexed traversal.
- Example: `for (int i = 0; i < ar.Length; i++)`
- Problem shapes: iteration, indexed collections, reusable computation
- Notes: Overlaps with indexed `while` traversal. The `for` form keeps
  initialization, guard, and update in one header.

#### Array initializer syntax

- Source: `ch3/ch3-4.md`; `ch3/ch3-5.md`
- Role: Creates a populated array compactly.
- Example: `int[] scores = {85, 92, 78, 90, 88};`
- Problem shapes: indexed collections, examples and tests
- Notes: The book uses it heavily for examples, though `new T[n]` gets the fuller
  first-principles explanation.

#### Swapping with a temporary variable

- Source: `ch3/ch3-2.md`; reused in sorting
- Role: Exchanges two array elements without losing either value.
- Example: `int temp = ar[i]; ar[i] = ar[j]; ar[j] = temp;`
- Problem shapes: indexed collections, ordering, mutation
- Notes: Needed for selection sort and other reordering tasks.

#### Nested loops

- Source: `ch3/ch3-3.md`; `ch3/ch3-4.md`; `ch3/ch3-5.md`
- Role: Repeats traversal inside traversal.
- Example: selection sort inner/outer loops; `for (int j = 0; j < roster[i].Grades.Length; j++)`
- Problem shapes: indexed collections, ordering, nested data computation
- Notes: Used for sorting and arrays inside structs.

#### Result-array construction

- Source: `ch3/ch3-3.md`
- Role: Counts matching values, allocates an exact-size result array, then fills
  it.
- Example: count above-average scores, allocate `aboveAverage`, fill with
  matching values.
- Problem shapes: indexed collections, accumulation and search
- Notes: This is distinct from simple traversal because fixed-size arrays
  require count-then-allocate-then-fill.

#### Sorting algorithms

- Source: `ch3/ch3-3.md`; `ch3/ch3-4.md`
- Role: Reorders array elements with nested loops and swaps or shifts.
- Example: selection sort and insertion sort examples
- Problem shapes: indexed collections, ordering, mutation
- Notes: Sorting is a problem pattern built from syntax already listed: loops,
  comparisons, indexing, assignment, and temporary variables.

#### `string.Compare`

- Source: `ch3/ch3-5.md`
- Role: Compares string fields alphabetically in criterion functions.
- Example: `string.Compare(a.Name, b.Name) < 0`
- Problem shapes: structured data, accumulation and search
- Notes: This is supporting API exposure for best-by-criterion examples.

### Higher-Order Processing

#### Higher-order function types

- Source: `ch3/ch3-4.md`
- Role: Passes behavior as data and reads nested `Func` / `Action` signatures.
- Example: `Func<int[], int, Func<int, int, int>, int> Fold`
- Problem shapes: reusable computation, higher-order collection processing
- Notes: This is where `Func`, `Action`, and lambda expressions enter as
  behavior-parameter notation after ordinary method syntax is already in place.

#### `Fold`

- Source: `ch3/ch3-4.md`; linked-list form in `ch4/ch4-4.md`
- Role: Traverses a collection and combines elements into one value.
- Example: `Fold(scores, 0, Add)`, `scores.Fold(0, (a, b) => a + b)`
- Problem shapes: accumulation and search, higher-order collection processing
- Notes: Abstracts sum, product, count, and other accumulator loops.

#### `Map`

- Source: `ch3/ch3-4.md`; linked-list form in `ch4/ch4-4.md`; generic form in
  `ch4/ch4-5.md`
- Role: Builds a new collection by transforming each element.
- Example: `Map(original, Negate)`, `scores.Map(x => x + 10)`
- Problem shapes: higher-order collection processing, indexed collections,
  linked structures, generic abstraction
- Notes: Overlaps with hand-written transformation loops. Generic `Map<U>` is
  needed when the result element type differs from the source element type.

#### `Filter`

- Source: `ch3/ch3-4.md`; linked-list form in `ch4/ch4-4.md`
- Role: Builds a new collection containing only elements whose predicate is
  true.
- Example: `Filter(values, IsPositive)`, `scores.Filter(x => x >= 80)`
- Problem shapes: accumulation and search, higher-order collection processing
- Notes: Overlaps with manual filtering. `Filter` preserves the element type.

#### `ForEach`

- Source: `ch3/ch3-4.md`; linked-list method in `ch4/ch4-4.md`
- Role: Applies an action to each element.
- Example: `scores.ForEach(x => Console.WriteLine(x));`
- Problem shapes: input and output, higher-order collection processing
- Notes: Useful when traversal performs an effect rather than building or
  returning a value.

#### Method chaining

- Source: `ch4/ch4-4.md`; `ch4/ch4-5.md`
- Role: Feeds one method's returned collection into the next call.
- Example: `scores.Filter(x => x >= 70).Fold(0, (a, b) => a + b)`
- Problem shapes: higher-order collection processing, linked structures
- Notes: Overlaps with naming intermediate results. Chaining emphasizes a
  left-to-right pipeline.

### Classes, Methods, and Linked Lists

#### Class definitions

- Source: `ch4/ch4-1.md`
- Role: Defines user-created reference types with fields and behavior.
- Example: `class Rectangle { public int Width; public int Height; }`
- Problem shapes: structured data, reference and memory reasoning, linked
  structures
- Notes: Classes overlap with structs as data groupings, but class values are
  references and can support shared mutable objects.

#### Object creation with `new`

- Source: `ch4/ch4-1.md`
- Role: Allocates a class object and stores a reference.
- Example: `Rectangle rect = new Rectangle();`
- Problem shapes: structured data, reference and memory reasoning
- Notes: Contrast with struct declaration and array allocation.

#### Constructors

- Source: `ch4/ch4-1.md`
- Role: Initializes class objects consistently when they are created.
- Example: `public Rectangle(int width, int height) { this.Width = width; this.Height = height; }`
- Problem shapes: structured data, object initialization
- Notes: Overlaps with earlier Make functions, but constructors are built into
  object creation syntax.

#### `this`

- Source: `ch4/ch4-1.md`; `ch4/ch4-2.md`
- Role: Names the receiver object inside constructors and methods.
- Example: `this.Width = width;`
- Problem shapes: structured data, reference and memory reasoning
- Notes: Makes method calls connect to object state.

#### Reference semantics and aliasing for classes

- Source: `ch4/ch4-1.md`
- Role: Shows that assigning a class variable copies a reference.
- Example: `Rectangle b = a;`
- Problem shapes: reference and memory reasoning, structured data
- Notes: Similar to array aliasing, but now with user-defined class objects.

#### `public` and `private`

- Source: `ch4/ch4-1.md`; `ch4/ch4-2.md`
- Role: Controls which fields and methods outside code can access.
- Example: `private int balance;`, `public string Owner;`
- Problem shapes: structured data, reference and memory reasoning
- Notes: Unique coverage for encapsulation and class boundaries.

#### Instance methods returning values

- Source: `ch4/ch4-2.md`
- Role: Moves computations from standalone functions onto objects.
- Example: `public int Area() { return this.Width * this.Height; }`
- Problem shapes: reusable computation, structured data
- Notes: The receiver moves to the left side of the dot, connecting reusable
  behavior to object state.

#### Void instance methods

- Source: `ch4/ch4-2.md`
- Role: Performs state-changing behavior without returning a value.
- Example: `public void Deposit(int amount) { this.balance += amount; }`
- Problem shapes: structured data, mutation
- Notes: Overlaps with `Action<T>` conceptually, but becomes part of the class
  interface.

#### Get-only properties

- Source: `ch4/ch4-2.md`
- Role: Allows outside code to read private state without writing it.
- Example: `public int Balance { get { return this.balance; } }`
- Problem shapes: structured data, encapsulation
- Notes: Overlaps with getter methods but gives field-like read syntax.

#### Nullable references and `null`

- Source: `ch4/ch4-1.md`; `ch4/ch4-3.md`
- Role: Represents absence of an object and marks the end of a linked chain.
- Example: `public LinkedListNode? Next;`, `while (current != null)`
- Problem shapes: linked structures, reference and memory reasoning
- Notes: Unique to linked structures in the current material. Null element
  behavior in generic lists is not developed.

#### Self-referential fields

- Source: `ch4/ch4-1.md`
- Role: Lets a node refer to another node of the same class.
- Example: `public LinkedListNode? Next;`
- Problem shapes: linked structures, recursive data
- Notes: This is the structural basis for linked lists.

#### Linked-list wrapper class

- Source: `ch4/ch4-3.md`
- Role: Owns the head reference and hides raw nodes.
- Example: `class LinkedList { private LinkedListNode? head; }`
- Problem shapes: linked structures, encapsulation
- Notes: Unique coverage for protecting representation invariants.

#### Linked-list traversal with `current`

- Source: `ch4/ch4-3.md`
- Role: Visits nodes by following `Next` references until `null`.
- Example: `LinkedListNode? current = head; while (current != null) { ... current = current.Next; }`
- Problem shapes: linked structures, iteration, accumulation and search
- Notes: Overlaps with array traversal. The mechanism changes from index
  movement to reference movement.

#### Guard clauses and early return

- Source: `ch4/ch4-3.md`
- Role: Handles empty cases and stops work once a result is known.
- Example: `if (this.head == null) { this.head = newNode; return; }`
- Problem shapes: linked structures, branching and classification, search
- Notes: Useful for empty lists, append, remove, and contains-style methods.

#### Reference rewiring

- Source: `ch4/ch4-3.md`
- Role: Changes `Next` references to insert or remove nodes.
- Example: `newNode.Next = this.head; this.head = newNode;`
- Problem shapes: linked structures, mutation
- Notes: Unique coverage for in-place structural mutation.

#### Method overloading

- Source: `ch4/ch4-4.md`
- Role: Uses methods with the same name but different parameter lists.
- Example: `public int Count()` and `private int Count(LinkedListNode? node)`
- Problem shapes: linked structures, recursive computation, encapsulation
- Notes: Used to keep recursive helper methods private while exposing a clean
  public interface.

#### Expression-bodied methods

- Source: `ch4/ch4-4.md`
- Role: Writes compact methods that return one expression.
- Example: `public int Count() => Count(this.head);`
- Problem shapes: reusable computation, recursive computation
- Notes: Overlaps with block-bodied methods; useful when the returned expression
  is short.

#### Recursive switch expressions with `null` and `_`

- Source: `ch4/ch4-4.md`
- Role: Expresses linked-list base and recursive cases compactly.
- Example: `node switch { null => 0, _ => 1 + Count(node.Next) }`
- Problem shapes: recursive computation, linked structures
- Notes: Combines earlier switch expression syntax with nullable linked data.

### Generics

#### Generic classes and type parameters

- Source: `ch4/ch4-5.md`
- Role: Parameterizes a class over stored element type.
- Example: `class LinkedListNode<T>`, `class LinkedList<T>`,
  `LinkedList<Rectangle> shapes`
- Problem shapes: generic abstraction, linked structures, structured data
- Notes: Replaces repeated int-only, string-only, or Rectangle-only list classes.

#### Generic methods and method-level type parameters

- Source: `ch4/ch4-5.md`
- Role: Lets a method use a result or accumulator type separate from the list's
  element type.
- Example: `public LinkedList<U> Map<U>(Func<T, U> transform)`,
  `public U Fold<U>(U initial, Func<U, T, U> combine)`
- Problem shapes: generic abstraction, higher-order collection processing
- Notes: `Map<U>` and `Fold<U>` need `U`; `Filter` does not because it returns
  `LinkedList<T>`.

#### Generic type inference

- Source: `ch4/ch4-5.md`
- Role: Lets the compiler infer method-level type parameters from arguments and
  lambda return types.
- Example: `shapes.Map(r => r.Area())`, `accounts.Fold(0.0, (acc, a) => acc + a.Balance)`
- Problem shapes: generic abstraction, higher-order collection processing
- Notes: The book distinguishes method-level inference from class-level type
  arguments such as `new LinkedList<int>()`.

#### `.Equals()` for generic equality

- Source: `ch4/ch4-5.md`
- Role: Compares unconstrained generic values using a method available on every
  type.
- Example: `current.Value.Equals(value)`
- Problem shapes: generic abstraction, search, reference and memory reasoning
- Notes: Replaces `==` in generic `Contains`. Behavior depends on whether the
  element type overrides `.Equals()`.

## Syntax to Problem Shapes

| Syntax feature | Main problem shapes |
| --- | --- |
| Computation arrow notation | Conceptual translation |
| Variable declaration, assignment, identifiers | Named state; conceptual translation |
| `bool`, logical operators, equality | Boolean reasoning; branching and classification |
| Parentheses and precedence | Boolean reasoning; numeric computation |
| `if`, `else`, `else if`, nested conditionals | Branching and classification |
| `while`, loop variables, update statements | Iteration; accumulation and search |
| `Console.WriteLine`, `Console.ReadLine`, `int.Parse` | Input and output |
| Ordinary methods, calls, parameters, `void`, `return` | Reusable computation |
| `throw` | One-way error signaling |
| Method recursion with self-call | Recursive computation |
| `int`, `double`, arithmetic, casts, comparisons, `%` | Numeric computation |
| Switch expressions and patterns | Branching and classification |
| Structs, public fields, dot notation | Structured data |
| Arrays, `new T[n]`, indexing, `.Length` | Indexed collections |
| `for`, nested loops, swapping, array initializers | Indexed collections; iteration |
| `Map`, `Filter`, `Fold`, `ForEach` | Higher-order collection processing |
| Classes, constructors, `this`, methods, access modifiers | Structured data; reference and memory reasoning |
| `null`, nullable references, `Next`, wrapper classes | Linked structures |
| Method overloading and recursive helper methods | Recursive computation; encapsulation |
| Generic classes, generic methods, inference, `.Equals()` | Generic abstraction |

## Problem Shapes to Syntax

| Problem shape | Syntax tools |
| --- | --- |
| Conceptual translation | Arrow notation; code-to-English translations; memory diagrams; trace tables |
| Named state | Variable declaration; assignment; identifiers; value reads; field reads and writes |
| Boolean reasoning | `bool`; `true`; `false`; `!`; `&&`; `||`; `==`; `!=`; comparisons; parentheses |
| Branching and classification | `if`; `else`; `else if`; nested conditionals; switch expressions; patterns; `_`; `or` |
| Input and output | `Console.WriteLine`; `Console.ReadLine`; `int.Parse`; string literals; string concatenation |
| Numeric computation | `int`; `double`; `+`; `-`; `*`; `/`; `%`; casts; comparison operators; compound assignment |
| Iteration | `while`; `for`; loop variables; `.Length`; `i++`; `i--`; compound assignment; loop guards |
| Accumulation and search | Accumulator variables; found flags; sentinel values; comparisons; `return`; `Fold`; `Contains` |
| Reusable computation | Ordinary methods; parameters; arguments; calls; block bodies; `void`; `return`; later `Func`; `Action`; lambdas |
| One-way error signaling | thrown runtime errors; `throw new InvalidOperationException(...)`; exception names as diagnostics |
| Recursive computation | Method self-calls; base/recursive cases; method overloading; recursive switch expressions |
| Structured data | `struct`; `class`; public fields; private fields; dot notation; constructors; methods; properties |
| Reference and memory reasoning | Array references; class references; aliasing; `new`; `this`; `null`; nullable references |
| Indexed collections | `T[]`; `new T[n]`; `ar[i]`; `.Length`; `for`; nested loops; array initializers; swapping |
| Linked structures | `class LinkedListNode`; `LinkedListNode? Next`; wrapper class; `current`; reference rewiring |
| Higher-order collection processing | `Action<T>`; `Func<T, bool>`; `Func<T, U>`; `ForEach`; `Filter`; `Map`; `Fold`; lambdas |
| Generic abstraction | `T`; `U`; `LinkedList<T>`; `Map<U>`; `Fold<U>`; type inference; `.Equals()` |

## Overlap and Unique Coverage Notes

- **`if` vs. switch expression:** both handle classification. Use `if` when
  branches perform actions or depend on arbitrary boolean expressions. Use a
  switch expression when the code maps a value or pattern to a result.
- **Compound condition vs. nested conditional:** `a && b` is enough when only
  the all-true case matters. Nested `if` keeps separate false-case behavior.
- **`while` vs. `for`:** both traverse arrays. `for` packages index
  initialization, guard, and update into one header; `while` remains the general
  repetition form and is also used for input and linked-list traversal.
- **Loop vs. recursion:** both express some numeric reductions. Loops handle
  counters, input validation, search, and mutation naturally. Recursion matches
  problems with a base case and smaller input.
- **Manual loops vs. `Fold`, `Map`, and `Filter`:** manual loops show the
  traversal mechanics. Higher-order functions preserve the traversal skeleton
  and move the changing behavior into a behavior argument.
- **Arrays vs. linked lists:** arrays provide fixed-size indexed storage and
  direct element access. Linked lists provide growable node chains and require
  traversal by following references.
- **Structs vs. classes:** structs are copied as values. Classes are copied as
  references. Classes also support private state, constructors, and methods as
  the book's main encapsulation tools.
- **Public field vs. get-only property:** public fields allow outside read and
  write. Get-only properties allow outside read while keeping the stored field
  private.
- **Constructor vs. Make function:** both initialize structured data.
  Constructors attach initialization to `new`; Make functions are earlier
  standalone construction helpers.
- **`==` vs. `.Equals()` in generic code:** `==` works for concrete taught types
  where the operator is defined. Generic `T` uses `.Equals()` because the
  compiler cannot assume `==` exists for every possible `T`.
- **`Filter` vs. `Map<U>`:** `Filter` keeps the same element type and returns a
  subset. `Map<U>` may change the element type and returns transformed values.
- **`Fold<U>` vs. accumulator loop:** both reduce many values to one. `Fold<U>`
  makes the accumulator type and update rule explicit parameters.

## Gaps and Deferred Syntax

- The canonical chapters do not teach namespaces, `using` directives, standard
  `Main` method structure, exception recovery, `try` / `catch`, interfaces,
  inheritance, generic constraints, setters, `foreach`, LINQ, `List<T>`
  implementation details, or async syntax.
- Comments appear in code examples, but the canonical chapters do not teach
  comments as a syntax feature.
- Invalid `int.Parse` input is acknowledged as a thrown error but not handled.
- Double precision and equality are warned about, but reliable floating-point
  comparison patterns are not taught.
- Nullable behavior for generic list elements is not developed.
- Tuple switch patterns appear as a weaker exposure item than the main
  single-value switch expression material.
