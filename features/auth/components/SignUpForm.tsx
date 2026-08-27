"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signupAction } from "../actions/auth";
import ToastMessage from "@/lib/toastMessage";
import { redirect } from "next/navigation";
import { infer as ZodInfer } from "zod";

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: ZodInfer<typeof signUpSchema>) {
    const toastMessage = new ToastMessage();

    const response = await signupAction({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (response?.success && response?.status === 201) {
      toastMessage.success("SuccessFull", response.message);
      form.reset();
      redirect("/login", "push");
    }
    if (!response?.success && response?.status === 409) {
      toastMessage.error("Failed!", response?.message as string);
      form.reset();
      redirect("/login", "push");
    }
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
      <Button type="submit" className="w-full mt-5">
        Sign Up
      </Button>
    </form>
  );
}
