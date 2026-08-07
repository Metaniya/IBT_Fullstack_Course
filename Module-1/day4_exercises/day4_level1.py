

# simple Class - Person
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hi, my name is {self.name} and I am {self.age} years old.")

person1 = Person("Abebe", 25)
person2 = Person("Sara", 30)

person1.introduce()
person2.introduce()

print("-----------------------------------------")

# 2. Rectangle Class
class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

rect1 = Rectangle(10, 5)
rect2 = Rectangle(7, 3)

print(f"Rectangle 1 area: {rect1.area()}, perimeter: {rect1.perimeter()}")
print(f"Rectangle 2 area: {rect2.area()}, perimeter: {rect2.perimeter()}")

print("--------------------------------------------------")

#bank Account (Basic)
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount
        print(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds.")
        else:
            self.balance = self.balance - amount
            print(f"Withdrew {amount}. New balance: {self.balance}")

account = Account("Kebede", 1000)
account.deposit(500)
account.withdraw(300)
account.withdraw(5000)
