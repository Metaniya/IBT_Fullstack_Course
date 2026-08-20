

// The .then chain version:
function loadUserThen() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.json())
        .then(user => console.log("(.then version)", user.name))
        .catch(err => console.error("(.then version) Error:", err.message));
}

// The same thing rewritten with async/await and try/catch:
async function loadUserAsync() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await res.json();
        console.log("(async version)", user.name);
    } catch (err) {
        console.error("(async version) Error:", err.message);
    }
}

loadUserThen();
loadUserAsync();
