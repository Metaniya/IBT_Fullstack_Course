import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listOrdersFor, statusOf } from "@/lib/orders";
import { cancelOrder } from "../actions";
import { signOut } from "../auth-actions";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const orders = listOrdersFor(user.id); // the important line

  return (
    <main className="p-8">
      <h1 className="mb-1 text-2xl font-bold">Orders</h1>
      <p className="mb-4 text-sm">
        Signed in as {user.name}.{" "}
        <form action={signOut} className="inline">
          <button className="underline">Sign out</button>
        </form>
      </p>

      {orders.length === 0 && <p>No orders yet.</p>}
      <ul className="space-y-2">
        {orders.map((o) => {
          const status = statusOf(o);
          return (
            <li key={o.id} className="flex items-center gap-4 rounded border p-3">
              <span>
                {o.id} · {o.lines.map((l) => `${l.name} × ${l.quantity}`).join(", ")} ·{" "}
                {o.total} {o.currency}
              </span>
              <span className="text-sm">({status})</span>
              <Link href={`/orders/${o.id}`} className="text-sm underline">
                Track
              </Link>
              {status === "placed" && (
                <form action={cancelOrder}>
                  <input type="hidden" name="orderId" value={o.id} />
                  <button className="text-sm underline">Cancel</button>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}