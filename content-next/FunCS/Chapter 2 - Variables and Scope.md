---
title: Ch. 2 - Variables and Scope
draft: false
aliases:
  - variables
  - scope
---

If we were to take the work we've done so far and try to write a program, we couldn't do much with it. See, we've done a lot of work in simplifying values, but don't get me wrong, is important! However, notice even when describing some of the more hands on approaches in evaluating booleans, we ended up in a situation where we had to *label* things. This chapter will dive into this idea of labeling and remembering values, exploring
1. how we *bind* values to a label so that they become *reusable*,
2. whether these bindings are *permanent* or *variable*,
3. and how we define *where* we can use them.

---
## Defining Our Terms

First, we introduce what we call these labeling/bindings: *variables*.

>[!abstract] Variables
>
>>[!Definition]
>>
>>A *Variable* is a reserved space in memory used to store a value of some type.
>
>When we want to label a value in programming, we usually create a variable for it. We refer to giving a value to this variable as *binding* or *assigning* the value to it.
>
>>[!info] Properties
>>
>>- Memory Management: Types define the exact amount of memory space needed for each variable, allowing C# to efficiently allocate and manage computer resources
>>- Program Reliability: Fixed types prevent unexpected behavior by ensuring operations (like division) consistently work as intended across your code
>
>>[!example]
>>```csharp
>> int x = 7; // reads: create an int variable called x, and assign 7 to it.
>>```
>
>Notice that we use the `=` symbol here. In C# `=` is used for *assignment*, where is `==` is used to check for *equality*.

> [!example]- **Exercises - Code Correction (5 problems)**
> **Fix invalid C# code by addressing syntax/type errors**
>
> **1. Broken Code:**
> ```csharp
> double 3dPoint = 5.5;
> int count = "12";
> Console.WriteLine(3dPoint + count);
> ```
> **Task:** Identify 3 errors. Fix and explain each correction.
> <br>
> **2. Broken Code:**
> ```csharp
> bool isActive = "true";
> string user-id = "abc123";
> float temp = 98.6;
> ```
> **Task:** Find 3 issues. Correct with proper C# syntax.
> <br>
> **3. Broken Code:**
> ```csharp
> const string GREETING = "Hello";
> int x == 5;
> GREETING = "Bonjour";
> ```
> **Task:** Fix 3 fundamental errors. Explain `const` behavior.
> <br>
> **4. Broken Code:**
> ```csharp
> DateTime dueDate = 2023-12-31;
> decimal price = $19.99;
> char initial = "A";
> ```
> **Task:** Correct 3 type initialization errors.
> <br>
> **5. Broken Code:**
> ```csharp
> int hoursWorked = 8.5;
> bool isOvertime = 1;
> string message = 'Shift complete';
> ```
> **Task:** Fix 3 type mismatches. Explain proper literals.

### Memory Management
When you create a variable, C# needs to plan ahead for the space it'll occupy in memory. It's like reserving a specific size storage unit - you need to know exactly how much space you'll need:

```csharp
int age = 25;     // 32 bits reserved
double salary = 50000.00;  // 64 bits reserved
```

> [!INSIGHT] Memory Allocation
> Each type declaration gives C# precise instructions for memory allocation. No guesswork needed - just clean, efficient storage.

### Type Safety
Type consistency ensures your operations behave predictably across your codebase. Consider division:

```csharp
// Integer division
int result = 5 / 2;  // 2
// Float division
float precise = 5f / 2f;  // 2.5
```

> [!DEFINITION] Type Safety
> The guarantee that operations will behave consistently based on their types, preventing unexpected bugs and crashes.

#### Practical Impact
In real applications, type safety becomes crucial. Financial calculations, data processing, or any situation where precision matters - having guaranteed behavior makes your code reliable and maintainable.

Think of types as both an organizational system and a safety net. They help C# manage memory efficiently while ensuring your operations remain consistent and predictable throughout your code.

> [!example]- **Exercises - Output Prediction (5 problems)**
> **Predict console output then verify**
>
> **1. Code:**
> ```csharp
> int a = 5, b = 3;
> double result = a / b;
> Console.WriteLine(result);
> ```
> **Task:** Predict output. Why is it not 1.666..., and how can we modify the code to get `1.666...`?
> <br>
> **2. Code:**
> ```csharp
> int x = 10;
> x = x + x * 2;
> Console.WriteLine(x);
> ```
> **Task:** Predict the final value of `x`. Explain the order of operations (multiplication vs. addition).
> <br>
> **3. Code:**
> ```csharp
> string s = "7";
> int n = 3;
> Console.WriteLine(s + n + n);
> ```
> **Task:** Predict output. Explain how string concatenation works when combining strings and numbers.
> <br>
> **4. Code:**
> ```csharp
> double d = 1/2 + 1.0/2;
> Console.WriteLine(d);
> ```
> **Task:** Predict result. How do integer and floating-point divisions differ? Fix it so the output is `1.0`.
> <br>
> **5. Code:**
> ```csharp
> Console.WriteLine(10 - 2 * 3 + 5);
> ```
> **Task:** Predict the output. Show the operator precedence steps (multiplication vs. addition vs. subtraction).

---

Now you may have noticed that we use the word *variable*. This seemingly implies that the value held can, well, vary. This is true! C#'s variables may be re-assigned/bound by default. To cover cases where this is not desired, the const keyword is used.

>[!example]
>```csharp
>int x = 7;
>x = 15; // this is valid
>// However...
>const int y = 7;
>y = 0; // this will cause an error
>```

We now have this idea that a variable's value can change throughout the execution of your program. After line 1, `x == 7` would return `true`, however after line 2 it would return `false`.  This means if I hand you this code and ask: "What value does x have", both 7 and 15 would be valid answers. To handle this, when we talk about code, we need to be specific about the place in our program we are referring to. This allows us to talk about our code in different *states*.

>[!abstract] State
>
>>[!Definition]
>>
>>Program *state* is the set of *bindings* at a given point of execution.
>
>We can refer to the set of variables and their current values as our *bindings*.
>>[!example]
>>Given the following program
>>```csharp
>>int x = 37;
>>int y = 12;
>>bool isBigger = false;
>>
>>isBigger = x <= y;
>>
>>x = 12
>>isBigger = x <= y;
>>```
>>After line 1 runs, 37 is bound by x.
>>After line 2, 12 is bound by y.
>>Depending on if we check after line 3 or line 8 runs, isBigger will be either false or true respectively.
>>
>>To handle this we introduce using a table to track the program state:
>>
>>
| after line # runs | x   | y   | isBigger |
| ----------------- | --- | --- | -------- |
| 1                 | 37  | - | -     |
| 2                 | 37  | 12  | -      |
| 3                 | 37  | 12  | false    |
| 5                 | 37  | 12  | false    |
| 7                 | 12  | 12  | false    |
| 8                 | 12  | 12  | true     |

This let's us talk about what the data in our program is like at any point, which, now that this can change wildly line per line, seems pretty handy to me. This also let's us do something nice: we can now look at how this data changes to *better understand* what our code is doing. Instead of a bunch of expressions we try to follow, we can also look at how the state of our program changes over time to better understand how it works. This is incredibly useful when debugging code, where we often end up programming behavior wrong, and the only way to see that is to find that our stored values are off!

> [!example]- **Exercises - State Tracing (5 problems)**
> **Create variable state tables**
>
> **1. Code:**
> ```csharp
> int a = 5;
> a += 2;
> int b = a + 2;
> bool eq = (a == b);
> ```
> **Task:** Track values after each line.
> <br>
> **2. Code:**
> ```csharp
> string s = "Hi";
> s += " there";
> int len = s.Length;
> bool empty = (len == 0);
> ```
> **Task:** Show state evolution.
> <br>
> **3. Code:**
> ```csharp
> int x = 10, y = 5;
> x = y;
> y *= 2;
> bool test = (x > y);
> ```
> **Task:** Create state table with comments.
> <br>
> **4. Code:**
> ```csharp
> double d = 3.5;
> int i = (int)d;
> d = i / 2.0;
> ```
> **Task:** Track types and values.
> <br>
> **5. Code:**
> ```csharp
> bool a = true, b = false;
> bool c = (a == b);
> a = !c;
> ```
> **Task:** Show boolean state changes.
>
> [!info] **Fillable State Table**
> You might create a table like below to record each variable’s state after each line.
>
> > [!example] **Unfilled State Table**
> > | Line | a     | b     | eq    | Notes                        |
> > |-----:|:-----:|:-----:|:-----:|:-----------------------------|
> > | 1    |       |       |       | int a = 5;                   |
> > | 2    |       |       |       | a += 2;                      |
> > | 3    |       |       |       | int b = a + 2;               |
> > | 4    |       |       |       | bool eq = (a == b);          |

Now there may be some question about how this works under the hood. Well, notice that when we define a variable, we must give it a type. This is important: *Programming languages use types not only to define what kind of value something will be, but also how much space it will take*. So when we create a variable, C# first looks at the type, remember an int is a 32bit whole number, right? Well, C# will find a 32-bit chunk of memory and reserve it for your variable. We also need to name it: this name is how C# finds the variable in memory, this is how it determines its *address*.

However, this raises a question: if we are reserving space in memory for these variables, how/when are they ever freed?

C# uses what's called a garbage collector, to detect when a variable will not be used again in the program, "releasing" it from memory thereafter.

C# also recognizes that it can be nice to have manual control over this as well, providing tools to allow us to control where a variable will be available explicitly, rather than letting the garbage collector take all the fun from us. It does so using the concept of define *scopes*.

>[!abstract] Scope
>
>>[!Definition]
>>
>>Program *scope* hold boundaries of code, with a defined *start* and *end*, where any new entries to the programs state are cleared once execution crosses the *end*.
>
>This means that any variable, or other binding, we create within a specific scope is *only* accessible within, and *inaccessible* from the outside.
>>[!example]
>>In C#, we use *curly braces* `{}` to define the bounds of scope.
>>```csharp
>>{
>>int x = 17;
>>x > 1; // this works
>>}
>>
>>{
>>int y = 18
>>y = x; // this doesn't, x doesn't exist outside of the scope it belongs to
>>}
>>```

> [!example]- **Exercises - Scope Identification (5 problems)**
> **Find and fix scope violations**
>
> **1. Code:**
> ```csharp
> {
>     int secret = 42;
> }
> Console.WriteLine(secret);
> ```
> **Task:** Diagnose the error. Propose two fixes (e.g., declare `secret` outside the block).
> <br>
> **2. Code:**
> ```csharp
> {
>     string name = "Alan";
> }
> name = "Alice";
> Console.WriteLine(name);
> ```
> **Task:** Identify issue. Rewrite so `name` remains accessible where it’s needed.
> <br>
> **3. Code:**
> ```csharp
> {
>     int localNumber = 3;
>     localNumber = localNumber + 5;
> }
> localNumber = localNumber * 2;
> Console.WriteLine(localNumber);
> ```
> **Task:** Fix the scope error so `localNumber` can be used later.
> <br>
> **4. Code:**
> ```csharp
> int x = 5;
> {
>     int x = 10;
>     Console.WriteLine(x);
> }
> ```
> **Task:** Explain the conflict (shadowing). Demonstrate how to rename or properly declare variables without error.
> <br>
> **5. Code:**
> ```csharp
> {
>     FileStream fs = new FileStream("data.txt", FileMode.Open);
> }
> fs.Close();
> ```
> **Task:** Identify the scope problem. Suggest two solutions (e.g., declare `fs` outside the block, or close it inside).

---
## Using Variables With Expressions

### Foundational Concepts
- **Expressions evaluate to values** - This remains true even when variables are involved
- **Assignment requires full evaluation** - Right-hand side resolves completely before storage
- **Type compatibility is mandatory** - Evaluated result must match variable's declared type
- **Variables act as value proxies** - Substitute their stored value in expressions

### Variables in Expressions
Let's revisit our core definition:

>[!Definition]
>
> An *expression* is a set of values and operators which evaluate to become a single value.

Variables integrate seamlessly with this definition. When a variable appears in code:

```csharp
int x = 32;
int y = x; // What occurs here?
```

**Execution sequence:**
1. Create integer `x` storing 32
2. Create integer `y`
   - Evaluate `x` → 32
   - Store result in `y`

This behavior leads us to recognize:

- Variables are _evaluable entities_ in expressions
- Using a variable retrieves its **current value**

### The Assignment Process
Our updated definition expands expression components:

>[!Definition]
>
> An *expression* is a set of operators and/or entities which combine to evaluate to a single value.

This directly informs assignment mechanics:

>[!abstract] Assignment
>
>>[!Definition]
>>
>> Before we *assign* or *bind* a value to a variable, the expression is fully evaluated.
>
>>[!example]
>> ```csharp
>> int x = 32 + 7;
>> ```
>> **Execution steps:**
>> 1. Allocate `int` storage named `x`
>> 2. Evaluate `32 + 7` → 39
>> 3. Store 39 in `x`

This "evaluate first, store second" principle ensures expressions always resolve to concrete values before assignment.

### Type Safety Enforcement
Consider this type mismatch:

```csharp
int x = "hello"; // Invalid assignment
```

The compiler error:
```csharp
error CS0029: Cannot implicitly convert type 'string' to 'int'
```

This demonstrates **type safety** - the system prevents using incompatible types, analogous to needing specific tools for particular tasks. Key benefits:
- Predictable program behavior
- Prevention of invalid operations
- Clear error diagnostics

### Expression Evaluation in Practice
Combining variables in complex expressions:

```csharp
// Rectangle dimensions
int length = 5;
int width = 7;
int rectangle_area = length * width;
```

**Evaluation sequence:**
1. Evaluate `length` → 5
2. Evaluate `width` → 7
3. Multiply results → 35
4. Store 35 in `rectangle_area`

This demonstrates our fundamental rule:

>[!Important]
> **Evaluation Priority**
> Variables always resolve to their **current values** before any operations execute.

> [!example]- **Exercises - Evaluation Sequencing (5 problems)**
> **Step through expression evaluation**
>
> **1. Code:**
> ```csharp
> int a = 3;
> int b = a * a + 2;
> ```
> **Task:** Show evaluation steps (order of multiplication, addition, assignment). Final values?
> <br>
> **2. Code:**
> ```csharp
> int x = 5;
> int y = x + 2 * x;
> x = y - x;
> ```
> **Task:** Trace the order of operations and assignments. Final `x` and `y`?
> <br>
> **3. Code:**
> ```csharp
> double d = (int)2.9 + Math.Ceiling(1.1);
> ```
> **Task:** Break down evaluation sequence. Which part runs first? Why?
> <br>
> **4. Code:**
> ```csharp
> string s = "a" + 1 + 2;
> string t = 1 + 2 + "a";
> ```
> **Task:** Explain how each expression is evaluated. Why do we get different results?
> <br>
> **5. Code:**
> ```csharp
> int a = 1, b = 2, c = 3;
> a = b = c;
> ```
> **Task:** Show right-to-left assignment flow (i.e., `b = c` then `a = b`).
---

---

**Core Principles:**
1. Variables serve as value proxies in expressions
2. Complete evaluation precedes any assignment
3. Type compatibility is rigorously enforced
4. Complex expressions resolve variables before performing operations

In general, you will find that many errors you run into come from not considering what order things will evaluate in. Now that we have this concept of program state and storing values, how do we create programs that change behavior based on these variables? Next chapter we will cover this, going over [[Chapter 3.1 - Branching|Branching]] as a control flow structure.
