

class BankAccount:
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

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

    def show_info(self):
        print(f"Account Number: {self.account_number}")
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.__balance}")


# Bonus
class SavingsAccount(BankAccount):
    def __init__(self, account_number, owner, balance=0, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)


accounts = {}

def create_account():
    account_number = input("Enter new account number: ")
    owner = input("Enter owner name: ")
    accounts[account_number] = BankAccount(account_number, owner)
    print("Account created successfully.")

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

def check_balance():
    account_number = input("Enter account number: ")
    if account_number in accounts:
        print(f"Balance: {accounts[account_number].balance}")
    else:
        print("Account not found.")

def view_account_info():
    account_number = input("Enter account number: ")
    if account_number in accounts:
        accounts[account_number].show_info()
    else:
        print("Account not found.")


while True:
    print("\nAddis Bank Account System")
    print("1. Create new account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Check balance")
    print("5. View account info")
    print("6. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            create_account()
        elif choice == "2":
            deposit_money()
        elif choice == "3":
            withdraw_money()
        elif choice == "4":
            check_balance()
        elif choice == "5":
            view_account_info()
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
