"use server";

import { verifySession } from "@/features/auth/lib/session";
import connectDB from "@/server/config/mongoConfig";
import { UserType } from "../types";
import { User } from "../model";

export async function getUser(): UserType {
  try {
    const { userEmail } = await verifySession();
    await connectDB();
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return {
        status: 404,
        data: null,
        message: "User not exsist!",
      };
    }

    return {
      status: 200,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User found successfull.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}
