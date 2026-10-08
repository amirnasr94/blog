"use server";

import connectDB from "@/server/config/mongoConfig";
import { Comments } from "../model";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createComment(args: { postId: string; content: string }) {
  if (!args.postId || typeof args.postId !== "string") {
    throw new Error("Invalid postId");
  }

  try {
    await connectDB();
    const response = await Comments.insertOne({
      postId: new Types.ObjectId(args.postId),
      content: args.content,
      authorId: "userId", // Replace with actual user ID
      authorName: "userName", // Replace with actual user name
    });
    revalidatePath("/blogs");
    console.log(response);

  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
}
