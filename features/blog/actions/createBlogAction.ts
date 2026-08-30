"use server";

import { getUser } from "@/features/auth/actions/getUser";
import { verifySession } from "@/lib/session";
import connectDB from "@/server/config/mongoConfig";
import Blog from "@/features/blog/model/blog.model";
import { blogSchema } from "@/validation/blogSchema";

interface DataType {
  title: string;
  description: string;
}

type Returned = Promise<
  | {
      success: boolean;
      message: string;
      status: number;
    }
  | undefined
>;

export default async function createBlogAction(data: DataType): Returned {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    return {
      success: false,
      message: "User is not Login!",
      status: 401,
    };
  }

  const validate = blogSchema.safeParse(data);
  if (!validate.success) {
    return {
      success: false,
      message: "Invalid Data!",
      status: 400,
    };
  }

  try {
    await connectDB();
    const userInfo = await getUser();
    if (userInfo?.status === 404) {
      return {
        success: false,
        message: "User Not Found!",
        status: userInfo.status,
      };
    }
    const { title, description } = data;
    await Blog.insertOne({
      title,
      description,
      author: {
        name: userInfo?.data?.name,
        email: userInfo?.data?.email,
      },
    });
    return {
      success: true,
      message: "Blog has been Created successfully.",
      status: 201,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        status: 500,
      };
    }
  }
}
