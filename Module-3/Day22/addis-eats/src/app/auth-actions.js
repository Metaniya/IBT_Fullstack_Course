"use server";

import { redirect } from "next/navigation";
import { findUserByPhone, verifyPassword } from "@/lib/users";
import { createSession, destroySession } from "@/lib/session";
import { safeNext } from "@/lib/safeNext";

export async function signIn(prevState, formData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next")); // never trust the URL value

  const user = findUserByPhone(phone);
  // One message for both cases, so nobody can learn which phones exist.
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Wrong phone number or password" };
  }

  await createSession(user.id);
  redirect(next); // redirect() throws on purpose, so keep it outside try/catch
}

export async function signOut() {
  await destroySession();
  redirect("/signin");
}