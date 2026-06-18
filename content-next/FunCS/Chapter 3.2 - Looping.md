---
title: Ch. 3.2 - Looping
draft: false
aliases:
  - loops
---
# Chapter 3.2: Loops - Repetition in Programming

In our previous chapter on branching, we learned how to have our programs make decisions based on conditions. Now, let's consider a new kind of problem: what if we want to add up all the numbers from 1 to 10? We could write it out using individual statements:

```csharp
int sum = 0;  // Start with zero
sum = sum + 1;  // Add 1
sum = sum + 2;  // Add 2
sum = sum + 3;  // Add 3
sum = sum + 4;  // Add 4
sum = sum + 5;  // Add 5
sum = sum + 6;  // Add 6
sum = sum + 7;  // Add 7
sum = sum + 8;  // Add 8
sum = sum + 9;  // Add 9
sum = sum + 10; // Add 10
Console.WriteLine("The sum is: " + sum);  // Print the result
```

This works, but it's tedious to write and prone to errors. Notice how we're doing the same operation over and over - we're just changing which number we add each time. We could try to use if statements, but that wouldn't help much:

```csharp
int sum = 0;
int number = 1;

if (number <= 10)
{
    sum = sum + number;
    number = 2;
}
if (number <= 10)
{
    sum = sum + number;
    number = 3;
}
// ... and so on
```

We still end up with repetitive code. What we really want is a way to tell the computer: "Keep adding numbers, starting from 1, until you reach 10." This is where loops come in. Here's how we can solve this problem with a loop:

```csharp
int sum = 0;
int number = 1;

while (number <= 10)
{
    sum = sum + number;
    number = number + 1;
}
Console.WriteLine("The sum is: " + sum);
```

This is much more concise! And we can easily modify it for different problems. For example, what if we only wanted to sum the even numbers between 1 and 10? We just need to add a condition inside our loop:

```csharp
int sum = 0;
int number = 1;

while (number <= 10)
{
    if (number % 2 == 0)  // If number is even
    {
        sum = sum + number;
    }
    number = number + 1;
}
Console.WriteLine("The sum of even numbers is: " + sum);
```

These examples show us why we need loops: they let us repeat actions without writing repetitive code, and they make our programs more flexible by letting us change how many times something repeats just by changing a few values.

This approach quickly becomes impractical. We need a way to tell our program to repeat an action until a condition is met. This is where loops come in.

## Understanding Loop Fundamentals

Before we dive into the specific syntax of loops, let's understand what makes up any loop. Every loop, regardless of its type or complexity, needs to answer three key questions:

1. Where do we start? (Our initial state)
2. When do we stop? (Our ending condition)
3. What do we do each time? (Our repeated action)

>[!abstract] Loops
>
>>[!Definition]
>>
>>A *loop* is a control structure that repeats a block of code while a specified condition remains true. Every loop consists of:
>>- An initial state
>>- A condition
>>- An iteration step
>
>>[!example]
>>```csharp
>>int count = 1;  // initial state
>>while (count <= 5)  // condition
>>{
>>    Console.WriteLine(count);  // action
>>    count++;  // iteration step
>>}
>>```

The simplest and most explicit way to write a loop in C# is using the `while` loop. Let's break down how it works using a simple counting example:

```csharp
int count = 1;  // We start counting from 1 (initial state)

while (count <= 5)  // Keep going as long as count is 5 or less (condition)
{
    Console.WriteLine(count);  // Print the current number (action)
    count++;  // Add 1 to count (iteration step)
}
```

This loop will print the numbers 1 through 5. Let's trace its execution step by step:

| Step | count | Action |
|------|-------|--------|
| Start | 1 | Initial value |
| 1st pass | 1 → 2 | Print 1, increment |
| 2nd pass | 2 → 3 | Print 2, increment |
| 3rd pass | 3 → 4 | Print 3, increment |
| 4th pass | 4 → 5 | Print 4, increment |
| 5th pass | 5 → 6 | Print 5, increment |
| End | 6 | Stop (6 > 5) |

Notice how we can trace the value of `count` through each iteration of the loop. This is crucial for understanding how our loop progresses and eventually terminates.

### Loop Requirements: Ensuring Proper Execution

For a loop to work correctly, it must satisfy certain requirements:

4. **Proper Initialization**: Variables used in the loop condition must be initialized before the loop starts.
5. **Progress Toward Termination**: Each iteration must move the loop closer to its ending condition.
6. **Valid Condition**: The condition must eventually become false for the loop to terminate.

>[!warning] Common Loop Mistakes
>```csharp
>// Mistake 1: Forgetting to initialize
>while (count <= 5)  // Error: count is not defined!
>{
>    Console.WriteLine(count);
>    count++;
>}
>
>// Mistake 2: No progress toward termination
>int x = 1;
>while (x < 5)
>{
>    Console.WriteLine(x);  // Infinite loop! x never changes
>}
>
>// Mistake 3: Condition can never be false
>int y = 1;
>while (y > 0)
>{
>    y++;  // y only gets bigger, never reaches ≤ 0
>}
>```

### Think Like a Computer: Mental Model for Loops

To understand how a loop works, it's helpful to think like a computer. Here's the process:

7. Check if we have initial values for all variables used in the loop
8. Evaluate the loop condition
   - If true: execute the loop body
   - If false: skip the loop entirely
9. After executing the loop body:
   - Check if variables changed as expected
   - Go back to step 2

Let's practice this thinking with a simple example:

```csharp
int x = 3;
while (x > 0)
{
    Console.WriteLine(x);
    x--;
}
```

Mental execution:
1. Start: x = 3
2. Is 3 > 0? Yes
   - Print 3
   - Decrease x to 2
3. Is 2 > 0? Yes
   - Print 2
   - Decrease x to 1
4. Is 1 > 0? Yes
   - Print 1
   - Decrease x to 0
5. Is 0 > 0? No
   - Exit loop

This mental model helps us predict loop behavior and identify potential problems before running our code.

>[!exercise] Practice: Loop Tracing and Prediction
>
>**Exercise 1: Simple Counting Loop**
>Write a while loop that prints the numbers 1 through 5. Then create an iteration table showing the value of the counter:
>- Before the loop body
>- After printing but before incrementing
>- After the increment
>
>**Exercise 2: Decrementing with a Branch**
>Write a loop that starts at 10 and decreases by 2 until it reaches 0 or less. Create an iteration table showing the value at each step.
>
>**Exercise 3: Loop with Conditional Skipping**
>Write a loop that prints numbers from 1 to 10 but skips even numbers using an if statement and continue. For the first few iterations, show:
>- The current number
>- Whether it was skipped or printed
>
>Remember to identify the precondition and postcondition for each exercise.

In our next section, we'll explore different patterns of loops and how they can be used to solve various types of problems. But first, make sure you're comfortable with the basic while loop structure and can predict its behavior by thinking through the execution step by step.

## Common Loop Patterns

Now that we understand the basic structure of loops, let's explore some common patterns that appear frequently in programming. Each pattern represents a different way of using loops to solve specific types of problems.

### Accumulation Loops: Building Up Results

One of the most common uses for loops is to accumulate or build up a result. Think about calculating the total cost of items in your shopping cart - you need to add up all the prices. Or consider finding the average of a set of numbers - you need to add them all up before dividing by the count.

>[!abstract] Accumulation Pattern
>
>>[!Definition]
>>
>>An *accumulation loop* maintains a running total or result that is updated throughout the execution of the loop. It involves:
>>- An accumulator, initialized before the loop
>>- A loop that updates the accumulator
>
>>[!example]
>>```csharp
>>// Calculate the sum of numbers from 1 to 5
>>int sum = 0;  // Initialize our accumulator
>>int current = 1;  // Start with first number
>>
>>while (current <= 5)
>>{
>>    sum += current;  // Add current number to sum
>>    current++;  // Move to next number
>>}
>>// At this point, sum contains 1 + 2 + 3 + 4 + 5 = 15
>>```

Let's examine how the state changes in an accumulation loop:

| Iteration | current | sum | Action |
|-----------|---------|-----|---------|
| Start | 1 | 0 | Initial values |
| 1 | 1 → 2 | 0 → 1 | Add 1 to sum |
| 2 | 2 → 3 | 1 → 3 | Add 2 to sum |
| 3 | 3 → 4 | 3 → 6 | Add 3 to sum |
| 4 | 4 → 5 | 6 → 10 | Add 4 to sum |
| 5 | 5 → 6 | 10 → 15 | Add 5 to sum |
| End | 6 | 15 | Loop terminates |

Accumulation loops can do more than just add numbers. They can build strings, track the maximum or minimum value seen so far, or count how many times something occurs. Here's an example that counts how many even numbers appear in a sequence:

```csharp
int current = 1;
int evenCount = 0;  // Our accumulator for counting evens

while (current <= 10)
{
    if (current % 2 == 0)  // If current is even
    {
        evenCount++;  // Increment our counter
    }
    current++;
}
// evenCount now contains the number of even integers from 1 to 10
```

### Search Loops: Finding What You're Looking For

Another common pattern is using loops to search for something. Maybe you're looking for the first number divisible by both 3 and 7, or you're searching for a specific word in a sequence. Search loops continue until they either find what they're looking for or determine it doesn't exist.

>[!abstract] Search Pattern
>
>>[!Definition]
>>
>>A *search loop* continues until either:
>>- The desired item is found (success case)
>>- We've checked everything and confirmed it's not there (failure case)
>
>>[!example]
>>```csharp
>>// Find the first number divisible by both 3 and 7
>>int number = 1;
>>bool found = false;  // Track if we've found our number
>>
>>while (!found && number <= 100)  // Try numbers up to 100
>>{
>>    if (number % 3 == 0 && number % 7 == 0)
>>    {
>>        found = true;  // We found it!
>>    }
>>    else
>>    {
>>        number++;  // Try next number
>>    }
>>}
>>
>>if (found)
>>{
>>    Console.WriteLine($"Found it! {number}");
>>}
>>else
>>{
>>    Console.WriteLine("No number found");
>>}
>>```

Notice how search loops often use a boolean flag (like `found` in our example) to remember if we've found what we're looking for. This is a common technique that helps us exit the loop as soon as we find a match.

### Input Validation Loops: Ensuring Correct Data

When working with user input, we often need to keep asking until we get valid data. This creates a pattern where we loop until the user provides acceptable input.

>[!abstract] Input Validation Pattern
>
>>[!Definition]
>>
>>An *input validation loop* repeatedly:
>>- Prompts for input
>>- Checks if the input is valid
>>- Continues only if the input was invalid
>
>>[!example]
>>```csharp
>>int age;
>>bool validInput = false;
>>
>>while (!validInput)
>>{
>>    Console.Write("Enter your age (0-120): ");
>>    string input = Console.ReadLine();
>>
>>    if (int.TryParse(input, out age))  // Try to convert to number
>>    {
>>        if (age >= 0 && age <= 120)  // Check if in valid range
>>        {
>>            validInput = true;  // Valid input, exit loop
>>        }
>>        else
>>        {
>>            Console.WriteLine("Age must be between 0 and 120");
>>        }
>>    }
>>    else
>>    {
>>        Console.WriteLine("Please enter a valid number");
>>    }
>>}
>>// At this point, age contains a valid age between 0 and 120
>>```

This pattern ensures our program has valid data to work with, making our programs more robust and user-friendly.

>[!example] Practice: Accumulation and Search Patterns
>
>**Exercise 1: Sum Accumulation**
>Write a loop that calculates the sum of numbers from 1 to 5. Create an iteration table tracking both the counter and sum at each step. State the precondition and postcondition clearly.
>
>**Exercise 2: Product Calculation**
>Write a loop that calculates the product of numbers from 1 to 4. Fill in a state table showing how both the counter and product change in each iteration. Identify the pre/post conditions
>
>**Exercise 3: String Concatenation**
>Write a loop that concatenates the string "Hi" three times. Build an iteration table tracking both the counter and result string at each step.
>
>**Exercise 4: Finding a Divisible Number**
>Write a loop that finds the first number between 1 and 100 that is divisible by both 3 and 5. Use a break statement to exit when found. Create a table showing the tested numbers and when the condition is met.
>
>Think about:
>- What pattern each exercise uses
>- How to track the state changes
>- Where early exits might be appropriate

Each of these patterns serves a different purpose, but they all follow our basic loop principles: they have a clear starting point, a condition for stopping, and make progress toward that stopping point. As you write more programs, you'll start to recognize these patterns and know which one to use for different situations.

In our next section, we'll explore how to ensure our loops are correct by understanding how they change program state and what conditions we need to maintain throughout their execution.

## Understanding Loop State and Correctness

Remember from our earlier discussion of program state that variables can change throughout our program's execution. Loops make tracking state particularly interesting because the same code executes multiple times, potentially changing values in different ways each time through. Let's explore how to think about and manage state in loops to ensure they work correctly.

### Loop State Management

When we work with loops, we need to think about state at three critical points:

1. Before the loop begins (initial state)
2. During each iteration (changing state)
3. After the loop ends (final state)

>[!abstract] Loop State
>
>>[!Definition]
>>
>>The *state* of a loop consists of all variables that:
>>- Control the loop's execution (loop variables)
>>- Accumulate results during the loop (accumulators)
>>- Track the loop's progress (flags and counters)
>
>>[!example]
>>```csharp
>>int sum = 0;         // accumulator
>>int current = 1;     // loop variable
>>bool found = false;  // flag
>>
>>while (current <= 5)
>>{
>>    if (current == 3)
>>    {
>>        found = true;
>>    }
>>    sum += current;
>>    current++;
>>}
>>```

Let's track how the state changes in this example:

| Iteration | current | sum | found | Notes |
|-----------|---------|-----|-------|-------|
| Initial | 1 | 0 | false | Starting state |
| 1 | 1 → 2 | 0 → 1 | false | First number added |
| 2 | 2 → 3 | 1 → 3 | false | Second number added |
| 3 | 3 → 4 | 3 → 6 | false → true | Found 3, marked flag |
| 4 | 4 → 5 | 6 → 10 | true | Continuing to add |
| 5 | 5 → 6 | 10 → 15 | true | Last number added |
| Final | 6 | 15 | true | Loop terminates |

### Ensuring Loop Correctness

To make sure our loops work correctly, we need to think about three key conditions:

1. What must be true before the loop starts (preconditions)
2. What must be true when the loop ends (postconditions)

>[!abstract] Loop Conditions
>
>>[!Definition]
>>- A *precondition* is what must be true before a loop begins
>>- A *postcondition* is what must be true after the loop completes
>
>>[!example]
>>Consider summing numbers from 1 to n:
>>```csharp
>>int n = 5;           // Input value
>>int sum = 0;         // Will hold our sum
>>int current = 1;     // Current number
>>
>>// Precondition: n > 0, sum = 0, current = 1
>>
>>while (current <= n)
>>{
>>    sum += current;
>>    current++;
>>}
>>
>>// Postcondition: sum equals the sum of numbers from 1 to n
>>```

Let's examine a more complex example where these conditions help us ensure correctness:

```csharp
// Find the first position of a target value in a range of numbers
int target = 7;
int position = 1;     // Start checking from position 1
bool found = false;   // Haven't found it yet

// Precondition: target is initialized, position = 1, found = false

while (position <= 100 && !found)
{
    if (position % 7 == 0)  // Is this position a multiple of 7?
    {
        found = true;
    }
    else
    {
        position++;
    }
}

// Postcondition:
// - If found is true, position contains the first multiple of 7
// - If found is false, no multiples of 7 exist from 1 to 100
```

These conditions help us reason about our loop's correctness:

1. The preconditions ensure we start in a valid state
2. The postconditions tell us what we can rely on after the loop

### Common State Management Patterns

When working with loop state, several patterns appear frequently:

1. The Counter Pattern:
```csharp
int counter = 0;  // Initialize
while (condition)
{
    // Do something
    counter++;    // Update systematically
}
```

2. The Accumulator Pattern:
```csharp
int total = 0;   // Start empty
while (condition)
{
    // Calculate next value
    total += value;  // Add to accumulator
}
```

3. The Flag Pattern:
```csharp
bool found = false;  // Start with negative
while (!found && hasMore)
{
    // Check condition
    if (matchFound)
    {
        found = true;  // Set when condition met
    }
}
```

>[!example] Practice: State Management
>Consider this loop that finds the largest number divisible by both 3 and 4 that's less than 100. What are its:
>1. Preconditions
>2. Postconditions
>
>```csharp
>int number = 100;
>int largest = 0;
>
>while (number > 0)
>{
>    if (number % 3 == 0 && number % 4 == 0)
>    {
>        largest = number;
>        break;
>    }
>    number--;
>}
>```
>
>Try to identify each condition before checking the solution.

Understanding how state changes throughout a loop's execution is crucial for writing correct programs. By thinking carefully about our preconditions and postconditions, we can ensure our loops do exactly what we intend.

In our next section, we'll explore more advanced loop concepts, building on our understanding of state management to handle more complex programming scenarios.

## Advanced Loop Concepts

As we tackle more sophisticated programming problems, we often need more advanced loop techniques. Let's explore these concepts one at a time, seeing how they build on our fundamental understanding of loops.

### Nested Loops: Loops Within Loops

Sometimes we need to repeat an action that itself involves repetition. Think about checking every seat in a theater: we need to check each row, and within each row, we need to check each seat. This is where nested loops come in - loops that contain other loops.

>[!abstract] Nested Loops
>
>>[!Definition]
>>
>>A *nested loop* is a loop that contains another loop within its body. The inner loop completes all its iterations for each single iteration of the outer loop.
>
>>[!example]
>>```csharp
>>// Print a multiplication table for numbers 1-5
>>int row = 1;
>>while (row <= 5)  // Outer loop: handles rows
>>{
>>    int column = 1;
>>    while (column <= 5)  // Inner loop: handles columns
>>    {
>>        int product = row * column;
>>        Console.Write($"{product,4}");  // ,4 adds padding for alignment
>>        column++;
>>    }
>>    Console.WriteLine();  // Move to next line after each row
>>    row++;
>>}
>>```
>>This displays:
>>```
>>   1   2   3   4   5
>>   2   4   6   8  10
>>   3   6   9  12  15
>>   4   8  12  16  20
>>   5  10  15  20  25
>>```

When working with nested loops, it's crucial to understand how the state changes at each level. Let's track the state for the first few iterations of our multiplication table:

| Outer (row) | Inner (column) | product | Action |
|-------------|---------------|---------|---------|
| 1 | 1 | 1 | Print 1 |
| 1 | 2 | 2 | Print 2 |
| 1 | 3 | 3 | Print 3 |
| ... | ... | ... | ... |
| 1 | 5 | 5 | Print 5, new line |
| 2 | 1 | 2 | Print 2 |
| 2 | 2 | 4 | Print 4 |
| ... | ... | ... | ... |

Notice how the inner loop completes all its iterations before the outer loop moves to its next iteration. This is a fundamental pattern in nested loops.

>[!example] Practice: Nested Loops and Patterns
>
>**Exercise 1: Multiplication Table (3×3)**
>Write nested loops to print a multiplication table for numbers 1 through 3. For the first two iterations of the outer loop, create an iteration table showing:
>- The values of both loop variables
>- The calculated product
>- The current output state
>
>**Exercise 2: Asterisk Pattern**
>Write nested loops that print a pattern where each line has an increasing number of asterisks:
>```
>*
>**
>***
>****
>*****
>```
>Build a state table for the first two rows showing how the loop variables change.
>
>**Exercise 3: Grid of Characters**
>Write nested loops that print a 3×3 grid of the character 'X'. Provide an iteration table for one complete pass of the outer loop, and one for the inner loop.
>
>For each exercise:
>- State the preconditions and postconditions
>- Explain how the nested loops work together
>- Identify potential off-by-one errors to watch for

### Early Loop Exit: Breaking Out When Needed

Sometimes we want to exit a loop before its normal completion condition is met. C# provides two keywords for this: `break` and `continue`.

>[!abstract] Loop Control Statements
>
>>[!Definition]
>>
>>- `break` immediately exits the loop entirely
>>- `continue` skips the rest of the current iteration and moves to the next one
>
>>[!example]
>>```csharp
>>// Find the first number divisible by both 7 and 11
>>int number = 1;
>>
>>while (number <= 1000)  // We'll check up to 1000
>>{
>>    if (number % 7 == 0 && number % 11 == 0)
>>    {
>>        Console.WriteLine($"Found it: {number}");
>>        break;  // Exit loop as soon as we find a number
>>    }
>>    number++;
>>}
>>
>>// Example of continue
>>// Print odd numbers from 1 to 10
>>int count = 0;
>>while (count < 10)
>>{
>>    count++;
>>    if (count % 2 == 0)
>>    {
>>        continue;  // Skip even numbers
>>    }
>>    Console.WriteLine(count);
>>}
>>```

The `break` statement is particularly useful in search scenarios where we want to stop as soon as we find what we're looking for. The `continue` statement helps us skip iterations that don't interest us without complicating our loop condition.

### Complex Loop Conditions

As our programs become more sophisticated, we often need loops that continue based on multiple conditions. We can combine conditions using logical operators (`&&`, `||`) and sometimes need to check multiple variables.

```csharp
// Keep reading numbers until either:
// 1. We've read 10 numbers, or
// 2. The sum exceeds 100, or
// 3. The user enters -1
int count = 0;
int sum = 0;
int input;

Console.WriteLine("Enter numbers (-1 to quit):");
input = Convert.ToInt32(Console.ReadLine());

while (count < 10 && sum <= 100 && input != -1)
{
    sum += input;
    count++;

    if (count < 10 && sum <= 100)  // Only read another number if we should continue
    {
        input = Convert.ToInt32(Console.ReadLine());
    }
}

Console.WriteLine($"Final sum: {sum}, Numbers entered: {count}");
```

This example shows how multiple conditions can work together to control a loop. Notice how we carefully consider when to read new input based on our conditions.

### Infinite Loops with Controlled Exit

Sometimes we want a loop to run indefinitely until a specific condition is met. Rather than trying to predict the exit condition in advance, we can use an infinite loop with a break statement:

```csharp
// Keep playing a game until the user wants to quit
bool playAgain = true;

while (true)  // Infinite loop
{
    PlayGame();  // Assume this method exists

    Console.Write("Play again? (yes/no): ");
    string response = Console.ReadLine().ToLower();

    if (response != "yes")
    {
        break;  // Exit the loop if they don't say "yes"
    }
}
```

This pattern can be clearer than trying to manage the condition at the top of the loop, especially when the exit condition is complex or depends on user input.

>[!warning] Important Considerations
>When using advanced loop techniques:
>1. Always ensure there's a way to exit the loop
>2. Be careful with nested breaks (they only exit the innermost loop)
>3. Don't overuse continue - sometimes restructuring the loop is clearer
>4. Watch for off-by-one errors when breaking early

>[!example] Practice: Advanced Loops
>Write a program that:
>1. Reads numbers from the user until they enter 0
>2. For each number entered, prints all its factors
>3. Skips negative numbers
>4. Stops if any number entered is greater than 100
>
>Think about:
>- Where to use break vs continue
>- How to structure the nested loops for factors
>- How to track and display the results

These advanced loop concepts give us more tools for solving complex problems. By combining them with our understanding of state management and loop patterns, we can write sophisticated programs that handle a wide variety of situations.

## The For Loop: A Specialized Loop for Counting

Now that we understand the fundamentals of loops and have explored some advanced concepts, let's examine another common loop structure: the for loop. The for loop is particularly well-suited for situations where we know exactly how many times we want to repeat something, or when we're counting through a sequence of numbers in a regular pattern.

>[!abstract] For Loops
>
>>[!Definition]
>>A *for loop* combines three key elements in its header:
>>1. Initialization (starting state)
>>2. Condition (when to stop)
>>3. Iteration (how to update)
>>
>>The variable defined in the initialization is only accessible within the loop's scope.
>
>>[!example]
>>```csharp
>>// Print numbers 1 through 5
>>for (int i = 1; i <= 5; i++)
>>{
>>    Console.WriteLine(i);
>>}
>>// i is not accessible here - it only exists inside the loop
>>```

Every for loop could be written as a while loop. In fact, let's look at the equivalent while loop for the example above:

```csharp
int i = 1;  // initialization
while (i <= 5)  // condition
{
    Console.WriteLine(i);
    i++;  // iteration
}
// i remains accessible here, unlike in the for loop version
```

The for loop simply packages these three elements more neatly and, importantly, limits the scope of the loop variable. This helps prevent accidental usage of the counter variable outside the loop and makes our code's intent clearer.

The three parts of a for loop's header serve specific purposes:
```csharp
for (int i = 1;    // Initialization: Happens once at the start
     i <= 5;       // Condition: Checked before each iteration
     i++)          // Iteration: Happens after each loop body completes
{
    // Loop body
}
```

Let's examine how a for loop's state changes using our state table approach:

| Phase | i | Notes |
|-------|---|-------|
| Before loop | - | i doesn't exist yet |
| Initialization | 1 | i is created and set to 1 |
| First check | 1 | 1 <= 5 is true |
| After first body | 2 | i++ executes |
| Second check | 2 | 2 <= 5 is true |
| After second body | 3 | i++ executes |
| ... | ... | ... |
| Final check | 6 | 6 <= 5 is false, loop ends |
| After loop | - | i no longer exists |

The for loop is particularly useful in several common scenarios:

4. Counting through a range of numbers:
```csharp
// Sum numbers from 1 to 10
int sum = 0;
for (int num = 1; num <= 10; num++)
{
    sum += num;
}
```

5. Counting by different intervals:
```csharp
// Print even numbers from 2 to 10
for (int even = 2; even <= 10; even += 2)
{
    Console.WriteLine(even);
}
```

6. Counting backwards:
```csharp
// Countdown from 10 to 1
for (int countdown = 10; countdown >= 1; countdown--)
{
    Console.WriteLine(countdown);
}
```

>[!warning] Common For Loop Pitfalls
>1. Forgetting that the loop variable isn't accessible after the loop
>2. Using the wrong comparison operator (< vs <=)
>3. Incorrect iteration step leading to infinite loops
>```csharp
>// Infinite loop! i is decremented but condition checks <=
>for (int i = 10; i <= 1; i--)
>{
>    Console.WriteLine(i);
>}
>```

## Debugging Loops: Common Problems and Solutions

Now that we've covered both while and for loops, let's explore common problems that can occur in any loop and strategies for fixing them. Understanding these issues helps us write more reliable code and fix problems when they arise.

### Common Loop Problems

1. Infinite Loops
The most obvious problem is a loop that never ends. This can happen when:
- The condition never becomes false
- We forget to update our loop variable
- We update in the wrong direction

```csharp
// Example 1: Condition never false
while (true)
{
    Console.WriteLine("Help!");
    // No way to exit!
}

// Example 2: Forgot to update
int x = 1;
while (x < 10)
{
    Console.WriteLine(x);
    // Forgot x++, so x is always 1
}

// Example 3: Wrong direction
for (int i = 1; i <= 10; i--)
{
    // i gets smaller, but we're checking if it's <= 10
    Console.WriteLine(i);
}
```

2. Off-by-One Errors
These occur when we:
- Start counting at the wrong number
- Use the wrong comparison operator
- Update our variable in the wrong place

```csharp
// Wanted numbers 1-5, but prints 0-4
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

// Wanted to sum numbers 1-5, but includes 6
int sum = 0;
int current = 1;
while (current <= 6)  // Should be <= 5
{
    sum += current;
    current++;
}
```

### Debugging Strategies

When your loop isn't working correctly, follow these steps:

1. Check the Loop's Components
Write down and verify:
- Initial values
- Loop condition
- Update step
- Loop body actions

2. Use Print Statements for Tracking
Add Console.WriteLine statements to track variables:

```csharp
int count = 1;
while (count <= 5)
{
    Console.WriteLine($"Before body: count = {count}");
    // Loop body here
    Console.WriteLine($"After body: count = {count}");
    count++;
    Console.WriteLine($"After update: count = {count}");
}
```

3. Create a State Table
Track all relevant variables through several iterations:

| Iteration | Variables | Condition Check | Actions |
|-----------|-----------|-----------------|---------|
| Start | count = 1 | 1 <= 5 true | |
| 1 | count = 1 → 2 | | Print, increment |
| 2 | count = 2 → 3 | 2 <= 5 true | Print, increment |
| ... | ... | ... | ... |

4. Test Boundary Cases
Always test your loop with:
- Minimum values
- Maximum values
- Empty or invalid input
- Single-iteration cases

>[!example] Advanced Debugging Practice
>
>**Exercise 1: Off-by-One Summation Error**
>This loop is intended to sum numbers 1 to 5, but it's giving the wrong result. Find and fix the error:
>```csharp
>int sum = 0;
>int i = 1;
>while (i <= 6)  // Something's wrong here
>{
>    sum += i;
>    i++;
>}
>Console.WriteLine(sum);
>```
>Fill in a state table for i and sum to find where the error occurs.
>
>**Exercise 2: Infinite Loop Correction**
>This loop never terminates. Explain why and fix it:
>```csharp
>int counter = 1;
>while (counter <= 5)
>{
>    Console.WriteLine(counter);
>    // Missing something important!
>}
>```
>
>**Exercise 3: Conditional Branch Update Error**
>This loop has a problem with its counter update. Find and fix the issue:
>```csharp
>int num = 1;
>while (num <= 5)
>{
>    if (num % 2 == 0)
>    {
>        Console.WriteLine("Even: " + num);
>    }
>    else
>    {
>        Console.WriteLine("Odd: " + num);
>        num++;  // Update only happens for odd numbers!
>    }
>}
>```
>
>For each exercise:
>1. Identify the specific problem
>2. Create a state table showing how the error manifests
>3. Explain the correct behavior
>4. Provide and verify the solution

Loops are one of the most fundamental tools in programming. By mastering the concepts we've covered - from basic loops to nested structures, from state management to debugging techniques - you'll be able to solve increasingly complex programming problems. Keep practicing with the exercises we've explored, and you'll become more comfortable using loops in your own programs. Now that we've tied up some basic control structures, the way we control the computations and actions we perform, we can move onto data. Our next chapter will focus on [[arrays]], which allow us to store and work with data in our programs in more complex ways.