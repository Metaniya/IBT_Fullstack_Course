

# student Class
class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average_grade(self):
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)

student = Student("Mimi", "STU001")
student.add_grade(85)
student.add_grade(90)
student.add_grade(78)

print(f"{student.name}'s average grade: {student.average_grade()}")

print("--------------------------------------------------")

#roduct Class
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def sell(self, quantity):
        if quantity > self.stock:
            print("Not enough stock.")
        else:
            self.stock = self.stock - quantity
            print(f"Sold {quantity}. Remaining stock: {self.stock}")

    def restock(self, quantity):
        self.stock = self.stock + quantity
        print(f"Restocked {quantity}. New stock: {self.stock}")

product = Product("Laptop", 25000, 10)
product.sell(3)
product.restock(5)
product.sell(50)

print("------------------------------------------")

# encapsulation Practice
class Account:
    def __init__(self, owner, balance):
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

account = Account("Tigist", 1000)
account.deposit(500)
account.withdraw(300)
print(f"Balance: {account.balance}")
