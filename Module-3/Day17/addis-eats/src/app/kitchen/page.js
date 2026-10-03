import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listOrders, statusOf } from "@/lib/orders";
import { markDelivered } from "../actions";

export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");
  if (user.role !== "staff") notFound(); // checked here, not in the markup

  const orders = listOrders();

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Kitchen</h1>
      {orders.length === 0 && <p>No orders.</p>}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center gap-4 rounded border p-3">
            <span>
              {o.id} ({o.userId}) · {o.lines.map((l) => `${l.name} × ${l.quantity}`).join(", ")}
            </span>
            <span className="text-sm">({statusOf(o)})</span>
            <form action={markDelivered}>
              <input type="hidden" name="orderId" value={o.id} />
              <button className="text-sm underline">Mark delivered</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}