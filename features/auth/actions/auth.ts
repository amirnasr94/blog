"use server";
import { createSession, deleteSession } from "@/lib/session";
import { comparePass, hashing } from "@/lib/utils";
import connectDB from "@/server/config/mongoConfig";
import UserModel from "@/server/models/user.model";
import { loginSchema, signUpSchema } from "@/validation/authSchema";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = Pick<SignupData, "email" | "password">;

export async function signupAction(data: SignupData) {
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
    const isUserBeforSignedup = await UserModel.findOne({
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

    await UserModel.insertOne({
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

export async function loginAction(data: LoginData) {
  const validation = loginSchema.safeParse(data);

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
    const isUserExist = await UserModel.exists({ email });
    if (!isUserExist) {
      return {
        success: false,
        status: 404,
        message: "This user not find! You should first sign up.",
      };
    }

    const user = await UserModel.findOne({ email });
    const isTruthPass = await comparePass(password, user.password);
    if (!isTruthPass) {
      return {
        success: false,
        status: 403,
        message: "Password or Email is wrong!",
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

export async function logout() {
  try {
    await deleteSession();
    return {
      success: true,
      status: 200,
      message: "Logout successfull.",
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
