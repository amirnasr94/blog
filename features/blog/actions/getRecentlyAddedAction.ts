"use server";

import { getUser } from "@/features/auth/actions";
import connectDB from "@/server/config/mongoConfig";
import { Blog } from "../model";

type ActionResult =
  | { success: true; data: BlogType[] }
  | { success: false; error: string; data: [] };

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID;

export async function getRecentlyAddedAction(): Promise<ActionResult> {
  try {
    await connectDB();
    const user = await getUser();
    let authorId;
    if (!user) {
      authorId = DEFAULT_USER_ID;
    } else authorId = user.id;

    if (!authorId) {
      return {
        success: false,
        error: "",
        data: [],
      };
    }

    const response = await Blog.find({
      "author.id": authorId,
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return {
      success: true,
      data: response.map((res) => ({
        id: res._id.toString(),
        title: res.title,
        description: res.description,
        imageUrl: res.imageUrl,
        authorName: res.author.name,
        createdAt: res.createdAt,
      })),
    };
  } catch (error) {
    console.log();

    return {
      success: false,
      error: "",
      data: [],
    };
  }
}
