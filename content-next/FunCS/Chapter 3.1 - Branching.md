---
draft: false
title: Ch. 3.1 - Branching
aliases:
  - Branching
  - if-else
  - if
---

Now that we've ran through basic memory, both how to store things and recall/change them, let's dive into some common uses. When presented with decisions in life, we often have to recall something or look something up. Should I wear a jacket today? Well what's the temperature outside? Okay, I'll nix the jacket this time. Here we have two paths we could have taken: to wear a jacket or not. And the tools we used to make this decision was a variable telling us the expected weather. In computer science we call this branching, which is one of the primary forms of control flow you will consider in problem solving.

## Defining Terms

The primary form of branching we use in C# is *if-statements*, which we can define as

>[!abstract] If Statements
>
>>[!Definition]
>>
>> An If Statement is a branching structure which contains a sequence of scopes with associated conditions. The only scope entered is the first of the sequence whose condition is met.
>
> When we have a single if statement, it has a single scope and a condition. This is how it looks in C#:
>
>> [!example]
>> ```csharp
>> if (3 > 2) // the condition
> >{
> >	// the scope
> >}
>>```
>
>We can also have multiple "branches". If we have two conditions we call the second one "else if"
>> [!example]
>> ```csharp
>> if(x<0) // condition 1
>>{
>>	Console.WriteLine("x is 0") // scope 1
>>}
>>else if (x > 0) // condition 2
>>{
>>	Console.WriteLine("x is positive!") // scope 2
>>}
>>```
>>
>
>We can have as many else-if's as we have options we would like to define. Finally, sometimes we want a branch for "anything other than what I said above", this is where *else* comes in
>
>> [!example]
>> ```csharp
>> if(x == 0) // condition 1
>>{
>>	Console.WriteLine("x is 0") // scope 1
>>}
>>else if (x > 0) // condition 2
>>{
>>	Console.WriteLine("x is positive!") // scope 2
>>}
>>else // no condition
>>{
>>	Console.WriteLine("x is negative!") // scope 3
>>}
>>```
>
>Notice there is no condition for *else*. Implicitly else has a condition that covers every possible condition other than the above. In this case it is `x < 0`

It's important to note: when a condition is *met*, we are saying that a boolean expression evaluates to *true*.

---

While the definitions for branching may be somewhat short compared to previous sections, there are some common pitfalls you may find yourself in. Below I'll run through a couple of examples:

### Sequential if-statements
When writing code, you might be tempted to use multiple separate if-statements to handle different cases. However, this can lead to unexpected behavior. Let's look at an example:

>[!warning] Common Mistake
>```csharp
>int score = 95;
>if (score >= 70)
>{
>    Console.WriteLine("You passed!");
>}
>if (score >= 90)
>{
>    Console.WriteLine("Excellent work!");
>}
>```
>
>What do you think happens when we run this code with `score = 95`? Both messages will print! Sometimes this is what we want, but often it's not. If we only want one message, we should use `else if`:
>
>```csharp
>if (score >= 90)
>{
>    Console.WriteLine("Excellent work!");
>}
>else if (score >= 70)
>{
>    Console.WriteLine("You passed!");
>}
>```

### Combining Conditions
Just like in real life, sometimes we make decisions based on multiple factors. In C#, we can combine conditions using logical operators:

>[!info] Logical Operators
>- `&&` (AND): Both conditions must be true
>- `||` (OR): At least one condition must be true
>- `!` (NOT): Reverses a condition
>
>>[!example]
>>```csharp
>>bool isRaining = true;
>>bool hasUmbrella = true;
>>
>>if (isRaining && !hasUmbrella)
>>{
>>    Console.WriteLine("Stay inside!");
>>}
>>else if (isRaining && hasUmbrella)
>>{
>>    Console.WriteLine("Take your umbrella!");
>>}
>>```

### Common Pitfalls
When working with if-statements, there are several mistakes that even experienced programmers sometimes make:

2. **Assignment vs. Comparison**
>[!danger] Watch Out!
>```csharp
>int x = 5;
>if (x = 10) // This is an assignment, not a comparison!
>{
>    // This won't compile
>}
>
>// Correct version:
>if (x == 10) // Use == for comparison
>{
>    // This works as expected
>}
>```

3. **Missing Braces**
When you omit braces, only the first line belongs to the if-statement:

>[!warning]
>```csharp
>if (temperature < 0)
>    Console.WriteLine("It's freezing!");
>    Console.WriteLine("Wear a coat!"); // This always executes!
>
>// Correct version:
>if (temperature < 0)
>{
>    Console.WriteLine("It's freezing!");
>    Console.WriteLine("Wear a coat!");
>}
>```

### Best Practices
To write clear and maintainable code:

4. Always use braces `{}`, even for single-line if-statements
5. Indent your code consistently
6. Order conditions from most specific to most general
7. Use meaningful variable names that make conditions readable
8. Test edge cases (like 0, negative numbers, or boundary conditions)

## Exercises

Below are several analysis exercises that focus on branching and if‑statement logic. In each exercise, you’ll be given a code snippet that uses if‑statements (sometimes with else/else‑if or even nested conditionals). Your task is to construct a state table that tracks variable values as the code executes and to explain which branch is taken at each decision point. As you work through these exercises, keep in mind these guiding points:

- **Evaluation Order:** Code is executed line by line. When you encounter a branch, first evaluate the condition, then follow the appropriate block.
- **Branching Decisions:** Identify which branch (if, else‑if, or else) is executed given the current state.
- **Edge Cases and Alternatives:** Consider what would happen if the condition were reversed or if variables had different starting values.

---

### **Exercise 1: Temperature Advice**

**Code:**

```csharp
int temperature = 65;
string advice;
if (temperature < 50)
{
    advice = "Wear a heavy coat.";
}
else if (temperature <= 70)
{
    advice = "Wear a light jacket.";
}
else
{
    advice = "No jacket needed.";
}
```

**Task:**
Create a state table that tracks the values of `temperature` and `advice` after each significant step. Then consider the alternate case where `temperature` is set to 45. How does the branch taken change?

> [!tldr]- **Filled State Table (for temperature = 65):**
>
>
>
> | Step                              | temperature | advice                     | Explanation                                                     |
> |-----------------------------------|-------------|----------------------------|-----------------------------------------------------------------|
> | 1. After `int temperature = 65;`  | 65          | –                          | Initialization of `temperature`                                 |
> | 2. After `string advice;`         | 65          | –                          | Declaration of `advice` (no value assigned yet)                  |
> | 3. After evaluating `if (temperature < 50)` | 65          | –                          | Check: 65 < 50 is false                                           |
> | 4. After evaluating `else if (temperature <= 70)` | 65          | –                          | Check: 65 <= 70 is true                                           |
> | 5. Inside the `else if` block     | 65          | "Wear a light jacket."     | `advice` gets its value                                            |
> | 6. After the if‑statement block    | 65          | "Wear a light jacket."     | Final state                                                      |
>

**Alternate Scenario (temperature = 45):**
Rebuild the table with `temperature` initialized to 45.
- Which branch is taken?
- What is the final value of `advice`?

**Further Exploration:**
- How would you modify the code (and corresponding table) if you wanted a separate message when the temperature equals exactly 50 or 70?
- What potential issues might arise if the conditions overlapped or were misordered?

---

### **Exercise 2: Score Evaluation with Nested Branching**

**Code:**

```csharp
int score = 85;
string message;
if (score >= 90)
{
    message = "Excellent work!";
}
else if (score >= 70)
{
    if (score >= 80)
    {
        message = "Good job!";
    }
    else
    {
        message = "You passed!";
    }
}
else
{
    message = "Needs improvement!";
}
```

**Task:**
Construct a state table to follow the changes in `score` and `message`. Then, answer the following:
- For `score = 85`, which nested branch is executed?
- What happens if `score` were instead 75?

> [!tldr]- **Filled State Table (for score = 85):**
>
>
>
> | Step                                         | score | message             | Explanation                                                                |
> |----------------------------------------------|-------|---------------------|----------------------------------------------------------------------------|
> | 1. After `int score = 85;`                     | 85    | –                   | Initialization of `score`                                                  |
> | 2. After `string message;`                     | 85    | –                   | Declaration of `message`                                                   |
> | 3. Evaluating `if (score >= 90)`               | 85    | –                   | Condition false (85 is not ≥ 90)                                           |
> | 4. Evaluating `else if (score >= 70)`          | 85    | –                   | Condition true (85 is ≥ 70)                                                |
> | 5. Inside the nested if: Evaluate `if (score >= 80)` | 85    | –                   | Condition true (85 is ≥ 80)                                                |
> | 6. Inside nested if block                      | 85    | "Good job!"         | `message` is set to "Good job!"                                            |
> | 7. After completing the if‑statement          | 85    | "Good job!"         | Final state                                                                |
>

**For score = 75:**
- Rebuild the table with `score = 75` and trace which branch (nested if vs. nested else) is executed.
- Explain how the nested condition refines the feedback.

**Further Discussion:**
- How do nested conditionals affect readability and state tracking?
- What strategies might you employ to simplify nested branches when they become too complex?

---

### **Exercise 3: Weather Conditions and Umbrella Advice**

**Code:**

```csharp
bool isRaining = true;
bool hasUmbrella = false;
string advice;
if (isRaining && !hasUmbrella)
{
    advice = "Stay inside!";
}
else if (isRaining && hasUmbrella)
{
    advice = "Take your umbrella!";
}
else
{
    advice = "Enjoy the day!";
}
```

**Task:**
Develop a state table to track the values of `isRaining`, `hasUmbrella`, and `advice`. Then consider altering the initial values:
- What if `isRaining` is `true` and `hasUmbrella` is `true`?
- What if `isRaining` is `false`?

> [!tldr]- **Filled State Table (for isRaining = true, hasUmbrella = false):**
>
>
>
> | Step                                              | isRaining | hasUmbrella | advice         | Explanation                                           |
> | ------------------------------------------------- | --------- | ----------- | -------------- | ----------------------------------------------------- |
> | 1. After initializing `bool isRaining = true;`    | true      | –           | –              | `isRaining` set to true                               |
> | 2. After initializing `bool hasUmbrella = false;` | true      | false       | –              | `hasUmbrella` set to false                            |
> | 3. After declaring `string advice;`               | true      | false       | –              | `advice` declared but not assigned yet                |
> | 4. Evaluating `if (isRaining && !hasUmbrella)`    | true      | false       | –              | Condition true: `true && true` (since !false is true) |
> | 5. Inside the first if block                      | true      | false       | "Stay inside!" | `advice` is set accordingly                           |
> | 6. After the if‑statement block                   | true      | false       | "Stay inside!" | Final state                                           |
>

**Alternate Scenarios:**
- **Case 1:** `isRaining = true` and `hasUmbrella = true` → Which branch is executed?
- **Case 2:** `isRaining = false` → Which branch is executed, and what is the final advice?

**Further Inquiry:**
- How does combining logical operators (`&&`, `!`) in the condition affect your state tracking?
- What additional checks might you add to handle more nuanced weather scenarios?

---

### **Exercise 4: Mixed Branching with Sequential Updates**

**Code:**

```csharp
int x = 10;
int y = 5;
string status;
if (x > y)
{
    status = "x is greater";
    x = x - 2;
}
else
{
    status = "y is greater or equal";
    y = y + 3;
}
if (x < 10)
{
    status = status + " and x is small";
}
else
{
    status = status + " and x is large";
}
```

**Task:**
Construct a state table that follows the changes in `x`, `y`, and `status` as the code executes through the two separate if‑statements. Explain at each decision point which branch is taken.

> [!tldr]- Filled State Table
>
>
>
> | Step                              | x   | y   | status                        | Explanation              |
> | --------------------------------- | --- | --- | ----------------------------- | ------------------------ |
> | 1. After `int x = 10;`            | 10  | –   | –                             | Initialization of `x`    |
> | 2. After `int y = 5;`             | 10  | 5   | –                             | Initialization of `y`    |
> | 3. After evaluating `if (x > y)`  | 10  | 5   | –                             | Check: 10 > 5 is true    |
> | 4. Inside first if block          | 10  | 5   | "x is greater"                | `status` is set          |
> | 5. After `x = x - 2;`             | 8   | 5   | "x is greater"                | `x` updated              |
> | 6. After first if‑else block      | 8   | 5   | "x is greater"                | End of first conditional |
> | 7. Evaluating `if (x < 10)`       | 8   | 5   | "x is greater"                | Check: 8 < 10 is true    |
> | 8. Inside second if block         | 8   | 5   | "x is greater and x is small" | `status` concatenated    |
> | 9. After the second if‑else block | 8   | 5   | "x is greater and x is small" | Final state              |
> >

**Discussion Points:**
- How does the sequential nature of multiple if‑statements affect the overall state?
- What would change if the second conditional were nested inside the first?
- How would you test edge cases (for example, when `x` equals `y`)?
---

Now that we have covered a wide variety of problems and scenarios you will find with branching, we can handle decisions and a large portion of defining code behavior. However there's still some left: how do we handle repetitive tasks? In our next chapter we will tackle this with [[loops]].