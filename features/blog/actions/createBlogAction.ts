"use server";

import { getUser } from "@/features/auth/actions/getUserAction";
import { verifySession } from "@/features/auth/lib/session";
import connectDB from "@/server/config/mongoConfig";
import { uploadImage } from "../logic/uploadImage";
import { blogSchema } from "../validation/blogSchema";
import { infer as zodInfer } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { Blog } from "../model";
import { redirect } from "next/navigation";

type ActionResult = { success: true } | { success: false; error: string };

export async function createBlogAction(
  data: zodInfer<typeof blogSchema>,
): Promise<ActionResult> {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect("/login");
  }

  const validate = blogSchema.safeParse(data);
  if (!validate.success) {
    return {
      success: false,
      error: "Invalid Data!",
    };
  }

  try {
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "User Not Found!",
      };
    }

    await connectDB();
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
    await Blog.create({
      title,
      description,
      imageUrl: imageUrl.secure_url,
      author: {
        id: user.id,
        name: user.name,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log("create blog error", error);
    return { success: false, error: "create blog has been failed!" };
  }
}
