// Built once, reused everywhere. Locale AND time zone are always named,
// so the server and the phone agree (no hydration mismatch).
const etbFmt = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const whenFmt = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT, UTC+3, no daylight saving
});

const clockFmt = new Intl.DateTimeFormat("en-ET", {
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

const relFmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const listFmt = new Intl.ListFormat("en");

export const etb = (value) => etbFmt.format(value); // etb(14200) -> ETB 14,200
export const when = (ts) => whenFmt.format(new Date(ts)); // date and time, EAT
export const clock = (ts) => clockFmt.format(new Date(ts)); // time only, EAT
export const list = (items) => listFmt.format(items);

// relative(Date.now() - 12 * 60_000) -> "12 minutes ago"
export function relative(ts, now = Date.now()) {
  const seconds = Math.round((ts - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return relFmt.format(seconds, "second");
  if (abs < 3600) return relFmt.format(Math.round(seconds / 60), "minute");
  if (abs < 86400) return relFmt.format(Math.round(seconds / 3600), "hour");
  return relFmt.format(Math.round(seconds / 86400), "day");
}