import getBlogsAction from "../actions/getBlogsAction";
import { notFound } from "next/navigation";
import BlogCard from "./BlogCard";

export default async function Blogs() {
  const response = await getBlogsAction();

  if (response?.status !== 200 || !response.data) {
    return notFound();
  }
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {response.data.map((blog) => (
        <BlogCard key={blog._id?.toString()} blog={blog} />
      ))}
    </div>
  );
}
