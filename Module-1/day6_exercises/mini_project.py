# Day 6 Mini Project - Clean Addis Bank System

from abc import ABC, abstractmethod

# Singleton - manages bank-wide rules
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 500
        return cls._instance


# Observers - notified on large transactions
class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")

class AuditLog:
    def update(self, message):
        print(f"Audit Log: {message}")

class NotificationCenter:
    def __init__(self):
        self.observers = [SMSAlert(), AuditLog()]

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)


# Repository - handles persistence separately (SRP)
class AccountRepository:
    def save(self, account):
        print(f"Saving account {account.number} to database.")


# Account hierarchy (abstraction)
class Account(ABC):
    def __init__(self, owner, number, balance, repository, notifier):
        self.owner = owner
        self.number = number
        self._balance = balance
        self.repository = repository
        self.notifier = notifier

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance = self._balance + amount
        self.repository.save(self)
        print(f"Deposited {amount}. New balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance = self._balance - amount
            self.repository.save(self)
            print(f"Withdrew {amount}. New balance: {self._balance}")
            if amount > 3000:
                self.notifier.notify(f"Large withdrawal of {amount} by {self.owner}")

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print(f"Account: {self.number}, Owner: {self.owner}, Balance: {self._balance}")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance, repository, notifier, interest_rate):
        super().__init__(owner, number, balance, repository, notifier)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self._balance * self.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

    def statement(self):
        print(f"Savings Account: {self.number}, Owner: {self.owner}, "
              f"Balance: {self._balance}, Interest Rate: {self.interest_rate}")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance, repository, notifier, overdraft_limit):
        super().__init__(owner, number, balance, repository, notifier)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance + self.overdraft_limit:
            print("Withdrawal exceeds overdraft limit.")
        else:
            self._balance = self._balance - amount
            self.repository.save(self)
            print(f"Withdrew {amount}. New balance: {self._balance}")
            if amount > 3000:
                self.notifier.notify(f"Large withdrawal of {amount} by {self.owner}")

    def calculate_interest(self):
        return 0

    def statement(self):
        print(f"Current Account: {self.number}, Owner: {self.owner}, "
              f"Balance: {self._balance}, Overdraft Limit: {self.overdraft_limit}")


# Factory - creates the correct account type (OCP friendly)
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        config = BankConfig()
        if kind == "savings":
            return SavingsAccount(owner, number, balance, repository, notifier, config.interest_rate)
        elif kind == "current":
            return CurrentAccount(owner, number, balance, repository, notifier, config.overdraft_limit)
        else:
            raise ValueError("Unknown account type")


accounts = {}
repository = AccountRepository()
notifier = NotificationCenter()


def create_account():
    kind = input("Enter account type (savings/current): ").lower()
    number = input("Enter account number: ")
    owner = input("Enter owner name: ")
    balance = float(input("Enter starting balance: "))
    account = AccountFactory.create(kind, owner, number, balance, repository, notifier)
    accounts[number] = account
    print("Account created successfully.")

def deposit_money():
    number = input("Enter account number: ")
    if number in accounts:
        amount = float(input("Enter deposit amount: "))
        accounts[number].deposit(amount)
    else:
        print("Account not found.")

def withdraw_money():
    number = input("Enter account number: ")
    if number in accounts:
        amount = float(input("Enter withdraw amount: "))
        accounts[number].withdraw(amount)
    else:
        print("Account not found.")

def show_statement():
    number = input("Enter account number: ")
    if number in accounts:
        accounts[number].statement()
    else:
        print("Account not found.")

def apply_interest_to_all():
    for account in accounts.values():
        if isinstance(account, SavingsAccount):
            account.apply_interest()
    print("Interest applied to all savings accounts.")

def show_all_accounts():
    if len(accounts) == 0:
        print("No accounts yet.")
    else:
        for account in accounts.values():
            account.statement()


while True:
    print("\nClean Addis Bank System")
    print("1. Create account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Show statement")
    print("5. Apply interest to all savings accounts")
    print("6. Show all accounts")
    print("7. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            create_account()
        elif choice == "2":
            deposit_money()
        elif choice == "3":
            withdraw_money()
        elif choice == "4":
            show_statement()
        elif choice == "5":
            apply_interest_to_all()
        elif choice == "6":
            show_all_accounts()
        elif choice == "7":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError as e:
        print(f"Invalid input: {e}")
