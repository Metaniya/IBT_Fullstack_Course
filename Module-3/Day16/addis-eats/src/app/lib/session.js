import { cookies } from "next/headers";

// Returns the signed-in user id, or null.
export async function getSession() {
  const store = await cookies();
  return store.get("session")?.value ?? null;
}