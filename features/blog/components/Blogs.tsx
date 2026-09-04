import { Suspense } from "react";
import { BlogsList } from "./BlogsList";
import { Loading } from "./Loading";

export function Blogs() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Our Blog
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
        Insights, Thoughts, and Trends from our team
      </p>
      <Suspense fallback={<Loading />}>
        <BlogsList />
      </Suspense>
    </section>
  );
}
