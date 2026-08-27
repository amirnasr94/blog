import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlogForm from "@/features/blog/components/BlogForm";

export default function page() {
  return (
    <section>
      <div className="space-y-4 text-center my-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Create Blog
        </h1>
        <p className="text-muted-foreground text-xl">
          Share your thoughts and ideas with the world by creating a new blog
          article.
        </p>
      </div>
      <Card className="w-full max-w-2xl mx-auto p-4">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm />
        </CardContent>
      </Card>
    </section>
  );
}
