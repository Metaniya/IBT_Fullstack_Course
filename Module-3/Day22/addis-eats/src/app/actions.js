"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { submitOrder, findOrder, markCancelled, setStatus } from "@/lib/orders";

export async function placeOrder(prevState, formData) {
  const user = await getSession();

  let lines = [];
  try {
    lines = JSON.parse(formData.get("lines") || "[]");
  } catch {
    lines = [];
  }

  const input = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    lines,
  };

  const { status, body } = await submitOrder(input, user?.id ?? null);
  if (status !== 201) return body;

  revalidatePath("/orders");
  return { ok: true, order: body };
}

export async function cancelOrder(formData) {
  const orderId = String(formData.get("orderId") ?? ""); // untrusted

  const user = await getSession();
  if (!user) {
    console.warn("[auth] cancelOrder refused: not signed in");
    throw new Error("Not signed in"); // 401
  }

  const order = findOrder(orderId);
  if (!order) {
    console.warn("[auth] cancelOrder refused: no such order", orderId);
    throw new Error("No such order"); // 404
  }
  if (order.userId !== user.id) {
    console.warn("[auth] cancelOrder refused: not owner", { user: user.id, orderId });
    throw new Error("Not yours"); // 403
  }

  markCancelled(orderId);
  revalidatePath("/orders");
}

export async function markDelivered(formData) {
  const user = await getSession();
  if (!user) {
    console.warn("[auth] markDelivered refused: not signed in");
    throw new Error("Not signed in");
  }
  if (user.role !== "staff") {
    console.warn("[auth] markDelivered refused: not staff", { user: user.id });
    throw new Error("Not allowed");
  }

  setStatus(String(formData.get("orderId") ?? ""), "delivered");
  revalidatePath("/kitchen");
}