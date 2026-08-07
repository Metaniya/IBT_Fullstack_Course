# Day 5 Level 2

from abc import ABC, abstractmethod

# 6. Abstract Base Class
class Account(ABC):
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

    @abstractmethod
    def calculate_interest(self):
        pass


# 4. Method Overriding - SavingsAccount
class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self._balance * self.interest_rate

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self._balance}, Interest Rate: {self.interest_rate}")


# 4. Method Overriding - CurrentAccount
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

    def calculate_interest(self):
        return 0

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self._balance}, Overdraft Limit: {self.overdraft_limit}")


print("--------------------------------------------------")

# 5. Polymorphism Practice
savings = SavingsAccount("Abebe", 1000, 0.1)
current = CurrentAccount("Sara", 500, 1000)

accounts = [savings, current]

for acc in accounts:
    acc.statement()
    acc.deposit(100)
    acc.statement()
    print()
