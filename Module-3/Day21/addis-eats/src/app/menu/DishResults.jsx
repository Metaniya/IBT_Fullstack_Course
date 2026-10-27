import CategoryFilter from "./CategoryFilter";
import DishCard from "./DishCard";
import { getDishes } from "./dishes";

export default async function DishResults() {
  const dishes = await getDishes(); // straight to the data, no endpoint
  const categories = [...new Set(dishes.map((d) => d.category))];
  const items = dishes.map((d) => ({
    id: d.id,
    category: d.category,
    node: <DishCard dish={d} />, // JSX crosses the boundary; it stays server-rendered
  }));
  return <CategoryFilter categories={categories} items={items} />;
}