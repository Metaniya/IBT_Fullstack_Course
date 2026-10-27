import Link from "next/link";
import DishImage from "@/components/DishImage";

export default function DishCard({ dish }) {
  return (
    <div className="flex items-center gap-4 rounded border p-3">
      <DishImage
        src={`/dishes/${dish.id}.jpg`}
        alt={`${dish.name}, a ${dish.category.toLowerCase()} dish`}
        sizes="96px"
        className="h-auto w-24 rounded"
      />
      <div>
        <Link href={`/menu/${dish.id}`} className="font-semibold underline">
          {dish.name}
        </Link>
        <span className="ml-2 text-sm">{dish.price} ETB</span>
        <span className="ml-2 text-xs text-gray-500">{dish.category}</span>
      </div>
    </div>
  );
}