// Exercise 4: Higher-order function - applyToAll

function applyToAll(list, fn) {
    return list.map(fn);
}

const prices = [100, 250, 400, 600];

const addVat = (price) => Math.round(price * 1.15 * 100) / 100;

const pricesWithVat = applyToAll(prices, addVat);

console.log(pricesWithVat);
