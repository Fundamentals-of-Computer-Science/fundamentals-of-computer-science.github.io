---
title: Chapter 0 - Before Beginning
draft: false
permalink: ch0
---

# Chapter 0: Before You Begin

## What is Programming?

Programming is about solving problems. We do this in two steps: defining data, then computing with it. We then define these two concepts as:

**Data:** Information stored by a computer. Numbers, text, true/false values, lists. These are all data.

**Computation:** The transformation of data. Computation always has a before and after: what data goes in, what data comes out.

Further, we can write this process as:

```
data_in → data_out
```

Where we represent computation with an arrow. It takes what's on the left and produces what's on the right.

**Examples:**

```
2 + 2 → 4
```
With addition, two numbers go in and one number comes out.

```
uppercase "hello" → "HELLO"
```
Uppercase takes text and produces an all-uppercase version: "hello" becomes "HELLO".

```
5 > 3 → true
```
`>` (greater than) takes two numbers and produces a boolean value.

Every program you write will follow this pattern: define what data you're working with, then describe what transformations to apply.

---

## Finding a Book in a Library

This pattern of "understand the data, then compute" appears outside of programming too. Consider finding a book in a library. You know the title and author. How do you find it?

First, you need to know how the library is organized. Books are grouped by genre, then sorted by author's last name, then by title. This is the *structure of the data*.

Once you know this structure, you can search systematically. Compare the genre you want to each aisle until you find a match. Compare author names until you find the right section. Compare titles until you find your book. Each comparison is a computation: two pieces of data go in (what you're looking for, what you're looking at), and a result comes out (match or no match).

If you don't know how the data is structured, finding a book is hard. You'd have to check every book in the library. But once you understand the structure, finding a specific book becomes much easier.

This is why we start with data. Understand how information is organized, and the computation follows naturally.

---

## How This Book is Organized

This book follows the same pattern. Each chapter focuses on one type of data (booleans, integers, arrays, etc.) and explores it through five strands:

| Strand | Question |
|--------|----------|
| **1. Data Definition** | How is this data stored? What values are valid? |
| **2. Basic Computation** | What operations are built in and available? |
| **3. Control Flow** | How can we use this data to affect program behavior? |
| **4. Functions** | How do we define our own computations? |
| **5. Abstraction** | How do we build more complex data from this? |

Every chapter answers these same five questions. The repetition is intentional. By the end of the book, you'll apply this structure instinctively to any new data type you encounter.

---

## How to Read This Book

To help you think and communicate precisely about code, this book uses three tools: definitions, translations, and visualizations.

### Definitions

Key terms are defined precisely. These definitions are exact and meant to be memorized.

When you see a definition, learn it. Don't paraphrase. The precision matters because vague language leads to vague thinking, and vague thinking leads to bugs.

### Translations

Each piece of code has a corresponding English translation. These translations help you read and discuss code out loud.

**Example:**

```csharp
bool x = true;
```
→ "Create a boolean variable named x, and store the value true in it."

These translations are precise renderings of the code. Internalize them so you have exact language for reading and discussing code.

### Visualizations

Abstract concepts are accompanied by diagrams: memory layouts, flowcharts, data structures. The computer does things you cannot see from the code alone, and visualizations help show this behavior.

---

## How to Practice

Practice exercises appear throughout each chapter. You learn to program by writing code, not by reading about it. The exercises are where the actual learning happens, so how you engage with them determines what you get out of this book.

### The Two Directions

Practice works in two directions:

**Code → English:** You see code and write the translation.

**English → Code:** You see a description and write the code.

Both directions matter. Reading code and writing code are different skills. You need both.

Some problems also ask you to solve from a prompt. The goal is to build skill first in reading and writing correct syntax, then in solving problems with those tools.

### The Protocol

The process below is more involved than you might expect. Each step has a purpose.

For each exercise:

1. **Write the problem by hand.** Writing by hand uses more of your attention than typing.

2. **Attempt without looking back.** Turn off your screen. Work from memory.

3. **If stuck, write down your question.** Not "I don't know." Write the specific question that, if answered, would let you continue. "What does the `=` symbol do?" is a question. "I'm confused" is not.

4. **Look up the answer to your question.** Search the chapter for it.

5. **Write down the answer.** Before continuing, record what you learned.

6. **Start the problem fresh.** Don't continue from where you stopped. Begin again with your new understanding.

7. **Compare to the model.** Check your answer against the correct one.

8. **Note your mistakes.** Write down specifically what you got wrong.

9. **Write the corrected version.** Produce the correct answer yourself, not just read it.

This takes time because each step makes learning deliberate.

Why not skip steps? Because if you don't have a question in mind, finding an answer is hard. And if you don't have a question in mind, *remembering* the answer is harder. Copying patterns from examples without understanding produces weak knowledge that disappears before exams.

The protocol above takes more time per problem but less time overall. You won't need to relearn material if you learn it thoroughly in the first place.

---

## Summary

- **Data** is information stored by a computer.
- **Computation** transforms data: `data_in → data_out`.
- Each chapter covers one data type through five strands.
- Definitions and translations are precise. Learn them exactly.
- Practice actively using the protocol. What you put in determines what you get out.

Now you are ready to start on [Chapter 1 - Booleans](../ch1/index.md)!
