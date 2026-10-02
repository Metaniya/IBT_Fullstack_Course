import { getDishes } from "@/app/menu/dishes";

export async function GET() {
  const dishes = await getDishes();
  return Response.json(dishes);
}