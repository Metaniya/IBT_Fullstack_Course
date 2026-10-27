import { Suspense } from "react";
import DishResults from "./DishResults";
import DishSkeleton from "./DishSkeleton";

// Dishes change a few times a day, so up to an hour stale is acceptable.
export const revalidate = 3600;

export default function MenuPage() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>
      <Suspense fallback={<DishSkeleton />}>
        <DishResults />
      </Suspense>
    </main>
  );
}