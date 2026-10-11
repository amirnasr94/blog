import { User } from "lucide-react";

export default function Comment({
  authorName,
  content,
  createAt,
}: Pick<CommentType, "content" | "authorName" | "createAt">) {
  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-2">
          <User size={24} />
          <h3 className="text-lg font-bold">{authorName}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          createdAt: {new Date(createAt).toLocaleDateString("en-US")}
        </p>
      </div>
      <p className="text-sm text-foreground/90 whitespace-pre-wrap bg-muted p-3 rounded-sm">
        {content}
      </p>
    </div>
  );
}
