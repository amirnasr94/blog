"use server";

import { getUser } from "@/features/auth/actions/getUser";
import connectDB from "@/server/config/mongoConfig";
import { Blog, IBlog } from "../model";

type Returned = Promise<
  | {
      data: IBlog[] | null;
      status: number;
    }
  | undefined
>;

export async function getBlogsAction(): Returned {
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
      .populate("author", "name email")
      .sort({ createdAt: -1 })
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
