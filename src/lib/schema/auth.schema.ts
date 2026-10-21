import { z } from "zod";

export const registerSchema = z
  .object({
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

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a symbol"),

    rePassword: z.string().min(1, "Please confirm your password"),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(
        /^(?:\+20|0)1[0125][0-9]{8}$/,
        "Enter a valid Egyptian phone number",
      ),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),


  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

