

# lists & Tuples
foods = ["Pizza", "Burger", "Pasta", "Sushi", "Tacos", "Salad"]
print(f"First food: {foods[0]}")
print(f"Last food: {foods[-1]}")

foods.append("Ice Cream")
print(f"After adding: {foods}")

foods.pop(1)
print(f"After removing second item: {foods}")

coordinates = (9.03, 38.74)
latitude, longitude = coordinates
print(f"Latitude: {latitude}, Longitude: {longitude}")

print("--------------------------------------------")

# 2. Dictionaries
student = {
    "name": "John Doe",
    "age": 20,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science"
}

print(f"Name: {student['name']}")
print(f"Department: {student['department']}")
print(f"Grade: {student['grade']}")

student["phone"] = "0987654321"
student["grade"] = "A+"
print(student)

print("-----------------------------------------")

# 3. sets
names = ["Abebe", "Kebede", "Abebe", "Sara", "Kebede", "Mimi"]
unique_names = set(names)
print(f"Unique names: {unique_names}")

unique_names.add("Tigist")
print(f"After adding a name: {unique_names}")
