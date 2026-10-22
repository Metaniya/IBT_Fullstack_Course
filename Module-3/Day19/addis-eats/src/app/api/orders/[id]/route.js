import { getSession } from "@/lib/session";
import { findOrder, statusOf } from "@/lib/orders";

export async function GET(request, { params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) {
    return Response.json({ error: "Please sign in" }, { status: 401 });
  }

  const order = findOrder(id);
  if (!order) {
    return Response.json({ error: "No such order" }, { status: 404 });
  }
  if (order.userId !== user.id) {
    return Response.json({ error: "Not your order" }, { status: 403 });
  }

  return Response.json({ ...order, status: statusOf(order) });
}