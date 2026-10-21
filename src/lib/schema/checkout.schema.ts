import { z } from "zod";

export const checkoutSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),

  details: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .min(5, "Address must be at least 5 characters"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+20|0)1[0125][0-9]{8}$/,
      "Enter a valid Egyptian phone number",
    ),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
