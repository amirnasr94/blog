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
import { blogSchema } from "@/validation/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { infer as ZodInfer } from "zod";

export default function BlogForm() {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function handleSubmit(data: ZodInfer<typeof blogSchema>) {}

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
        <Button type="submit" variant="default">
          create post
        </Button>
      </FieldGroup>
    </form>
  );
}
