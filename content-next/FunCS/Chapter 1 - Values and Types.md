---
title: Ch. 1 - Values and Types
draft: false
aliases:
  - values and types
---

In the journey of programming you will learn many concepts, ranging from simple to complex. However, no matter what data you work with, no matter what you type, you’ll always eventually end up back at a value. By the end of this chapter we will have covered:
 1. in precise terms, what a *value* is, and how we represent them in code,
 2. how we categorize values with their *types*,
 3. how we can use *operators* to do computations over values,
 4. how we define operators in terms of both their *type signature* and *behavior*
 5. and how we can compose values and operators to create *expressions*.

## Defining Our Terms

In this book we will often find ourselves needing to define some terms. These are incredibly important to you, as while they may not make sense on the first read, they will provide you with a solid framing of what the thing is. Give them a good read and try to understand what it means before reading on. To get us started, let's define what we mean by a *value*.

> [!abstract] Value
>> [!note]  Definition
>> Values are representations of data which
>> 1. cannot be simplified further,
> >2. and belong exclusively to some type.
>
>Now, these words all sound great, however let’s get into some of the basic values we'll see frequently.
>
>> [!example] Examples
> >```csharp
> >8 // this is the number 8
> >“Hello” // this is the string “Hello”
> >True // this is the Boolean value True
> >```

Notice that with each value, we associate a defining group it belongs to. This is its [[Types (Programming)|type]]. For now, trust me when I say that for any value you can define, it belongs to one and only one type.

> [!abstract] Types
>> [!note] Definition
>> A type is a defining shape of data, it describes a set of valid values which follow a set of restrictions.
>
>> [!example] Examples
>> - A ***Boolean*** is a logical *true/false* value. A Boolean can be either *true* or *false*.
>> - An ***Int*** is a whole *number* between -2,147,483,648 and 2,147,483,647
>> - A ***Char*** is a *unicode character*, representing symbols commonly found in text.
>> - A ***String*** is an *ordered*, *immutable* collection of *Chars*

Notice that with each example type, we include a description of what kind of values it contains, numerical, logical, unicode characters, etc. And further, we describe the restrictions placed said data. Knowing the kind of data and its restrictions is a cornerstone of problem solving; if you ever find yourself unsure of where to start on a problem, start by defining what *format* the answer should be in and what *restrictions* it must follow. You'll find that problems become much simpler once you have these in place.

However, all we've done is describe data. These make up the nouns of our language. Now we have to extend to describe computations, the verbs of programming: *operations*.

---

Similar to evolution and its inevitable path to crustaceans, when running code, a lot of what it will do is take more complex bodies of code, and simplify it until all of its limbs are simple values it can operate on. Similar to this process in evolution, called carcinisation, we will define the processes of *evaluation*. Evaluation is the process of simplifying terms until they become a single atomic value. This process uses *operators*: the functions/modifications we perform on data.

> [!abstract] Operators
>> [!definition]
>> Operators describe computations which can be performed on a set number of values of a given type.
>
> Notice operators also consider *types*. If you pay close attention, many problems in program navigate typing. In this case, the types are used to describe what kind of values the operator acts on.
>> [!example]
>>```csharp
>> // math operators:
>> // +, -, /, \*,%
>> 5 + 2 // simplifies to 7
>> // boolean operators
>> // &&, ||, ==, <=, >=, !=, !
>> true && false // simplifies to false
>> // string operators
>> // +
>> "Hello" + " world!" // simplifies to "Hello world!"
>>```
>


The above examples follow a simple form: operators take in some number of values, and simplify to a single value. However, sometimes we have more complex statements! For example, how do we describe a problem like `11 + (33/3)`? What if they were more nested? Well luckily, we have a term for such nested problems: *expressions*

>[!abstract] Expressions
>> [!Definition]
>>
>> An *expression* is a set of values and operators which evaluate to become a single value.
>
>>[!example]
>>
>>```csharp
>>11 + (33/3) // this is an integer expression
>>true && true || false // this is a boolean expression
>>
>>// an expression need not be nested, meaning
>>33 + 2
>>// is a completely valid expression.
>>// -> our definition requires an expression have both operators and values
>>// which 33 + 2 accomplishes
>>```
>
Notice: when we evaluate an expression, it returns a specific type. We also describe expressions as being of some type. These are important attributes because we can always know that a *boolean* expression will always simplify to become a *boolean*. We may sometimes say that such an expression *returns* a boolean.

Here are some more examples to get you used to seeing them.

> [!example] Example: operating with booleans
> ```csharp
>  true || false // the Boolean “OR” operation, returns true
>  // Reads as: "true OR false"
>  // Think of it as: "Is either value true? Yes, so the result is true"
>
>  true && true // the Boolean “AND” operation, returns true
>  // Reads as: "true AND true"
>  // Think of it as: "Are both values true? Yes, so the result is true"

These examples use two Booleans. Does a “single input” operation exist for Booleans? Yes: ! (No really, that’s not a typo) (Technically there are two, but more on that in the next chapter)


> [!example] Example: ! : Negation (not)
> When we talk about if someone is lying or maybe they’re wrong, we can say that they said something that’s not true. Similarly in code we write:
> ```Csharp
> !true // the Boolean "NOT" operation, returns false
> // Reads as: "NOT true"
> // Think of it as: "If we flip true, it becomes false"
> ```

---

We've now talked about using operators, nesting them, and gone through examples. However we could use a nice format to describe them. Remember how we said before that an operation takes some number of values of specific types? Well let’s dig into these a bit to see how we might define them with a little more precision:


> [!Definition] || (OR)
> OR takes two Booleans and returns a single Boolean

Notice we don’t say it takes two Boolean values: this is for two reasons:
1. We can generally refer to values as their types if we aren’t using them yet
2. Operations technically take anything which *evaluates* to something of that type.

> [!Definition] Expression
> Expressions are a combination of either
> -  operations and values,
> - or operations and other expressions,
 >
 >which can be computed until they become a single atomic value. Expressions are usually referred to by the resulting values type; so a *Boolean expression*, like `false || false`, is an expression which will evaluate to become an atomic Boolean value (in this case: false).
 >

Now we’re introducing a lot of definitions, and we notice that a lot of these terms have associated types and behaviors. Let’s define a standard **syntax** for talking about these things. This syntax will be what is known as an *informal type signature*.


> [!example] Type signature
> Saying that the operator `OR` takes in two Boolean’s and returns (simplifies to) a Boolean is clunky. Instead we can write this like so:
>
> $$OR : (Bool, Bool) \rightarrow Bool$$
>
> While it may not seem much better at first blush, with time, this format will make talking about code much easier. Another example is `NOT`:
>
> $$NOT: Bool \rightarrow Bool$$

So for a bit of a recap:

Values are the simplest unit of data we deal with. They hold associated types, which we use to not just describe what kind of data a value is, but also allow us to talk about how we can simplify it. Simplifying is the cornerstone of computation, to the chagrin of most algebra students, and we call combinations of unsimplified operations and terms expressions. And to cap it all off, now we have a new way to represent how all of that looks with a brand new language called a type signature. Is all that clear? It is? Good! Now we can start talking about the real fun stuff: [[booleans]]


%% (NOTE: I should add exercises for them to try here, ideally in the form we would give an understanding quiz the week after this reading was due)
(NOTE: I think in general, having students compute expressions by hand as kind of the algebra of programming would be very helpful. It lets us teach them some Boolean algebra and stuff like modulus as well, which are very needed where is all the precision information for doubles can be mostly tossed)
(NOTE: it may be a good idea to start giving students tables to compute in. Like the top row is the original expression and each row below is empty for them to fill out. Then we play mind games by having extra rows or something. Idk. This is to get them used to the ideas so we can have them track state at different levels. So maybe it would be confusing if the state tables simplify at different rates than the expression tables. But maybe we can signify which line of code the simplification occurs at when we introduce state and how it changes. I like the latest the best)

Type of exercise:
What is the type signature of the following expression: %%
