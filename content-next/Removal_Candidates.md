# Syntax Removal Candidates

This is an instructor-facing draft for reducing the taught C# subset in the
current FunCS chapter tree. It uses `Syntax_Subset_Reference.md` as the evidence
base, especially the problem-shape dictionary, syntax-to-shape mapping,
problem-shape-to-syntax mapping, overlap notes, and gaps section.

This draft does not settle final cuts. It lists likely edits, states the
tradeoffs, and keeps the rationale available for instructor review.

## Working Mediation

Recommended compromise: remove early lambdas, early `Func`, and early `Action`
as general-purpose syntax. Reintroduce `Func` and `Action` later as type
notation for higher-order collection processing, where students need to read
signatures such as `Func<T, bool>`, `Func<T, U>`, `Func<U, T, U>`, and
`Action<T>`. Reintroduce lambda expressions at the same point as compact
argument syntax for `ForEach`, `Filter`, `Map`, and `Fold`.

This keeps the later functional material without asking beginners to learn
angle-bracket function types, lambda syntax, parameter binding, call semantics,
void-returning actions, and block-lambda `return` before the book has data and
traversal problems that make those tools useful.

A second decision is to make `throw` part of the required subset as one-way
error signaling. Students already encounter program behavior where errors are
thrown: integer division by zero, parsing non-integer input with `int.Parse`,
and indexing past the end of an array. The book should name that behavior and
give students a small way to define their own invalid-input errors. Do not
teach `try`, `catch`, exception hierarchies, or recovery.

Ordinary method syntax should also move earlier. The syntax is smaller than the
current early `Func`/lambda path, but it needs a better translation scheme.
The translation should use the book's existing language of creating, binding,
evaluating, computing, and returning.

## Condensed Agent Arguments

### Functional Programming Position

The functional argument is that lambdas and `Func` carry part of the current
sequence. The reference describes `Func<...>` as a deliberate early curriculum
choice, says lambda syntax is central to `Func`, `Action`, `Map`, `Filter`, and
`Fold`, and treats higher-order functions as a way to preserve traversal while
moving the changing behavior into an argument. From that view, cutting early
`Func` weakens the bridge to `Map`, `Filter`, and `Fold`.

The concession is that `Action` has weak early use because it mostly wraps
`Console.WriteLine`. It becomes useful when passed to `ForEach`. This position
also concedes that self-referential `Func` recursion is awkward because the
reference already notes nullable warnings and modern alternatives are not
taught.

### Object-Oriented Position

The OO argument is that early `Func` and lambdas make reusable computation look
detached from the data it uses. Later chapters need students to understand
object state, constructors, `this`, private fields, methods, properties, and
reference identity. From this view, ordinary method syntax should carry the
main reuse story, and `Func`/`Action` should arrive only when behavior must be
passed as data.

The concession is that higher-order behavior covers a distinct set of problems.
`Map`, `Filter`, `Fold`, and `ForEach` are not just shorter loops; they name
effect, selection, transformation, and reduction patterns. That material should
remain, but as a later capstone rather than an early foundation.

### Pedagogical Smoothness Position

The pedagogy argument is that the current early function unit asks students to
learn too many new ideas at once. Chapter 1 examples expose `Func`, `Action`,
angle brackets, lambda arrows, parameters, calls, no-argument functions, and
block bodies while the computations are still mostly boolean examples. The need
for the syntax is clearer in Chapter 3 and Chapter 4, where traversal varies by
predicate, transform, action, or combiner.

The concession is that removing all early function language creates a later
cliff. A lighter early "named reusable computation" idea, followed later by an
explicit checkpoint, may be enough: functions can be values, and a traversal
method can receive one as an argument.

## Remove

### Remove Early Standalone `Func` / `Action` / Lambda Coverage

Recommendation: remove the broad Chapter 1 style treatment of `Func`,
`Action`, expression lambdas, no-argument function values, and block lambdas as
the default way to introduce reusable computation.

Source evidence: the reference maps `Func`, `Action`, lambdas, calls, and
`return` to the "reusable computation" problem shape. It also says lambda
syntax is central to the book's `Func`, `Action`, `Map`, `Filter`, and `Fold`
material. The unique later role is higher-order collection processing, not
early boolean naming. The problem-shape mapping shows higher-order collection
processing uses `Action<T>`, `Func<T, bool>`, `Func<T, U>`, `ForEach`,
`Filter`, `Map`, `Fold`, and lambdas.

Tradeoff: this is a sequence claim, not a claim that function values are
useless. Students can still learn calls, parameters, arguments, and `return`
through methods when the book reaches object behavior, then learn `Func` and
`Action` as type notation for passing behavior to traversal methods.

### Remove Most Early `Action` Examples

Recommendation: remove early examples such as `Action<bool> PrintBool` and
no-argument `Action` examples unless they directly prepare for `ForEach`.

Source evidence: the reference says `Action<...>` names behavior that returns
no value and overlaps with direct `Console.WriteLine` calls. Its added value is
reuse and passing behavior as an argument. That value appears in `ForEach`,
whose problem shape is input/output plus higher-order collection processing.

Tradeoff: students still need the value-returning versus effect-performing
distinction. `ForEach` gives `Action<T>` a concrete role: apply this effect to
each element.

### Remove Self-Referential `Func` Recursion From the Main Path

Recommendation: remove or demote `Func<int, int> Factorial = null; Factorial =
n => ...` style recursion.

Source evidence: the reference says recursion through self-referential `Func`
defines computation by a base case and smaller call, but also notes nullable
warnings and modern alternatives are not taught. The overlap notes say loops
handle counters, input validation, search, and mutation naturally, while
recursion matches base-case and smaller-input problems. Later linked-list
material already gives recursion a stronger structural reason.

Tradeoff: the book can retain recursion, but the main recursive syntax can come
through private helper methods, recursive linked-list traversal, or another
method-based form. That avoids presenting the `null` placeholder trick as the
normal way to write recursive C#.

### Remove Most Block Lambdas Before Higher-Order Functions

Recommendation: remove block-lambda examples from the early subset unless the
example is needed inside a later higher-order call.

Source evidence: the reference says block lambdas and `return` are needed when a
computation uses statements, local variables, loops, or multiple cases. It also
says block lambdas overlap with expression-bodied lambdas for simple cases. If
early function syntax is removed, early block lambdas lose their main role.

Tradeoff: block bodies and `return` remain important in method bodies. The
candidate cut is the lambda-specific form, not multi-statement computation.

## Merge With Another Tool

### Merge `Func` / `Action` Syntax Into the Higher-Order Unit

Recommendation: teach `Func` and `Action` primarily as type notation for
predicates, transforms, combiners, and effects.

Source evidence: the reference maps higher-order collection processing to
`Action<T>`, `Func<T, bool>`, `Func<T, U>`, `ForEach`, `Filter`, `Map`, `Fold`,
and lambdas. It also identifies manual loops versus `Fold`, `Map`, and
`Filter`: manual loops show traversal mechanics, while higher-order functions
preserve the traversal skeleton and move the changing behavior into a function
argument.

Tradeoff: this merge changes the explanation of `Func`. Instead of presenting
it first as the ordinary way to define reusable computations, present it later
as the notation for a behavior parameter.

### Merge Lambdas With Inline Argument Syntax

Recommendation: teach lambda syntax as the compact way to write a predicate,
transform, combiner, or action at the call site.

Source evidence: the reference gives examples such as `scores.Filter(x => x >=
80)`, `scores.Map(x => x + 10)`, and `scores.Fold(0, (a, b) => a + b)`. The
same section says method chaining feeds one method's returned collection into
the next call.

Tradeoff: named helper methods or named function values may still fit longer
behavior. The student-facing rule can stay simple: use a lambda when the
behavior is short enough to read in the call.

### Merge `Action` With `ForEach`

Recommendation: teach `Action<T>` only with `ForEach` unless there is a specific
reason to name a standalone effect.

Source evidence: the reference says `ForEach` applies an action to each element
and is useful when traversal performs an effect rather than building or
returning a value. It also says `Action` overlaps with direct `Console.WriteLine`
calls.

Tradeoff: this keeps the no-return idea and ties it to a concrete traversal
shape. It also avoids early `Action` examples that only rename a print
statement.

### Merge Switch Expressions With Branching Instruction

Recommendation: treat switch expressions as a compact classification form, not
as a separate major syntax family.

Source evidence: the reference says `if` / `else if` and switch expressions
both handle classification. It says `if` is natural for arbitrary boolean logic
or action branches, while switch expressions fit compact value-producing
mappings.

Tradeoff: this is overlap, not full redundancy. Switch expressions are worth
retaining where the problem is "map this value or pattern to a result." They
should not crowd out ordinary `if` instruction.

### Merge Constructor Discussion With Earlier Make-Function Ideas

Recommendation: when constructors arrive, explicitly connect them to the
earlier "make a structured value consistently" idea.

Source evidence: the reference says constructors overlap with earlier Make
functions, but constructors attach initialization to `new`.

Tradeoff: constructors are idiomatic C# object initialization. The merge is
conceptual: do not make students learn them as an unrelated kind of
computation.

## Defer

### Defer `Func` and `Action` Until Higher-Order Collection Processing

Recommendation: defer `Func` and `Action` as syntax until the book introduces
`ForEach`, `Filter`, `Map`, and `Fold`.

Source evidence: the reference says the added value of `Action` is reuse and
passing behavior as an argument, and it maps `Func`/`Action` directly into
higher-order collection processing. The overlap note on manual loops versus
higher-order functions gives the natural sequence: students learn traversal
first, then learn how to abstract the changing part.

Tradeoff: this creates a later need for a concise "language so far" bridge. The
bridge should list the four behavior roles: effect as `Action<T>`, predicate as
`Func<T, bool>`, transform as `Func<T, U>`, and combiner as `Func<U, T, U>`.

### Defer Lambda Expressions Until They Are Arguments

Recommendation: defer lambda expression syntax until a method or function is
expecting behavior as an argument.

Source evidence: the reference says lambda expressions define small inline
functions and are central to `Func`, `Action`, `Map`, `Filter`, and `Fold`. The
later examples show lambdas doing real work as predicates, transforms, and
combiners.

Tradeoff: students will not see lambdas as early reusable computation. When
they do see `x => x >= 80`, it answers a concrete question: "Which elements
should `Filter` keep?"

### Defer Generic Method Type Inference Until After Generic Lists

Recommendation: keep generic type inference as a later explanation attached to
`Map<U>` and `Fold<U>`, not as an early feature.

Source evidence: the reference says generic type inference lets the compiler
infer method-level type parameters from arguments and lambda return types. It
also says `Map<U>` and `Fold<U>` need `U`, while `Filter` does not because it
returns `LinkedList<T>`.

Tradeoff: students need to understand why `Filter` keeps the same type and
`Map<U>` may change it. That distinction belongs after generic classes and
method-level type parameters have a job to do.

### Defer Recursive Switch Expressions

Recommendation: defer recursive switch expressions with `null` and `_` until
students already understand recursion, nullable references, and linked-list
structure.

Source evidence: the reference says recursive switch expressions combine
earlier switch expression syntax with nullable linked data. It also says they
express linked-list base and recursive cases compactly.

Tradeoff: this syntax is concise, but it compresses several ideas. A block
method with an `if (node == null)` base case is a better first form.

### Defer Full Exception Handling

Recommendation: continue deferring `try`, `catch`, exception hierarchies, and
recovery.

Source evidence: the reference lists exceptions and `try` / `catch` among gaps
and deferred syntax. It also says invalid `int.Parse` input is acknowledged but
not handled.

Tradeoff: students will still encounter runtime exception names in diagnostics.
That can remain diagnostic vocabulary without becoming a student-authored
control-flow mechanism.

## Retain Because It Has Unique Coverage

### Retain `while`

Recommendation: retain `while` as the general repetition form.

Source evidence: the reference says `while` repeats a block while a condition
remains true and is used for input, accumulation, search, arrays, and linked
lists. The overlap notes say `for` packages indexed traversal in one header,
but `while` remains the general repetition form and is used for input and
linked-list traversal.

Tradeoff: `for` can cover array traversal more compactly, but it does not cover
all repetition shapes as clearly.

### Retain `for`

Recommendation: retain `for`, but frame it as indexed traversal syntax rather
than a separate looping concept.

Source evidence: the reference says `for` overlaps with indexed `while`
traversal and keeps initialization, guard, and update in one header.

Tradeoff: `for` is redundant in principle because `while` can express the same
loop. It is not redundant in practice for arrays because it is the conventional
shape students will read elsewhere.

### Retain Arrays and Linked Lists as Different Collection Shapes

Recommendation: retain both arrays and linked lists if the course includes
reference and memory reasoning.

Source evidence: the reference says arrays provide fixed-size indexed storage
and direct element access, while linked lists provide growable node chains and
require traversal by following references. Linked lists also introduce nullable
`Next`, wrapper classes, traversal with `current`, guard clauses, and reference
rewiring.

Tradeoff: both support traversal and search, but they do not teach the same
memory model. Cutting linked lists would remove the main coverage for
self-referential structures and reference rewiring.

### Retain Classes, Constructors, `this`, Private State, Methods, and Get-Only Properties

Recommendation: retain the small OO core.

Source evidence: the reference says classes are user-created reference types,
constructors initialize class objects consistently, `this` names the receiver,
access modifiers control external access, instance methods move computations
onto objects, void methods perform state-changing behavior, and get-only
properties allow outside reads while keeping stored fields private.

Tradeoff: some of this overlaps with structs and public fields. The unique
coverage is reference identity, encapsulation, receiver-based behavior, and
controlled access.

### Retain `Map`, `Filter`, `Fold`, and `ForEach` as Later Pattern Names

Recommendation: retain the four higher-order collection operations, but make
them a later unit.

Source evidence: the reference distinguishes their problem shapes: `ForEach`
performs an effect, `Filter` selects elements, `Map` transforms elements, and
`Fold` reduces many values to one. It also says manual loops show traversal
mechanics, while higher-order functions preserve traversal and move the changing
behavior into an argument.

Tradeoff: these operations overlap with loops. They earn their place because
they name recurring computation shapes, not because they are shorter.

### Retain `Filter` Versus `Map<U>` as a Type Distinction

Recommendation: retain the distinction between filtering and mapping.

Source evidence: the reference says `Filter` keeps the same element type and
returns a subset, while `Map<U>` may change the element type and returns
transformed values.

Tradeoff: both build a new collection, so students can confuse them. Treat that
as a useful contrast rather than a reason to merge them.

### Retain `.Equals()` for Generic Equality

Recommendation: retain `.Equals()` where generic `Contains` or similar generic
search needs equality.

Source evidence: the reference says `==` works for concrete taught types where
the operator is defined, but generic `T` uses `.Equals()` because the compiler
cannot assume `==` exists for every possible `T`.

Tradeoff: `.Equals()` adds method-call syntax to a topic that is already dense.
It has unique coverage in generic code, so keep it narrow and tied to generic
equality only.

## Consider Adding

### Add Early Method Syntax and Method-Call Translations

Recommendation: introduce ordinary method syntax early enough to replace the
current broad early `Func`/`Action`/lambda treatment of reusable computation.

Source evidence: the reference maps reusable computation to calls, parameters,
arguments, block bodies, and `return`, but the current path routes those ideas
through `Func`, `Action`, and lambdas. The later class chapters already use
methods for receiver-based behavior, and the overlap notes say instance methods
overlap with `Func<Rectangle, int>` except that the receiver moves to the left
side of the dot.

Suggested definition translation:

```csharp
int Square(int x)
{
    return x * x;
}
```

"Define a method named Square that computes an integer. It receives an integer
called x. The returned value is the result of evaluating x * x."

Suggested call translations:

```csharp
int y = Square(2);
```

"Create an integer variable called y and bind the result of computing Square
with the value 2."

```csharp
int y = Square(x);
```

"Evaluate x. Compute Square with that value. Bind the returned integer to a
variable called y."

Tradeoff: this adds method syntax earlier, but removes a larger early burden:
angle-bracket function types, lambda arrows, no-argument function values, and
`Action` as a separate early topic.

### Add `throw` for One-Way Error Signaling

Recommendation: add a small `throw` pattern for methods that cannot produce a
meaningful value on invalid input or invalid state. Treat this as required
subset coverage. Do not add `try`, `catch`, recovery, custom exception classes,
or exception hierarchy instruction.

Possible form:

```csharp
if (this.head == null)
{
    throw new InvalidOperationException("The list is empty.");
}
```

Source evidence: the reference currently lists exceptions and `try` / `catch`
as deferred syntax and says invalid `int.Parse` input is acknowledged but not
handled. It also already teaches guard clauses and early return for empty
linked-list cases, sentinel values for failed search, range validation for
numeric input, and array-bounds errors as thrown runtime failures.

Rationale: a throw-only pattern can reduce awkward sentinel choices when no
valid return value exists. For example, a method that returns the first element
of an empty list has no honest integer sentinel if every integer could be a
valid element. `throw` says "this method cannot complete under this
precondition."

Tradeoff: this adds a one-way error mechanism without teaching handling. The
text should say that directly: this stops the current operation; recovery with
`try` / `catch` is outside the subset.

### Add a Recursion Throughline

Recommendation: strengthen recursion as a recurring lens rather than a single
topic. Use method-based recursion as the main form once early methods have been
introduced.

Source evidence: the reference says loops and recursion overlap for some
numeric reductions, while recursion has unique value when the problem is a base
case plus a smaller input. The linked-list material gives recursion a stronger
structural reason because each node points to the rest of the chain.

Rationale: if self-referential `Func` recursion leaves the main path, recursion
needs a new home. Method-based recursion can connect early methods, numeric
base cases, and linked-list structure without teaching the `Func = null`
placeholder pattern.

Tradeoff: recursion should not replace loops for counters, input validation,
array mutation, or ordinary search. The added emphasis should make the base-case
and smaller-input shape easier to recognize.

### Decide the Higher-Order Placement

Recommendation: keep higher-order functions, but make a deliberate placement
decision before editing chapters.

Option A: keep an array-based higher-order unit in Chapter 3. Students get more
practice with `ForEach`, `Filter`, `Map`, and `Fold` before linked lists, and
Chapter 4 can reuse the same vocabulary with reference traversal.

Option B: defer the main higher-order unit until Chapter 4. Introduce
linked-list higher-order methods and contrast them with the array forms in one
place. This reduces scattered context, but gives students fewer repeated
encounters with the tool.

Source evidence: the reference says manual loops show traversal mechanics while
higher-order functions preserve traversal and move the changing behavior into a
function argument. It also records both array and linked-list versions of
`ForEach`, `Filter`, `Map`, and `Fold`.

Tradeoff: Chapter 3 placement gives more repetition. Chapter 4 placement may
make the idea cohere better because arrays and linked lists can be compared
directly. The edit task should choose one path before rewriting examples.

### Add Behavior-Role Checkpoints

Recommendation: add a small checkpoint table before higher-order functions.

Suggested table:

| Role | Type notation | Used by |
| --- | --- | --- |
| Effect | `Action<T>` | `ForEach` |
| Predicate | `Func<T, bool>` | `Filter` |
| Transform | `Func<T, U>` | `Map<U>` |
| Combiner | `Func<U, T, U>` | `Fold<U>` |

Source evidence: the reference already maps these tools to higher-order
collection processing and generic abstraction. It also notes that nested
`Func` signatures need systematic reading.

Rationale: if early `Func`/`Action` coverage is removed, this table becomes the
main bridge. It gives students one place to read the type shapes before nested
signatures appear.

### Add Explicit Preconditions Before Throwing

Recommendation: if `throw` is added, add a precondition sentence before the
first example.

Possible wording: "This method expects the list to be non-empty. If the list is
empty, the method cannot return a meaningful value, so it throws an exception."

Source evidence: the reference already teaches range validation and guard
clauses. Precondition language keeps `throw` aligned with those existing tools.

Tradeoff: preconditions can become vague if they replace validation. Use them
only when the method contract is the point.

## True Redundancy Versus Similar-Looking Tools

Some candidates above are true redundancy. Early `Action<bool> PrintBool`
mostly renames `Console.WriteLine`, and no-argument function values add little
before behavior is passed as data. Those are strong removal candidates.

Other tools only look redundant. `while` and `for` both loop, but `while` is the
general repetition form and `for` is the conventional indexed traversal form.
`Filter` and `Map` both build collections, but `Filter` preserves the element
type and selects a subset while `Map<U>` transforms each element and may change
the result type. Arrays and linked lists both store sequences, but arrays teach
indexing and fixed-size storage while linked lists teach reference traversal,
nullable next links, wrappers, and rewiring.

Curriculum rule: cut a tool when it only restates another tool's job without
changing the problem shape. Retain or defer a tool when it names a different
shape students need to solve.

## Proposed Edit Sequence

1. Introduce ordinary method syntax early, with explicit translations for
   method definitions and calls.
2. Rewrite the early reusable-computation unit so it no longer requires broad
   `Func`/`Action`/lambda fluency.
3. Move `Func`/`Action` syntax into the higher-order collection unit as type
   notation for behavior parameters.
4. Introduce lambda expressions there as compact inline arguments.
5. Keep manual traversal first, then show how `ForEach`, `Filter`, `Map`, and
   `Fold` abstract the varying part.
6. Add required throw-only error signaling near method contracts and invalid
   input examples, with an explicit note that `try` / `catch` remains outside
   the subset.
7. Add behavior-role checkpoints before nested function signatures and before
   generic `Map<U>` / `Fold<U>`.
8. Add a recursion throughline that uses method-based recursion and linked-list
   structure rather than self-referential `Func` setup.

## Resolved Questions and Remaining Choice

Resolved: ordinary method syntax should move earlier. It needs a translation
scheme that matches the rest of the book:

- Method definition: define a method, name its returned type, name its
  parameter bindings, and state which expression or block produces the returned
  value.
- Literal argument call: create the receiving variable and bind the result of
  computing the method with that literal value.
- Variable argument call: evaluate the argument variable first, compute the
  method with that value, then bind the returned value.

Resolved: `throw` belongs in the required subset as one-way error signaling.
Students should learn that some program failures are thrown errors and that
their own methods may throw on invalid inputs. Handling those errors with
`try` / `catch` remains outside the subset.

Resolved: recursion should receive more sustained attention. If early `Func`
recursion is removed, method-based recursion should carry the base-case and
smaller-input story.

Remaining choice: place higher-order functions either in Chapter 3 for
repetition and practice, or in Chapter 4 for a single array-versus-linked-list
contrast. This is now a sequencing decision, not a question about whether to
keep the tool.
