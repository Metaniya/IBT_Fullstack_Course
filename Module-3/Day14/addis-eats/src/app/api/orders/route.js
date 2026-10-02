import { getSession } from "@/lib/session";
import { submitOrder } from "@/lib/orders";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  const userId = await getSession();
  const { status, body: result } = await submitOrder(body, userId);
  return Response.json(result, { status });
}