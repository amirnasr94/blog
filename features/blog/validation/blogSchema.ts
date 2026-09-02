import { object, string, instanceof as zodInstanceof } from "zod";

const maxFileSize = 5 * 1024 * 1024; // 5MB
const allowdImageType = ["image/png", "image/jpeg", "image/jpg"];

export const blogSchema = object({
  title: string().min(3, "Title should be at least 3 characters!"),
  description: string().min(3, "Description should be at least 3 characters!"),
  image: zodInstanceof(File, { error: "Please upload an image." })
    .refine((file) => allowdImageType.includes(file.type), {
      error: "Only PNG, JPG, and JPEG images are allowed.",
    })
    .refine((file) => file.size <= maxFileSize, {
      error: "Image size must be less than 5 MB.",
    }),
});
