import { loadOrderFor, trackingOf } from "@/lib/tracking";

export async function GET(request, { params }) {
  const { id } = await params;
  const { order, fail } = await loadOrderFor(id);
  if (fail) return fail;
  return Response.json(trackingOf(order));
}