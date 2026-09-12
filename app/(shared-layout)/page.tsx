import { RecentlyAdded } from "@/features/blog";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="py-10 space-y-10">
      <div className="max-w-4xl mx-auto space-y-5 text-center">
        <h1 className="text-2xl lg:text-5xl text-secondary-foreground font-extrabold mask-b-from-45%">
          This is a blog where you can share your ideas, experiences, and
          knowledge.
        </h1>
        <p className="text-secondary-foreground text-base">
          Keep in mind that you are responsible for informing others and helping
          to make the world a better place.
        </p>
      </div>
      <Suspense>
        <RecentlyAdded />
      </Suspense>
    </section>
  );
}
