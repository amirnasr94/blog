"use server";

import connectDB from "@/server/config/mongoConfig";
import { comparePass, createSession } from "../lib";
import { User } from "../model";
import { LoginData } from "../types";
import { loginSchemaValidation } from "../validation";

export async function loginAction(data: LoginData) {
  const validation = loginSchemaValidation.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid form data",
    };
  }

  try {
    const { email, password } = data;
    await connectDB();
    const isUserExist = await User.exists({ email });
    if (!isUserExist) {
      return {
        success: false,
        status: 404,
        message: "This user not find! You should first sign up.",
      };
    }

    const user = await User.findOne({ email });
    const isTruthPass = await comparePass(password, user.password);
    if (!isTruthPass) {
      return {
        success: false,
        status: 403,
        message: "Invalid Password or Email!",
      };
    }
    await createSession(email);
    return {
      success: true,
      status: 200,
      message: "Login successfull.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        status: 500,
        message: error.message,
      };
    }
  }
}
