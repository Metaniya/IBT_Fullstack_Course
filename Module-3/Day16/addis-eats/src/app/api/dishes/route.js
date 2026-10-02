import { queryDishes } from "@/lib/dishQuery";

export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const page = Number.parseInt(sp.get("page") ?? "1", 10);

  if (!Number.isInteger(page) || page < 1) {
    return Response.json(
      { error: "page must be a positive integer" },
      { status: 400 }
    );
  }

  const result = await queryDishes({ q: sp.get("q") ?? "", page });
  return Response.json(result);
}