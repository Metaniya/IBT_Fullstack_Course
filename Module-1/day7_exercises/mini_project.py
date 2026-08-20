
class TransactionHistory:
    def __init__(self):
        self.history = []

    def push(self, transaction):
        self.history.append(transaction)  # O(1)

    def pop(self):
        if len(self.history) == 0:
            return None
        return self.history.pop()  # O(1)

    def show_all(self):
        if len(self.history) == 0:
            print("No transactions yet.")
        else:
            for transaction in self.history:
                print(transaction)



customers = {
    "ACC001": {"name": "Abebe", "balance": 5000},
    "ACC002": {"name": "Sara", "balance": 3000},
    "ACC003": {"name": "Kebede", "balance": 7000}
}

history = TransactionHistory()


def make_transaction():
    account_number = input("Enter account number: ")
    if account_number not in customers:
        print("Customer not found.")
        return

    action = input("Deposit or Withdraw? ").lower()
    amount = float(input("Enter amount: "))

    if action == "deposit":
        customers[account_number]["balance"] += amount
        history.push(f"Deposit {amount} to {account_number}")
        print(f"New balance: {customers[account_number]['balance']}")

    elif action == "withdraw":
        if amount > customers[account_number]["balance"]:
            print("Insufficient funds.")
        else:
            customers[account_number]["balance"] -= amount
            history.push(f"Withdraw {amount} from {account_number}")
            print(f"New balance: {customers[account_number]['balance']}")
    else:
        print("Invalid action.")


def undo_last_transaction():
    last_transaction = history.pop()
    if last_transaction is None:
        print("No transaction to undo.")
    else:
        print(f"Undo not fully reversing balance in this simple version, "
              f"but removed from history: {last_transaction}")


def search_customer():
    account_number = input("Enter account number to search: ")
    # Dictionary lookup - O(1) average, much faster than searching a list one by one
    if account_number in customers:
        print(customers[account_number])
    else:
        print("Customer not found.")


while True:
    print("\nBank Customer Service Simulator")
    print("1. Make a transaction")
    print("2. Undo last transaction")
    print("3. Search customer by account number")
    print("4. Show transaction history")
    print("5. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            make_transaction()
        elif choice == "2":
            undo_last_transaction()
        elif choice == "3":
            search_customer()
        elif choice == "4":
            history.show_all()
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
