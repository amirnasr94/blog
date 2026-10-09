import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { getBlogByIdAction } from "../actions";
import { notFound } from "next/navigation";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export async function BlogContent({ params }: RouteParams) {
  const { blogId } = await params;
  const blog = await getBlogByIdAction(blogId);

  if (!blog.data) {
    return notFound();
  }

  return (
    <div className="w-full space-y-5">
      <h1 className="lg:text-5xl text-secondary-foreground font-extrabold tracking-tight sm:text-3xl">
        {blog.data.title}
      </h1>
      <div className="w-full mx-auto relative h-[400]">
        <Image
          src={blog.data.imageUrl}
          alt={blog.data.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="textlg text-foreground/90 leading-relaxed">
        {blog.data.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="size-4" />
          poted on: {new Date(blog.data.createdAt).toLocaleDateString("en-US")}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <User className="size-4" />
          written by: {blog.data.authorName}
        </p>
      </div>
    </div>
  );
}
