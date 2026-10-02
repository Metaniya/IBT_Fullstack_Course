export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Beef", price: 320 },
  { id: "doro-wat", name: "Doro Wat", category: "Chicken", price: 280 },
  { id: "tibs", name: "Beef Tibs", category: "Beef", price: 300 },
  { id: "shiro", name: "Shiro", category: "Vegan", price: 180 },
];

export function getDish(id) {
  return dishes.find((d) => d.id === id) ?? null;
}