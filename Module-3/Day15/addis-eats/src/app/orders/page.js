import { listOrders } from "@/lib/orders";
import { cancelOrder } from "../actions";

export default function OrdersPage() {
  const orders = listOrders();
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center gap-4 rounded border p-3">
            <span>
              {o.id} ·{" "}
              {o.lines.map((l) => `${l.name} × ${l.quantity}`).join(", ")} ·{" "}
              {o.total} {o.currency}
            </span>
            <span className="text-sm">
              ({o.userId}, {o.status})
            </span>
            {o.status === "placed" && (
              <form action={cancelOrder}>
                <input type="hidden" name="orderId" value={o.id} />
                <button className="text-sm underline">Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}