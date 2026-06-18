---
title: Ch. 1.2 - Numbers
draft: false
aliases:
  - numbers
---

Having explored Boolean algebra, now we can venture back to more familiar territory: working with numbers!

There are two primary types of number we will consider in this course:
1. Whole numbers, what we will be referring to as *integers*,
2. Floating point numbers, of which we will mainly use the *double* type.

In this chapter we will cover both: showing how computers handle each, along with the operators we need consider when working with them.

## Integers

Have you ever struggled to solve a problem, only to realize that you were looking too closely for a solution, when really you didn't understand the problem? This is all to common: it's human nature to solve puzzles and see patterns. However sometimes we must fight this nature, instead, focus on bringing these problems to a simple, concrete form. Once this is done, solving them becomes easy; once reduced to a simple form, our brains love solving them for us. Again I iterate: solutions fall from well defined problems. So when we talk about representing problems, often times we can reduce them to numbers. One common shape that problems commonly fall to are whole numbers. How many years until 2089? How many cents in a dollar? How many reps/sets while lifting should I perform? All of these break down to a whole number answer.

To represent these numbers in C#, we introduce the *int* type.

>[!abstract] Ints
>
>>[!Definition]
>>
>>An Int (integer) is a whole number, who's value is between -2,147,483,648 and 2,147,483,647.
>
> You can access a int's min or max value by writing the following:
> >[!example]
> >```csharp
> >int.MinValue // this evaluates to -2,147,483,648
> >int.MaxValue // this evaluates to 2,147,483,647
>>```


Now you may wonder why this range specifically: it represents of the possible integers you can fit in 32 bits of memory, centered around 0. Notice that it includes negative numbers, C# similarly has a 32-bit whole number type which represents the natural numbers, that is, only 0 and positive numbers.

> [!Definition] uint (unsigned Int)
> An unsigned int is a positive whole number which is a value between 0 and 4,294,967,295.

You can look at the comprehensive list of integer types supported in C# here: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types. I encourage you to read about them, however we will stick strictly to *int* and *uint* in this course.

### Integer Operations

While you may be familiar with the operators below, they are a bit different than you may be used to. When working with integers we must carefully consider the limitations of being a whole number.


>[!abstract] Addition of Integers
>
>>[!definition] Addition
>>
>> $Add: (int, int) \rightarrow int$ returns the sum of two integers.
>
>>[!property] Properties of Addition
>> - **Overflow:** If the sum exceeds `int.MaxValue`, overflow occurs, wrapping around to `int.MinValue`.
>
>>[!example]
>> ```csharp
>>  Console.WriteLine(5); // outputs 5 to the console
>>  Console.WriteLine(10); // outputs 10 to the console
>>  (5 + 10);        // outputs the sum, which is 15, to the console
>>  int.MaxValue + 1; // overflow will be int.MinValue (-2147483648)
>> ```

>[!abstract] Subtraction of Integers
>
>>[!definition] Subtraction
>>
>> $Subtract: (int, int) \rightarrow int$ returns the difference between two integers.
>>
>
>>[!property] Properties of Subtraction
>> - **Underflow:** If the difference is less than `int.MinValue`, underflow occurs, wrapping around to `int.MaxValue`.
>
>>[!example]
>> ```csharp
>>  Console.WriteLine(5);
>>  Console.WriteLine(10);
>>  Console.WriteLine(5 - 10); // difference will be -5
>>  Console.WriteLine(int.MinValue - 1); // outputs int.MaxValue (2147483647)
>> ```


The main change to keep in mind is how underflow and overflow work. More formally, one could say:
	If we define Int.MaxValue as the upper range, 2,147,483,647, and Int.MinValue as the lower end, -2,147,483,648. Then if we overflow by n, the resulting value will be Int.MinValue + n. Conversely, if we *underflow* by n, the resulting value will be Int.MaxValue - n.

Let’s do some exercises to test your understanding:

> [!example] Exercise
>
> What would the result of `2147483647 + 2` be?


> [!example] Exercise
> What would the result of `int.MinValue - 3` be?


---

Now let’s move on to Multiplication and Division, which we will split up for reasons you will see.


>[!abstract] Multiplication of Integers
>
>>[!definition] Multiplication
>>
>> $Multiply: (int, int) \rightarrow int$ returns the product of two integers.
>
>>[!property] Properties of Multiplication
>> - **Overflow/Underflow:** Overflow or underflow can occur if the product is outside the range of `int.MinValue` to `int.MaxValue`.
>
>>[!example]
>> ```csharp
>>  Console.WriteLine(10);
>>  Console.WriteLine(3);
>>  Console.WriteLine(10 * 3);      // product will be 30
>>  Console.WriteLine(int.MaxValue * 2); // overflow will occur
>> ```

Just to check how you are with over/underflow with multiplication, do the following exercises on your own.

> [!example] Exercise
> Compute what `50000 * 50000` would return.

> [!example] Exercise
> Now find what `int.MinValue * 2` would evaluate to.

This is all pretty close to what you’ll have experienced in any algebra course before. However, let’s talk about something a little different: Division

>[!abstract] Integer Division
>
>>[!definition] Integer Division
>>
>> $Divide: (int, int) \rightarrow int$ returns the quotient of two integers, discarding any remainder.
>
>>[!property] Properties of Integer Division
>> - **Division by Zero:** Division by zero results in a `DivideByZeroException`.
>> - **Truncation:** The result is always an integer. The fractional part of the division is discarded. For example, `7 / 3` results in `2`, not `2.333...`.
>
>>[!example]
>> ```csharp
>>  Console.WriteLine(10 / 3);// quotient will be 3 (integer division)
>>  Console.WriteLine(10 / 0);// This will throw a DivideByZeroException at runtime
>> ```

Let’s explore an example to understand this cutoff thing. If we take the following expression:
`32 / 4 `, this evaluates to `8` like you’d expect. However, this becomes untrue when the numerator is not cleanly divided by its denominator.

Take the following expression: `10 / 3`. In normal algebra over the real numbers, this would return 3.333…, however notice the type signature for integer division: it simplifies to an integer. This means we must have some criteria for picking a value that’s appropriate. Some may think of using a rounding algorithm, such as rounding up if the decimal is equal to or greater than .5, otherwise rounding down. However this can be suboptimal for consistencies sake: therefore we simply drop the decimal point *always*. Therefore with integer division, `10/3` returns `3`.

Run through these exercises to check your understanding, find what integer would be returned:


> [!example] Exercises
> 1. `5 / 2`
> 2. `7 / 3`
> 3. `-7 / 2`
>

---

There is one final operator for division we must cover, commonly called the remainder operator. It serves to find the remainder of dividing two values. A common use for it is taking an integer expression and finding a result which fits within a desired range. We’ll discuss this more later when we cover [[Arrays]].


>[!abstract] Modulus of Integers
>
>>[!definition] Modulo
>>
>> $Mod: (int, int) \rightarrow int$ returns the remainder of a division between two integers.
>>
>
>>[!property] Properties of Modulo
>> - **Remainder:** The result is always an integer between 0 (inclusive) and the absolute value of the divisor (exclusive).
>> - **Sign:** The sign of the result follows the sign of the dividend (the first operand).
>> - **Division by Zero:** Modulo by zero results in a `DivideByZeroException`.
>
>>[!example]
>> ```csharp
>>  10;
>>  3;
>>  10 % 3;  // remainder will be 1 (10 divided by 3 is 3 with a remainder of 1)
>>  -7 % 3; // remainder will be -1
>>  129 % 0; // This will throw a DivideByZeroException at runtime
>> ```


Modulo as an operator is used throughout all sorts of problems in CS. There are two general ways of thinking of taking the remainder: one is the literal: divide the first operand by the second, return the remainder. However some are helped with a clock analogy:

An analog clock serves as mod 12:

Say it is 2 o-clock. What time is it in 15 hours?
You may internally use mod to see that we only need move the hour hand 3 times to find our answer. But this is the equivalent of moving our hour hand 15 times around the circle.

When using modulo, this is often the style of problems we use it for: we are looking for a value in a cycle or constrained space, so we use modulo to control the range of possible outputs.

### Exercises

>[!example]- Exercises
>1. `10 % 3`
>2. `-13 % 5`
>3. `13 % 0`
>4. `13 % -5`
>5. `-10 % -3`
>6. `int.MaxValue % 7`
>7. `int.MinValue % 5`

---

You will find that most problems we think about in computer science can be represented with *ints*. This is more than an observation: computer memory cannot hold infinite precision, so all fractional values are approximated into a certain number of bits. And it seems like a lot of work to hand transform fractional values into an *integer* representation every time we want a fractional value. Therefore we will instead turn to floating-point types.

## Floating-Point

In many real-world applications, we need to represent numbers with fractional parts. This is where floating-point numbers come in. In C#, the primary type we'll use for floating-point numbers is `double`.

>[!abstract] Floating-Point Representation
>
> >[!Definition]
> >
> >Any type which is a *floating-point representation* defines a valid *range* for its whole value, along with a *precision* which determines what fractionals are possible.
>
> This is to say, any floating-point number represents some whole, integer value, and it has a fractional. This is the same as how we can write $3.5$ as $3+\frac{1}{2}$ . We have to consider a valid range here, just like an integer, because we have *limited memory space*.
>
> What about *precision*? Well this is a similar concept to how we might ask you to find the decimal form of $\frac{1}{3}$, which is $0.333\dots$. Well, a computer can't store infinite points before *or* after a decimal place. So we say the *precision* represents what decimal the compiler must round to. So if a Floating-point representation had room for 5 decimal places, we'd have to round $\frac{1}{3}$ accordingly to $0.33333$ or $0.33334$ depending on the rounding rule used.
>

Since we covered over and underflow with integers, we will turn our focus to problems which surround the fractional part of our floating-point numbers. First, let's define the 3 standard floating-point types in C#.

>[!abstract] Standard Floating-Point Types in C#
>
>>[!Definition] double
>>
>>A `double` is a 64-bit floating-point number used to approximate real numbers. It has a range of approximately ±1.7976931348623157E+308 and a precision of 15-16 decimal digits.
>
>>[!Definition] float
>>
>>A `float` is a 32-bit floating-point number used to approximate real numbers. It has a range of approximately ±3.4028235E+38 and a precision of 7 decimal digits. It uses less memory than a `double` but with lower precision and a smaller range.
>
>>[!Definition] decimal
>>
>>A `decimal` is a 128-bit floating-point number designed for precise representation of decimal fractions. It has a range of approximately ±7.9228162514264337593543950335 and a precision of 28-29 decimal digits.
>
> Each of these types serve to define numbers of different precisions and ranges. Why ever use a number with a smaller range or worse precision? Well notice each type has a different size: We often use smaller types when we are trying to preserve space and we won't use that much precision.
>
>> [!example]
>>
>> ```csharp
>> // Demonstrating Range and Precision of double, float, and decimal
>>// double
>>Console.WriteLine(double.MinValue); // displays -1.7976931348623157E+308
>>Console.WriteLine(double.MaxValue); // displays 1.7976931348623157E+308
>>Console.WriteLine(1.0 / 3.0); // displays 0.3333333333333333
>>
>>// float
>>Console.WriteLine(float.MinValue); // displays -3.4028235E+38
>>Console.WriteLine(float.MaxValue); // displays 3.4028235E+38
>>Console.WriteLine(1.0f / 3.0f); // displays 0.33333334, 'f' suffix
>>
>>// decimal
>>Console.WriteLine(decimal.MinValue); // displays -79228162514264337593543950335
>>Console.WriteLine(decimal.MaxValue); // displays 79228162514264337593543950335
>>Console.WriteLine(1.0m / 3.0m); // displays 0.3333333333333333333333333333, 'm' suffix
>>Console.WriteLine(0.1m + 0.2m); // displays 0.3
>>```
>>

Note: we define a decimal or a float, we use a suffix `m` or `f`. This is how we denote the type of a floating point literal. We can use the same with `d` for double, however double is the default in C# for floating-point representation.

Now notice: we only do the `0.1 + 0.2` example with decimal. What would happen if we did this with say, doubles?

>[!example] Floating Point Precision
>
>```csharp
>Console.WriteLine(0.1 + 0.2) // displays 0.30000000000000004
>Console.WriteLine(0.1m + 0.2m) // displays 0.3
>```

Why is this? Well one might assume that it's because of the greater precision! 28-29 digits of precision is no joke! However this is not the case. When estimating the value of a double or a decimal, a *base 2* number is used. It just so happens that there is not a clean way to represent 0.1 and 0.2 in binary, meaning that, when combined with double's 15-16 bits of precision, we get a value with some weird error! Decimal however uses a decimal (*base 10*) number to represent and approximate. 0.1 and 0.2, as written, are incredibly easy to represent in base 10, so therefore there is no rounding needed here!

However note: we still end up rounding in cases like `1m/3m`, this is because decimal does not have infinite precision!

Float, like double, is another *base 2* representation. However the following behavior occurs:

>[!example]
>```csharp
>Console.WriteLine(0.1f + 0.2f) // displays 0.3
>```

For an exercise, look at the definitions again and try to think about why this is.

## Comparisons

Now that we've explored the world of numbers in their various forms, let's talk about how we can compare them! Just like how we use boolean operators to combine true and false values, we have comparison operators that help us create boolean expressions from numbers.

Remember our previous discussion about boolean expressions? Well, comparisons are going to give us a whole new way to create them!

### Defining Our Terms

Let's start with the basics - what exactly is a comparison?

>[!abstract] Comparisons
>>[!Definition] Definition
>>
>> A *Comparison* is an operation that takes two values and produces a boolean by checking their relationship.
>
>Think of comparisons like asking questions about numbers: "Is this bigger?" "Are these equal?" The answer is always true or false.
>
>Here's how it looks in code:
>>[!example]
>>```csharp
>> 5 < 10;     // true - is 5 less than 10?
>> 7 >= 7;     // true - is 7 greater than or equal to 7?
>> 3 == 3.0;   // true - is 3 equal to 3.0?
>>```

Let's break down each comparison operator we have at our disposal:

>[!abstract] Comparison Operators
>>[!Definition] Less Than (<)
>>
>>$LessThan: (number, number) \rightarrow bool$ returns true if the first number is smaller than the second.
>
>>[!Definition] Greater Than (>)
>>
>>$GreaterThan: (number, number) \rightarrow bool$ returns true if the first number is larger than the second.
>
>>[!Definition] Less Than or Equal To (<=)
>>
>>$LessThanEq: (number, number) \rightarrow bool$ returns true if the first number is smaller than or equal to the second.
>
>>[!Definition] Greater Than or Equal To (>=)
>>
>>$GreaterThanEq: (number, number) \rightarrow bool$ returns true if the first number is larger than or equal to the second.
>
>>[!Definition] Equals (==)
>>
>>$Equals: (number, number) \rightarrow bool$ returns true if both numbers represent the same value.
>
>>[!Definition] Not Equals (!=)
>>
>>$NotEquals: (number, number) \rightarrow bool$ returns true if the numbers represent different values.

### Working with Integer Comparisons

When comparing integers, things work pretty much how you'd expect from math class:

>[!abstract] Integer Comparison Properties
>>[!property] Transitivity
>>If 1 < 2 and 2 < 3, then 1 < 3
>>```csharp
>>// If 1 < 2 is true and 2 < 3 is true
>>// Then 1 < 3 must be true
>>```
>
>>[!property] Antisymmetry
>>If 5 < 10 is true, then 10 < 5 must be false
>>```csharp
>>// If 5 < 10 is true
>>// Then 10 < 5 must be false
>>```
>
>>[!property] Totality
>>For any two different integers, exactly one of these must be true:
>>- First < Second
>>- Second < First
>>```csharp
>>// For 7 and 7:
>>// Neither 7 < 7 nor 7 < 7 is true
>>// Because 7 == 7
>>```

### Floating-Point Comparisons: Here Be Dragons! 🐉

Remember our friend the floating-point number? Those pesky approximations we talked about earlier come back to haunt us when we do comparisons:

>[!warning] Floating-Point Comparison Gotchas
>```csharp
>// This seems like it should be true...
>Console.WriteLine(0.1 + 0.2 == 0.3);  // But it prints false! 😱
>```
>
>Why? Remember 0.1 + 0.2 doesn't give us exactly 0.3 in base-2 floating-point! Instead, we get  0.30000000000000004.

To safely compare floating-point numbers, we can use what's called an "epsilon" comparison:

>[!abstract] Safe Floating-Point Comparisons
>>[!example] Using Epsilon
>>```csharp
>>// Instead of direct comparison:
>>// 0.1 + 0.2 == 0.3
>>
>>// We use something like this:
>>Math.Abs((0.1 + 0.2) - 0.3) < 0.000001  // true! 😌
>>```
>
>Think of epsilon (that small number 0.000001) as saying "if these numbers are within 0.000001 of eachother, we can call them equal."
>
>Note, `Math.Abs()` is something we will talk about later. Here just think of it as an operator where the thing in parenthesis are the operands. And it will find the absolute value. We will go more in depth on it later.

It is important to keep in mind that there are issues with doing this! You can read more about the trials and tribulations of rounding and using epsilon comparisons here: https://floating-point-gui.de/errors/comparison/.
## Combining Comparisons with Boolean Operators

Remember our boolean operators from before? We can combine them with comparisons to create more complex conditions:

>[!example] Complex Conditions
>```csharp
>// Check if a number is between 1 and 10
>5 > 1 && 5 < 10;        // true
>
>// Check if a number is less than 0 or greater than 100
>150 < 0 || 150 > 100;   // true
>```

## Some Practical Examples

Let's look at some real-world scenarios where comparisons come in handy:

>[!abstract] Common Use Cases
>>[!example] Temperature Checks
>>```csharp
>>// Converting 98.6°F to Celsius
>>(98.6 - 32) * 5 / 9 > 37.0;  // Is this a fever?
>>```
>
>>[!example] Price Comparisons
>>```csharp
>>// Is the discount more than 20%?
>>100.0 - 75.0 > 20.0;  // Checking if savings exceed $20
>>```
>
>>[!example] Distance Calculations
>>```csharp
>>// Is point (3,4) less than 5 units from origin?
>>3.0 * 3.0 + 4.0 * 4.0 < 25.0;  // Using Pythagorean theorem
>>```

## Exercises

Let's practice what we've learned! Try these exercises (click the arrow to expand):

>[!example]- Comparison Exercises
>```csharp
>// 1. Basic Comparisons
>5 > 3;          // What's the result?
>10 <= 10;       // How about this one?
>
>// 2. Floating Point Fun
>0.1 + 0.2 == 0.3;  // Tricky! Why?
>
>// 3. Combined Conditions
>5 < 10 && 10 < 15;   // Work this out step by step
>
>// 4. Real World
>// Is 15% of 100 greater than 10?
>100.0 * 0.15 > 10.0;
>```

## Conclusion

Comparisons are the bridge between our numeric world and our boolean world. They let us ask questions about numbers and get yes/no answers that we can use to make decisions in our code. Just remember:

- With integers, comparisons work just like in math
- With floating-point numbers, be careful about exact equality
- Combine comparisons with boolean operators for complex conditions
- Always think about edge cases (what happens at the boundaries?)

In our next chapter, we'll take a look at a particularly unique numerical type: the [[char]].