import Link from "next/link";

export default function DishCard({ dish }) {
  return (
    <div className="rounded border p-3">
      <Link href={`/menu/${dish.id}`} className="font-semibold underline">
        {dish.name}
      </Link>
      <span className="ml-2 text-sm">{dish.price} ETB</span>
      <span className="ml-2 text-xs text-gray-500">{dish.category}</span>
    </div>
  );
}