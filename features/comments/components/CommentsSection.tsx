import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { CreateComments } from "./CreateComments";
import Comment from "./Comment";
import { getCommentsByPostId } from "../actions";

type RouteParams = {
  params: Promise<{ blogId: string }>;
};

export async function CommentsSection({ params }: RouteParams) {
  const { blogId } = await params;
  const commnets = await getCommentsByPostId({ postId: blogId });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center ">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">Commnets ({commnets.length})</h2>
      </CardHeader>
      <CardContent className="space-y-5">
        <CreateComments />
        {!commnets.length
          ? null
          : commnets.map((comment) => (
              <Comment
                key={comment._id}
                authorName={comment.authorName}
                comment={comment.content}
                createdAt={comment.createdAt}
              />
            ))}
      </CardContent>
    </Card>
  );
}
