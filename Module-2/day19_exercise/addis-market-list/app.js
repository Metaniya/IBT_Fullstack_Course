// Cache elements once, reuse everywhere
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Add a new item as a row
function addRow(name, price) {
    const li = document.createElement("li");
    li.dataset.price = price;

    const label = document.createElement("span");
    label.textContent = `${name} - ${price} ETB`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "del";

    li.append(label);
    li.append(deleteBtn);
    list.append(li);
}

// Recalculate and display the running total from items still in the list
function updateTotal() {
    const rows = [...list.querySelectorAll("li")];
    const total = rows.reduce((sum, row) => sum + Number(row.dataset.price), 0);
    totalEl.textContent = `Total: ${total.toFixed(2)} ETB`;
}

// Handle adding a new item
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || !price) return;

    addRow(name, price);
    form.reset();
    updateTotal();
});

// Delegated listener on the list handles both delete and toggling "bought"
list.addEventListener("click", (e) => {
    if (e.target.matches(".del")) {
        e.target.closest("li").remove();
        updateTotal();
    } else {
        const li = e.target.closest("li");
        if (li) li.classList.toggle("bought");
    }
});
