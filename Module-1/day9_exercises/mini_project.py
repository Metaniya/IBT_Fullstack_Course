#day 9 Mini Project - Addis Bank Network & Priority System

import heapq

#tree for branch hierarchy - O(1) to add a child, O(n) to print whole tree
class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

def print_tree(node, level=0):
    print("  " * level + node.name)
    for child in node.children:
        print_tree(child, level + 1)


# BST for fast customer account search - O(log n) average search
class BSTNode:
    def __init__(self, account_number):
        self.account_number = account_number
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, account_number):
        if self.root is None:
            self.root = BSTNode(account_number)
        else:
            self._insert(self.root, account_number)

    def _insert(self, node, account_number):
        if account_number < node.account_number:
            if node.left is None:
                node.left = BSTNode(account_number)
            else:
                self._insert(node.left, account_number)
        else:
            if node.right is None:
                node.right = BSTNode(account_number)
            else:
                self._insert(node.right, account_number)

    def search(self, account_number):
        return self._search(self.root, account_number)

    def _search(self, node, account_number):
        if node is None:
            return False
        if node.account_number == account_number:
            return True
        elif account_number < node.account_number:
            return self._search(node.left, account_number)
        else:
            return self._search(node.right, account_number)


# graph for customer money transfer network - O(1) to add a connection
graph = {}

def add_customer(name):
    if name not in graph:
        graph[name] = []

def add_transfer_connection(person1, person2):
    add_customer(person1)
    add_customer(person2)
    graph[person1].append(person2)
    graph[person2].append(person1)

# BFS to show connected customers - O(V + E)
def bfs(start):
    visited = set()
    queue = [start]
    result = []

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            result.append(current)
            for neighbor in graph.get(current, []):
                if neighbor not in visited:
                    queue.append(neighbor)

    return result


# heap for urgent transactions - O(log n) push and pop
urgent_transactions = []

def add_urgent_transaction(priority, description):
    # push negative priority so heapq (min-heap) acts like a max-heap
    heapq.heappush(urgent_transactions, (-priority, description))

def process_highest_priority():
    if len(urgent_transactions) == 0:
        print("No urgent transactions.")
        return
    priority, description = heapq.heappop(urgent_transactions)
    print(f"Processing: {description} (priority {-priority})")


# setup
head_office = TreeNode("Head Office")
bst = BST()

branches = {"Head Office": head_office}


def add_branch_or_employee():
    parent_name = input("Enter parent branch/office name: ")
    new_name = input("Enter new branch/employee name: ")

    if parent_name in branches:
        new_node = TreeNode(new_name)
        branches[parent_name].add_child(new_node)
        branches[new_name] = new_node
        print(f"{new_name} added under {parent_name}.")
    else:
        print("Parent not found.")

def add_money_transfer():
    person1 = input("Enter first customer name: ")
    person2 = input("Enter second customer name: ")
    add_transfer_connection(person1, person2)
    print(f"Connection added between {person1} and {person2}.")

def show_connected_customers():
    start = input("Enter customer name to start from: ")
    if start not in graph:
        print("Customer not found in the network.")
        return
    connected = bfs(start)
    print(f"Connected customers: {connected}")

def add_urgent_transaction_menu():
    priority = int(input("Enter priority (higher number = more urgent): "))
    description = input("Enter transaction description: ")
    add_urgent_transaction(priority, description)
    print("Urgent transaction added.")

def search_customer_account():
    account_number = input("Enter account number to search: ")
    found = bst.search(account_number)
    print(f"Account exists: {found}")


while True:
    print("\nAddis Bank Network & Priority System")
    print("1. Add new branch / employee")
    print("2. Add money transfer connection")
    print("3. Show connected customers (BFS)")
    print("4. Add urgent transaction")
    print("5. Process highest priority transaction")
    print("6. Search for customer account (BST)")
    print("7. Show branch tree")
    print("8. Add new account number to BST")
    print("9. Exit")

    choice = input("Choose an option: ")

    try:
        if choice == "1":
            add_branch_or_employee()
        elif choice == "2":
            add_money_transfer()
        elif choice == "3":
            show_connected_customers()
        elif choice == "4":
            add_urgent_transaction_menu()
        elif choice == "5":
            process_highest_priority()
        elif choice == "6":
            search_customer_account()
        elif choice == "7":
            print_tree(head_office)
        elif choice == "8":
            account_number = input("Enter new account number: ")
            bst.insert(account_number)
            print("Account number added.")
        elif choice == "9":
            print("Goodbye!")
            break
        else:
            print("Invalid option, try again.")
    except ValueError:
        print("Please enter a valid number.")
