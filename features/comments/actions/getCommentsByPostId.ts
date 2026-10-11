"use server";

import connectDB from "@/server/config/mongoConfig";
import { Comments } from "../model";

type ResultAction =
  | { success: true; data: CommentType[] }
  | { success: false; error: string; data: [] };

export async function getCommentsByPostId(args: {
  postId: string;
}): Promise<ResultAction> {
  if (!args.postId || typeof args.postId !== "string" || !args.postId.trim()) {
    return {
      success: false,
      error: "A valid post ID is required to fetch comments.",
      data: [],
    };
  }

  try {
    await connectDB();

    const comments = await Comments.find({ postId: args.postId })
      .select("content authorName createdAt")
      .sort({
        createdAt: -1,
      })
      .lean();

    return {
      success: true,
      data: comments.map((comment) => ({
        id: comment._id.toString(),
        content: comment.content,
        authorName: comment.authorName,
        createAt: comment.createdAt,
      })),
    };
  } catch (error) {
    console.error("getCommentsByPostId action failed: ", error);
    return {
      success: false,
      error: "Failed to load comments. Please try again later.",
      data: [],
    };
  }
}
