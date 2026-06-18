---
title: Ch. 4.1 - Arrays
draft: false
aliases:
  - arrays
  - collections
---

In our previous chapters, [[Chapter 3.1 - Branching]] and [[Chapter 3.2 - Looping]], we covered ideas of controlling the behavior of code. From making decisions, to automating the repetition of tasks. Now, having looked at how we do stuff for a bit, let's turn our attention to the other half of the coin: how we store data.

In this chapter we will talk about the first major group of collections present in this text: Arrays. After defining this structure we will examine the creation and navigation of arrays, along with common pitfalls and problems that you will encounter when using them.

## Defining Our Terms

First, let's establish a strict definition of an array:

> [!abstract] Arrays
>
> > [!Definition]
> >
> > An **Array** is an _ordered_ collection of elements which _share a type_. An array has a _fixed size_which _cannot_ be changed, and each element has an _index_ which it can be accessed with.
>
> > [!definition] Properties
> >
> > - Arrays _cannot_ be resized after creation.
> > - All array elements are initialized to a default value determined by their type.
> > - Array indexing starts from 0.
>
> Arrays, due to being bound by a specific size at creation, makes them a good match for any problem where we know the number of elements at the start! For example, we have 7 days in a calendar week, so if we wanted to store the average temperature for each day in some kind of collection, an array would be a good fit!
>
> > [!example]
> >
> > ```csharp
> > // Create an array to store 7 daily temperatures
> > double[] temperatures = new double[7];
> > temperatures[0] = 72.3;  // Monday (first element has index 0)
> > temperatures[1] = 74.1;  // Tuesday
> >
> > // Access elements directly by index
> > Console.WriteLine($"Wednesday's temperature: {temperatures[2]}");
> > ```

## Why Arrays Have These Properties

Understanding why arrays have their specific properties helps us use them more effectively:

### Fixed Size

Arrays have a fixed size for two important reasons:

1. **Memory Efficiency**: When an array is created, the computer reserves a continuous block of memory exactly the right size for all elements. This makes accessing elements very fast, because the computer knows precisely where each element is located.

2. **Predictable Bounds**: The fixed size lets us know exactly how many elements we can work with, preventing errors where we might accidentally try to access data that doesn't exist.


> [!example]
>
> ```csharp
> // The computer allocates exactly enough memory for 5 integers
> int[] scores = new int[5];
> // We know that valid indices are 0-4, and nothing else
> ```

#### Memory Layout and Efficiency

Understanding how arrays are stored in memory helps explain why they're so efficient and why they have fixed sizes. Let's look deeper at the memory layout:

When you create an array, the computer allocates a single, contiguous block of memory large enough to hold all the elements. This means all elements are stored one after another in memory, with no gaps between them.

For example, if each integer takes 4 bytes of memory, an array of 5 integers would occupy 20 consecutive bytes in memory, like this:

```
Memory Address:  1000    1004    1008    1012    1016
Array Index:     [0]     [1]     [2]     [3]     [4]
```

This contiguous layout provides several performance benefits:

1. **Constant-Time Access**: The computer can calculate exactly where in memory any element is located using a simple formula:

    ```
    element_address = base_address + (index * element_size)
    ```

    This means accessing `array[3]` is just as fast as accessing `array[0]` - a property called O(1) or constant-time access.

2. **Memory Locality**: When you access one element, the computer often loads nearby memory into cache. Since array elements are adjacent, when you process elements sequentially, you're likely to find the next elements already in cache, making operations faster.

3. **Reduced Fragmentation**: Having elements stored in a single chunk reduces memory fragmentation compared to allocating separate memory for each element.


This memory layout explains why arrays must have a fixed size - the entire block must be allocated at once. If we could change the size, the computer might not have enough contiguous memory available at the original location to grow the array, which would require moving the entire array to a new location (which is exactly what happens with resizable collections like List, behind the scenes).

### Same Type for All Elements

Arrays require all elements to be of the same type because:

1. **Memory Allocation**: The computer needs to know exactly how much memory to allocate for each element. Different types require different amounts of memory.

2. **Predictable Operations**: When all elements share the same type, we can perform consistent operations on each element without having to check what type it is first.


> [!example]
>
> ```csharp
> string[] names = new string[3];
> // All elements are strings, so we can use string methods on any element
> names[0] = "Alice";
> Console.WriteLine(names[0].ToUpper()); // ALICE
> ```

### Zero-Based Indexing

Arrays are indexed starting from 0 rather than 1 because:

1. **Memory Offset**: The index represents the "offset" from the beginning of the array. The first element is 0 positions away from the start.

2. **Mathematical Consistency**: Zero-based indexing simplifies many array calculations and aligns with how computers naturally address memory.


> [!example]
>
> ```csharp
> char[] letters = {'a', 'b', 'c', 'd'};
> // To access 'a', we use index 0
> Console.WriteLine(letters[0]); // 'a'
> // To access 'd', we use index 3 (not 4)
> Console.WriteLine(letters[3]); // 'd'
> ```

## Creating and Initializing Arrays

There are several ways to create arrays in C#:

### Method 1: Declare and initialize separately

```csharp
// Declare an array of integers with size 5
int[] numbers = new int[5];

// Initialize elements individually
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;
```

### Method 2: Initialize with array literal

```csharp
// Declare and initialize in one step
string[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
```

### Method 3: Create and initialize with new keyword

```csharp
// Create and initialize with specific values
double[] prices = new double[] {9.99, 12.50, 5.75, 8.25};
```

## Navigating Arrays with Loops

One of the most powerful aspects of arrays is how easily they can be combined with loops to process multiple elements. Let's explore different ways to navigate through arrays.

### Traversing Forward with a For Loop

The most common way to navigate an array is to use a for loop to visit each element from start to finish:

```csharp
int[] numbers = {5, 10, 15, 20, 25};

// Loop through each element in the array
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine($"Element at index {i}: {numbers[i]}");
}
```

The `Length` property of an array tells us how many elements it contains, making it perfect for controlling our loop. Notice how we start at index 0 and continue while `i < numbers.Length` (not <=) because the last valid index is always `Length - 1`.

### Traversing Backward

Sometimes we need to process array elements in reverse order:

```csharp
string[] words = {"first", "second", "third", "fourth"};

// Loop through the array backwards
for (int i = words.Length - 1; i >= 0; i--)
{
    Console.WriteLine($"Reverse order - element at index {i}: {words[i]}");
}
```

Here, we start at the last element (`Length - 1`) and work our way back to the first element (index 0).

### Using While Loops for Array Traversal

While for loops are common for array traversal, while loops can also be used:

```csharp
char[] letters = {'a', 'b', 'c', 'd', 'e'};

int index = 0;
while (index < letters.Length)
{
    Console.WriteLine(letters[index]);
    index++;
}
```

### Circular (Wrapping) Array Access with Modulo

The modulo operator (`%`) lets us create "circular" array access, where after reaching the end, we wrap around to the beginning:

```csharp
string[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

// Let's find the day names for 10 consecutive days starting from index 0
for (int i = 0; i < 10; i++)
{
    // The modulo operation causes the index to wrap around
    int wrappedIndex = i % daysOfWeek.Length;
    Console.WriteLine($"Day {i+1}: {daysOfWeek[wrappedIndex]}");
}
```

This technique is particularly useful for scenarios like rotating shifts, repeating patterns, or circular buffers.

> [!example] Practice: Array Navigation
>
> **Exercise 1: Sum of Elements** Write a loop that calculates the sum of all elements in this array: `{3, 7, 1, 9, 4}`
>
> **Exercise 2: Count Matching Elements** Given the array `{2, 5, 2, 8, 2, 9, 7, 2}`, write code to count how many times the number 2 appears.
>
> **Exercise 3: Reverse Array** Write code that prints the elements of this array in reverse order: `{"apple", "banana", "cherry", "date", "elderberry"}`
>
> **Exercise 4: Every Other Element** Write a loop that prints only elements at even indices from this array: `{10, 20, 30, 40, 50, 60}`
>
> **Exercise 5: Circular Iteration** Given the array of days of the week, print the day name that would occur 15 days from Tuesday.
>
> **Exercise 6: Finding Maximum** Write code to find the largest value in this array: `{17, 42, 8, 99, 23, 61, 14}`

## Common Array Caveats and Bugs

When working with arrays, certain issues tend to come up repeatedly. Being aware of these common problems can save you significant debugging time.

### Off-by-One Errors

The most notorious array bug is the "off-by-one" error, where your loop accesses indices that are one too many or one too few:

> [!warning] Common Off-by-One Errors
>
> ```csharp
> int[] numbers = {10, 20, 30, 40, 50};
>
> // Error: Loop goes too far
> for (int i = 0; i <= numbers.Length; i++)  // Should be < not <=
> {
>    Console.WriteLine(numbers[i]);  // Will crash at i=5
> }
>
> // Error: Loop doesn't go far enough
> for (int i = 1; i < numbers.Length; i++)  // Starts at 1, skips first element
> {
>    Console.WriteLine(numbers[i]);  // Misses numbers[0]
> }
> ```

To avoid off-by-one errors:

- Always double-check your loop conditions
- Remember that with zero-based indexing, the last valid index is `Length - 1`
- Use `<` (less than) rather than `<=` (less than or equal) when comparing against the array length

### Zero-Indexing Problems

Coming from the real world where we often start counting from 1, zero-indexing can be unintuitive:

> [!warning] Zero-Indexing Mistakes
>
> ```csharp
> string[] monthNames = {"January", "February", "March", "April", "May", "June",
>                      "July", "August", "September", "October", "November", "December"};
>
> int month = 5;  // Trying to get May (5th month)
> Console.WriteLine(monthNames[month]);  // Actually prints June (index 5 is the 6th element)
> ```

To handle zero-indexing correctly:

- Always remember to subtract 1 when converting from a "natural" count to an array index
- Be especially careful with arrays representing real-world 1-based sequences like months or days

### Array Out-of-Bounds Errors

Trying to access an index outside the valid range of an array results in an exception:

> [!warning] Array Out-of-Bounds
>
> ```csharp
> int[] scores = {85, 92, 78, 90, 88};
>
> // Error: Index is negative
> Console.WriteLine(scores[-1]);  // Will throw IndexOutOfRangeException
>
> // Error: Index too large
> Console.WriteLine(scores[5]);   // Will throw IndexOutOfRangeException
> ```

To avoid out-of-bounds errors:

- Always check that your index is within range (0 to Length-1)
- Be careful with calculated indices
- Consider using defensive bounds checking in critical code

> [!example] Practice: Debugging Array Problems
>
> **Exercise 1: Find and Fix Off-by-One Error** This code is supposed to sum all elements in the array but has an error. Find and fix it:
>
> ```csharp
> int[] numbers = {5, 10, 15, 20, 25};
> int sum = 0;
> for (int i = 0; i <= numbers.Length; i++)
> {
>    sum += numbers[i];
> }
> Console.WriteLine($"Sum: {sum}");
> ```
>
> **Exercise 2: Zero-Indexing Fix** This code is trying to print the 3rd element but isn't working correctly. Fix it:
>
> ```csharp
> string[] colors = {"red", "green", "blue", "yellow", "purple"};
> int position = 3;
> Console.WriteLine($"The 3rd color is: {colors[position]}");
> ```
>
> **Exercise 3: Boundary Condition** This code sometimes throws an exception. Make it robust by adding a check:
>
> ```csharp
> int[] data = {1, 2, 3, 4, 5};
>
> int GetValueAt(int[] arr, int position)
> {
>    return arr[position];  // Could throw an exception
> }
> ```

## Common Problems to Solve with Arrays

Arrays are versatile data structures used to solve many different types of problems. Let's explore two major categories: transforming arrays and distilling them to a single value. Understanding these patterns will help you recognize and solve a wide range of programming challenges.

### Transforming Arrays: Array to Array

In these problems, you start with an array and produce another array as your result. What you're doing is applying some kind of transformation to each element or to the structure as a whole. Think of these operations as reshaping your data while maintaining its collection nature.

These transformations generally fall into two implementation approaches, each with distinct advantages:

#### In-Place Transformation

In-place transformations modify the original array without creating a new one. This approach offers two key benefits:

1. **Memory Efficiency**: You don't allocate additional memory for a new array
2. **Simplicity**: You only need to track a single array variable

However, the tradeoff is that you lose the original data, which can be problematic if you need it later.

```csharp
// Double each value in the array (in-place)
int[] numbers = {1, 2, 3, 4, 5};

Console.WriteLine("Original array:");
for (int i = 0; i < numbers.Length; i++)
{
    Console.Write(numbers[i] + " ");  // Output: 1 2 3 4 5
}
Console.WriteLine();

// Transform the array in-place
for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] = numbers[i] * 2;  // Modify the original array
}

Console.WriteLine("After transformation:");
for (int i = 0; i < numbers.Length; i++)
{
    Console.Write(numbers[i] + " ");  // Output: 2 4 6 8 10
}
Console.WriteLine();
```

In this example, we're directly modifying the array we started with. The original values are gone, replaced by the transformed values.

When should you use in-place transformations?

- When you no longer need the original data
- When memory usage is a concern
- When the transformation is simple and doesn't change the array size
- When you want to avoid variable clutter in your code

#### Creating a New Array

When you want to preserve the original data, you create a new array to hold the transformed values. This approach gives you:

1. **Data Preservation**: Your original array remains intact
2. **Transformation Flexibility**: You can create arrays of different sizes or types
3. **Safety**: If something goes wrong during transformation, your original data is untouched

The tradeoff is additional memory usage and slightly more complex code.

```csharp
// Create a new array with values squared
int[] original = {1, 2, 3, 4, 5};
int[] squared = new int[original.Length];

// Fill the new array with transformed values
for (int i = 0; i < original.Length; i++)
{
    squared[i] = original[i] * original[i];
}

// Display both arrays
Console.WriteLine("Original array:");
for (int i = 0; i < original.Length; i++)
{
    Console.Write(original[i] + " ");  // Output: 1 2 3 4 5
}
Console.WriteLine();

Console.WriteLine("Squared values array:");
for (int i = 0; i < squared.Length; i++)
{
    Console.Write(squared[i] + " ");  // Output: 1 4 9 16 25
}
Console.WriteLine();
```

When should you create a new array?

- When you need to keep the original data
- When the transformation changes the size of the array
- When the transformation changes the type of the array
- When you need both the original and transformed data for comparison

### Common Transformation Patterns

Let's examine several common transformation patterns you'll encounter:

#### 1. Mapping: Element-by-Element Transformation

Mapping applies the same operation to each element in an array to produce a new value.

```csharp
// Convert Celsius temperatures to Fahrenheit
double[] celsius = {0, 10, 20, 30, 40};
double[] fahrenheit = new double[celsius.Length];

for (int i = 0; i < celsius.Length; i++)
{
    // Apply the temperature conversion formula to each element
    fahrenheit[i] = celsius[i] * 9/5.0 + 32;
}

// fahrenheit is now {32, 50, 68, 86, 104}
```

The key characteristic of mapping is that:

- Each output element depends only on its corresponding input element
- The result array has the same length as the original
- There's a clear one-to-one relationship between input and output

#### 2. Filtering: Selecting Elements Based on Criteria

Filtering creates a subset of the original array by including only elements that satisfy certain conditions.

```csharp
int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// First, count how many even numbers we have (to determine new array size)
int evenCount = 0;
for (int i = 0; i < numbers.Length; i++)
{
    if (numbers[i] % 2 == 0)
    {
        evenCount++;
    }
}

// Create a new array of the right size
int[] evenNumbers = new int[evenCount];

// Fill the new array with only the even values
int evenIndex = 0;
for (int i = 0; i < numbers.Length; i++)
{
    if (numbers[i] % 2 == 0)
    {
        evenNumbers[evenIndex] = numbers[i];
        evenIndex++;
    }
}

// evenNumbers is now {2, 4, 6, 8, 10}
```

Filtering is more complex than mapping because:

- The result array is typically smaller than the original
- You need to track positions in both arrays separately
- You often need a two-pass approach (first to count, then to fill)

#### 3. Sorting: Rearranging Elements in Order

Sorting rearranges the elements of an array according to a specified order (usually ascending or descending). Basic sorting algorithms like Bubble Sort can be implemented with nested loops:

```csharp
int[] values = {42, 17, 8, 99, 23, 61, 14};

// Sort the array in ascending order using Bubble Sort
for (int i = 0; i < values.Length - 1; i++)
{
    for (int j = 0; j < values.Length - i - 1; j++)
    {
        // If the current element is greater than the next element, swap them
        if (values[j] > values[j + 1])
        {
            // Swap elements using a temporary variable
            int temp = values[j];
            values[j] = values[j + 1];
            values[j + 1] = temp;
        }
    }
}

// values is now {8, 14, 17, 23, 42, 61, 99}
```

Sorting has these characteristics:

- It's typically done in-place
- It often requires nested loops or more complex algorithms
- The array size stays the same, but the order changes

#### 4. Sectioning: Creating Subarrays

Sometimes you need to extract a continuous section of an array:

```csharp
int[] fullData = {10, 20, 30, 40, 50, 60, 70, 80};
int startIndex = 2;
int length = 4;

// Create a new array for the section
int[] section = new int[length];

// Copy the section from the original array
for (int i = 0; i < length; i++)
{
    section[i] = fullData[startIndex + i];
}

// section is now {30, 40, 50, 60}
```

Sectioning:

- Creates a smaller array from a continuous range of the original
- Preserves the relative order of elements
- Requires careful index management

> [!example] Practice: Array Transformations
>
> **Exercise 1: Temperature Conversion** Convert an array of Celsius temperatures to Fahrenheit: `{0, 10, 20, 30, 40}` Formula: F = C × 9/5 + 32 Write both the code and state the preconditions and postconditions.
>
> **Exercise 2: Creating Negative Values** Given `{5, 10, 15, 20, 25}`, create a new array where each value is the negative of the original.
>
> **Exercise 3: Filter Even Numbers** From `{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}`, create a new array containing only the even numbers. Create a state table tracking both the indices in the original and new arrays.
>
> **Exercise 4: Value Substitution** Replace all negative values with zero in this array (in-place): `{5, -3, 8, -1, 0, -7, 3}`
>
> **Exercise 5: Array Reversal** Given `{1, 2, 3, 4, 5}`, create a new array with the elements in reverse order.
>
> **Exercise 6: Array Scaling** Multiply all elements in `{4, 8, 12, 16, 20}` by 0.5 and store in a new array.

### Distilling Arrays: Array to Single Value

In contrast to transformations, distillation problems convert an entire array into a single value. This process is sometimes called "reducing" or "folding" the array. The key concept is that you're combining all the elements using some operation to produce a final result.

#### The Accumulation Pattern

The foundation of most array-to-value operations is accumulation, where you:

1. Start with an initial value (often 0 or another appropriate value)
2. Process each array element in sequence
3. Update your accumulator based on each element
4. Return the final accumulated value

```csharp
// Calculate the sum of all elements
int[] values = {5, 10, 15, 20, 25};
int sum = 0;  // Initial value for our accumulator

for (int i = 0; i < values.Length; i++)
{
    sum += values[i];  // Update accumulator with each element
}

Console.WriteLine($"The sum is: {sum}");  // Output: The sum is: 75
```

Let's follow the state of our accumulator through each iteration:

|Iteration|Array Element|Accumulator Before|Calculation|Accumulator After|
|---|---|---|---|---|
|0|5|0|0 + 5|5|
|1|10|5|5 + 10|15|
|2|15|15|15 + 15|30|
|3|20|30|30 + 20|50|
|4|25|50|50 + 25|75|

What makes accumulation powerful is that you can use different operations to achieve various results:

#### 1. Summation: Finding the Total

Sum all values in the array (as shown above).

#### 2. Product: Multiplying All Elements

```csharp
// Calculate the product of all elements
int[] factors = {2, 3, 4, 5};
int product = 1;  // Start with 1 for multiplication

for (int i = 0; i < factors.Length; i++)
{
    product *= factors[i];
}

// product is 120 (2 * 3 * 4 * 5)
```

#### 3. Average: Finding the Mean Value

```csharp
// Calculate the average of test scores
int[] scores = {85, 92, 78, 90, 88};
int sum = 0;

// First, sum all elements
for (int i = 0; i < scores.Length; i++)
{
    sum += scores[i];
}

// Then divide by the count to get the average
double average = (double)sum / scores.Length;

// average is 86.6
```

#### 4. Finding Maximum/Minimum Values

```csharp
// Find the maximum value
int[] numbers = {42, 17, 8, 99, 23, 61, 14};
int max = numbers[0];  // Start with the first element

for (int i = 1; i < numbers.Length; i++)  // Note: start from index 1
{
    if (numbers[i] > max)
    {
        max = numbers[i];
    }
}

// max is 99
```

For finding the minimum, we'd use `<` instead of `>` in the comparison.

Notice how we initialize our accumulator to the first array element rather than 0. This is important because:

- If all values are negative, initializing max to 0 would give an incorrect result
- It ensures our accumulator always contains a valid array value

#### 5. Counting Based on Criteria

```csharp
// Count how many elements are positive
int[] values = {-3, 5, 0, -8, 12, -7, 9};
int positiveCount = 0;

for (int i = 0; i < values.Length; i++)
{
    if (values[i] > 0)
    {
        positiveCount++;
    }
}

// positiveCount is 3 (for 5, 12, and 9)
```

#### 6. Checking Properties (Any/All)

Checking if any element matches a condition:

```csharp
// Check if any score is below passing (60)
int[] scores = {72, 85, 68, 91, 76};
bool anyFailing = false;

for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] < 60)
    {
        anyFailing = true;
        break;  // Exit as soon as we find one
    }
}

// anyFailing is false
```

Checking if all elements match a condition:

```csharp
// Check if all scores are passing (>= 60)
int[] scores = {72, 85, 68, 91, 76};
bool allPassing = true;

for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] < 60)
    {
        allPassing = false;
        break;  // Exit as soon as we find one that doesn't match
    }
}

// allPassing is true
```

#### 7. Index Finding: First/Last Occurrence

```csharp
// Find the index of the first even number
int[] values = {3, 7, 4, 2, 9, 6, 8};
int firstEvenIndex = -1;  // -1 indicates "not found"

for (int i = 0; i < values.Length; i++)
{
    if (values[i] % 2 == 0)
    {
        firstEvenIndex = i;
        break;  // Exit once we find it
    }
}

// firstEvenIndex is 2 (index of the value 4)
```

To find the last occurrence, we would either:

- Loop backward from the end, or
- Continue the search without breaking, updating our variable each time we find a match

### Why Distillation Patterns Matter

Distillation patterns are fundamental to programming because they allow you to:

1. **Analyze Data**: Extract meaningful insights from collections of values
2. **Make Decisions**: Determine how to proceed based on array properties
3. **Aggregate Information**: Combine multiple values into a single, useful result
4. **Find Specific Items**: Locate important elements or their positions

These patterns appear repeatedly across different domains, from financial calculations to scientific analysis to everyday administrative tasks.

> [!example] Practice: Array Reductions
>
> **Exercise 1: Average Calculation** Find the average of these test scores: `{85, 92, 78, 90, 88}` Include preconditions and postconditions in your solution.
>
> **Exercise 2: Minimum Value and Position** Find both the smallest number and its position in this array: `{42, 17, 8, 99, 23, 61, 14}`
>
> **Exercise 3: Count of Positive Numbers** Count how many positive numbers are in: `{-3, 5, 0, -8, 12, -7, 9}` Create a state table tracking the count at each iteration.
>
> **Exercise 4: All/Any Check** Given passing grade is 60, write two functions:
>
> 1. One that checks if all scores pass
> 2. One that checks if any score fails Test with: `{72, 85, 58, 91, 76}`
>
> **Exercise 5: Range Calculation** Find the range (difference between maximum and minimum) of this data: `{25, 14, 56, 15, 36, 56, 77, 18, 29, 49}`
>
> **Exercise 6: Mode Finding** Find the most frequently occurring value in: `{4, 2, 4, 3, 2, 2, 5, 2, 4, 2}`Hint: You'll need to count occurrences of each value and track which has the highest count.

## Advanced Array Techniques

As you become more comfortable with arrays, you can explore more sophisticated techniques.

### Searching Arrays

Finding specific values in an array is a common operation:

```csharp
// Linear search: find the index of a value
int[] data = {7, 3, 9, 5, 1, 8};
int searchValue = 5;
int foundIndex = -1;  // -1 indicates "not found" initially

for (int i = 0; i < data.Length; i++)
{
    if (data[i] == searchValue)
    {
        foundIndex = i;
        break;  // Exit the loop once found
    }
}

if (foundIndex >= 0)
{
    Console.WriteLine($"Found {searchValue} at index {foundIndex}");
}
else
{
    Console.WriteLine($"{searchValue} not found in the array");
}
```

### Working with Multiple Arrays

Sometimes we need to process multiple arrays in parallel:

```csharp
// Arrays of student names and their corresponding grades
string[] students = {"Alice", "Bob", "Charlie", "Diana", "Edward"};
int[] grades = {92, 78, 86, 95, 80};

// Print all students with grades above 85
for (int i = 0; i < students.Length; i++)
{
    if (grades[i] > 85)
    {
        Console.WriteLine($"{students[i]}: {grades[i]}");
    }
}
```

### Copying Arrays

When you need to duplicate an array:

```csharp
// Original array
int[] source = {1, 2, 3, 4, 5};

// Create new array of the same size
int[] destination = new int[source.Length];

// Copy elements
for (int i = 0; i < source.Length; i++)
{
    destination[i] = source[i];
}
```

> [!example] Practice: Advanced Array Problems
>
> **Exercise 1: Finding Duplicates** Write code to find any duplicate values in this array: `{3, 7, 2, 5, 7, 9, 2, 8}`
>
> **Exercise 2: Array Intersection** Find the common elements between these two arrays: `{1, 3, 5, 7, 9}` and `{2, 3, 5, 7, 11}`
>
> **Exercise 3: Moving Elements** Write code to shift each element in the array one position to the right, with the last element moving to the first position: `{1, 2, 3, 4, 5}` becomes `{5, 1, 2, 3, 4}`
>
> **Exercise 4: Calculating Running Total** Given array `{5, 10, 15, 20, 25}`, create a new array where each element is the running sum up to that point: `{5, 15, 30, 50, 75}`

## Two-Dimensional Arrays

So far, we've focused on single-dimensional arrays that store elements in a linear sequence. However, many real-world problems involve data in a grid or table format. For these scenarios, we can use two-dimensional (2D) arrays, which organize elements in rows and columns.

> [!abstract] Two-Dimensional Arrays
>
> > [!Definition]
> >
> > A **Two-Dimensional Array** is an _ordered_ collection of elements which _share a type_, arranged in _rows_ and _columns_. It has a _fixed number of rows and columns_ which _cannot_ be changed, and each element has a _pair of indices_ [row, column] with which it can be accessed.
>
> > [!definition] Properties
> >
> > - 2D arrays _cannot_ be resized after creation.
> > - All elements are initialized to a default value determined by their type.
> > - Both row and column indexing start from 0.
> > - Conceptually, a 2D array can be thought of as an "array of arrays".
>
> 2D arrays are ideal for representing grid-based data such as game boards, spreadsheets, images, or any data naturally organized in rows and columns.
>
> > [!example]
> >
> > ```csharp
> > // Create a 3x4 grid to store temperature data (3 rows, 4 columns)
> > double[,] temperatures = new double[3, 4];
> > temperatures[0, 0] = 72.3;  // Top-left element
> > temperatures[2, 3] = 68.7;  // Bottom-right element
> >
> > // Access an element using row and column indices
> > Console.WriteLine($"Temperature at position [1,2]: {temperatures[1, 2]}");
> > ```

### Creating and Initializing 2D Arrays

There are multiple ways to create and initialize two-dimensional arrays in C#:

#### Method 1: Declare with sizes and initialize elements individually

```csharp
// Create a 2D array with 3 rows and 2 columns
int[,] matrix = new int[3, 2];

// Initialize elements one by one
matrix[0, 0] = 1;
matrix[0, 1] = 2;
matrix[1, 0] = 3;
matrix[1, 1] = 4;
matrix[2, 0] = 5;
matrix[2, 1] = 6;
```

#### Method 2: Initialize with array literal using nested curly braces

```csharp
// Create and initialize a 3x2 matrix in one step
int[,] matrix = {
    {1, 2},   // First row
    {3, 4},   // Second row
    {5, 6}    // Third row
};
```

#### Method 3: Using a nested loop for systematic initialization

```csharp
// Create a multiplication table (5x5)
int[,] multiplicationTable = new int[5, 5];

// Initialize with products
for (int row = 0; row < 5; row++)
{
    for (int col = 0; col < 5; col++)
    {
        multiplicationTable[row, col] = (row + 1) * (col + 1);
    }
}
```

### Understanding Array Dimensions

For a 2D array, we can access the number of rows and columns using the `GetLength` method:

```csharp
int[,] grid = new int[4, 3];

int rowCount = grid.GetLength(0);  // Returns 4 (number of rows)
int colCount = grid.GetLength(1);  // Returns 3 (number of columns)

Console.WriteLine($"Grid dimensions: {rowCount} rows by {colCount} columns");
```

The `GetLength(0)` method returns the length of the first dimension (rows), while `GetLength(1)` returns the length of the second dimension (columns).

### Accessing Elements in 2D Arrays

To access an element in a 2D array, we need both the row and column indices:

```csharp
int[,] chessboard = new int[8, 8];

// Set a value for the element at row 3, column 4
chessboard[3, 4] = 1;

// Get the value from row 5, column 2
int value = chessboard[5, 2];
```

Remember that both row and column indices are zero-based, so in an 8×8 chessboard, valid indices range from 0 to 7, not 1 to 8.

> [!warning] Common 2D Array Indexing Mistakes
>
> ```csharp
> int[,] grid = new int[3, 4];  // 3 rows, 4 columns
>
> // Error: Swapping row and column indices
> // If you think of it as [column, row] instead of [row, column]
> grid[4, 2] = 10;  // IndexOutOfRangeException (only 3 rows exist)
>
> // Error: Using incorrect range
> // Valid row indices are 0, 1, 2 (not 3)
> // Valid column indices are 0, 1, 2, 3 (not 4)
> grid[3, 4] = 20;  // IndexOutOfRangeException
>
> // Error: Using comma instead of commas and brackets
> // int value = grid[2, 3];  // Correct
> int value = grid[2, 3];  // Correct
> ```

### Traversing 2D Arrays with Nested Loops

To process all elements in a 2D array, we use nested loops—one for rows and one for columns.

#### Row-Major Traversal (Rows First)

Row-major traversal processes the array row by row, which is the most common and usually most efficient approach:

```csharp
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns

// Initialize with some values (row number * 10 + column number)
for (int row = 0; row < matrix.GetLength(0); row++)
{
    for (int col = 0; col < matrix.GetLength(1); col++)
    {
        matrix[row, col] = row * 10 + col;
    }
}

// Display the matrix
for (int row = 0; row < matrix.GetLength(0); row++)
{
    for (int col = 0; col < matrix.GetLength(1); col++)
    {
        Console.Write($"{matrix[row, col]}\t");
    }
    Console.WriteLine();  // New line after each row
}
```

Output:

```
0    1    2    3
10   11   12   13
20   21   22   23
```

This code first fills the matrix with values, then prints it as a formatted grid.

#### Column-Major Traversal (Columns First)

In some cases, you might want to process the array column by column:

```csharp
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns

// Process column by column
for (int col = 0; col < matrix.GetLength(1); col++)
{
    for (int row = 0; row < matrix.GetLength(0); row++)
    {
        // Process matrix[row, col]
        Console.WriteLine($"Processing element at [{row}, {col}]");
    }
}
```

Row-major traversal is generally more efficient in C# (and most languages) because it aligns with how arrays are stored in memory (row by row), leading to better memory access patterns.

### Common Operations with 2D Arrays

Let's look at several common operations performed on 2D arrays:

#### 1. Calculating the Sum of All Elements

```csharp
int[,] numbers = {
    {3, 5, 7},
    {2, 4, 6},
    {9, 1, 8}
};

int sum = 0;
for (int row = 0; row < numbers.GetLength(0); row++)
{
    for (int col = 0; col < numbers.GetLength(1); col++)
    {
        sum += numbers[row, col];
    }
}
Console.WriteLine($"Sum of all elements: {sum}");  // Output: 45
```

#### 2. Finding a Specific Value and Its Position

```csharp
int[,] numbers = {
    {3, 5, 7},
    {2, 4, 6},
    {9, 1, 8}
};

int searchValue = 6;
bool found = false;
int foundRow = -1, foundCol = -1;

for (int row = 0; row < numbers.GetLength(0); row++)
{
    for (int col = 0; col < numbers.GetLength(1); col++)
    {
        if (numbers[row, col] == searchValue)
        {
            found = true;
            foundRow = row;
            foundCol = col;
            break;  // Exit the inner loop
        }
    }

    if (found)
    {
        break;  // Exit the outer loop
    }
}

if (found)
{
    Console.WriteLine($"Found {searchValue} at position [{foundRow}, {foundCol}]");
}
else
{
    Console.WriteLine($"{searchValue} not found in the array");
}
```

#### 3. Calculating Row and Column Sums

```csharp
int[,] numbers = {
    {3, 5, 7},
    {2, 4, 6},
    {9, 1, 8}
};

// Calculate row sums
for (int row = 0; row < numbers.GetLength(0); row++)
{
    int rowSum = 0;
    for (int col = 0; col < numbers.GetLength(1); col++)
    {
        rowSum += numbers[row, col];
    }
    Console.WriteLine($"Sum of row {row}: {rowSum}");
}

// Calculate column sums
for (int col = 0; col < numbers.GetLength(1); col++)
{
    int colSum = 0;
    for (int row = 0; row < numbers.GetLength(0); row++)
    {
        colSum += numbers[row, col];
    }
    Console.WriteLine($"Sum of column {col}: {colSum}");
}
```

#### 4. Finding Maximum Value and Its Position

```csharp
int[,] numbers = {
    {3, 5, 7},
    {2, 4, 6},
    {9, 1, 8}
};

int max = numbers[0, 0];
int maxRow = 0, maxCol = 0;

for (int row = 0; row < numbers.GetLength(0); row++)
{
    for (int col = 0; col < numbers.GetLength(1); col++)
    {
        if (numbers[row, col] > max)
        {
            max = numbers[row, col];
            maxRow = row;
            maxCol = col;
        }
    }
}

Console.WriteLine($"Maximum value is {max} at position [{maxRow}, {maxCol}]");
```

### Common Pitfalls and Bugs with 2D Arrays

When working with 2D arrays, several issues frequently arise:

#### 1. Confusing Row and Column Indices

A common mistake is to swap row and column indices when thinking about the array:

```csharp
int[,] grid = new int[3, 4];  // 3 rows, 4 columns

// This is correct (row 1, column 2)
grid[1, 2] = 10;

// This is incorrect if you meant row 2, column 1
grid[1, 2] = 10;  // You're actually setting row 1, column 2
```

To avoid this confusion, be consistent in how you think about arrays (rows first, then columns) and use clear variable names like `row` and `col` instead of `i` and `j`.

#### 2. Off-by-One Errors in Nested Loops

Similar to regular arrays, it's easy to get off-by-one errors when iterating:

```csharp
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns

// Error: Loop goes too far for rows
for (int row = 0; row <= matrix.GetLength(0); row++)  // Should be < not <=
{
    for (int col = 0; col < matrix.GetLength(1); col++)
    {
        // Will crash at row = 3
        matrix[row, col] = 0;
    }
}
```

Always use `<` (less than) rather than `<=` (less than or equal) when comparing against array dimensions.

#### 3. Incorrectly Initializing with Inconsistent Row Lengths

When initializing a 2D array with literals, all rows must have the same number of elements:

```csharp
// Error: Rows have different lengths
int[,] matrix = {
    {1, 2, 3},    // 3 elements
    {4, 5},       // 2 elements (will cause a compilation error)
    {6, 7, 8, 9}  // 4 elements (will cause a compilation error)
};
```

This will cause a compilation error in C# because 2D arrays must be rectangular.

#### 4. Confusing 2D Arrays with Jagged Arrays

C# supports both regular 2D arrays (`int[,]`) and jagged arrays (`int[][]`), which are arrays of arrays. These are different types with different syntax and behaviors:

```csharp
// 2D array (rectangular)
int[,] matrix = new int[3, 4];  // All rows have exactly 4 columns

// Jagged array (array of arrays)
int[][] jaggedArray = new int[3][];  // 3 rows, but columns vary
jaggedArray[0] = new int[4];  // First row has 4 columns
jaggedArray[1] = new int[2];  // Second row has 2 columns
jaggedArray[2] = new int[5];  // Third row has 5 columns
```

Be careful not to confuse the syntax and usage of these different array types.

> [!example] Practice: 2D Arrays
>
> **Exercise 1: Creating and Displaying a Matrix** Create a 3×3 matrix containing the numbers 1 through 9 in order, then display it as a formatted grid.
>
> **Exercise 2: Matrix Addition** Write code to add two 2×2 matrices together (element by element) and store the result in a third matrix.
>
> **Exercise 3: Diagonal Sum** Calculate the sum of the elements on the main diagonal (top-left to bottom-right) of a square matrix.
>
> **Exercise 4: Matrix Transposition** Write code to create the transpose of a matrix (swap rows and columns).
>
> **Exercise 5: Finding Patterns** Check if all elements in any row of a 2D array are identical.
>
> **Exercise 6: Border Elements** Write code to print only the border elements of a matrix (the first and last row, and the first and last column).

## Summary

Arrays are a fundamental data structure in programming, allowing us to efficiently store and process collections of related data. The key properties of arrays - fixed size, same-type elements, and zero-based indexing - make them ideal for many common programming tasks.

In this chapter, we've explored how arrays work at the memory level and why they're so efficient for storing and accessing collections of data. We've learned how to create and navigate single-dimensional arrays, using loops to process their elements systematically. We've also examined common pitfalls like off-by-one errors and array bounds violations, and explored techniques for transforming arrays and distilling array data into meaningful results.

We've also introduced two-dimensional arrays, which extend the array concept to organize data in rows and columns. These grid-like structures allow us to represent more complex data relationships while maintaining the performance benefits of arrays. Through nested loops, we can efficiently process 2D arrays to solve a variety of problems involving tabular data.

As you continue your programming journey, you'll find that arrays form the foundation for many more complex data structures and algorithms. Mastering arrays is an essential step toward becoming a proficient programmer.

In our next chapter, we'll explore the main alternative to arrays: [[Chapter 4.2 - Linked Lists|linked lists]]. Once you understand these two, you will effectively be able to create any other kind of data structure!