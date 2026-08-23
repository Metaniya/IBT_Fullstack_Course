// Exercise 4: Ethiopian phone regex - matches 09xxxxxxxx or +2519xxxxxxxx
const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorEl = document.querySelector("#error");
const countEl = document.querySelector("#signup-count");

// Exercise 4: validate name and phone, return the first problem found
function validate({ name, phone }) {
    if (!name) return "Please enter your name.";
    if (name.length < 2) return "Name is too short.";
    if (!phone) return "Phone is required.";
    if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number.";
    return ""; // empty string means everything is fine
}

// Exercise 6: safely load the list of signups already saved
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

function updateCount() {
    const signups = loadSignups();
    countEl.textContent = `${signups.length} people have signed up.`;
}

// Exercise 4 & 5: handle the submit
form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page reload

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate({ name, phone });

    // Exercise 5: show the first problem, using textContent (never innerHTML)
    if (error) {
        errorEl.textContent = error;
        return;
    }

    errorEl.textContent = "";

    // Exercise 6: save the valid entry to localStorage as JSON
    const signups = loadSignups();
    signups.push({ name, phone });
    saveSignups(signups);

    form.reset();
    updateCount();
});

// Show the current signup count on page load
updateCount();
