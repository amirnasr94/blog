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

  if (!blog) {
    return notFound();
  }

  return (
    <div className="w-full space-y-5">
      <h1 className="lg:text-5xl text-secondary-foreground font-extrabold tracking-tight sm:text-3xl">
        {blog.title}
      </h1>
      <div className="w-full mx-auto relative h-[400]">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="textlg text-foreground/90 leading-relaxed">
        {blog.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="size-4" />
          poted on: {new Date(blog.createdAt).toLocaleDateString("en-US")}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <User className="size-4" />
          written by: {blog.author.name}
        </p>
      </div>
    </div>
  );
}
