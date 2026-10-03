import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { findUserById } from "./users";

const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // seconds: one week

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET is missing or too short");
  return s;
}

function sign(data) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

function makeToken(userId) {
  const payload = Buffer.from(
    JSON.stringify({ id: userId, exp: Date.now() + MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null; // forged or tampered

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null; // expired
    return data;
  } catch {
    return null;
  }
}

// The ONE helper that pages, actions and handlers all use.
// Returns { id, name, role } or null.
export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  const data = readToken(token);
  if (!data) return null;

  const user = findUserById(data.id);
  return user ? { id: user.id, name: user.name, role: user.role } : null;
}

// Exercise 2: the cookie flags.
export async function createSession(userId) {
  const store = await cookies();
  store.set(COOKIE, makeToken(userId), {
    httpOnly: true, // JavaScript cannot read it
    secure: process.env.NODE_ENV === "production", // HTTPS only when deployed
    sameSite: "lax", // not sent on cross-site requests
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}