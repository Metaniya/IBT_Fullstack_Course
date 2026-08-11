// TeleBirr Tip & Split Calculator

// Sample inputs (in a real form these would come from user input or prompts)
const bill = Number("450");
const partySize = Number("3");
const paymentMethod = "telebirr"; // could be "telebirr", "cbebirr", or "cash"

// Add a 10% tip when the bill is over 300 ETB, otherwise 5%
let tipRate;
if (bill > 300) {
    tipRate = 0.10;
} else {
    tipRate = 0.05;
}

const tipAmount = bill * tipRate;

// Service fee depends on payment method
let serviceFee;
switch (paymentMethod) {
    case "telebirr":
        serviceFee = 5;
        break;
    case "cbebirr":
        serviceFee = 3;
        break;
    case "cash":
        serviceFee = 0;
        break;
    default:
        serviceFee = 0;
}

const total = bill + tipAmount + serviceFee;
const perPerson = total / partySize;

console.log(`Bill: ${bill} ETB`);
console.log(`Tip (${tipRate * 100}%): ${tipAmount.toFixed(2)} ETB`);
console.log(`Service fee (${paymentMethod}): ${serviceFee} ETB`);
console.log(`Total: ${total.toFixed(2)} ETB`);
console.log(`Each of ${partySize} people pays: ${perPerson.toFixed(2)} ETB`);
