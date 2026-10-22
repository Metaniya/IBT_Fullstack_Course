// Priority: explicit override (custom domain) > Vercel's production domain > local dev.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000";
export const SITE_NAME = "Addis Eats";