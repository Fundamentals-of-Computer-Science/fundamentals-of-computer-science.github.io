---
draft: true
---

In our previous chapters, [[Chapter 3.1 - Branching]] and [[Chapter 3.2 - Looping]], we covered ideas of controlling the behavior of code. From making decisions, to automating the repetition of tasks. Now, having looked at how we do stuff for a bit, let's turn our attention to the other half of the coin: how we store data.

In this chapter we will talk about the first major group of collections present in this text: Arrays. After defining this structure we will examine the creation and navigation of arrays, along with common pitfalls and problems that you will encounter when using them.

# Defining Our Terms

First, let's establish a strict definition of an array:

>[!abstract] Arrays
>
>> [!Definition]
>>
>>An **Array** is an *ordered* collection of elements which *share a type*. An array has a *fixed size* which *cannot* be changed, and each element has an *index* which it can be accessed with.
>
>>[!definition] Properties
>>
>> - Arrays *cannot* be resized after created.
>> - All array elements are initialized to a default value determined by their type.
>> - Array Indexing starts from 0.
>
>Arrays, due to being bound by a specific size at creation, makes them a good match for any problem where we know the number of elements at the start! For example, we have 7 days in a calendar week, so if we wanted to store the average temperature for each day in some kind of collection, an array would be a good fit!
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
