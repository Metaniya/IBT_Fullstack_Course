"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const fieldErrors = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-4 max-w-sm space-y-3">
      <Field name="name" label="Name" errors={fieldErrors.name} />
      <Field name="phone" label="Phone" errors={fieldErrors.phone} />
      <label className="block text-sm">
        Area
        <select name="area" className="mt-1 block w-full border p-2">
          <option>Bole</option>
          <option>Piassa</option>
          <option>Kazanchis</option>
        </select>
      </label>
      <label className="block text-sm">
        Dish
        <select name="dishId" className="mt-1 block w-full border p-2">
          <option value="kitfo">Kitfo</option>
          <option value="doro-wat">Doro Wat</option>
          <option value="tibs">Beef Tibs</option>
          <option value="shiro">Shiro</option>
        </select>
      </label>
      <Field name="quantity" label="Quantity" defaultValue="1" errors={fieldErrors.quantity} />
      <button
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Sending..." : "Order"}
      </button>
      {state?.ok && (
        <p className="text-green-700">
          Order {state.order.id} placed: {state.order.total} ETB
        </p>
      )}
    </form>
  );
}

function Field({ name, label, errors, defaultValue }) {
  return (
    <label className="block text-sm">
      {label}
      <input
        name={name}
        defaultValue={defaultValue}
        className="mt-1 block w-full border p-2"
      />
      {errors && <span className="text-red-600">{errors[0]}</span>}
    </label>
  );
}