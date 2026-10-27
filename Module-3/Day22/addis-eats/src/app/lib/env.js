import { z } from "zod";

const schema = z.object({
  SESSION_SECRET: z.string().min(16, "must be at least 16 characters"),
  TELEBIRR_SECRET: z.string().optional(),
  NEXT_PUBLIC_SITE_NAME: z.string().default("Addis Eats"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables. Compare your .env.local with .env.example.");
}

export const env = parsed.data;