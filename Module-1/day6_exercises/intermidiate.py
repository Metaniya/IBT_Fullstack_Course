# Day 6 Intermediate Exercises - SOLID Principles

# 1. Apply SRP + DIP
# Account only does account logic. Persistence and notification are separate,
# and are passed in from outside (dependency injection) instead of created inside.
class AccountRepository:
    def save(self, account):
        print(f"Account {account.owner} saved to database.")

class NotificationService:
    def notify(self, message):
        print(f"Notification: {message}")

class Account:
    def __init__(self, owner, balance, repository, notifier):
        self.owner = owner
        self.balance = balance
        self.repository = repository
        self.notifier = notifier

    def deposit(self, amount):
        self.balance = self.balance + amount
        self.repository.save(self)

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds.")
        else:
            self.balance = self.balance - amount
            self.repository.save(self)
            self.notifier.notify(f"{self.owner} withdrew {amount}")

repo = AccountRepository()
notifier = NotificationService()
account = Account("Abebe", 1000, repo, notifier)
account.withdraw(200)

print("--------------------------------------------------")

# 2. Factory Pattern
class SavingsAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.interest_rate = 0.05

class CurrentAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.overdraft_limit = 500

class FixedDepositAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.term_months = 12

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "fixed":
            return FixedDepositAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type")

new_account = AccountFactory.create("savings", "Sara", "ACC001", 2000)
print(f"Created {type(new_account).__name__} for {new_account.owner}")

print("--------------------------------------------------")

# 3. Observer Pattern
class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")

class AuditLog:
    def update(self, message):
        print(f"Audit Log: {message}")

class ObservableAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
        self.observers = []

    def add_observer(self, observer):
        self.observers.append(observer)

    def notify_observers(self, message):
        for observer in self.observers:
            observer.update(message)

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds.")
        else:
            self.balance = self.balance - amount
            print(f"Withdrew {amount}. New balance: {self.balance}")
            if amount > 3000:
                self.notify_observers(f"Large withdrawal of {amount} by {self.owner}")

obs_account = ObservableAccount("Kebede", 10000)
obs_account.add_observer(SMSAlert())
obs_account.add_observer(AuditLog())
obs_account.withdraw(5000)

print("--------------------------------------------------")

# 4. Interface Segregation Principle (ISP)
from abc import ABC, abstractmethod

class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self):
        pass

class SavingsAccountISP(InterestBearing):
    def __init__(self, owner, balance, interest_rate):
        self.owner = owner
        self.balance = balance
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

# CurrentAccount does NOT implement InterestBearing since it has no interest
class CurrentAccountISP:
    def __init__(self, owner, balance, overdraft_limit):
        self.owner = owner
        self.balance = balance
        self.overdraft_limit = overdraft_limit

savings_isp = SavingsAccountISP("Mimi", 5000, 0.06)
print(f"Interest: {savings_isp.calculate_interest()}")

current_isp = CurrentAccountISP("Tigist", 3000, 1000)
print(f"{current_isp.owner} has no interest method, and that's fine.")
