import { object, string, email } from "zod";

export const signUpSchema = object({
  name: string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: email({ message: "Invalid email address" }),
  password: string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export const loginSchema = object({
  email: email({ message: "Invalid email address" }),
  password: string().trim().min(8, { error: "Be at least 8 characters long" }),
});
