import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getBlogByIdAction } from "../actions/getBlogByIdAction";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export async function Blog({ params }: RouteParams) {
  const { blogId } = await params;
  const response = await getBlogByIdAction(blogId);
  if (!response) {
    return notFound();
  }

  return (
    <section className="animate-in fade-in duration-500 relative my-10 space-y-5">
      <Link href={"/blogs"} className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>
      <div className="w-full space-y-5">
        <h1 className="lg:text-5xl text-secondary-foreground font-extrabold tracking-tight sm:text-3xl">
          {response.title}
        </h1>
        <div className="w-full mx-auto relative h-[400]">
          <Image
            src={response.imageUrl}
            alt={response.title}
            fill
            objectFit="contain"
          />
        </div>
        <p className="textlg text-foreground/90 leading-relaxed">
          {response.description}
        </p>
        <Separator className="my-4" />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="size-4" />
            poted on: {new Date(response.createdAt).toLocaleDateString("en-US")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="size-4" />
            wrote by: {response.author.name}
          </p>
        </div>
      </div>
    </section>
  );
}
