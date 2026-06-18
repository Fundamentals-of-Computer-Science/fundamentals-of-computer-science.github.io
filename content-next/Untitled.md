---
draft: true
---

# Book Structure

Each chapter focuses on a data type and explores it through five strands. Students encounter these same five concepts with every new type.

## Strand 1: Data Definition & Memory Model

What the type represents, how to declare it, what memory it occupies, value vs reference semantics, mutability.

## Strand 2: Basic Computation

Default tools for this type. What operations exist out of the box?

| Type     | Default Tools                           |
| -------- | --------------------------------------- |
| Integers | `+`, `-`, `*`, `/`, `%`                 |
| Strings  | `.Length`, `.ToUpper()`, `.Substring()` |
| Booleans | `!`, `&&`, `\|\|`                       |

This strand answers: "I have data of this type. What can I do with it before writing my own functions?"
## Strand 3: Control Flow
How this type interacts with conditionals and loops. For booleans, this introduces `if` and `while`. For integers, this includes comparison operators and counting loops.

## Strand 4: Functions
Creating reusable procedures that take and return this type.
## Strand 5: Abstraction
Composing this type into structs/classes. Then: functions that operate on those compositions.
## Chapter Sequence
1. Booleans
2. Integers
3. Floating-point
4. Arrays (includes strings, addressed in Strand 1)
5. Classes