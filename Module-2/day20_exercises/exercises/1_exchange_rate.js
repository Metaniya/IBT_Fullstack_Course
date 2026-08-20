// Exercise 1: 

async function getUsdToEtbRate() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.rates.ETB;
}

getUsdToEtbRate()
    .then(rate => console.log(`1 USD = ${rate} ETB`))
    .catch(err => console.error("Could not fetch rate:", err.message));
