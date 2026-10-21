import { z } from "zod";

const phoneRegex = /^(?:\+20|0)1[0125][0-9]{8}$/;

export const addressSchema = z.object({
  name: z.string().trim().min(1, "Address name is required"),
  details: z
    .string()
    .trim()
    .min(1, "Full address is required")
    .min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Enter a valid Egyptian phone number"),
  city: z.string().trim().min(1, "City is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Enter a valid Egyptian phone number"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(1, "New password is required")
      .min(6, "Must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
