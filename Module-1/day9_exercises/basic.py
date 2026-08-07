

# tree Basics
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

head_office = TreeNode("Head Office")
bole_branch = TreeNode("Bole Branch")
piassa_branch = TreeNode("Piassa Branch")
teller = TreeNode("Teller")
loan_officer = TreeNode("Loan Officer")

head_office.add_child(bole_branch)
head_office.add_child(piassa_branch)
bole_branch.add_child(teller)
bole_branch.add_child(loan_officer)

print_tree(head_office)

print("---------------------------------------------")

# binary Search Tree
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if self.root is None:
            self.root = BSTNode(value)
        else:
            self._insert(self.root, value)

    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert(node.right, value)

    def search(self, value):
        return self._search(self.root, value)

    def _search(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search(node.left, value)
        else:
            return self._search(node.right, value)

bst = BST()
for value in [50, 30, 70, 20, 40, 60]:
    bst.insert(value)

print(f"Does 40 exist? {bst.search(40)}")
print(f"Does 100 exist? {bst.search(100)}")

print("--------------------------------------------------")

# graph Basics
graph = {
    "Almaz": [],
    "Dawit": [],
    "Tigist": [],
    "Hanna": []
}

def add_connection(person1, person2):
    graph[person1].append(person2)
    graph[person2].append(person1)

add_connection("Almaz", "Dawit")
add_connection("Almaz", "Tigist")
add_connection("Dawit", "Hanna")

for person, connections in graph.items():
    print(f"{person}: {connections}")

print("--------------------------------------------------")

# heap Basics
import heapq

priority_queue = []

heapq.heappush(priority_queue, (5000, "Big Loan"))
heapq.heappush(priority_queue, (200, "Small Deposit"))
heapq.heappush(priority_queue, (10000, "Fraud Alert"))

# heapq is a min-heap, so the smallest number pops first.
# Since we want the highest priority (biggest number) first,
# we push negative numbers or just look at the max manually.
highest_priority = max(priority_queue)
priority_queue.remove(highest_priority)
print(f"Highest priority item: {highest_priority}")
