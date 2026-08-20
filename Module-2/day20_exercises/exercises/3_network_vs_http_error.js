// Exercise 3: network failure vs HTTP error - why you need res.ok

//  a deliberately wrong URL - this causes a genuine network failure,
// so fetch's promise REJECTS, and the catch block runs.
async function fetchBadUrl() {
    try {
        await fetch("https://this-domain-does-not-exist-12345.com/data");
        console.log("This should never print.");
    } catch (err) {
        console.log("Caught a network error, as expected:", err.message);
    }
}

// 2. A real URL that returns 404 - fetch's promise still RESOLVES here,
// because the request itself completed successfully. If we don't check
// res.ok ourselves, we'd wrongly treat this as a success.
async function fetchNotFound() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/99999");

    console.log("fetch resolved without throwing, status:", res.status);

    if (!res.ok) {
        console.log("res.ok is false - this is why we must check it manually.");
        throw new Error(`HTTP error: ${res.status}`);
    }
}

async function run() {
    await fetchBadUrl();

    try {
        await fetchNotFound();
    } catch (err) {
        console.log("Caught the HTTP error after checking res.ok:", err.message);
    }
}

run();
