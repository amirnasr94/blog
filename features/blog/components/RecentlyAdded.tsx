import { buttonVariants } from "@/components/ui/button";
import { getRecentlyAddedAction } from "../actions";
import { BlogCard } from "./BlogCard";
import Link from "next/link";

export async function RecentlyAdded() {
  const response = await getRecentlyAddedAction();

  if (!Array.isArray(response?.data)) {
    return null;
  }
  return (
    <div className="space-y-4">
      <h3 className="text-3xl text-foreground font-extrabold">Most recently</h3>
      {!response.data.length ? (
        <div className="border border-secondary rounded-xl flex flex-col gap-y-3 items-center justify-center w-full h-48">
          <p>
            You don&apos;t have yet any recently added blog, Lets to create
            first your Blog
          </p>
          <Link
            href="/create-blog"
            className={buttonVariants({ variant: "default" })}
          >
            Create Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((blog) => (
            <BlogCard key={blog._id?.toString()} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
