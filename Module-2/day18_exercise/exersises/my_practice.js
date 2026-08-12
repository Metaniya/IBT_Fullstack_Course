// class practice - bank account object

const bankAccount = {
    balance: 12000,
    owner: "Metaniya Shiferaw",
    interest: 400,

    deposit: function (amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    },

    withdraw: function (amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds.");
        } else {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
        }
    }
};

bankAccount.deposit(20000);
bankAccount.withdraw(200);

console.log(bankAccount);

console.log("--------------------------------------------------");

// Practice with array methods

const vowels = ["A", "E", "I", "O", "U"];

console.log(vowels[0]);
console.log(vowels.length);

// push() returns the new length of the array, not the array itself
const newLength = vowels.push("a");
console.log(newLength);

vowels.pop();
console.log(vowels.includes("A"));

const describedVowels = vowels.map(vowel => vowel + " is a vowel");
console.log(describedVowels);

console.log("--------------------------------------------------");

// Filter then map: even numbers, then square them
const numbers = [10, 17, 20, 23, 25, 28, 29, 32];

const evenNumbers = numbers.filter(num => num % 2 === 0);
const squaredEvenNumbers = evenNumbers.map(num => num * num);

const result = squaredEvenNumbers;
console.log(result);
