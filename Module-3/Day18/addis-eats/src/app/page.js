import Link from "next/link";
import DishImage from "@/components/DishImage";
import { getDishes } from "./menu/dishes";

const SPECIALS_COUNT = 2;

export const metadata = {
  title: "Addis Eats | Ethiopian food, delivered",
  description: "Order Kitfo, Doro Wat and more, delivered across Addis Ababa.",
};

function SpecialCard({ dish }) {
  return (
    <li className="overflow-hidden rounded-lg border transition hover:shadow">
      <Link href={`/menu/${dish.id}`} className="block">
        <DishImage
          src={`/dishes/${dish.id}.jpg`}
          alt={`${dish.name}, a ${dish.category.toLowerCase()} dish`}
          sizes="(max-width: 640px) 100vw, 352px"
          className="h-auto w-full"
        />
        <span className="block p-4">
          <span className="block text-lg font-semibold underline">{dish.name}</span>
          <span className="mt-1 block text-sm text-gray-500">{dish.category}</span>
          <span className="mt-2 block font-medium">{dish.price} ETB</span>
        </span>
      </Link>
    </li>
  );
}

export default async function HomePage() {
  const dishes = await getDishes();
  const specials = dishes.slice(0, SPECIALS_COUNT);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <section>
        <h1 className="text-4xl font-bold">Addis Eats</h1>
        <p className="mt-2 text-lg text-gray-600">Ethiopian food, delivered.</p>
        <Link
          href="/menu"
          className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
        >
          See the full menu
        </Link>
        <DishImage
          src="/hero.jpg"
          alt="A shared platter of Ethiopian stews served on injera"
          width={1600}
          height={700}
          sizes="(max-width: 768px) 100vw, 768px"
          className="mt-6 h-auto w-full rounded-lg"
        />
      </section>

      <section className="mt-10" aria-labelledby="specials-heading">
        <h2 id="specials-heading" className="text-xl font-semibold">
          Today&apos;s specials
        </h2>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2">
          {specials.map((dish) => (
            <SpecialCard key={dish.id} dish={dish} />
          ))}
        </ul>
      </section>
    </main>
  );
}