import { cache } from "react";

export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Beef", price: 320, summary: "Minced beef with mitmita and niter kibbeh." },
  { id: "doro-wat", name: "Doro Wat", category: "Chicken", price: 280, summary: "Slow-cooked chicken stew with berbere and a boiled egg." },
  { id: "tibs", name: "Beef Tibs", category: "Beef", price: 300, summary: "Sautéed beef cubes with onion, pepper and rosemary." },
  { id: "shiro", name: "Shiro", category: "Vegan", price: 180, summary: "Silky chickpea stew, a fasting-day favourite." },
  { id: "firfir", name: "Firfir", category: "Vegan", price: 170, summary: "Shredded injera tossed in spiced sauce." },
  { id: "gomen", name: "Gomen", category: "Vegan", price: 150, summary: "Collard greens simmered with garlic and ginger." },
  { id: "key-wat", name: "Key Wat", category: "Beef", price: 290, summary: "Beef in a fiery red berbere sauce." },
  { id: "doro-tibs", name: "Doro Tibs", category: "Chicken", price: 270, summary: "Pan-fried chicken pieces with onion and chilli." },
  { id: "dulet", name: "Dulet", category: "Beef", price: 260, summary: "Minced tripe, liver and beef fried with spices." },
  { id: "misir", name: "Misir Wat", category: "Vegan", price: 160, summary: "Red lentils cooked in spicy berbere sauce." },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const getDishes = cache(async () => {
  await wait(800); // pretend this is a slow database
  return dishes;
});

export const getDish = cache(async (id) => {
  const all = await getDishes();
  return all.find((d) => d.id === id) ?? null;
});