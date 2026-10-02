import Link from "next/link";
import { getDishes } from "./menu/dishes";

export default async function HomePage() {
  const dishes = await getDishes();
  const specials = dishes.slice(0, 2);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Addis Eats</h1>
      <p className="mt-2">Ethiopian food, delivered.</p>

      <h2 className="mt-8 text-xl font-semibold">Today&apos;s specials</h2>
      <ul className="mt-2 space-y-2">
        {specials.map((d) => (
          <li key={d.id} className="rounded border p-3">
            <Link href={`/menu/${d.id}`} className="font-semibold underline">
              {d.name}
            </Link>
            <span className="ml-2 text-sm">{d.price} ETB</span>
          </li>
        ))}
      </ul>

      <Link href="/menu" className="mt-6 inline-block underline">
        See the full menu
      </Link>
    </main>
  );
}