import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlogContent } from "@/features/blog";
import { getBlogByIdAction } from "@/features/blog/actions";
import { CommentsSection } from "@/features/comments/components";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
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
}

export default function BlogPage({ params }: RouteParams) {
  return (
    <section className="max-w-3xl mx-auto animate-in fade-in duration-500 relative my-10 space-y-5">
      <Link href={"/blogs"} className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>
      <Suspense fallback={<div>Loading blog...</div>}>
        <BlogContent params={params} />
      </Suspense>
      <Separator className="my-4" />
      <Suspense fallback={<div>Loading Comments...</div>}>
        <CommentsSection params={params} />
      </Suspense>
    </section>
  );
}
