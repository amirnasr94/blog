"use server";

import { verifySession } from "@/lib/session";
import connectDB from "@/server/config/mongoConfig";
import UserModel from "@/server/models/user.model";
import { cache } from "react";

export const getUser = cache(async function () {
  try {
    const { userEmail } = await verifySession();
    await connectDB();
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return {
        status: 404,
        user: null,
        message: "User not exsist!",
      };
    }

    return {
      status: 200,
      user: user.name,
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
