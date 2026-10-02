import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul className="mt-4 space-y-2">
      {dishes.map((dish) => (
        <li key={dish.id} className="border p-3 rounded">
          <Link href={`/menu/${dish.id}`} className="font-semibold underline">
            {dish.name}
          </Link>
          <span className="ml-2 text-sm">{dish.price} ETB</span>
        </li>
      ))}
    </ul>
  );
}