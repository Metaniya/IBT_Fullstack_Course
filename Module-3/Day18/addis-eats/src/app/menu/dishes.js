export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Beef", price: 320 },
  { id: "doro-wat", name: "Doro Wat", category: "Chicken", price: 280 },
  { id: "tibs", name: "Beef Tibs", category: "Beef", price: 300 },
  { id: "shiro", name: "Shiro", category: "Vegan", price: 180 },
  { id: "firfir", name: "Firfir", category: "Vegan", price: 170 },
  { id: "gomen", name: "Gomen", category: "Vegan", price: 150 },
  { id: "key-wat", name: "Key Wat", category: "Beef", price: 290 },
  { id: "doro-tibs", name: "Doro Tibs", category: "Chicken", price: 270 },
  { id: "dulet", name: "Dulet", category: "Beef", price: 260 },
  { id: "misir", name: "Misir Wat", category: "Vegan", price: 160 },
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