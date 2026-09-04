"use server";

import connectDB from "@/server/config/mongoConfig";
import { User } from "../model";
import { SignupData } from "../types";
import { signUpSchemaValidation } from "../validation";
import { hashing } from "../lib";

export async function signupAction(data: SignupData) {
  const validate = signUpSchemaValidation.safeParse(data);
  if (!validate.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }
  try {
    const { name, email, password } = data;
    await connectDB();
    const isUserBeforSignedup = await User.findOne({
      email,
    });

    if (isUserBeforSignedup) {
      return {
        success: false,
        message: "You have already signed up.",
        status: 409,
      };
    }

    const hashPassword = await hashing(password);

    await User.insertOne({
      name,
      email,
      password: hashPassword,
    });

    return {
      success: true,
      message: "You signed up seccessfully! Now You can login.",
      status: 201,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }
}
