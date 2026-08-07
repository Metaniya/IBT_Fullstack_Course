# Day 5 Level 1

# 1. Simple Inheritance
class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(f"{self.year} {self.name} {self.model}")

class Car(Vehicle):
    def __init__(self, name, model, year, doors):
        super().__init__(name, model, year)
        self.doors = doors

    def open_trunk(self):
        print(f"{self.name} trunk is open.")

class Motorcycle(Vehicle):
    def __init__(self, name, model, year, has_sidecar):
        super().__init__(name, model, year)
        self.has_sidecar = has_sidecar

    def wheelie(self):
        print(f"{self.name} does a wheelie!")

car = Car("Toyota", "Corolla", 2022, 4)
car.info()
car.open_trunk()

moto = Motorcycle("Yamaha", "R15", 2021, False)
moto.info()
moto.wheelie()

print("--------------------------------------------------")

# Base Account class (from Day 4)
class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
        else:
            self._balance = self._balance + amount
            print(f"Deposited {amount}. New balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance = self._balance - amount
            print(f"Withdrew {amount}. New balance: {self._balance}")

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self._balance}")


# 2. SavingsAccount Inheritance
class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate
        self.deposit(interest)

savings = SavingsAccount("Abebe", 1000, 0.1)
savings.add_interest()
savings.statement()

print("--------------------------------------------------")

# 3. CurrentAccount Inheritance
class CurrentAccount(Account):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance + self.overdraft_limit:
            print("Withdrawal exceeds overdraft limit.")
        else:
            self._balance = self._balance - amount
            print(f"Withdrew {amount}. New balance: {self._balance}")

current = CurrentAccount("Sara", 500, 1000)
current.withdraw(1200)
current.statement()
