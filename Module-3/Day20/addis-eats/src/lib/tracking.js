import { getSession } from "./session";
import { findOrder, statusOf } from "./orders";

export const ORIGIN = [9.0054, 38.7636]; // the kitchen
export const AREA_COORDS = {
  Bole: [8.995, 38.7896],
  Piassa: [9.0357, 38.7469],
  Kazanchis: [9.015, 38.7625],
};

const FINISHED = ["delivered", "cancelled"];
export const isFinished = (status) => FINISHED.includes(status);

// Plain, serialisable data only. Never includes userId.
export function trackingOf(order) {
  const status = statusOf(order);
  const area = order.area ?? "Bole";
  const destination = AREA_COORDS[area] ?? AREA_COORDS.Bole;

  const seconds = (Date.now() - order.createdAt) / 1000;
  let progress = 0;
  if (status === "on the way") progress = Math.min(1, Math.max(0, (seconds - 30) / 15));
  if (status === "delivered") progress = 1;

  const courier = [
    ORIGIN[0] + (destination[0] - ORIGIN[0]) * progress,
    ORIGIN[1] + (destination[1] - ORIGIN[1]) * progress,
  ];

  return {
    id: order.id,
    status,
    area,
    total: order.total,
    currency: order.currency,
    origin: ORIGIN,
    destination,
    courier,
    progress,
    placedAt: order.createdAt,
    etaAt: order.createdAt + 45_000, // demo: delivered 45 seconds after placing
    updatedAt: Date.now(),
  };
}

// Same checks as every other order endpoint. Returns { order } or { fail: Response }.
export async function loadOrderFor(id) {
  const user = await getSession();
  if (!user) {
    return { fail: Response.json({ error: "Please sign in" }, { status: 401 }) };
  }
  const order = findOrder(id);
  if (!order) {
    return { fail: Response.json({ error: "No such order" }, { status: 404 }) };
  }
  if (order.userId !== user.id) {
    console.warn("[auth] tracking refused: not owner", { user: user.id, id });
    return { fail: Response.json({ error: "Not your order" }, { status: 403 }) };
  }
  return { order };
}