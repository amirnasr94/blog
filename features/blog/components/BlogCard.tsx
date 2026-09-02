import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "../model/blog.model";

export default function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <Card className="w-full overflow-hidden hover:scale-105 transition-transform duration-300 p-0">
      <div className="relative h-72">
        <Image
          className="rounded-t-lg"
          src={blog.imageUrl}
          alt={blog.title}
          objectFit="cover"
          fill
        />
      </div>
      <CardContent className="text-left">
        <Link
          href={`/blogs/${blog._id?.toString()}`}
          className="space-y-1 cursor-pointer"
        >
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-muted-foreground">{blog.description}</p>
          <p className="text-sm text-muted-foreground">
            written by {blog.author.name}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="my-4">
        <Link
          href={`/blogs/${blog._id?.toString()}`}
          className="text-sm text-primary hover:underline"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
