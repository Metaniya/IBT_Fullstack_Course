

# 9.  calculator
def calculate_tip(bill, tip_percent):
    return bill * (tip_percent / 100)

def split_bill(total, people):
    return total / people

bill_amount = float(input("Enter bill amount: "))
tip_percent = float(input("Enter tip percentage (10, 15, 20): "))
people = int(input("Enter number of people splitting: "))

tip_amount = calculate_tip(bill_amount, tip_percent)
total_amount = bill_amount + tip_amount
each_pays = split_bill(total_amount, people)

print(f"Tip amount: {tip_amount}")
print(f"Total amount: {total_amount}")
print(f"Each person pays: {each_pays}")

print("--------------------------------------------------")

# 10. simple quiz 
def ask_question(question, answer, correct_answer):
    if answer.lower() == correct_answer.lower():
        return 1
    else:
        return 0

score = 0

q1 = input("What is the capital of Ethiopia? ")
score += ask_question("capital", q1, "Addis Ababa")

q2 = input("How many continents are there? ")
score += ask_question("continents", q2, "7")

q3 = input("What is the largest planet in our solar system? ")
score += ask_question("planet", q3, "Jupiter")

q4 = input("What language does Ethiopia mainly speak? ")
score += ask_question("language", q4, "Amharic")

q5 = input("2 + 2 = ? ")
score += ask_question("math", q5, "4")

print(f"Your final score is {score}/5")

if score == 5:
    print("Perfect score!")
elif score >= 3:
    print("Good job!")
else:
    print("Keep practicing!")

print("--------------------------------------------------")

# 11. function with default and return
def calculate_final_price(price, tax_rate=0.15, discount=0):
    price_after_discount = price - discount
    final_price = price_after_discount + (price_after_discount * tax_rate)
    return final_price

print(calculate_final_price(100))
print(calculate_final_price(100, 0.1))
print(calculate_final_price(100, 0.1, 20))
