import { notFound } from "next/navigation";
import { getDishes, getDish } from "../dishes";
import AddToCartButton from "./AddToCartButton";

// Every dish id is known at build time, so one static page per dish.
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
      <p className="mt-2">
        {dish.category} · {dish.price} ETB
      </p>
      <AddToCartButton dish={{ id: dish.id, name: dish.name, price: dish.price }} />
    </main>
  );
}