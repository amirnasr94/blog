import { object, string, email } from "zod";

export const signUpSchema = object({
  name: string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: email({ message: "Invalid email address" }),
  password: string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password must be less than 30 characters" }),
});
