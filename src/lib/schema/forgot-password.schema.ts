import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;

export const codeSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .min(1, "Verification code is required")
    .regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export type CodeFormValues = z.infer<typeof codeSchema>;

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a symbol"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
