"use server";

import connectDB from "@/server/config/mongoConfig";
import SignUpModel from "@/server/models/signup.model";
import { signUpSchema } from "@/validation/signUpSchema";
import bcrypt from "bcryptjs";

type Data = {
  name: string;
  email: string;
  password: string;
};

export async function signupAction(data: Data) {
  const validate = signUpSchema.safeParse(data);
  if (!validate.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }
  try {
    const { name, email, password } = data;
    await connectDB();
    const isUserBeforSignedup = await SignUpModel.findOne({
      email,
    });

    if (isUserBeforSignedup) {
      return {
        success: false,
        message: "You have already signed up.",
        status: 409,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await SignUpModel.insertOne({
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

export async function login() {}
