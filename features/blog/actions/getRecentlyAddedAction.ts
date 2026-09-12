"use server";

import { getUser } from "@/features/auth/actions";
import connectDB from "@/server/config/mongoConfig";
import { Blog } from "../model";

export async function getRecentlyAddedAction() {
  try {
    await connectDB();
    const userInfo = await getUser();

    let author;

    if (userInfo?.status === 200) {
      author = userInfo.data?.email;
    } else author = process.env.NEXT_PUBLIC_AUTHOR;

    if (!author) {
      return {
        data: [],
        status: 200,
      };
    }

    const response = await Blog.find({
      "author.email": author,
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return {
      data: response,
      status: 200,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        status: 500,
      };
    }
  }
}
