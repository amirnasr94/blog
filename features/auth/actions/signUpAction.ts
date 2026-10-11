"use server";

import connectDB from "@/server/config/mongoConfig";
import { User } from "../model";
import { signUpSchemaValidation } from "../validation";
import { hashing } from "../lib";

type ResultAction = { success: true } | { success: false; error: string };

export async function signupAction(data: SignupData): Promise<ResultAction> {
  const validate = signUpSchemaValidation.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: "Please check your information and try again.",
    };
  }

  try {
    const { name, email, password } = data;

    await connectDB();

    const isUserBeforSignedup = await User.findOne({ email });

    if (isUserBeforSignedup) {
      return {
        success: false,
        error: "An account with this email address already exists.",
      };
    }

    const hashPassword = await hashing(password);

    await User.insertOne({
      name,
      email,
      password: hashPassword,
    });

    return { success: true };
  } catch (error) {
    console.error("SignUp action failed:", error);
    return {
      success: false,
      error: "Unable to create your account. Please try again later.",
    };
  }
}
