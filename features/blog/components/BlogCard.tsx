import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "../model/blog.model";

export default function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <Card className="relative h-80 w-full overflow-hidden p-4 hover:scale-105 transition-transform duration-300">
      {/* <Image src={blog.image} alt={blog.title} fill objectFit="cover" /> */}
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
      <CardFooter>
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
