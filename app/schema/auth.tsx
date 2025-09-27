import z, { email } from "zod";
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
    email: z.email(),
    password: PasswordSchema,
    remember: z.boolean().default(false)
})