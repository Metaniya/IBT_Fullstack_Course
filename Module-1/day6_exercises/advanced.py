

from abc import ABC, abstractmethod

# 9. Full SOLID Refactoring
# Instead of one "god class" Account that does everything (balance,
# saving to file, sending sms, printing statements), we split responsibilities:

class AccountRepository:
    def save(self, account):
        print(f"Saving account {account.number} to database.")

class NotificationService:
    def notify(self, message):
        print(f"Notify: {message}")

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

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdraw amount must be positive.")
        elif amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance = self._balance - amount
            self.repository.save(self)
            if amount > 3000:
                self.notifier.notify(f"Large withdrawal of {amount} by {self.owner}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, owner, number, balance, repository, notifier, interest_rate=0.05):
        super().__init__(owner, number, balance, repository, notifier)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self._balance * self.interest_rate


class CurrentAccount(Account):
    def __init__(self, owner, number, balance, repository, notifier, overdraft_limit=500):
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

    def calculate_interest(self):
        return 0


print("--------------------------------------------------")

# 10. Combine Factory + Observer + Singleton
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 500
        return cls._instance

class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")

class AuditLog:
    def update(self, message):
        print(f"Audit Log: {message}")

class NotifierWithObservers:
    def __init__(self):
        self.observers = [SMSAlert(), AuditLog()]

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)

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

repo = AccountRepository()
notifier = NotifierWithObservers()

savings = AccountFactory.create("savings", "Abebe", "ACC001", 10000, repo, notifier)
savings.withdraw(5000)

print("--------------------------------------------------")

# 11. Refactoring Challenge - add InvestmentAccount easily
# Because of OCP + Factory, we can add a new account type without touching
# existing classes or the factory's existing branches.
class InvestmentAccount(Account):
    def __init__(self, owner, number, balance, repository, notifier, risk_level="medium"):
        super().__init__(owner, number, balance, repository, notifier)
        self.risk_level = risk_level

    def calculate_interest(self):
        if self.risk_level == "high":
            return self._balance * 0.12
        return self._balance * 0.07

# Just add one more branch to the factory - existing account classes are untouched
class AccountFactoryV2(AccountFactory):
    @staticmethod
    def create(kind, owner, number, balance, repository, notifier):
        if kind == "investment":
            return InvestmentAccount(owner, number, balance, repository, notifier)
        return AccountFactory.create(kind, owner, number, balance, repository, notifier)

investment = AccountFactoryV2.create("investment", "Sara", "ACC002", 20000, repo, notifier)
print(f"Investment interest: {investment.calculate_interest()}")
