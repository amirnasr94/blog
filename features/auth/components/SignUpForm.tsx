"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ToastMessage from "@/lib/toastMessage";
import { useRouter } from "next/navigation";
import { infer as ZodInfer } from "zod";
import { signUpSchemaValidation } from "../validation";
import { signupAction } from "../actions";
import { useTransition } from "react";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: ZodInfer<typeof signUpSchemaValidation>) {
    const toast = new ToastMessage();

    startTransition(async () => {
      try {
        const response = await signupAction({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (response.success) {
          toast.success("Success", "sign up successful.");
          router.replace("/login");
          return;
        }

        toast.error("Error", response.error);
      } catch {
        toast.error("Error", "An Error accurred, Try again!");
      }
    });
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Amir Nasr..."
                {...field}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}></FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="amir@gmail.com"
                {...field}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}></FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                type="password"
                placeholder="••••••"
                {...field}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]}></FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full mt-5" disabled={isPending}>
        {isPending ? "Waiting..." : "Sign Up"}
      </Button>
    </form>
  );
}
