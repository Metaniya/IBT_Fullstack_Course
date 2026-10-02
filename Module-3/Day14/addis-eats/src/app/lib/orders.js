import { orderSchema } from "./orderSchema";
import { getDish } from "@/app/menu/dishes";

// globalThis keeps the array alive across dev hot reloads.
const store = (globalThis.__orders ??= []);

export function listOrders() {
  return store;
}

export function findOrder(id) {
  return store.find((o) => o.id === id) ?? null;
}

export function markCancelled(id) {
  const order = findOrder(id);
  if (order) order.status = "cancelled";
}

export async function submitOrder(input, userId) {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: 422,
      body: {
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const dish = await getDish(parsed.data.dishId);
  if (!dish) {
    return {
      status: 422,
      body: {
        error: "Validation failed",
        fieldErrors: { dishId: ["Unknown dish"] },
      },
    };
  }

  // The price comes from the server, never from the client.
  const order = {
    id: `ord_${crypto.randomUUID().slice(0, 8)}`,
    userId: userId ?? "guest",
    dishId: dish.id,
    quantity: parsed.data.quantity,
    total: dish.price * parsed.data.quantity,
    currency: "ETB",
    status: "placed",
  };
  store.push(order);
  return { status: 201, body: order };
}