

const prices = [200, 850, 1200, 400, 950, 1500];

const total = prices
    .map(price => price * 1.15)        // add 15% VAT to every price
    .filter(price => price < 1000)     // keep only prices under 1000 ETB
    .reduce((sum, price) => sum + price, 0); // add them all up

console.log(`Grand total: ${total.toFixed(2)} ETB`);
