# Day 7 Basic Exercises - Big-O & Linear Structures

# 1. Big-O Notation
# Accessing an element by index in a list: O(1)
# Searching for an element using "in": O(n)
# Inserting at the beginning of a list: O(n) - because everything shifts over
# Dictionary lookup by key: O(1) on average

print("Access by index: O(1)")
print("Search with 'in': O(n)")
print("Insert at beginning of list: O(n)")
print("Dictionary lookup: O(1) average")

print("--------------------------------------------------")

# 2. Compare Complexities
# From fastest to slowest for large n:
# O(1) -> O(log n) -> O(n) -> O(n^2)
print("Fastest to slowest: O(1), O(log n), O(n), O(n^2)")

print("--------------------------------------------------")

# 3. Arrays / Lists
students = ["Abebe", "Sara", "Kebede", "Mimi", "Tigist",
            "John", "Mary", "Dawit", "Hana", "Yonas"]

# Accessing by index - O(1)
print(f"Student at index 3: {students[3]}")

# Adding at the end - O(1)
students.append("Selam")
print(f"After append: {students}")

# Inserting at position 0 - O(n)
students.insert(0, "Bekele")
print(f"After insert at start: {students}")

print("--------------------------------------------------")

# 4. Hashmaps (Dictionaries)
student_grades = {
    "Abebe": "A",
    "Sara": "B",
    "Kebede": "A",
    "Mimi": "C",
    "Tigist": "B"
}

# Add a new student - O(1)
student_grades["Dawit"] = "A"
print(f"After adding a student: {student_grades}")

# Update a grade - O(1)
student_grades["Sara"] = "A"
print(f"After updating a grade: {student_grades}")

# Check if a student exists - O(1) average, fast lookup
if "Kebede" in student_grades:
    print("Kebede exists in the dictionary.")
else:
    print("Kebede not found.")
