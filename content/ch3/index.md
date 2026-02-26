---
title: Chapter 3 - Arrays
draft: false
permalink: ch3
---

# Chapter 3: Arrays

So far, every piece of data we have stored has been a single value, whether it be booleans, integers, or doubles. But most real problems involve more than one value.

A weather app tracks the temperature for each day of the week. A gradebook needs a score for every student in the class. A game stores the position of every piece on the board. These problems all need to store multiple values of the same type *and* work with those values as a group.

This chapter introduces arrays: ordered, fixed-size collections where elements are accessed by position. Arrays are our first reference type, which means variables hold addresses rather than data directly. This distinction changes how assignment works and enables multiple variables to share the same data.

We will start by understanding how arrays live in memory and how we access individual elements. Then we will learn to process entire arrays systematically through traversal. By the end, you will be able to store, modify, and compute with sequences of values using the same patterns that appear throughout programming.

## Chapter Sections

1. **[Data and Memory](ch3-1.md):** How C# represents arrays and how we access elements through references
2. **[Basic Computation](ch3-2.md):** How we process arrays through traversal and standard patterns

We begin with a fundamental question: how does C# represent collections of values?
