import { object, string, email } from "zod";

export const loginSchemaValidation = object({
  email: email({ message: "Invalid email address" }),
  password: string().trim().min(8, { error: "Be at least 8 characters long" }),
});
