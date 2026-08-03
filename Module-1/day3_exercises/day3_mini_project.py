

inventory = {}

def add_product():
    name = input("Enter product name: ")
    quantity = int(input("Enter quantity: "))
    inventory[name] = quantity
    print(f"{name} added with quantity {quantity}")

def update_quantity():
    name = input("Enter product name to update: ")
    if name in inventory:
        quantity = int(input("Enter new quantity: "))
        inventory[name] = quantity
        print(f"{name} updated to {quantity}")
    else:
        print("Product not found.")

def view_products():
    if len(inventory) == 0:
        print("No products in inventory.")
    else:
        for name, quantity in inventory.items():
            print(f"{name}: {quantity}")

def save_to_file():
    file = open("inventory.txt", "w")
    for name, quantity in inventory.items():
        file.write(f"{name},{quantity}\n")
    file.close()
    print("Inventory saved to file.")

def load_from_file():
    try:
        file = open("inventory.txt", "r")
        lines = file.readlines()
        file.close()

        for line in lines:
            name, quantity = line.strip().split(",")
            inventory[name] = int(quantity)

        print("Inventory loaded from file.")
    except FileNotFoundError:
        print("inventory.txt file does not exist.")

while True:
    print("\nInventory Manager Menu")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            add_product()
        elif choice == "2":
            update_quantity()
        elif choice == "3":
            view_products()
        elif choice == "4":
            save_to_file()
        elif choice == "5":
            load_from_file()
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
