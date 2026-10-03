import { orderSchema } from "./orderSchema";
import { getDishes } from "@/app/menu/dishes";

// globalThis keeps the array alive across dev hot reloads.
const store = (globalThis.__orders ??= []);

export function listOrders() {
  return store;
}

// Exercise 6: scoped by owner. Only ever ask for orders by the SESSION's id.
export function listOrdersFor(userId) {
  return store.filter((o) => o.userId === userId);
}

export function findOrder(id) {
  return store.find((o) => o.id === id) ?? null;
}

export function setStatus(id, status) {
  const order = findOrder(id);
  if (order) order.status = status;
}

export function markCancelled(id) {
  setStatus(id, "cancelled");
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
    createdAt: Date.now(),
  };
  store.push(order);
  return { status: 201, body: order };
}

// Demo only: a real app would update status from the kitchen.
export function statusOf(order) {
  if (order.status !== "placed") return order.status; // cancelled, delivered by staff
  const seconds = (Date.now() - order.createdAt) / 1000;
  if (seconds < 15) return "placed";
  if (seconds < 30) return "preparing";
  if (seconds < 45) return "on the way";
  return "delivered";
}