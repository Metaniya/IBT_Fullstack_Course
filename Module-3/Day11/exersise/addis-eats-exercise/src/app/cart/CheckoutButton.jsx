"use client";

import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/checkout")}
      className="mt-4 px-4 py-2 bg-black text-white rounded"
    >
      Go to checkout
    </button>
  );
}