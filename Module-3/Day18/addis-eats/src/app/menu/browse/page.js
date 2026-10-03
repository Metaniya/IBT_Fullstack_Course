import { Suspense } from "react";
import { queryDishes } from "@/lib/dishQuery";
import PagedDishes from "./PagedDishes";

// Menu changes a few times a day; an hour of staleness misleads nobody.
export const revalidate = 3600;

export default async function BrowsePage() {
  const firstPage = await queryDishes({ page: 1 }); // server renders page 1

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">All dishes</h1>
      {/* useSearchParams needs a Suspense boundary in a static page */}
      <Suspense fallback={<p>Loading...</p>}>
        <PagedDishes firstPage={firstPage} />
      </Suspense>
    </main>
  );
}