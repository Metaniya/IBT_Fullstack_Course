

# 5. grade classifier
score = int(input("Enter your score: "))

if score >= 90:
    print("Excellent")
elif score >= 80:
    print("Very Good")
elif score >= 70:
    print("Good")
elif score >= 50:
    print("Pass")
else:
    print("Fail")

print("--------------------------------------------------")

# 6. number pattern
print("Numbers 1 to 20:")
for i in range(1, 21):
    print(i)

print("Odd numbers:")
for i in range(1, 21):
    if i % 2 != 0:
        print(i)

print("Numbers divisible by 5:")
for i in range(1, 21):
    if i % 5 == 0:
        print(i)

print("--------------------------------------------------")

# 7. while loop practice
total = 0
while True:
    num = int(input("Enter a positive number (0 to stop): "))
    if num == 0:
        break
    total = total + num

print(f"Total sum: {total}")

print("--------------------------------------------------")

# 8. function practice
def greet(name):
    print(f"Welcome {name}!")

def square(number):
    return number * number

def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False

greet("janu")
print(square(5))
print(is_even(4))
print(is_even(7))
