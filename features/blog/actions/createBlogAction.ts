"use server";

import { getUser } from "@/features/auth/actions/getUser";
import { verifySession } from "@/lib/session";
import connectDB from "@/server/config/mongoConfig";
import Blog from "@/features/blog/model/blog.model";
import { uploadImage } from "../logic/uploadImage";
import { blogSchema } from "../validation/blogSchema";
import { infer as zodInfer } from "zod";
import { v2 as cloudinary } from "cloudinary";

type Returned = Promise<
  | {
      success: boolean;
      message: string;
      status: number;
    }
  | undefined
>;

export default async function createBlogAction(
  data: zodInfer<typeof blogSchema>,
): Returned {
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

    const { title, description, image } = data;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadImageResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.log("cloadinary error", error);

              return reject(error);
            }
            resolve(result);
          },
        )
        .end(buffer);
    });

    const imageUrl = uploadImageResponse as {
      secure_url: string;
    };

    await Blog.insertOne({
      title,
      description,
      imageUrl: imageUrl.secure_url,
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
