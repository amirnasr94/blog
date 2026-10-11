"use server";

import connectDB from "@/server/config/mongoConfig";
import { Comments } from "../model";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/features/auth/lib";
import { commentSchema } from "../validation";
import { User } from "@/features/auth/model";

type ActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
    };

export async function createComment(args: {
  postId: string;
  content: string;
}): Promise<ActionResult> {
  const validation = commentSchema.safeParse(args);
  const session = await verifySession();

  if (!session.isAuth) {
    return {
      success: false,
      error: "Please login at first to leave a comment.",
    };
  }

  if (!validation.success) {
    return {
      success: false,
      error: "Please check your comment and try again.",
    };
  }

  try {
    await connectDB();
    const user = await User.findById(session.userId)
      .select("name email")
      .lean();

    if (!user) {
      return {
        success: false,
        error: "Your account could not be found. Please log in again.",
      };
    }
    await Comments.create({
      postId: new Types.ObjectId(args.postId),
      content: args.content,
      authorId: user._id.toString(),
      authorName: user.name,
    });
  } catch (error) {
    console.error("createComment action failes: ", error);
    return {
      success: false,
      error: "Unable to post your comment. Please try again later.",
    };
  }

  revalidatePath("/blogs");
  return { success: true };
}
