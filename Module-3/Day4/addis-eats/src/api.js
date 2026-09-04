export async function fetchDishes(signal) {
    const res = await fetch("/dishes.json", { signal });

    if (!res.ok) {
        throw new Error("Could not load the menu");
    }

    return res.json();
}