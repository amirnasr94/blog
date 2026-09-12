import { CreateBlog } from "@/features/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "create blog",
};

export default function CreateBlogPage() {
  return <CreateBlog />;
}
