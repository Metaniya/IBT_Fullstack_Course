import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(09\d{8}|\+2519\d{8})$/, "Use 09... or +2519..."),
  area: z.enum(["Bole", "Piassa", "Kazanchis"], {
    message: "Choose a delivery area",
  }),
  dishId: z.string().min(1, "Choose a dish"),
  quantity: z.coerce.number().int().min(1).max(10),
});