

# variables and datatypes
full_name = "Metaniya Shiferaw"
age = 20
height = 1.63
is_student = True
favorite_food = "Pizza"

print(f"Hi, my name is {full_name} and I am {age} years old.")
print(f"I am {height}m tall and my favorite food is {favorite_food}.")
print(f"Student status: {is_student}")

print("--------------------------------------------------")

# arithmetic operations
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print(f"Sum: {num1 + num2}")
print(f"Difference: {num1 - num2}")
print(f"Product: {num1 * num2}")
print(f"Division: {num1 / num2}")
print(f"Floor Division: {num1 // num2}")
print(f"Remainder: {num1 % num2}")

print("--------------------------------------------------")

# 3. type conversion
birth_year = int(input("Enter your birth year: "))
current_year = 2026
user_age = current_year - birth_year
print(f"You are {user_age} years old.")

print("--------------------------------------------------")

# 4. Simple decision
score = int(input("Enter your score (0-100): "))
if score >= 50:
    print("Pass")
else:
    print("Fail")
