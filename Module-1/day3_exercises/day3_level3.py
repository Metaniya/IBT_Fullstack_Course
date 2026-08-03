#  file Reading writing
students = {
    "Abebe": 85,
    "Kebede": 70,
    "Sara": 90,
    "Mimi": 60,
    "Tigist": 95
}

file = open("students.txt", "w")
for name, score in students.items():
    file.write(f"{name},{score}\n")
file.close()

try:
    file = open("students.txt", "r")
    lines = file.readlines()
    file.close()

    total = 0
    count = 0
    for line in lines:
        name, score = line.strip().split(",")
        total = total + int(score)
        count = count + 1

    average = total / count
    print(f"Average score: {average}")

except FileNotFoundError:
    print("students.txt file does not exist.")

print("--------------------------------------------------")

# error Handling
try:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    result = num1 / num2
    print(f"Result: {result}")

except ValueError:
    print("Please enter valid numbers only.")

except ZeroDivisionError:
    print("You cannot divide by zero.")

finally:
    print("Calculation attempt completed")
