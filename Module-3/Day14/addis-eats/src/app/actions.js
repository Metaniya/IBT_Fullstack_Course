"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { submitOrder, findOrder, markCancelled } from "@/lib/orders";

export async function placeOrder(prevState, formData) {
  const userId = await getSession();
  const { status, body } = await submitOrder(Object.fromEntries(formData), userId);

  if (status !== 201) return body;

  revalidatePath("/orders"); // the cached orders page is now out of date
  return { ok: true, order: body };
}

export async function cancelOrder(formData) {
  const orderId = formData.get("orderId"); // untrusted: it came from the client

  const user = await getSession();
  if (!user) throw new Error("Not signed in");

  const order = findOrder(orderId);
  if (!order) throw new Error("No such order");
  if (order.userId !== user) throw new Error("Not yours"); // compare to the SESSION

  markCancelled(orderId);
  revalidatePath("/orders");
}