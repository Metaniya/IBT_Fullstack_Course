import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

function hash(password) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${key}`;
}

export function verifyPassword(password, stored) {
  const [salt, key] = stored.split(":");
  const attempt = scryptSync(password, salt, 64);
  return timingSafeEqual(attempt, Buffer.from(key, "hex"));
}

const users = (globalThis.__users ??= [
  { id: "usr_abel", name: "Abel", phone: "0911111111", role: "customer", passwordHash: hash("abel-pass-1") },
  { id: "usr_sara", name: "Sara", phone: "0922222222", role: "customer", passwordHash: hash("sara-pass-2") },
  { id: "usr_kitchen", name: "Kitchen", phone: "0933333333", role: "staff", passwordHash: hash("kitchen-pass-3") },
]);

export function findUserByPhone(phone) {
  return users.find((u) => u.phone === phone) ?? null;
}

export function findUserById(id) {
  return users.find((u) => u.id === id) ?? null;
}