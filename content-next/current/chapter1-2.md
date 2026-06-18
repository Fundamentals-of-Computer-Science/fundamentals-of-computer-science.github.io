---
title: ...
draft: true
---

## Computation

We can store booleans and track state. Now we want to transform state. What tools do we have to compute new values?

Every type has tools for computation. For numbers, we have arithmetic. For booleans, we have logical operators. This section covers the tools that come built-in for working with boolean values.

### Computation Transforms State

In the previous section, we bound values directly:

```csharp
bool x = true;
```

The value true came from us, typed literally into the code. But what if we want to compute a new value from existing bindings?

```csharp
bool a = true;
bool b = !a;
```

Line 1: bind true to a.

Line 2: evaluate a (get true), compute its negation (get false), bind false to b.

State table:

| after line | a | b |
|------------|---|---|
| 1 | true | — |
| 2 | true | false |

The `!` symbol is an operator. It took a value and transformed it. This is computation.

Here's the key insight: computation reads state (evaluates bindings), transforms values, and the result can be bound to update state. The pattern is always the same. Evaluate, transform, bind.

### Expressions

Before we explore operators, we need one more definition.

An **expression** is code that evaluates to a value.

We've already seen expressions without naming them. When we wrote `bool copy_of_x = x;`, the `x` on the right side is an expression. It evaluates to whatever value x holds.

A literal value like `true` is also an expression. It evaluates to itself.

And when we write `!a`, that's an expression too. It evaluates a, applies the NOT operator, and produces a new value.

Expressions can be simple (a single variable or value) or compound (operators combining multiple parts). But they all share one thing: they evaluate to a value.

The right side of `=` is always an expression. We evaluate it completely, then bind the result.

One more thing: a variable by itself is an expression of its type. If `x` is a boolean variable, then `x` is a boolean expression. It evaluates to a boolean value.

### Logical NOT

Let's examine our first operator.

**NOT** (`!`) is a unary boolean operator with type signature `bool → bool`. It returns false when given true, and true when given false.

NOT takes a boolean and produces a boolean. It transforms true to false, and false to true. We call it negation.

Unary means "one." NOT takes one input.

We can describe NOT's behavior completely with a truth table:

| x | !x |
|---|-----|
| true | false |
| false | true |

Two inputs, two outputs. Every possible case covered. This is the power of booleans: we can enumerate everything.

**Translation:** `!x` reads as "not x."

Let's see NOT in context:

```csharp
bool flag = true;
bool opposite = !flag;
```

Translation for line 2: "Create a boolean variable named opposite and bind the result of evaluating not flag to it."

State table:

| after line | flag | opposite |
|------------|------|----------|
| 1 | true | — |
| 2 | true | false |

Line 2 does three things:
1. Evaluate flag → true
2. Apply NOT to true → false
3. Bind false to opposite

---

**Try it yourself.**

Translate this code to English:

```csharp
bool result = !flag;
```

Write your answer before revealing ours.

<details>
<summary>Reveal answer</summary>

"Create a boolean variable named result and bind the result of evaluating not flag to it."

</details>

If your answer differed, note what you missed before continuing.

---

**Try it yourself.**

Write C# code for this description:

"Create a boolean variable named flipped and bind the negation of done to it."

<details>
<summary>Reveal answer</summary>

```csharp
bool flipped = !done;
```

</details>

If your answer differed, note what you missed before continuing.

---

### Logical AND

What if we want to check whether two things are both true?

**AND** (`&&`) is a binary boolean operator with type signature `(bool, bool) → bool`. It returns true only when both inputs are true. Otherwise, it returns false.

Binary means "two." AND takes two inputs.

Truth table:

| a | b | a && b |
|---|---|--------|
| false | false | false |
| false | true | false |
| true | false | false |
| true | true | true |

Four combinations, four outputs. Only the last row produces true.

**Translation:** `a && b` reads as "a and b."

Let's trace AND in action:

```csharp
bool left = true;
bool right = false;
bool both = left && right;
```

Translation for line 3: "Create a boolean variable named both and bind the result of evaluating left and right to it."

State table:

| after line | left | right | both |
|------------|------|-------|------|
| 1 | true | — | — |
| 2 | true | false | — |
| 3 | true | false | false |

Line 3 does four things:
1. Evaluate left → true
2. Evaluate right → false
3. Apply AND to true and false → false
4. Bind false to both

---

**Try it yourself.**

Translate this code to English:

```csharp
bool ready = loaded && valid;
```

<details>
<summary>Reveal answer</summary>

"Create a boolean variable named ready and bind the result of evaluating loaded and valid to it."

</details>

If your answer differed, note what you missed before continuing.

---

**Try it yourself.**

Write C# code for this description:

"Create a boolean variable named confirmed and bind the result of active and enabled to it."

<details>
<summary>Reveal answer</summary>

```csharp
bool confirmed = active && enabled;
```

</details>

If your answer differed, note what you missed before continuing.

---

### Logical OR

What if we want to check whether at least one of two things is true?

**OR** (`||`) is a binary boolean operator with type signature `(bool, bool) → bool`. It returns true when either input is true, or when both are true. It returns false only when both inputs are false.

Like AND, OR is a binary operator.

Truth table:

| a | b | a \|\| b |
|---|---|----------|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | true |

Only the first row produces false. Any true input makes the whole expression true.

**Translation:** `a || b` reads as "a or b."

Let's trace OR:

```csharp
bool first = false;
bool second = true;
bool either = first || second;
```

State table:

| after line | first | second | either |
|------------|-------|--------|--------|
| 1 | false | — | — |
| 2 | false | true | — |
| 3 | false | true | true |

Line 3 does four things:
1. Evaluate first → false
2. Evaluate second → true
3. Apply OR to false and true → true
4. Bind true to either

---

**Try it yourself.**

Translate this code to English:

```csharp
bool allowed = admin || owner;
```

<details>
<summary>Reveal answer</summary>

"Create a boolean variable named allowed and bind the result of evaluating admin or owner to it."

</details>

If your answer differed, note what you missed before continuing.

---

**Try it yourself.**

Write C# code for this description:

"Create a boolean variable named canProceed and bind the result of ready or override to it."

<details>
<summary>Reveal answer</summary>

```csharp
bool canProceed = ready || override;
```

</details>

If your answer differed, note what you missed before continuing.

---

### Equality Operators

Sometimes we need to check whether two values are the same.

**Equals** (`==`) is a binary operator with type signature `(bool, bool) → bool`. It returns true when both inputs have the same value. Otherwise, it returns false.

**Not Equals** (`!=`) is a binary operator with type signature `(bool, bool) → bool`. It returns true when the inputs have different values. Otherwise, it returns false.

Truth table for `==`:

| a | b | a == b |
|---|---|--------|
| false | false | true |
| false | true | false |
| true | false | false |
| true | true | true |

Equal values produce true. Different values produce false.

Truth table for `!=`:

| a | b | a != b |
|---|---|--------|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | false |

This is the exact opposite of `==`. Different values produce true.

**Translation:** `a == b` reads as "a equals b." `a != b` reads as "a does not equal b."

Note: equality operators work for other types too, not just booleans. We'll revisit them in each chapter as we introduce new types.

---

**Try it yourself.**

Translate this code to English:

```csharp
bool same = x == y;
```

<details>
<summary>Reveal answer</summary>

"Create a boolean variable named same and bind the result of evaluating x equals y to it."

</details>

If your answer differed, note what you missed before continuing.

---

**Try it yourself.**

Write C# code for this description:

"Create a boolean variable named different and bind the result of comparing whether expected does not equal actual to it."

<details>
<summary>Reveal answer</summary>

```csharp
bool different = expected != actual;
```

</details>

If your answer differed, note what you missed before continuing.

---

### Compound Expressions

We can chain operators to build larger expressions.

Consider:

```csharp
bool result = true && false || true;
```

This expression has two operators. Which one applies first?

Like arithmetic has order of operations (multiplication before addition), boolean operators have precedence:

1. NOT (`!`) — highest priority, applies first
2. AND (`&&`) — middle priority
3. OR (`||`) — lowest priority, applies last

So `true && false || true` means:
1. First, apply AND: `true && false` → `false`
2. Then, apply OR: `false || true` → `true`

The result is `true`.

Let's trace a more complex expression:

```
!true || false && true
```

Step by step:
1. Apply NOT first: `!true` → `false`
2. Now we have: `false || false && true`
3. Apply AND next: `false && true` → `false`
4. Now we have: `false || false`
5. Apply OR last: `false || false` → `false`

The entire expression evaluates to `false`.

Parentheses override precedence. Whatever is inside parentheses evaluates first:

```
!(true || false) && true
```

Step by step:
1. Evaluate inside parentheses: `true || false` → `true`
2. Apply NOT: `!true` → `false`
3. Apply AND: `false && true` → `false`

Without parentheses, `!true || false && true` would evaluate differently (as we showed above). Parentheses let you control the order explicitly.

When in doubt, use parentheses. They make your intent clear to both the computer and anyone reading your code.

---

**Try it yourself.**

Evaluate this expression step by step:

```
true || false && false
```

<details>
<summary>Reveal answer</summary>

1. AND has higher precedence than OR, so: `false && false` → `false`
2. Now we have: `true || false`
3. Apply OR: `true || false` → `true`

Result: `true`

</details>

If your answer differed, note what you missed before continuing.

---

**Try it yourself.**

Evaluate this expression step by step:

```
!false && !true || false
```

<details>
<summary>Reveal answer</summary>

1. Apply NOT operators first: `!false` → `true`, `!true` → `false`
2. Now we have: `true && false || false`
3. Apply AND: `true && false` → `false`
4. Now we have: `false || false`
5. Apply OR: `false || false` → `false`

Result: `false`

</details>

If your answer differed, note what you missed before continuing.

---

### Short-Circuit Evaluation

There's one more thing to know about AND and OR: they don't always evaluate both sides.

Consider:

```csharp
bool result = false && something;
```

AND returns true only when both sides are true. If the left side is false, the result is false no matter what the right side is. So C# doesn't bother evaluating the right side. It already knows the answer.

This is called short-circuit evaluation.

The rules:

- `false && anything` → `false` (right side never evaluated)
- `true || anything` → `true` (right side never evaluated)

For AND: if the left side is false, stop. The answer is false.

For OR: if the left side is true, stop. The answer is true.

Why does this matter? For now, it's an optimization. The program skips work it doesn't need to do. Later, when we learn about functions that have side effects, short-circuit evaluation becomes important for correctness, not just efficiency. We'll revisit this.

---

**Try it yourself.**

In the following expression, which parts actually get evaluated?

```csharp
bool result = true || (false && true);
```

<details>
<summary>Reveal answer</summary>

Only `true` on the left side of `||` gets evaluated.

Because the left side of OR is true, the entire OR expression is true. C# never evaluates `(false && true)`.

</details>

If your answer differed, note what you missed before continuing.

---

### Review

Before continuing, test yourself on what you've learned. Attempt each exercise from memory, then search the chapter to check your answers.

#### Part 1: Definitions

Write the definitions from memory, then find them in the section to check.

1. What is an **expression**?
2. What is **NOT** (`!`)? Include its type signature.
3. What is **AND** (`&&`)? Include its type signature.
4. What is **OR** (`||`)? Include its type signature.
5. What is **Equals** (`==`)? Include its type signature.

If any of your answers differed from the definitions in this section, note what you missed and write the corrected version.

#### Part 2: Truth Tables

Complete these truth tables from memory:

**NOT:**

| x | !x |
|---|-----|
| true | |
| false | |

**AND:**

| a | b | a && b |
|---|---|--------|
| false | false | |
| false | true | |
| true | false | |
| true | true | |

**OR:**

| a | b | a \|\| b |
|---|---|----------|
| false | false | |
| false | true | |
| true | false | |
| true | true | |

Check your tables against the ones in this section.

#### Part 3: Translations

Translate each line of code to English.

1. `bool inverted = !original;`
2. `bool both = first && second;`
3. `bool any = x || y || z;`
4. `bool match = input == expected;`

Check your translations against the patterns in this section.

#### Part 4: Evaluate Expressions

Evaluate each expression step by step. Show your work.

1. `!false || true`
2. `true && false || true && true`
3. `!(true && false) || false`
4. `false || !false && true`

Work through each one, then trace through using the precedence rules to verify.

#### Part 5: Short-Circuit

For each expression, identify which parts get evaluated.

1. `false && (true || false)`
2. `true || (false && true)`
3. `true && false || true`

Think carefully about when evaluation stops.

---

You now know how to transform boolean values through computation. You can negate, combine, compare, and build compound expressions. In the next section, we'll see how these boolean expressions control which code runs.