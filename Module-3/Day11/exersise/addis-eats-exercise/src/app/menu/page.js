import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import { dishes } from "./dishes";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function MenuPage({ searchParams }) {
  const sp = await searchParams;

  await wait(2000); // fake slow data so loading.js is visible

  if (sp.crash) {
    throw new Error("Menu failed on purpose");
  }

  const categories = [...new Set(dishes.map((d) => d.category))];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <CategoryBar categories={categories} />
      <DishList dishes={dishes} />
    </main>
  );
}