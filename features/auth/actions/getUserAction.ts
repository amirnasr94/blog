"use server";

import { cache } from "react";
import connectDB from "@/server/config/mongoConfig";
import { verifySession } from "@/features/auth/lib/session";
import { User } from "../model";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const getUser = cache(async (): Promise<CurrentUser | null> => {
  const { isAuth, userId } = await verifySession();
  if (!isAuth) return null;

  await connectDB();
  const user = await User.findById(userId).select("name email role").lean();
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
});
