import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import { dishes } from "./dishes";

export default function MenuPage() {
  const categories = [...new Set(dishes.map((d) => d.category))];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <CategoryBar categories={categories} />
      <DishList dishes={dishes} />
    </main>
  );
}