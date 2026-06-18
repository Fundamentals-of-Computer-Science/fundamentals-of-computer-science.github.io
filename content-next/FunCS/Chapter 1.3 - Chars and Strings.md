---
title: Ch. 1.3 - Strings
draft: false
aliases:
  - strings
  - chars
---
# Chapter 1.3: Text in Code - Characters and Strings

Having worked with numbers, let's explore how computers handle text. While we see letters and symbols, computers only understand numbers. We'll uncover how this works through two key types:

1. Characters: Single text units like 'A' or '7'
2. Strings: Sequences of characters like "Hello"

## Characters

When you type a letter, the computer assigns it a number. Just like we used integers to count things, we use characters to represent text symbols. Each character has its own numeric identity.

>[!abstract] Chars 🚗
>
>>[!Definition] Char
>>
>>A Char is a 16-bit value type representing a single text character with a value between 0 and 65,535.
>
>>[!property] Properties
>>
>>- Each char maps to exactly one number
>>- Numbers 0-127 match ASCII standard
>>- Numbers 128-65535 allow international characters
>
>>[!example]
>>```csharp
>> 'A';     // A char 'A', char literals are wrapped in single quotes
>>'5';   // Numbers can be characters too, when wrapped in single quotes
>>'$';   // So can symbols
>>```

### Character Arithmetic

Just like we added and subtracted integers, we can do math with characters using their numeric values.

>[!abstract] Character Operations
>
>>[!definition] Character Addition
>>
>>$Add: (char, int) \rightarrow int$ returns the numeric result of adding a character's code and an integer
>>
>
>>[!property] Properties
>>
>>- Result is always an integer
>>- Original character is unchanged
>>- Common to cast result back to char
>
>>[!example]
>>```csharp
>>'A' + 1        // 66 (numeric value)
>>(char)('A' + 1) // 'B' (character value)
>>'Z' - 'A'      // 25 (positions between letters)
>>```

Let's look at how character codes work:

>[!abstract] Character Codes
>>[!Definition] ASCII
>>ASCII is a standard that assigns numbers 0-127 to common characters:
>>- 65-90: Uppercase A-Z
>>- 97-122: Lowercase a-z
>>- 48-57: Digits 0-9
>
>>[!example]
>>```csharp
>>// Finding letter positions
>>'C' - 'A'     // 2 (C is 2 after A)
>>'b' - 'a'     // 1 (b is 1 after a)
>>
>>// Converting case
>>'a' - 32      // 'A' (lowercase to uppercase)
>>'Z' + 32      // 'z' (uppercase to lowercase)
>>```

## Strings

Now that we understand characters, let's see how we combine them into text. A string is a sequence of characters that can't be changed after creation.

>[!abstract] Strings 🧶
>>[!Definition]
>>
>>A *String* is an indexed immutable collection of characters.
>
>>[!property] Properties
>>
>>- Fixed length once created
>>- Zero-based indexing
>>- Always uses double quotes
>
>>[!example]
>>```csharp
>>"Alice";  // the string literal for the name "Alice"
>>"Alice"[0];    // evaluates to 'A'
>>"Alice"[4];     // evaluates to 'e'
>>```

### String Operations and Features

Just like we had rules for integer math, strings have their own operations.

>[!abstract] Concatenation
>>[!definition]
>>
>>$Concat: (string, string) \rightarrow string$ returns a new string containing all characters from both inputs in order
>>
>
>>[!property] Properties
>>
>>- Creates new string
>>- Original strings unchanged
>>- Length is sum of input lengths
>
>>[!example]
>>```csharp
>>"Hello" + " " + "World"  // evaluates to a new string: "Hello World"
>>```

>[!abstract] ToUpper
>>[!definition]
>>
>>$ToUpper: string \rightarrow string$ returns a new string with all characters converted to uppercase
>>
>
>>[!property] Properties
>>
>>- Creates new string
>>- Original string unchanged
>>- Non-letters remain unchanged
>>- Culture-aware for international characters
>
>>[!example]
>>```csharp
>>"Hello".ToUpper()     // "HELLO"
>>"Hello!123".ToUpper() // "HELLO!123"
>>```

>[!abstract] ToLower
>>[!definition]
>>
>>$ToLower: string \rightarrow string$ returns a new string with all characters converted to lowercase
>>
>
>>[!property] Properties
>>
>>- Creates new string
>>- Original string unchanged
>>- Non-letters remain unchanged
>>- Culture-aware for international characters
>
>>[!example]
>>```csharp
>>"Hello".ToLower()     // "hello"
>>"HELLO!123".ToLower() // "hello!123"
>>```

>[!abstract] Length Property
>>[!definition] Length
>>
>>$Length: string \rightarrow int$ returns the number of characters in the string
>>
>
>>[!example]
>>```csharp
>>"Cat".Length        // 3
>>"".Length          // 0 (empty string)
>>```

## Exercises

Let's practice! Try solving these before looking at the answers:

>[!example] Character Math
>1. What is 'F' - 'A'?
>2. What character is (char)75?
>3. What happens in 'Z' + 1?
>4. Convert 'q' to uppercase using arithmetic

>[!example] String Basics
>1. What is the length of "C#"?
>2. What character is "Hello"[1]?
>3. What happens in "Test" + '!'?

>[!example] Edge Cases
>1. What is (char)0?
>2. What is "".Length?
>3. What happens in (char)('Z' + 10)?

## Common Pitfalls

Just like integer overflow, characters have limits:

>[!warning] Char Limitations
>```csharp
>(char)65536;  // Error: too big
>(char)(-1);   // Error: can't be negative
>```

And strings have their own gotchas:

>[!warning] String Gotchas
>```csharp
>string s = "Test";
>s[0] = 'B';           // Error: strings are immutable
>s = s + "ing";        // OK: creates new string
>```

However here we are using variables, so this may not make too much sense yet. We will cover these in our next chapter: [[Variable and Scope]].

## Conclusion

You've seen how computers use numbers to represent text through:
- Characters: Single symbols with numeric codes
- Strings: Immutable sequences of characters

Next, we'll look at using [[Chapter 2 - Variables and Scope|variables]] to store and reuse values!