const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const facts = document.querySelector("#facts");

function renderFact(container, label, value) {
    const row = document.createElement("div");
    row.className = "fact-row";

    const labelEl = document.createElement("span");
    labelEl.className = "fact-label";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.textContent = value;

    row.append(labelEl);
    row.append(valueEl);
    container.append(row);
}

async function showCountry(name) {
    // Loading state
    facts.textContent = "Loading...";
    facts.className = "loading";

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const [country] = await res.json();

        
        facts.innerHTML = "";
        facts.className = "";

        if (country.flags && country.flags.png) {
            const flag = document.createElement("img");
            flag.className = "flag-img";
            flag.src = country.flags.png;
            flag.alt = `Flag of ${country.name.common}`;
            facts.append(flag);
        }

        const currencyNames = country.currencies
            ? Object.values(country.currencies).map(c => c.name).join(", ")
            : "N/A";

        renderFact(facts, "Country", country.name.common);
        renderFact(facts, "Capital", country.capital ? country.capital[0] : "N/A");
        renderFact(facts, "Population", country.population.toLocaleString());
        renderFact(facts, "Region", country.region);
        renderFact(facts, "Currencies", currencyNames);

    } catch (err) {
        // Error state
        facts.textContent = "Country not found. Try another name.";
        facts.className = "error";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    showCountry(name);
});


showCountry("Ethiopia");
