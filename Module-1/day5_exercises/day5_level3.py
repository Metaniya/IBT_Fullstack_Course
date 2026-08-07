# Day 5 Level 3

from abc import ABC, abstractmethod

# 7. Full Account Hierarchy
class Account(ABC):
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

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.balance}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, owner, balance=0, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.balance}, Interest Rate: {self.interest_rate}")


class CurrentAccount(Account):
    def __init__(self, owner, balance=0, overdraft_limit=500):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self.balance + self.overdraft_limit:
            print("Withdrawal exceeds overdraft limit.")
        else:
            self.balance = self.balance - amount
            print(f"Withdrew {amount}. New balance: {self.balance}")

    def calculate_interest(self):
        return 0

    def statement(self):
        print(f"Owner: {self.owner}, Balance: {self.balance}, Overdraft Limit: {self.overdraft_limit}")


savings = SavingsAccount("Abebe", 1000, 0.1)
current = CurrentAccount("Sara", 500, 1000)

savings.deposit(200)
savings.statement()
print(f"Interest: {savings.calculate_interest()}")

print()

current.withdraw(1200)
current.statement()
