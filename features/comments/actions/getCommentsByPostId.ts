"use server";

import connectDB from "@/server/config/mongoConfig";
import { Comments } from "../model";

export async function getCommentsByPostId(args: { postId: string }) {
  if (!args.postId || typeof args.postId !== "string") {
    throw new Error("Invalid postId");
  }

  try {
    await connectDB();

    const comments = await Comments.find({ postId: args.postId })
      .sort({
        createdAt: -1,
      })
      .lean();

    if (!Array.isArray(comments) || comments.length === 0) {
      return [];
    }

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
}
