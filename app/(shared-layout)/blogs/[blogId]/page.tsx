import { Blog } from "@/features/blog";
import { Suspense } from "react";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export default async function BlogPage({ params }: RouteParams) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blog params={params} />
    </Suspense>
  );
}
