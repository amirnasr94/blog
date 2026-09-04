import { v2 as cloudinary } from "cloudinary";

export async function uploadImage(image: File) {
  if (!image) {
    console.log("asjdnasjdnajs");

    throw new Error();
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
}
