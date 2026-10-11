"use server";

import connectDB from "@/server/config/mongoConfig";
import { comparePass, createSession } from "../lib";
import { User } from "../model";
import { loginSchemaValidation } from "../validation";

type ResultAction =
  | { success: true }
  | {
      success: false;
      error: string;
    };

export async function loginAction(data: LoginData): Promise<ResultAction> {
  const validation = loginSchemaValidation.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: "Please enter a valid email address and password.",
    };
  }

  try {
    const { email, password } = data;
    await connectDB();

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password.",
      };
    }

    const isTruthPass = await comparePass(password, user.password);
    if (!isTruthPass) {
      return {
        success: false,
        error: "Invalid email or password.",
      };
    }
    await createSession(user._id.toString());

    return {
      success: true,
    };
  } catch (error) {
    console.log("Login action failed: ", error);

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
