"use server";

import { verifySession } from "@/lib/session";
import connectDB from "@/server/config/mongoConfig";
import UserModel from "@/server/models/user.model";
import { cache } from "react";

type Returned = Promise<
  | {
      status: number;
      message: string;
      data?: {
        name: string;
        email: string;
        role: "admin" | "user";
      } | null;
    }
  | undefined
>;

export const getUser = cache(async function (): Returned {
  try {
    const { userEmail } = await verifySession();
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail });
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
});
