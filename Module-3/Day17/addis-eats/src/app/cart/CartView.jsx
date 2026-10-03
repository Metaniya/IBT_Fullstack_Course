"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartView() {
  const { lines, total, dispatch } = useCart();

  if (lines.length === 0) {
    return <p className="mt-2">Your cart is empty.</p>;
  }

  return (
    <div className="mt-4">
      <ul className="space-y-2">
        {lines.map((l) => (
          <li key={l.id} className="flex items-center gap-4 rounded border p-3">
            <span>
              {l.name} × {l.quantity}
            </span>
            <span className="text-sm">{l.price * l.quantity} ETB</span>
            <button
              onClick={() => dispatch({ type: "remove", id: l.id })}
              className="text-sm underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: {total} ETB</p>
      <Link href="/checkout" className="mt-4 inline-block rounded bg-black px-4 py-2 text-white">
        Go to checkout
      </Link>
    </div>
  );
}