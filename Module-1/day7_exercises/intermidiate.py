# Day 7 Intermediate Exercises - Linked List, Stack, Queue

# 5. Big-O Analysis

# Finds the maximum number in a list - O(n) because it checks every element once
def find_max(numbers):
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num

print(find_max([4, 9, 2, 7, 1]))

# Two nested loops - O(n^2) because for every element we loop through the list again
def find_pairs(numbers):
    pairs = []
    for i in numbers:
        for j in numbers:
            if i != j:
                pairs.append((i, j))
    return pairs

print(find_pairs([1, 2, 3]))

print("--------------------------------------------------")

# 6. Linked List Basics
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def print_list(self):
        current = self.head
        result = []
        while current is not None:
            result.append(str(current.value))
            current = current.next
        print(" -> ".join(result))

linked_list = LinkedList()
linked_list.append(10)
linked_list.append(20)
linked_list.append(30)
linked_list.print_list()

print("--------------------------------------------------")

# 7. Stack (LIFO)
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if len(self.items) == 0:
            return None
        return self.items.pop()

    def peek(self):
        if len(self.items) == 0:
            return None
        return self.items[-1]

def reverse_string(text):
    stack = Stack()
    for letter in text:
        stack.push(letter)

    reversed_text = ""
    while stack.peek() is not None:
        reversed_text = reversed_text + stack.pop()

    return reversed_text

print(reverse_string("Addis Ababa"))

print("--------------------------------------------------")

# 8. Queue (FIFO)
class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if len(self.items) == 0:
            return None
        return self.items.pop(0)

bank_queue = Queue()
bank_queue.enqueue("Customer 1")
bank_queue.enqueue("Customer 2")
bank_queue.enqueue("Customer 3")

print(f"Now serving: {bank_queue.dequeue()}")
print(f"Now serving: {bank_queue.dequeue()}")
print(f"Now serving: {bank_queue.dequeue()}")
