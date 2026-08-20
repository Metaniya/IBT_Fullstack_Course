

import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, correctAmount } from "./report.js";

console.log("TeleBirr Transaction Report");
console.log("--------------------------------------------------");

console.log(`Total credits: ${totalByType(transactions, "credit")} ETB`);
console.log(`Total debits: ${totalByType(transactions, "debit")} ETB`);

console.log("--------------------------------------------------");
console.log("Receipts:");
formatReceipts(transactions).forEach(receipt => console.log(receipt));

console.log("--------------------------------------------------");

// Demonstrate correcting one transaction without mutating the original
const original = transactions[0];
const corrected = correctAmount(original, 275);

console.log("Original transaction:", original);
console.log("Corrected copy:", corrected);
