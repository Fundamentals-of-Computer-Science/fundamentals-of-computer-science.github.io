---
title: Ch. 3 - Control Flow
aliases:
  - control flow
draft: true
---

So far, we've talked a lot about solving individual small problems. We can use variables to remember and adjust a value over the course of a program. This leaves us with some problems though: how do we let our program's state change the outcome of our program? How do we take repetitive sections of code and make it more concise and more predictable? In this chapter we will discuss:
1. how we *branch* in code execution,
2. and how to repeat actions with *looping*.

## Defining Our Terms

>[!abstract] Branching
>Branching is often done using if, if-else, and if-elseif-else structures. These can be defined as
>>[!definition]
>>An *if* statement is a segment of code used to create *conditional* branches of code. It has
>> some number of *branches*, each of which having
>>	1. a *condition*,
>>	2. and a *scope*.
>
>>[!Syntax]
>> An *if* statement in C# must have a valid *header* and *body*.
>> ```csharp
>> if (x > y) // Form: if (condition)
>> {
>> 	Console.WriteLine("x is bigger!");
>> }
>> elseif (x == y) // branch for the case where they are equal
>> {
>> 	Console.WriteLine("they're the same!");
>> }
>> else // else, if included, is always the last branch, it catches any other condition
>> {
>> 	Console.WriteLine("y is bigger!");
>> }
>>```
>
>>[!example]
>>```csharp
>>bool drinking_age = false;
>>bool legal_adult = false;
>> int age = 22;
>> if (age >= 21)
>> {
>> 	drinking_age = true;
>> 	legal_adult = true;
>> }
>>```
