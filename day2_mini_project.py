

balance = 0

def add_income(amount):
    global balance
    balance = balance + amount
    print(f"Income added. New balance: {balance}")

def add_expense(amount):
    global balance
    balance = balance - amount
    print(f"Expense added. New balance: {balance}")

def show_balance():
    print(f"Current balance: {balance}")

while True:
    print("\nMenu")
    print("1. Add income")
    print("2. Add expense")
    print("3. Show balance")
    print("4. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            amount = float(input("Enter income amount: "))
            add_income(amount)
        elif choice == "2":
            amount = float(input("Enter expense amount: "))
            add_expense(amount)
        elif choice == "3":
            show_balance()
        elif choice == "4":
            print(f"Final balance: {balance}")
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
 