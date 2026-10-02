"use client";

import { useState } from "react";
import { useCart } from "@/app/providers";

export default function AddToCartButton({ dish }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        dispatch({ type: "add", dish });
        setAdded(true);
      }}
      className="mt-4 rounded bg-black px-4 py-2 text-white"
    >
      {added ? "Added. Add another?" : "Add to order"}
    </button>
  );
}