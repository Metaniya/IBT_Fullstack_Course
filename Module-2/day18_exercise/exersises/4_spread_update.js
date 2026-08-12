

const customer = {
    name: "Lidia",
    city: "Addis Ababa",
    balance: 1500
};

const updatedCustomer = {
    ...customer,
    city: "Bahir Dar",
    phone: "+251912345678"
};

console.log("Original:", customer);
console.log("Updated copy:", updatedCustomer);
