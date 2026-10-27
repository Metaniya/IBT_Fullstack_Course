"use client";

import { toCsv } from "@/lib/csv.mjs";
import { downloadText } from "@/lib/download";

const COLUMNS = [
  { key: "id", label: "Order" },
  { key: "placed", label: "Placed (UTC)" },
  { key: "area", label: "Area" },
  { key: "status", label: "Status" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total (ETB)" },
];

export default function ExportCsvButton({ rows }) {
  return (
    <button
      type="button"
      disabled={rows.length === 0}
      onClick={() =>
        downloadText("addis-eats-orders.csv", "\uFEFF" + toCsv(COLUMNS, rows), "text/csv;charset=utf-8")
      }
      className="rounded border px-3 py-1 text-sm disabled:opacity-50"
    >
      Download CSV
    </button>
  );
}