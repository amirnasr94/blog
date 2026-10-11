import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { CreateComments } from "./CreateComments";
import Comment from "./Comment";
import { getCommentsByPostId } from "../actions";
import { Separator } from "@/components/ui/separator";

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
        <h2 className="text-xl font-bold">Commnets ({commnets.data.length})</h2>
      </CardHeader>
      <CardContent className="space-y-5">
        <CreateComments />
        {!commnets.data.length
          ? null
          : commnets.data.map((comment, idx) => {
              return (
                <div key={comment.id} className="space-y-4">
                  <Comment
                    authorName={comment.authorName}
                    content={comment.content}
                    createAt={comment.createAt}
                  />
                  {idx < commnets.data.length - 1 ? <Separator /> : null}
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
