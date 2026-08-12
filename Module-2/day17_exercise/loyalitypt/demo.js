// Demo script for the Loyalty Points Module

const createLoyalty = require("./loyalty.js");

// Standard card - default earn rule (1 point per 10 ETB)
const card = createLoyalty();

card.earn(250);  // +25 points
console.log(`After earning 250 ETB: ${card.balance()} points`);

card.redeem(10);
console.log(`After redeeming 10 points: ${card.balance()} points`);

card.redeem(1000); // should not go below zero
console.log(`After trying to redeem 1000 points: ${card.balance()} points`);

console.log("--------------------------------------------------");

// Holiday card - a swapped-in earn rule that doubles points,
// without changing anything inside loyalty.js
const holidayEarnRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayEarnRule);

holidayCard.earn(250); // +50 points (double the standard rate)
console.log(`Holiday card after earning 250 ETB: ${holidayCard.balance()} points`);

console.log("--------------------------------------------------");

// Confirming the balance is private - there is no direct way to reach
// or overwrite "points" from outside createLoyalty. Only earn(),
// redeem(), and balance() can touch it.
console.log("card.points is:", card.points); // undefined - not accessible directly
