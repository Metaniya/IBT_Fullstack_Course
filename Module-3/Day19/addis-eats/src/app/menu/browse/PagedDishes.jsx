"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";

function useDishPage(page) {
  return useSWR(`/api/dishes?page=${page}`, fetcher, {
    keepPreviousData: true, // hold the old page while the next loads
    revalidateOnFocus: false, // the menu changes a few times a day, not per tab switch
  });
}

function Summary({ page }) {
  const { data } = useDishPage(page); // same key as List: one request, shared cache
  return (
    <p className="mb-2 text-sm text-gray-500">
      {data ? `${data.total} dishes · page ${data.page} of ${data.totalPages}` : "..."}
    </p>
  );
}

function List() {
  const params = useSearchParams();
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  const { data, error, isValidating } = useDishPage(page);

  if (error && !data) {
    return <p className="text-red-600">Could not load dishes.</p>;
  }

  return (
    <div>
      <Summary page={page} />
      <ul className={`space-y-2 ${isValidating ? "opacity-60" : ""}`}>
        {data.items.map((d) => (
          <li key={d.id} className="rounded border p-3">
            <Link href={`/menu/${d.id}`} className="font-semibold underline">
              {d.name}
            </Link>
            <span className="ml-2 text-sm">{d.price} ETB</span>
            <span className="ml-2 text-xs text-gray-500">{d.category}</span>
          </li>
        ))}
      </ul>

      <nav className="mt-4 flex items-center gap-4 text-sm">
        {data.page > 1 ? (
          <Link href={`/menu/browse?page=${data.page - 1}`} className="underline">
            Previous
          </Link>
        ) : (
          <span className="text-gray-400">Previous</span>
        )}
        <span>
          Page {data.page} of {data.totalPages}
        </span>
        {data.page < data.totalPages ? (
          <Link href={`/menu/browse?page=${data.page + 1}`} className="underline">
            Next
          </Link>
        ) : (
          <span className="text-gray-400">Next</span>
        )}
      </nav>
    </div>
  );
}

export default function PagedDishes({ firstPage }) {
  return (
    // the server-rendered page 1 is the cache entry for that exact key
    <SWRConfig value={{ fallback: { "/api/dishes?page=1": firstPage } }}>
      <List />
    </SWRConfig>
  );
}