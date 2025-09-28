import { z } from "zod";
const minPasswordLength = 8;
const maxPasswordLength = 128;

export const PasswordSchema = z.string()
    .min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`)
    .max(maxPasswordLength, `Password must be atmost ${maxPasswordLength} characters`)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: PasswordSchema,
    remember: z.boolean().default(false)
})

export const RegisterSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: PasswordSchema,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export const ResetPasswordSchema = z.object({
    email: z.email("Please enter a valid email address")
})