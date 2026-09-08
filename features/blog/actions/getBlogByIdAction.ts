"use server";

import connectDB from "@/server/config/mongoConfig";
import { Blog } from "../model";
import { type ObjectId } from "mongoose";

interface Blog {
  _id: ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  author: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export async function getBlogByIdAction(blogId: string) {
  if (!blogId) {
    throw new Error("Blog ID is required");
  }
  try {
    await connectDB();
    const blog: Blog = await Blog.findById(blogId).lean();
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw new Error("Failed to fetch blog by ID");
  }
}
