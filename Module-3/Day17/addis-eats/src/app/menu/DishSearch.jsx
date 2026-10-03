"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";

function useDebounce(value, ms) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export default function DishSearch() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term.trim(), 300);

  const { data, error, isLoading, isValidating } = useSWR(
    // null key = do not fetch at all for an empty term
    debounced ? `/api/dishes?q=${encodeURIComponent(debounced)}` : null,
    fetcher,
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  return (
    <div className="mb-6">
      <label className="block text-sm">
        Search dishes
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="mt-1 block w-full max-w-sm border p-2"
          placeholder="Try tib or vegan"
        />
      </label>

      {debounced && (
        <ul className="mt-2 space-y-1 text-sm">
          {error && <li className="text-red-600">Search failed.</li>}
          {(isLoading || isValidating) && <li>Searching...</li>}
          {data?.items.length === 0 && <li>No dishes match.</li>}
          {data?.items.map((d) => (
            <li key={d.id}>
              <Link href={`/menu/${d.id}`} className="underline">
                {d.name}
              </Link>{" "}
              · {d.price} ETB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}