import Counter from "./Counter";
import { dishes } from "./dishes";

export default function Sidebar() {
  const categories = [...new Set(dishes.map((d) => d.category))];
  return (
    <aside className="w-48 shrink-0 border-r p-4">
      <h2 className="mb-2 font-semibold">Categories</h2>
      <ul className="space-y-1 text-sm">
        {categories.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <Counter/>
    </aside>
  );
}