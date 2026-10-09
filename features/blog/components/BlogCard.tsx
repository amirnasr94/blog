import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ blog }: { blog: BlogType }) {

  return (
    <Card className="w-full overflow-hidden hover:scale-105 transition-transform duration-300 p-0">
      <div className="relative h-72">
        <Image
          className="rounded-t-lg object-cover"
          src={blog.imageUrl || "/images/placeholder.png"}
          alt={blog.title}
          fill
        />
      </div>
      <CardContent className="text-left">
        <Link href={`/blogs/${blog.id}`} className="space-y-1 cursor-pointer">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-foreground line-clamp-3">{blog.description}</p>
          <p className="text-sm text-muted-foreground mt-4">
            written by {blog.authorName}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="pb-4">
        <Link
          href={`/blogs/${blog.id}`}
          className="text-sm text-primary hover:underline"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
