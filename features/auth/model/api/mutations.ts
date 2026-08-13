import { SIGNUP_ENDPOINT } from "@/lib/constants";
import { signUpSchema } from "@/validation/signUpSchema";
import { infer as ZodInfer } from "zod";

export async function postUser(
  args: ZodInfer<typeof signUpSchema>,
): Promise<{ message: string; status: number }> {
  const response = await fetch(SIGNUP_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(args),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return await response.json();
}
