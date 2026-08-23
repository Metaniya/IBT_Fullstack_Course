// Exercise 2: save() and load() helpers for an array in localStorage

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        // corrupt or invalid JSON in storage - start fresh instead of crashing
        return [];
    }
}

// Demo usage (run this in a browser console, not Node - localStorage
// is a browser API and does not exist in plain Node.js)

const cart = ["Doro Wat", "Shiro", "Kitfo"];
save("cart", cart);

const restoredCart = load("cart");
console.log(restoredCart); // ["Doro Wat", "Shiro", "Kitfo"]

// Simulate corrupt data and confirm load() falls back safely
localStorage.setItem("brokenData", "{not valid json");
console.log(load("brokenData")); // []

// Simulate a first-time visit where the key has never been set
console.log(load("neverSetKey")); // []
