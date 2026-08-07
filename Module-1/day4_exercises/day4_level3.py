

# full Bank Account with Properties
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            print("Balance cannot be negative.")
        else:
            self.__balance = value

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
        else:
            self.__balance = self.__balance + amount
            print(f"Deposited {amount}. New balance: {self.__balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance = self.__balance - amount
            print(f"Withdrew {amount}. New balance: {self.__balance}")

    def transfer(self, to_account, amount):
        if amount > self.__balance:
            print("Insufficient funds to transfer.")
        else:
            self.__balance = self.__balance - amount
            to_account.deposit(amount)
            print(f"Transferred {amount} to {to_account.owner}")

acc1 = BankAccount("Abebe", 1000)
acc2 = BankAccount("Sara", 500)

acc1.deposit(200)
acc1.withdraw(100)
acc1.transfer(acc2, 300)
print(f"{acc1.owner} balance: {acc1.balance}")
print(f"{acc2.owner} balance: {acc2.balance}")

print("------------------------------------------")

# library System
class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.available = True

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Book added: {book.title}")

    def borrow_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                if book.available:
                    book.available = False
                    print(f"You borrowed: {book.title}")
                else:
                    print("Book is not available.")
                return
        print("Book not found.")

    def return_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                book.available = True
                print(f"You returned: {book.title}")
                return
        print("Book not found.")

library = Library()
book1 = Book("Python Basics", "John Smith", "12345")
library.add_book(book1)
library.borrow_book("12345")
library.borrow_book("12345")
library.return_book("12345")

print("--------------------------------------------------")

# car Class with Encapsulation
class Car:
    def __init__(self):
        self.__speed = 0
        self.__fuel = 100

    @property
    def speed(self):
        return self.__speed

    @property
    def fuel(self):
        return self.__fuel

    def accelerate(self, amount):
        if self.__fuel <= 0:
            print("Not enough fuel to accelerate.")
        else:
            self.__speed = self.__speed + amount
            self.__fuel = self.__fuel - 5
            print(f"Speed: {self.__speed}, Fuel: {self.__fuel}")

    def brake(self, amount):
        self.__speed = self.__speed - amount
        if self.__speed < 0:
            self.__speed = 0
        print(f"Speed: {self.__speed}")

    def refuel(self, amount):
        self.__fuel = self.__fuel + amount
        print(f"Fuel: {self.__fuel}")

car = Car()
car.accelerate(20)
car.brake(5)
car.refuel(10)
