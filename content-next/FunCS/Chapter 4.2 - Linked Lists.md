---
title: Ch. 4.2 - Linked Lists
draft: false
aliases:
  - linked lists
  - collections
---


> [!abstract] Linked Lists
>
> > [!Definition]
> >
> > A **Linked List** is an _ordered_ collection of nodes where each node contains (1) a _value_ of some type and (2) a _reference_ to the next node. A linked list has a _dynamic size_ which can _grow or shrink_ during execution, and nodes must be accessed _sequentially_ from the first node.
>
> > [!definition] Properties
> >
> > - Linked lists _can_ be modified by adding or removing nodes at any point.
> > - Nodes are scattered throughout memory rather than stored contiguously.
> > - Accessing any node requires starting from the first node and following references.
> > - The last node in the list has a null reference, marking the end of the list.
>
> Linked lists, due to their dynamic nature, are ideal for problems where the collection size changes frequently during execution. For example, a browser history that needs to efficiently add new pages at the beginning or a task manager where tasks are constantly being added and completed would benefit from a linked list implementation!
>
> > [!example]
> >
> > ```csharp
> > // Create an empty linked list
> > LinkedList<int> taskPriorities = new LinkedList<int>();
> >
> > // Add nodes to the beginning of the list
> > taskPriorities.AddFirst(new LinkedListNode<int>(1));  // Highest priority
> > taskPriorities.AddFirst(new LinkedListNode<int>(2));  // New highest priority
> >
> > // Traverse the list to access all elements
> > LinkedListNode<int> current = taskPriorities.First;
> > while (current != null)
> > {
> >     Console.WriteLine($"Task priority: {current.Value}");
> >     current = current.Next;  // Move to next node
> > }
> > ```

Unlike arrays which require contiguous memory, linked lists scatter nodes across memory and connect them through references. This fundamental difference transforms how we store and manipulate collections of data.

### Memory Organization

Arrays store elements side-by-side in memory:

```
Array [1, 2, 3, 4, 5]:
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
```

Linked lists scatter nodes across memory, connected by references:

```
Linked List 1 -> 2 -> 3 -> 4 -> 5:
┌───────────┐      ┌───────────┐      ┌───────────┐
│ Value: 1  │      │ Value: 2  │      │ Value: 3  │
│ Next: ────┼─────>│ Next: ────┼─────>│ Next: ────┼──> ...
└───────────┘      └───────────┘      └───────────┘
```

### Core Components

The linked list structure we'll use throughout this chapter has two main parts:

1. **LinkedList**: The container that tracks the first node
2. **LinkedListNode**: Individual nodes containing a value and a Next reference

```csharp
// Our LinkedList implementation
public class LinkedList<T>
{
    public LinkedListNode<T>? First { get; set; }

    public LinkedList()
    {
        First = null;
    }

    public void AddFirst(LinkedListNode<T> node)
    {
        if (First != null)
        {
            node.Next = First;
        }
        First = node;
    }
}

// Our LinkedListNode implementation
public class LinkedListNode<T>
{
    public T Value { get; set; }
    public LinkedListNode<T>? Next { get; set; }

    public LinkedListNode(T value)
    {
        Value = value;
        Next = null;
    }
}
```

We'll visualize linked lists using box-and-arrow diagrams:

```
┌────┐    ┌────┐    ┌────┐    ┌────┐
│ 10 │───>│ 20 │───>│ 30 │───>│ 40 │───> null
└────┘    └────┘    └────┘    └────┘
  First
```

> [!example] Practice: Understanding Linked Lists
>
> **Exercise 1:** Draw a box-and-arrow diagram for a linked list containing [5, 8, 12, 15]
>
> **Exercise 2:** Identify at least three differences between arrays and linked lists

## 4.2 Building and Traversing Linked Lists

### Creating a Simple Linked List

Let's build a linked list step by step:

```csharp
// Create empty list
LinkedList<int> myList = new LinkedList<int>();

// Create first node with value 10
LinkedListNode<int> firstNode = new LinkedListNode<int>(10);
myList.AddFirst(firstNode);

// Create second node with value 20
LinkedListNode<int> secondNode = new LinkedListNode<int>(20);
myList.AddFirst(secondNode);

// Create third node with value 30
LinkedListNode<int> thirdNode = new LinkedListNode<int>(30);
myList.AddFirst(thirdNode);
```

After execution, our list looks like:

```
┌────┐    ┌────┐    ┌────┐
│ 30 │───>│ 20 │───>│ 10 │───> null
└────┘    └────┘    └────┘
 First
```

Notice that since we're using `AddFirst`, new nodes are added at the beginning of the list, making the most recently added node the new first node.

### Adding a Node at the End

Since our `LinkedList` class doesn't have an `AddLast` method, we need to traverse to the end of the list:

```csharp
// Create a new node to add at the end
LinkedListNode<int> lastNode = new LinkedListNode<int>(40);

// Handle empty list case
if (myList.First == null)
{
    myList.AddFirst(lastNode);
}
else
{
    // Find the last node in the list
    LinkedListNode<int> current = myList.First;
    while (current.Next != null)
    {
        current = current.Next;
    }

    // Add the new node at the end
    current.Next = lastNode;
}
```

After adding 40 to the end, our list becomes:

```
┌────┐    ┌────┐    ┌────┐    ┌────┐
│ 30 │───>│ 20 │───>│ 10 │───>│ 40 │───> null
└────┘    └────┘    └────┘    └────┘
 First
```

### Basic Traversal

Traversing a linked list means visiting each node in sequence. This is the foundation for most list operations:

```csharp
// Traversing and printing each value
LinkedListNode<int> current = myList.First;

// Pre-condition: myList may be empty

while (current != null)
{
    // Process the current node
    Console.WriteLine(current.Value);

    // Move to the next node
    current = current.Next;
}

// Post-condition: All nodes have been visited
```

The traversal pattern has three key elements:

1. A `current` pointer that starts at the first node
2. A loop that continues until `current` becomes null
3. Processing each node, then moving to the next one

#### Tracing Traversal with an Iteration Table

Let's trace the traversal of the list [30, 20, 10, 40]:

|Iteration|current|current.Value|current.Next|Action|
|---|---|---|---|---|
|Start|Node(30)|30|Node(20)|Print 30|
|After 1|Node(20)|20|Node(10)|Print 20|
|After 2|Node(10)|10|Node(40)|Print 10|
|After 3|Node(40)|40|null|Print 40|
|After 4|null|N/A|N/A|Exit loop|

### Counting Nodes

A simple application of traversal is counting the nodes:

```csharp
// Count the number of nodes in a list
LinkedListNode<int> current = myList.First;
int count = 0;

// Pre-condition: myList may be empty

while (current != null)
{
    count++;
    current = current.Next;
}

// Post-condition: count equals the number of nodes in the list
Console.WriteLine($"The list contains {count} nodes.");
```

### Finding the Last Node

To find the last node:

```csharp
// Find the last node in a list
LinkedListNode<int> current = myList.First;
LinkedListNode<int> lastNode = null;

// Pre-condition: myList may be empty

if (current != null) // Only proceed if list isn't empty
{
    // Traverse until we reach the last node
    while (current != null)
    {
        lastNode = current;
        current = current.Next;
    }
}

// Post-condition:
// - If list is empty, lastNode is null
// - Otherwise, lastNode points to the last node
```

### Limited Traversal

Sometimes we only need to visit a subset of nodes:

```csharp
// Print only the first 3 nodes (or fewer if list is shorter)
LinkedListNode<int> current = myList.First;
int count = 0;
int limit = 3;

// Pre-condition: myList may be empty, limit > 0

while (current != null && count < limit)
{
    Console.WriteLine(current.Value);
    current = current.Next;
    count++;
}

// Post-condition: Up to 'limit' nodes have been processed
```

### Two-Pointer Technique

A powerful approach uses two pointers moving at different speeds:

```csharp
// Find the middle node using the "tortoise and hare" approach
LinkedListNode<int> slow = myList.First; // Tortoise - moves one step at a time
LinkedListNode<int> fast = myList.First; // Hare - moves two steps at a time

// Pre-condition: myList may be empty

// Continue until fast reaches the end
while (fast != null && fast.Next != null)
{
    slow = slow.Next;          // Move one step
    fast = fast.Next.Next;     // Move two steps
}

// Post-condition:
// - If list has odd length, slow points to the middle node
// - If list has even length, slow points to the second middle node

if (slow != null)
{
    Console.WriteLine($"Middle node value: {slow.Value}");
}
```

> [!warning] Common Mistakes
>
> - Forgetting to update the `current` pointer in each loop iteration
> - Not checking for null before accessing node properties
> - Losing the reference to the head of the list

> [!example] Practice: Building and Traversing
>
> **Exercise 1:** Create a linked list containing the values [5, 10, 15, 20, 25] and print all values.
>
> **Exercise 2:** Write code to count the number of even values in a linked list.
>
> **Exercise 3:** Find the last node in a linked list and print its value.

## 4.3 Finding and Processing Data in Lists

Now that we can traverse lists, let's explore how to find specific information and extract meaningful insights.

### Finding a Node by Position

To find the node at a specific position:

```csharp
// Find the node at a specific position (0-based indexing)
int targetPosition = 2; // Looking for the 3rd node (index 2)
LinkedListNode<int> current = myList.First;
int currentPosition = 0;

// Pre-condition: myList may be empty, targetPosition >= 0

while (current != null && currentPosition < targetPosition)
{
    current = current.Next;
    currentPosition++;
}

// Post-condition:
// - If current is null, the list doesn't have enough nodes
// - Otherwise, current points to the node at the target position

if (current != null)
{
    Console.WriteLine($"Node at position {targetPosition}: {current.Value}");
}
else
{
    Console.WriteLine($"Position {targetPosition} not found in the list");
}
```

### Finding a Node by Value

To find a node with a specific value:

```csharp
// Find the first node with a specific value
int targetValue = 20;
LinkedListNode<int> current = myList.First;
bool found = false;

// Pre-condition: myList may be empty

while (current != null && !found)
{
    if (current.Value == targetValue)
    {
        found = true;
    }
    else
    {
        current = current.Next;
    }
}

// Post-condition:
// - If found is true, current points to the first node with the target value
// - Otherwise, current is null (meaning the value wasn't found)

if (found)
{
    Console.WriteLine($"Found value {targetValue}");
}
else
{
    Console.WriteLine($"Value {targetValue} not found");
}
```

Let's trace this search for value 20 in our list [30, 20, 10, 40]:

|Iteration|current|current.Value|Comparison|found|Action|
|---|---|---|---|---|---|
|Start|Node(30)|30|30 ≠ 20|false|Move to next|
|After 1|Node(20)|20|20 = 20|true|Exit loop|

### Finding the Position of a Value

To find the position of a specific value:

```csharp
// Find the position of the first occurrence of a value
int targetValue = 20;
LinkedListNode<int> current = myList.First;
int position = 0;
int foundAt = -1; // -1 indicates not found

// Pre-condition: myList may be empty

while (current != null)
{
    if (current.Value == targetValue)
    {
        foundAt = position;
        break;
    }
    current = current.Next;
    position++;
}

// Post-condition:
// - If foundAt is -1, the value wasn't found
// - Otherwise, foundAt contains the position of the value

if (foundAt != -1)
{
    Console.WriteLine($"Value {targetValue} found at position {foundAt}");
}
else
{
    Console.WriteLine($"Value {targetValue} not found");
}
```

### Calculating the Sum

Let's calculate the sum of all values in a list:

```csharp
// Calculate the sum of all values
LinkedListNode<int> current = myList.First;
int sum = 0;

// Pre-condition: myList may be empty

while (current != null)
{
    sum += current.Value;
    current = current.Next;
}

// Post-condition: sum contains the total of all values
Console.WriteLine($"Sum of all values: {sum}");
```

### Finding Minimum and Maximum Values

To find the minimum and maximum values:

```csharp
// Find minimum and maximum values
LinkedListNode<int> current = myList.First;
int min = int.MaxValue;
int max = int.MinValue;

// Pre-condition: myList may be empty

if (current != null) // Check if list is not empty
{
    min = max = current.Value; // Initialize with first value
    current = current.Next;    // Move to second node

    while (current != null)
    {
        if (current.Value < min)
        {
            min = current.Value;
        }
        if (current.Value > max)
        {
            max = current.Value;
        }
        current = current.Next;
    }

    Console.WriteLine($"Minimum value: {min}");
    Console.WriteLine($"Maximum value: {max}");
}
else
{
    Console.WriteLine("List is empty");
}
```

### Counting Specific Values

To count nodes that match a specific condition:

```csharp
// Count even numbers in the list
LinkedListNode<int> current = myList.First;
int countEvens = 0;

// Pre-condition: myList may be empty

while (current != null)
{
    if (current.Value % 2 == 0) // Check for even number
    {
        countEvens++;
    }
    current = current.Next;
}

// Post-condition: countEvens contains the count of even values
Console.WriteLine($"Number of even values: {countEvens}");
```

### Checking if All Values Meet a Condition

To check if all values in the list satisfy a condition:

```csharp
// Check if all values are positive
LinkedListNode<int> current = myList.First;
bool allPositive = true;

// Pre-condition: myList may be empty

while (current != null && allPositive)
{
    if (current.Value <= 0)
    {
        allPositive = false;
    }
    current = current.Next;
}

// Post-condition: allPositive is true only if all values are > 0
Console.WriteLine($"All values are positive: {allPositive}");
```

### Checking if Any Value Meets a Condition

To check if at least one value satisfies a condition:

```csharp
// Check if any value is negative
LinkedListNode<int> current = myList.First;
bool anyNegative = false;

// Pre-condition: myList may be empty

while (current != null && !anyNegative)
{
    if (current.Value < 0)
    {
        anyNegative = true;
    }
    current = current.Next;
}

// Post-condition: anyNegative is true if at least one value is < 0
Console.WriteLine($"List contains negative values: {anyNegative}");
```

> [!important] Short-circuit Traversal In the last two examples, we stop traversing as soon as we know the answer:
>
> - For "all positive", we can stop when we find a non-positive value
> - For "any negative", we can stop when we find a negative value
>
> This pattern is called "short-circuit evaluation" and improves efficiency.

> [!example] Practice: Finding and Processing
>
> **Exercise 1:** Find the position of the first occurrence of the value 15 in a linked list.
>
> **Exercise 2:** Calculate the average value of all nodes in a linked list of integers.
>
> **Exercise 3:** Write code to determine if a linked list is sorted in ascending order.

## 4.4 Modifying Lists

Now let's examine how to modify lists by adding, removing, or changing nodes.

### Adding at the Beginning

Our `LinkedList` class already has an `AddFirst` method:

```csharp
// Using the built-in AddFirst method
LinkedListNode<int> newNode = new LinkedListNode<int>(5);
myList.AddFirst(newNode);

// Or directly with a value:
LinkedListNode<int> anotherNode = new LinkedListNode<int>(8);
myList.AddFirst(anotherNode);
```

### Adding at the End

To add a node at the end of the list:

```csharp
// Add a node to the end of the list
LinkedListNode<int> newNode = new LinkedListNode<int>(50);

// Pre-condition: myList may be empty

// Special case: empty list
if (myList.First == null)
{
    myList.First = newNode;
}
else
{
    // Find the last node
    LinkedListNode<int> current = myList.First;
    while (current.Next != null)
    {
        current = current.Next;
    }

    // Add the new node
    current.Next = newNode;
}

// Post-condition: newNode is the last node in the list
```

### Inserting After a Position

To insert a node after a specific position:

```csharp
// Insert a node after a specific position (0-based)
int position = 1; // Insert after the second node (index 1)
int newValue = 25;
LinkedListNode<int> newNode = new LinkedListNode<int>(newValue);

// Pre-condition: myList may be empty, position >= 0

// Special case: inserting after the head in an empty list
if (position == 0 && myList.First == null)
{
    myList.First = newNode;
}
else
{
    // Find the node at the target position
    LinkedListNode<int> current = myList.First;
    int currentPosition = 0;

    while (current != null && currentPosition < position)
    {
        current = current.Next;
        currentPosition++;
    }

    // If we found the position, insert the new node
    if (current != null)
    {
        newNode.Next = current.Next;
        current.Next = newNode;
        Console.WriteLine($"Inserted {newValue} after position {position}");
    }
    else
    {
        Console.WriteLine($"Position {position} not found");
    }
}

// Post-condition: If position exists, newNode is inserted after it
```

Visually, inserting 25 after position 1 in the list [30, 20, 10, 40]:

Before:

```
┌────┐    ┌────┐    ┌────┐    ┌────┐
│ 30 │───>│ 20 │───>│ 10 │───>│ 40 │───> null
└────┘    └────┘    └────┘    └────┘
 First     pos 1
```

After:

```
┌────┐    ┌────┐    ┌────┐    ┌────┐    ┌────┐
│ 30 │───>│ 20 │───>│ 25 │───>│ 10 │───>│ 40 │───> null
└────┘    └────┘    └────┘    └────┘    └────┘
 First     pos 1    new
```

> [!important] Insertion Order When inserting a new node, always:
>
> 1. Set the new node's Next reference first
> 2. Then update the previous node's Next to point to the new node
>
> Reversing this order would break the list by losing references to subsequent nodes.

### Removing the First Node

To remove the first node:

```csharp
// Remove the first node
if (myList.First != null)
{
    // Save the value (if needed)
    int removedValue = myList.First.Value;

    // Update the head to point to the second node
    myList.First = myList.First.Next;

    Console.WriteLine($"Removed first node with value {removedValue}");
}
else
{
    Console.WriteLine("Cannot remove from empty list");
}
```

### Removing a Node with a Specific Value

To remove the first occurrence of a specific value:

```csharp
// Remove the first node with a specific value
int valueToRemove = 20;
bool removed = false;

// Pre-condition: myList may be empty

// Special case: empty list
if (myList.First == null)
{
    Console.WriteLine("List is empty");
}
// Special case: first node has the target value
else if (myList.First.Value == valueToRemove)
{
    myList.First = myList.First.Next;
    removed = true;
}
else
{
    // General case: find the node before the one to remove
    LinkedListNode<int> current = myList.First;
    while (current.Next != null && current.Next.Value != valueToRemove)
    {
        current = current.Next;
    }

    // If we found the value, remove it
    if (current.Next != null)
    {
        current.Next = current.Next.Next;
        removed = true;
    }
}

// Post-condition: if the value existed, the first node with that value is removed
Console.WriteLine(removed ?
    $"Removed node with value {valueToRemove}" :
    $"Value {valueToRemove} not found");
```

### Removing the Last Node

To remove the last node:

```csharp
// Remove the last node
bool removed = false;

// Pre-condition: myList may be empty

// Special case: empty list
if (myList.First == null)
{
    Console.WriteLine("List is empty");
}
// Special case: only one node
else if (myList.First.Next == null)
{
    Console.WriteLine($"Removed only node with value {myList.First.Value}");
    myList.First = null;
    removed = true;
}
else
{
    // Find the second-to-last node
    LinkedListNode<int> current = myList.First;
    while (current.Next.Next != null)
    {
        current = current.Next;
    }

    // Save the value of the last node
    int removedValue = current.Next.Value;

    // Remove the last node
    current.Next = null;
    Console.WriteLine($"Removed last node with value {removedValue}");
    removed = true;
}

// Post-condition: the last node has been removed
```

### Modifying Values In-Place

To update all values in a list:

```csharp
// Double all values in the list
LinkedListNode<int> current = myList.First;

// Pre-condition: myList may be empty

while (current != null)
{
    current.Value = current.Value * 2; // Double the value
    current = current.Next;
}

// Post-condition: all values have been doubled
```

### Creating a Copy of a List

To create a copy of a linked list:

```csharp
// Create a copy of the linked list
LinkedList<int> copyList = new LinkedList<int>();
LinkedListNode<int> lastInCopy = null;

// Pre-condition: myList may be empty

// Handle empty list case
if (myList.First != null)
{
    // Copy the first node
    LinkedListNode<int> firstCopy = new LinkedListNode<int>(myList.First.Value);
    copyList.First = firstCopy;
    lastInCopy = firstCopy;

    // Copy remaining nodes
    LinkedListNode<int> current = myList.First.Next;
    while (current != null)
    {
        LinkedListNode<int> newNode = new LinkedListNode<int>(current.Value);
        lastInCopy.Next = newNode;
        lastInCopy = newNode;
        current = current.Next;
    }
}

// Post-condition: copyList contains a copy of myList
```

> [!example] Practice: Modifying Lists
>
> **Exercise 1:** Write code to remove all even numbers from a linked list.
>
> **Exercise 2:** Insert a node with value 100 after every node that contains a negative value.
>
> **Exercise 3:** Create a new linked list that contains only the odd-indexed elements from an existing list (elements at positions 1, 3, 5, etc.).

## 4.5 Essential Linked List Techniques

Let's explore some powerful techniques that solve common linked list problems.

### Detecting Cycles

A cycle exists when a node's Next reference points back to an earlier node. We can detect cycles using Floyd's "tortoise and hare" algorithm:

```csharp
// Detect if a linked list has a cycle
bool hasCycle = false;

// Pre-condition: myList may be empty

if (myList.First != null)
{
    LinkedListNode<int> slow = myList.First;  // Moves one step at a time
    LinkedListNode<int> fast = myList.First;  // Moves two steps at a time

    // As long as fast pointer can move forward
    while (fast != null && fast.Next != null)
    {
        slow = slow.Next;         // Move one step
        fast = fast.Next.Next;    // Move two steps

        // If they meet, we've found a cycle
        if (slow == fast)
        {
            hasCycle = true;
            break;
        }
    }
}

// Post-condition: hasCycle is true if and only if the list contains a cycle
Console.WriteLine($"List contains a cycle: {hasCycle}");
```

### Finding the Middle Node

Using the "tortoise and hare" technique to find the middle node efficiently:

```csharp
// Find the middle node of a linked list
LinkedListNode<int> middleNode = null;

// Pre-condition: myList may be empty

if (myList.First != null)
{
    LinkedListNode<int> slow = myList.First;
    LinkedListNode<int> fast = myList.First;

    // As long as fast pointer can move forward
    while (fast != null && fast.Next != null)
    {
        slow = slow.Next;         // Move one step
        fast = fast.Next.Next;    // Move two steps
    }

    middleNode = slow;
}

// Post-condition: middleNode points to the middle node of the list
if (middleNode != null)
{
    Console.WriteLine($"Middle node value: {middleNode.Value}");
}
else
{
    Console.WriteLine("List is empty");
}
```

Let's trace this on the list [10, 20, 30, 40, 50]:

|Iteration|slow|fast|Action|
|---|---|---|---|
|Start|Node(10)|Node(10)|Initialize pointers|
|After 1|Node(20)|Node(30)|Both move (slow +1, fast +2)|
|After 2|Node(30)|Node(50)|Both move (slow +1, fast +2)|
|After 3|Node(40)|null|fast can't move, exit loop|
|Final|Node(30)|-|slow is at the middle node|

### Finding the Kth Node from the End

Using the two-pointer technique with a fixed distance gap:

```csharp
// Find the kth node from the end
int k = 2; // Find the 2nd node from the end
LinkedListNode<int> kthFromEnd = null;

// Pre-condition: myList may be empty, k > 0

if (myList.First != null && k > 0)
{
    LinkedListNode<int> ahead = myList.First;
    LinkedListNode<int> behind = myList.First;

    // Move ahead pointer k nodes forward
    for (int i = 0; i < k; i++)
    {
        if (ahead.Next == null)
        {
            // k is larger than the list size
            Console.WriteLine($"List has fewer than {k} nodes");
            break;
        }
        ahead = ahead.Next;
    }

    // If ahead successfully moved k nodes forward
    if (ahead != null)
    {
        // Move both pointers until ahead reaches the end
        while (ahead.Next != null)
        {
            ahead = ahead.Next;
            behind = behind.Next;
        }

        kthFromEnd = behind;
    }
}

// Post-condition: kthFromEnd points to the kth node from the end
if (kthFromEnd != null)
{
    Console.WriteLine($"{k}th node from end value: {kthFromEnd.Value}");
}
```

### Reversing a Linked List In-Place

Reversing a linked list without creating a new list:

```csharp
// Reverse a linked list in-place
if (myList.First == null || myList.First.Next == null)
{
    // Empty list or single node - already reversed
    Console.WriteLine("List unchanged (empty or single node)");
}
else
{
    LinkedListNode<int> previous = null;
    LinkedListNode<int> current = myList.First;
    LinkedListNode<int> next = null;

    while (current != null)
    {
        // Save the next node
        next = current.Next;

        // Reverse the current node's pointer
        current.Next = previous;

        // Move pointers one position ahead
        previous = current;
        current = next;
    }

    // Update head to point to the new front
    myList.First = previous;

    Console.WriteLine("List has been reversed");
}
```

Let's visualize the reversal of [10, 20, 30]:

Initial state:

```
┌────┐    ┌────┐    ┌────┐
│ 10 │───>│ 20 │───>│ 30 │───> null
└────┘    └────┘    └────┘
 First
```

Steps:

1. Initialize: previous = null, current = Node(10), next = null

2. First iteration:

    - Save next = Node(20)
    - Set current.Next = previous (null)
    - Update previous = Node(10)
    - Update current = Node(20)
3. Second iteration:

    - Save next = Node(30)
    - Set current.Next = previous (Node(10))
    - Update previous = Node(20)
    - Update current = Node(30)
4. Third iteration:

    - Save next = null
    - Set current.Next = previous (Node(20))
    - Update previous = Node(30)
    - Update current = null
5. Update First = previous (Node(30))


Final state:

```
┌────┐    ┌────┐    ┌────┐
│ 30 │───>│ 20 │───>│ 10 │───> null
└────┘    └────┘    └────┘
 First
```

> [!warning] Common Mistakes
>
> - Forgetting to update the First reference after operations that modify the head
> - Not carefully managing multiple pointers during operations like reversals
> - Losing the next reference when rearranging nodes

> [!example] Practice: Advanced Techniques
>
> **Exercise 1:** Determine if a linked list is a palindrome (reads the same forward and backward).
>
> **Exercise 2:** Remove duplicates from a linked list of integers.
>
> **Exercise 3:** Write code to merge two sorted linked lists into a single sorted linked list.

## 4.6 Practical Comparison with Arrays

Now that we understand both arrays and linked lists, let's compare them to help you choose the right structure for different scenarios.

### Performance Comparison

|Operation|Arrays|Linked Lists|When to prefer|
|---|---|---|---|
|Access by Index|Instant|Requires traversal|Arrays for random access|
|Insert at Beginning|Requires shifting all elements|Only updates references|Linked lists for frequent beginning insertions|
|Insert at End|Fast if space available|Requires traversal|Arrays if size is stable|
|Delete from Beginning|Requires shifting all elements|Only updates references|Linked lists for frequent beginning deletions|
|Delete from End|Fast|Requires finding second-to-last node|Arrays if size is stable|
|Memory Usage|Fixed block, efficient|Node overhead|Arrays for memory efficiency|
|Size Flexibility|Fixed at creation|Grows and shrinks dynamically|Linked lists for unpredictable size|

### When to Choose Arrays

Arrays are better when:

- You need frequent random access by index
- The collection size is known and stable
- Memory efficiency is important
- You primarily add/remove from the end

### When to Choose Linked Lists

Linked lists are better when:

- You frequently insert/remove at the beginning
- The collection size changes unpredictably
- You need to avoid resizing penalties
- You want to minimize data movement during modifications

### Real-World Scenarios

For each scenario, consider which structure would be more appropriate:

1. **Student Roster**: A fixed list of students in a class with stable size → Array (random access needed, stable size)

2. **Browser History**: A record of visited pages where new pages are added at the end and you mostly go back one page at a time → Linked List (frequent insertions at end, deletions from front)

3. **Shopping Cart**: Items frequently added and removed, with occasional rearrangement → Linked List (dynamic size, frequent modifications)

4. **Appointment Calendar**: Fixed number of days with random access needs → Array (random access by date, stable size)


> [!example] Practice: Making the Right Choice
>
> For each scenario, decide whether an array or linked list would be more appropriate:
>
> 1. A music playlist that needs frequent reordering
> 2. A list of high scores in a game, sorted by score
> 3. A log of user actions where new actions are constantly added
> 4. A grid of values representing a game board

## Summary

In this chapter, we explored linked lists as a dynamic alternative to arrays. We learned:

- Linked lists store elements in scattered nodes connected by references
- They provide efficient insertions and deletions at the beginning
- They require sequential access rather than random access
- They grow and shrink dynamically without resizing penalties

We covered essential operations:

- Building and traversing linked lists
- Finding and processing data
- Modifying lists with insertions and deletions
- Advanced techniques like cycle detection and reversals

Finally, we compared linked lists with arrays to help you make the right choice for your specific needs.

## Looking Ahead: Working with Methods

You may have noticed that the code in this chapter was often repetitive. We frequently wrote similar traversal patterns, search operations, and modification sequences. This repetition isn't just tiresome—it's also error-prone and makes our programs harder to understand.

In the next chapter, we'll learn how to define and use [[Chapter 5 - Classes, Methods, and Object|methods]] to encapsulate these operations. Methods will allow us to:

- Package common linked list operations into reusable units
- Give meaningful names to complex operations
- Hide implementation details behind simple interfaces
- Reduce code duplication and increase reliability
- Make our linked list operations more portable

For example, instead of writing the traversal pattern over and over, we'll define a single `Traverse` method that we can call whenever needed. This will make our code cleaner, more maintainable, and easier to understand.

The linked list operations you've learned in this chapter will serve as excellent examples for understanding how methods work and why they're so valuable in programming.