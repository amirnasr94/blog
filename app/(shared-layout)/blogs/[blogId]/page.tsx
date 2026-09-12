import { Blog } from "@/features/blog";
import { getBlogByIdAction } from "@/features/blog/actions";
import { Suspense } from "react";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export const generateMetadata = async ({ params }: RouteParams) => {
  const { blogId } = await params;

  const blog = await getBlogByIdAction(blogId);

  if (!blog) {
    return {
      title: "Blog",
    };
  }

  return {
    title: blog.title,
    description: blog.description.slice(0, 30),
  };
};

export default async function BlogPage({ params }: RouteParams) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blog params={params} />
    </Suspense>
  );
}
