"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { infer as ZodInfer } from "zod";
import ToastMessage from "@/lib/toastMessage";
import { redirect } from "next/navigation";
import { createBlogAction } from "../actions";
import { blogSchema } from "../validation";

export function BlogForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  function handleSubmit(data: ZodInfer<typeof blogSchema>) {
    const toast = new ToastMessage();
    form.reset();
    startTransition(async () => {
      const response = await createBlogAction(data);
      if (response?.success && response.status === 201) {
        toast.success("Successfull", response.message);
        return;
      }
      if (!response?.success && response?.status === 401) {
        toast.success("Successfull", response.message);
        redirect("/login");
      }
      if (
        response?.success &&
        (response.status === 404 || response.status === 400)
      ) {
        toast.success("Successfull", response.message);
        return;
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                type="text"
                placeholder="write title of your blog..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Image</FieldLabel>
              <Input
                type="file"
                placeholder="add blog's image"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                  }
                }}
                aria-invalid={fieldState.invalid}
                accept="image/png, image/jpg, image/jpeg"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                placeholder="write your idea..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? "creating post" : "create post"}
        </Button>
      </FieldGroup>
    </form>
  );
}
