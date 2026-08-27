import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title should be mininum 3 charecter!"),
  description: z.string().min(3, "Description should be mininum 3 charecter!"),
});
