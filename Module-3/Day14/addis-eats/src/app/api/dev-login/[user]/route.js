import { cookies } from "next/headers";

export async function GET(request, { params }) {
  const { user } = await params;
  const store = await cookies();
  store.set("session", user, { httpOnly: true, path: "/" });
  return Response.json({ signedInAs: user });
}