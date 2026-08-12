// Exercise 3: Discount factory function

function discountBy(rate) {
    return function (price) {
        return price - (price * rate);
    };
}

const memberPrice = discountBy(0.10); // 10% off
const salePrice = discountBy(0.30);   // 30% off

const price = 1000;

console.log(`Member price: ${memberPrice(price)} ETB`);
console.log(`Sale price: ${salePrice(price)} ETB`);
