import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findOrder } from "@/lib/orders";
import { trackingOf } from "@/lib/tracking";
import OrderTracker from "./OrderTracker";

export const metadata = { title: "Track your order", robots: { index: false } };

export default async function TrackPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) redirect(`/signin?next=/track/${id}`);

  const order = findOrder(id);
  if (!order || order.userId !== user.id) notFound();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Tracking order {order.id}</h1>
      <OrderTracker id={order.id} initial={trackingOf(order)} />
    </main>
  );
}