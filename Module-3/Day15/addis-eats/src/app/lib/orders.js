import { orderSchema } from "./orderSchema";
import { getDishes } from "@/app/menu/dishes";

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

  if (!userId) {
    return { status: 401, body: { error: "Please sign in to place an order" } };
  }

  const menu = await getDishes();
  let total = 0;
  const lines = [];

  for (const line of parsed.data.lines) {
    const dish = menu.find((d) => d.id === line.dishId);
    if (!dish) {
      return {
        status: 422,
        body: {
          error: "Validation failed",
          fieldErrors: { lines: [`Unknown dish: ${line.dishId}`] },
        },
      };
    }
    // The price comes from the server, never from the client.
    lines.push({
      dishId: dish.id,
      name: dish.name,
      quantity: line.quantity,
      price: dish.price,
    });
    total += dish.price * line.quantity;
  }

  const order = {
    id: `ord_${crypto.randomUUID().slice(0, 8)}`,
    userId,
    lines,
    total,
    currency: "ETB",
    status: "placed",
  };
  store.push(order);
  return { status: 201, body: order };
}