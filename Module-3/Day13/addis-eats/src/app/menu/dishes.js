export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Beef", price: 320 },
  { id: "doro-wat", name: "Doro Wat", category: "Chicken", price: 280 },
  { id: "tibs", name: "Beef Tibs", category: "Beef", price: 300 },
  { id: "shiro", name: "Shiro", category: "Vegan", price: 180 },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getDishes() {
  await wait(800); // pretend this is a slow database
  return dishes;
}

export async function getDish(id) {
  const all = await getDishes();
  return all.find((d) => d.id === id) ?? null;
}