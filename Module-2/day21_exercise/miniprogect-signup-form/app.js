const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorEl = document.querySelector("#error");
const countEl = document.querySelector("#signup-count");
const listEl = document.querySelector("#signup-list");

function validate(name, phone) {
    if (!name) return "Please enter your name.";
    if (name.length < 2) return "Name is too short.";
    if (!phone) return "Phone is required.";
    if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number (09... or +251...).";
    return "";
}


// corrupt/invalid JSON without crashing the page
function loadSignups() {
    try {
        const raw = localStorage.getItem("signups");
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        return [];
    }
}

function saveSignups(signups) {
    localStorage.setItem("signups", JSON.stringify(signups));
}

function render() {
    const signups = loadSignups();

    countEl.textContent = `${signups.length} people have signed up.`;

    listEl.innerHTML = "";
    signups.forEach(person => {
        const li = document.createElement("li");
        li.textContent = `${person.name} — ${person.phone}`; // textContent, safe by default
        listEl.append(li);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate(name, phone);

    if (error) {
        errorEl.textContent = error;
        return;
    }

    errorEl.textContent = "";

    const signups = loadSignups();
    signups.push({ name, phone });
    saveSignups(signups);

    form.reset();
    render();
});


render();
