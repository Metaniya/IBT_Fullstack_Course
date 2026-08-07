# Day 6 Basic Exercises - SOLID Principles

# 1. Single Responsibility Principle (SRP)
# Bad version (one class doing everything):
# class Employee:
#     def calculate_salary(self): ...
#     def save_to_file(self): ...
#     def send_email(self): ...

# Fixed version - each class has one job
class Employee:
    def __init__(self, name, base_salary):
        self.name = name
        self.base_salary = base_salary

class SalaryCalculator:
    def calculate(self, employee):
        return employee.base_salary * 1.1

class EmployeeRepository:
    def save_to_file(self, employee):
        print(f"Saving {employee.name} to file.")

class EmailService:
    def send_email(self, employee):
        print(f"Sending email to {employee.name}.")

emp = Employee("Abebe", 5000)
calculator = SalaryCalculator()
repo = EmployeeRepository()
mailer = EmailService()

print(f"Salary: {calculator.calculate(emp)}")
repo.save_to_file(emp)
mailer.send_email(emp)

print("--------------------------------------------------")

# 2. Open/Closed Principle (OCP)
# Bad version using if-elif:
def calculate_bonus(employee_type):
    if employee_type == "manager":
        return 1000
    elif employee_type == "developer":
        return 700
    else:
        return 300

print(calculate_bonus("manager"))

# Fixed version - use classes so we don't edit the function to add new types
class Bonus:
    def get_bonus(self):
        return 300

class ManagerBonus(Bonus):
    def get_bonus(self):
        return 1000

class DeveloperBonus(Bonus):
    def get_bonus(self):
        return 700

# Adding a new type does not require changing existing code
class InternBonus(Bonus):
    def get_bonus(self):
        return 100

manager_bonus = ManagerBonus()
print(manager_bonus.get_bonus())

print("--------------------------------------------------")

# 3. Liskov Substitution Principle (LSP)
# Bad version: Penguin cannot fly, so it breaks if it inherits fly() from Bird
class Bird:
    def make_sound(self):
        print("Some bird sound")

class FlyingBird(Bird):
    def fly(self):
        print("Flying high!")

class Penguin(Bird):
    def swim(self):
        print("Swimming fast!")

class Sparrow(FlyingBird):
    pass

def make_bird_fly(bird):
    if isinstance(bird, FlyingBird):
        bird.fly()
    else:
        print("This bird cannot fly.")

sparrow = Sparrow()
penguin = Penguin()

make_bird_fly(sparrow)
make_bird_fly(penguin)

print("--------------------------------------------------")

# 4. Identify SOLID Violations
# class Account:
#     def __init__(self):
#         self.notifier = EmailNotifier()
#     def withdraw(self, amount):
#         ...
#         self.notifier.send_email(...)
#         self.save_to_db(...)

# This code violates:
# - Single Responsibility Principle: Account handles withdrawing money,
#   sending emails, and saving to database, which are 3 different jobs.
# - Dependency Inversion Principle: Account creates EmailNotifier directly
#   inside itself instead of receiving it from outside (dependency injection).
print("Violations: Single Responsibility Principle and Dependency Inversion Principle")
