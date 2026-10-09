"use server";

import connectDB from "@/server/config/mongoConfig";
import { Blog } from "../model";

type ActionResult =
  | { success: true; data: BlogType }
  | { success: false; error: string; data: null };

export async function getBlogByIdAction(blogId: string): Promise<ActionResult> {
  if (!blogId) {
    return {
      success: false,
      error: "Blog ID is required",
      data: null,
    };
  }

  try {
    await connectDB();

    const blog = await Blog.findById(blogId)
      .select("title description imageUrl author createdAt")
      .lean();

    if (!blog) {
      return {
        success: false,
        error: "Can not find Blog!",
        data: null,
      };
    }

    return {
      success: true,
      data: {
        id: blog._id.toString(),
        title: blog.title,
        description: blog.description,
        imageUrl: blog.imageUrl,
        authorName: blog.author.name,
        createdAt: blog.createdAt,
      },
    };
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return {
      success: false,
      error: "Error during fetch blog ny Id",
      data: null,
    };
  }
}
