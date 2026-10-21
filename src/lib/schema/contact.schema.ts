import { z } from "zod";

// used by the dropdown AND by the validation
export const contactSubjects: string[] = [
  "General Inquiry",
  "Order Support",
  "Shipping Question",
  "Returns & Refunds",
  "Product Information",
  "Feedback & Suggestions",
  "Other",
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  subject: z
    .string()
    .min(1, "Please select a subject")
    .refine((value) => contactSubjects.includes(value), "Invalid subject"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or less"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
