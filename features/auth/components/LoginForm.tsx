"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ToastMessage from "@/lib/toastMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { infer as ZodInfer } from "zod";
import { loginSchemaValidation } from "../validation";
import { loginAction } from "../actions";
import { useTransition } from "react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchemaValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: ZodInfer<typeof loginSchemaValidation>) {
    const toast = new ToastMessage();
    startTransition(async () => {
      try {
        const response = await loginAction({
          email: data.email,
          password: data.password,
        });
        if (response.success) {
          toast.success("Success", "Login successful.");
          router.replace("/");
          return;
        }
        toast.error("Error", response.error);
      } catch {
        toast.error("Error", "An Error occurred, Try again!");
      }
    });
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-y-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="text"
                  placeholder="amir@gmail.com"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                placeholder="••••••"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full mt-5" disabled={isPending}>
        {isPending ? "Waiting..." : "Login"}
      </Button>
    </form>
  );
}
