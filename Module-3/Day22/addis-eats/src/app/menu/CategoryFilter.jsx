"use client";

import { useState } from "react";

export default function CategoryFilter({ categories, items }) {
  const [selected, setSelected] = useState("All");
  const visible =
    selected === "All" ? items : items.filter((i) => i.category === selected);

  return (
    <div className="flex gap-6">
      <aside className="w-40 shrink-0">
        <h2 className="mb-2 font-semibold">Categories</h2>
        <ul className="space-y-1 text-sm">
          {["All", ...categories].map((c) => (
            <li key={c}>
              <button
                onClick={() => setSelected(c)}
                className={c === selected ? "font-bold underline" : ""}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <ul className="flex-1 space-y-2">
        {visible.map((i) => (
          <li key={i.id}>{i.node}</li>
        ))}
      </ul>
    </div>
  );
}