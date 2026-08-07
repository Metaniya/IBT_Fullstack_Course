# Day 5 Mini Project - Addis Bank System Version 2

from abc import ABC, abstractmethod

class Account(ABC):
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
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
        print(f"Account: {self.account_number}, Owner: {self.owner}, Balance: {self.balance}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, account_number, owner, balance=0, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

    def statement(self):
        print(f"Savings Account: {self.account_number}, Owner: {self.owner}, "
              f"Balance: {self.balance}, Interest Rate: {self.interest_rate}")


class CurrentAccount(Account):
    def __init__(self, account_number, owner, balance=0, overdraft_limit=500):
        super().__init__(account_number, owner, balance)
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
        print(f"Current Account: {self.account_number}, Owner: {self.owner}, "
              f"Balance: {self.balance}, Overdraft Limit: {self.overdraft_limit}")


# Bonus: FixedDepositAccount inherits from SavingsAccount
class FixedDepositAccount(SavingsAccount):
    def __init__(self, account_number, owner, balance=0, interest_rate=0.08, term_months=12):
        super().__init__(account_number, owner, balance, interest_rate)
        self.term_months = term_months

    def statement(self):
        print(f"Fixed Deposit Account: {self.account_number}, Owner: {self.owner}, "
              f"Balance: {self.balance}, Interest Rate: {self.interest_rate}, "
              f"Term: {self.term_months} months")


accounts = {}

def create_savings_account():
    account_number = input("Enter new account number: ")
    owner = input("Enter owner name: ")
    balance = float(input("Enter starting balance: "))
    rate = float(input("Enter interest rate (example 0.05): "))
    accounts[account_number] = SavingsAccount(account_number, owner, balance, rate)
    print("Savings account created.")

def create_current_account():
    account_number = input("Enter new account number: ")
    owner = input("Enter owner name: ")
    balance = float(input("Enter starting balance: "))
    overdraft = float(input("Enter overdraft limit: "))
    accounts[account_number] = CurrentAccount(account_number, owner, balance, overdraft)
    print("Current account created.")

def deposit_money():
    account_number = input("Enter account number: ")
    if account_number in accounts:
        amount = float(input("Enter deposit amount: "))
        accounts[account_number].deposit(amount)
    else:
        print("Account not found.")

def withdraw_money():
    account_number = input("Enter account number: ")
    if account_number in accounts:
        amount = float(input("Enter withdraw amount: "))
        accounts[account_number].withdraw(amount)
    else:
        print("Account not found.")

def show_statement():
    account_number = input("Enter account number: ")
    if account_number in accounts:
        accounts[account_number].statement()
    else:
        print("Account not found.")

def apply_interest_to_savings():
    for account in accounts.values():
        if isinstance(account, SavingsAccount):
            account.apply_interest()

def show_all_accounts():
    if len(accounts) == 0:
        print("No accounts yet.")
    else:
        for account in accounts.values():
            account.statement()


while True:
    print("\nAddis Bank System - Version 2")
    print("1. Create Savings Account")
    print("2. Create Current Account")
    print("3. Deposit")
    print("4. Withdraw")
    print("5. Show statement")
    print("6. Apply interest to all savings accounts")
    print("7. Show all accounts")
    print("8. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            create_savings_account()
        elif choice == "2":
            create_current_account()
        elif choice == "3":
            deposit_money()
        elif choice == "4":
            withdraw_money()
        elif choice == "5":
            show_statement()
        elif choice == "6":
            apply_interest_to_savings()
        elif choice == "7":
            show_all_accounts()
        elif choice == "8":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
