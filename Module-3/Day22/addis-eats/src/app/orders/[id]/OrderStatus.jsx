"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const FINISHED = ["delivered", "cancelled"];

export default function OrderStatus({ id, initial }) {
  const { data, error, isValidating } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial, // server data, so no spinner on first paint
    // poll every 5s, but stop once there is nothing left to wait for
    refreshInterval: (latest) => (FINISHED.includes(latest?.status) ? 0 : 5000),
  });

  if (error && !data) {
    return <p className="mt-4 text-red-600">Could not load the order.</p>;
  }

  return (
    <div className="mt-4 rounded border p-4">
      <p className="text-lg font-semibold">Status: {data.status}</p>
      <p className="text-sm">
        {data.lines.map((l) => `${l.name} × ${l.quantity}`).join(", ")} ·{" "}
        {data.total} {data.currency}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        {isValidating ? "Checking for updates..." : "Up to date"}
      </p>
    </div>
  );
}