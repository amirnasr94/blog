"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { commentSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { createComment } from "../actions/createComment";
import { infer as zodInfer } from "zod";
import ToastMessage from "@/lib/toastMessage";

export function CreateComments() {
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ blogId: string }>();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId: params.blogId,
    },
  });

  function submitComment(data: zodInfer<typeof commentSchema>) {
    const toast = new ToastMessage();
    try {
      startTransition(async () => {
        await createComment(data);
      });
      toast.success("Success", "Comment created successfully");
      form.reset();
    } catch {
      toast.error("Error", "Failed to create comment");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submitComment)}>
      <Controller
        name="content"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <Textarea
              placeholder="write your comment..."
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        type="submit"
        variant="default"
        className="mt-3"
        disabled={isPending}
      >
        {isPending ? "waiting..." : "submit comment"}
      </Button>
    </form>
  );
}
