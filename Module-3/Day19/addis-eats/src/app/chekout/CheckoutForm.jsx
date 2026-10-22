"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

export default function CheckoutForm() {
  const { lines, total, dispatch } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const fieldErrors = state?.fieldErrors ?? {};

  // Empty the cart once the server confirms the order.
  useEffect(() => {
    if (state?.ok) dispatch({ type: "clear" });
  }, [state, dispatch]);

  return (
    <form action={formAction} className="mt-4 max-w-sm space-y-3">
      <ul className="text-sm">
        {lines.map((l) => (
          <li key={l.id}>
            {l.name} × {l.quantity}: {l.price * l.quantity} ETB
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total: {total} ETB</p>

      {/* the cart travels to the server as data; prices are recomputed there */}
      <input
        type="hidden"
        name="lines"
        value={JSON.stringify(
          lines.map((l) => ({ dishId: l.id, quantity: l.quantity }))
        )}
      />
      {fieldErrors.lines && (
        <p className="text-red-600">{fieldErrors.lines[0]}</p>
      )}

      <Field name="name" label="Name" errors={fieldErrors.name} />
      <Field name="phone" label="Phone" errors={fieldErrors.phone} />
      <label className="block text-sm">
        Area
        <select name="area" className="mt-1 block w-full border p-2">
          <option>Bole</option>
          <option>Piassa</option>
          <option>Kazanchis</option>
        </select>
        {fieldErrors.area && (
          <span className="text-red-600">{fieldErrors.area[0]}</span>
        )}
      </label>

      <button
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Sending..." : "Place order"}
      </button>

      {state && !state.ok && !state.fieldErrors && (
        <p className="text-red-600">{state.error}</p>
      )}
      {state?.ok && (
        <p className="text-green-700">
          Order {state.order.id} placed: {state.order.total} ETB
        </p>
      )}
    </form>
  );
}

function Field({ name, label, errors }) {
  return (
    <label className="block text-sm">
      {label}
      <input name={name} className="mt-1 block w-full border p-2" />
      {errors && <span className="text-red-600">{errors[0]}</span>}
    </label>
  );
}