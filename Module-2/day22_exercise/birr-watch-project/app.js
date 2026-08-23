const ratesEndpoint = "https://open.er-api.com/v6/latest/ETB";
const storageKey = "birrwatch";

const state = {
    rates: {},
    watchlist: [],
    currency: "USD",
};

const statusMessage = document.querySelector("#status");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const resultMessage = document.querySelector("#result");
const addToWatchlistButton = document.querySelector("#add-to-watchlist");
const watchlistElement = document.querySelector("#watchlist");

function renderCurrencyOptions() {
    const currencyCodes = Object.keys(state.rates);
    currencySelect.innerHTML = currencyCodes
        .map(code => `<option>${code}</option>`)
        .join("");
    currencySelect.value = state.currency;
}

function renderWatchlist() {
    if (state.watchlist.length === 0) {
        watchlistElement.innerHTML = "<li>No currencies yet</li>";
        return;
    }

    watchlistElement.innerHTML = state.watchlist
        .map(code => {
            const rate = state.rates[code];
            return `<li data-currency="${code}">1 ETB = ${rate} ${code} <button class="remove-btn">×</button></li>`;
        })
        .join("");
}

function render() {
    renderCurrencyOptions();
    renderWatchlist();
}

function saveToStorage() {
    localStorage.setItem(storageKey, JSON.stringify({
        watchlist: state.watchlist,
        currency: state.currency,
    }));
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved) Object.assign(state, JSON.parse(saved));
    } catch (err) {
        state.watchlist = [];
    }
}

async function loadRates() {
    statusMessage.textContent = "Loading rates...";

    try {
        const response = await fetch(ratesEndpoint);
        if (!response.ok) throw new Error("HTTP " + response.status);

        const data = await response.json();
        state.rates = data.rates;
        statusMessage.textContent = "";
        render();
    } catch (err) {
        statusMessage.textContent = "Could not load rates. Please try again later.";
    }
}

convertForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = Number(amountInput.value);

    if (!amount || amount <= 0 || Number.isNaN(amount)) {
        resultMessage.textContent = "Enter a valid amount.";
        return;
    }

    state.currency = currencySelect.value;
    const rate = state.rates[state.currency];
    const convertedAmount = (amount * rate).toFixed(2);

    resultMessage.textContent = `${amount} ETB = ${convertedAmount} ${state.currency}`;
    saveToStorage();
});

addToWatchlistButton.addEventListener("click", () => {
    const selectedCurrency = currencySelect.value;

    if (state.watchlist.includes(selectedCurrency)) return;

    state.watchlist.push(selectedCurrency);
    saveToStorage();
    renderWatchlist();
});

watchlistElement.addEventListener("click", (event) => {
    if (!event.target.matches(".remove-btn")) return;

    const currencyToRemove = event.target.closest("li").dataset.currency;
    state.watchlist = state.watchlist.filter(code => code !== currencyToRemove);

    saveToStorage();
    renderWatchlist();
});

async function init() {
    loadFromStorage();
    await loadRates();
    render();
}

init();
