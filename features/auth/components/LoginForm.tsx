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
import { loginSchema } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginAction } from "../actions/auth";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit() {
    const toast = new ToastMessage();
    const data = {
      email: form.getValues("email"),
      password: form.getValues("password"),
    };

    const response = await loginAction(data);
    if (response?.success && response?.status === 200) {
      form.reset();
      redirect("/");
    }
    if (
      !response?.success &&
      (response?.status === 404 ||
        response?.status === 400 ||
        response?.status === 500 ||
        response?.status === 403)
    ) {
      toast.error("Failed", response.message);
    }
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
              <Input type="password" placeholder="••••••" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full mt-5">
        Login
      </Button>
    </form>
  );
}
