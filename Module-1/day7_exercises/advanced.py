# Day 7 Advanced Exercises

import time
from collections import deque

# 9. Performance Comparison

# Search in list vs search in dictionary
numbers_list = list(range(100000))
numbers_dict = {n: True for n in range(100000)}

start = time.time()
99999 in numbers_list
end = time.time()
print(f"List search time: {end - start}")

start = time.time()
99999 in numbers_dict
end = time.time()
print(f"Dictionary search time: {end - start}")

print("--------------------------------------------------")

# Insert 10,000 elements at the beginning of a list vs deque
my_list = []
start = time.time()
for i in range(10000):
    my_list.insert(0, i)
end = time.time()
print(f"List insert at beginning time: {end - start}")

my_deque = deque()
start = time.time()
for i in range(10000):
    my_deque.appendleft(i)
end = time.time()
print(f"Deque insert at beginning time: {end - start}")

print("--------------------------------------------------")

# 10. Choose the Right Structure

# Checking if a username is already taken -> use a Set or Dictionary
# Lookup is O(1) average, much faster than searching a list which is O(n)
print("Username check: Set or Dictionary - O(1) lookup")

# Processing tasks in the order they arrive (customer support) -> use a Queue
# FIFO order matches "first come, first served", enqueue/dequeue are O(1)
print("Customer support tasks: Queue - O(1) enqueue/dequeue")

# Implementing "Undo" feature in a text editor -> use a Stack
# Last action done should be the first one undone, LIFO order, O(1) push/pop
print("Undo feature: Stack - O(1) push/pop")

# Storing student IDs for fast lookup -> use a Dictionary or Set
# O(1) average lookup time by key
print("Student ID lookup: Dictionary or Set - O(1) lookup")

print("--------------------------------------------------")

# 11. Linked List vs Array - remove middle element

def remove_middle_list(items):
    middle_index = len(items) // 2
    items.pop(middle_index)
    return items

my_list = [1, 2, 3, 4, 5]
print(remove_middle_list(my_list))
# Removing the middle element from a list is O(n) because
# everything after the removed item has to shift left.


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

    def remove_middle(self):
        length = 0
        current = self.head
        while current is not None:
            length = length + 1
            current = current.next

        middle_index = length // 2

        if middle_index == 0:
            self.head = self.head.next
            return

        current = self.head
        for _ in range(middle_index - 1):
            current = current.next
        current.next = current.next.next

    def print_list(self):
        current = self.head
        result = []
        while current is not None:
            result.append(str(current.value))
            current = current.next
        print(" -> ".join(result))

linked_list = LinkedList()
for value in [1, 2, 3, 4, 5]:
    linked_list.append(value)

linked_list.remove_middle()
linked_list.print_list()

# Trade-off: finding the middle in a linked list still takes O(n) since we
# must walk through nodes, but once we know the position, removing it is O(1)
# because we just change a pointer, unlike a list which must shift elements.
