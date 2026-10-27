export function safeNext(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/")) return "/"; // absolute URLs
  if (value.startsWith("//") || value.startsWith("/\\")) return "/"; // protocol-relative tricks
  return value;
}