import { notFound } from "next/navigation";
import { getDish } from "../dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p className="mt-2">{dish.category} · {dish.price} ETB</p>
    </main>
  );
}