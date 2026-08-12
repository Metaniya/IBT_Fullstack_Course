

const customer = {
    name: "Lidia",
    city: "Addis Ababa",
    balance: 1500
};

// Destructure name and city in one line
const { name, city } = customer;
console.log(`${name} lives in ${city}`);

// Parameter destructuring directly in the function signature
function greet({ name }) {
    console.log(`Welcome, ${name}!`);
}

greet(customer);
