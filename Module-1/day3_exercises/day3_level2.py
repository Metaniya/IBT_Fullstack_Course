from utils import add_tax

#  List Operations
numbers = [10, 25, 40, 15, 60, 30]

print("Numbers greater than 30:")
for n in numbers:
    if n > 30:
        print(n)

numbers.sort()
print(f"Sorted list: {numbers}")

total = sum(numbers)
average = total / len(numbers)
print(f"Sum: {total}")
print(f"Average: {average}")

print("--------------------------------------------------")

# dictionary Operations
products = {
    "Laptop": 25000,
    "Phone": 12000,
    "Headphones": 800,
    "Keyboard": 500,
    "Mouse": 300
}

for product, price in products.items():
    print(f"{product}: {price} birr")

item = input("Enter a product name to check its price: ")
print(f"Price: {products.get(item, 'Product not found')}")

print("--------------------------------------------------")

# 6. List Comprehension
numbers_1_to_20 = [n for n in range(1, 21)]
print(numbers_1_to_20)

evens_1_to_30 = [n for n in range(1, 31) if n % 2 == 0]
print(evens_1_to_30)

odds_1_to_10 = [n for n in range(1, 11) if n % 2 != 0]
print(odds_1_to_10)

print("---------------------------------")

# modules & Import
price = 1000
price_with_tax = add_tax(price)
print(f"Price with tax: {price_with_tax}")
