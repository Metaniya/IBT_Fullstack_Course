import { getDishes } from "@/app/menu/dishes";

export const PAGE_SIZE = 4;

// One function for the API route AND server components, so they cannot disagree.
export async function queryDishes({ q = "", page = 1 } = {}) {
  const all = await getDishes();
  const term = q.trim().toLowerCase();
  const filtered = term
    ? all.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.category.toLowerCase().includes(term)
      )
    : all;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    items: filtered.slice(start, start + PAGE_SIZE),
    page: safePage,
    totalPages,
    total: filtered.length,
  };
}