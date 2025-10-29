import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot exceed 64 characters"),
});


export const registerUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot exceed 64 characters"),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format"), // more precise E.164-compatible pattern

  fullname: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(32, "Full name cannot exceed 32 characters"),

  role: z.enum(["admin", "customer", "seller"]).refine(
    (val) => ["admin", "customer", "seller"].includes(val),
    "Role must be one of: admin, customer, or seller"
  ),
});







export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
