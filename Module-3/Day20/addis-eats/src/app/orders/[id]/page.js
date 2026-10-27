import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listOrdersFor, statusOf } from "@/lib/orders";
import { etb, when, relative } from "@/lib/format";
import { cancelOrder } from "../actions";
import { signOut } from "../auth-actions";
import ExportCsvButton from "./ExportCsvButton";

export const metadata = { title: "Your orders", robots: { index: false } };

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const orders = listOrdersFor(user.id); // scoped to the session

  // Plain rows for the CSV. Money stays a number; dates stay UTC.
  const rows = orders.map((o) => ({
    id: o.id,
    placed: new Date(o.createdAt).toISOString(),
    area: o.area ?? "",
    status: statusOf(o),
    items: o.lines.map((l) => `${l.name} × ${l.quantity}`).join(", "), // contains commas on purpose
    total: o.total,
  }));

  return (
    <main className="p-8">
      <h1 className="mb-1 text-2xl font-bold">Orders</h1>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <span>Signed in as {user.name}.</span>
        <form action={signOut}>
          <button className="underline">Sign out</button>
        </form>
        <ExportCsvButton rows={rows} />
      </div>

      {orders.length === 0 && (
        <div className="rounded border p-6">
          <p className="font-semibold">No orders yet</p>
          <p className="mt-1 text-sm text-gray-600">
            Your orders will show up here once you place one.
          </p>
          <Link href="/menu" className="mt-3 inline-block underline">
            Browse the menu to place your first order
          </Link>
        </div>
      )}

      <ul className="space-y-2">
        {orders.map((o) => {
          const status = statusOf(o);
          return (
            <li key={o.id} className="flex flex-wrap items-center gap-4 rounded border p-3">
              <span>
                {o.id} · {o.lines.map((l) => `${l.name} × ${l.quantity}`).join(", ")} ·{" "}
                {etb(o.total)}
              </span>
              <span className="text-sm text-gray-600">
                {when(o.createdAt)} ({relative(o.createdAt)})
              </span>
              <span className="text-sm">({status})</span>
              <Link href={`/orders/${o.id}`} className="text-sm underline">
                Status
              </Link>
              <Link href={`/track/${o.id}`} className="text-sm underline">
                Map
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