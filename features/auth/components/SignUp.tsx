import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import SignUpForm from "./SignUpForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function SignUp() {
  return (
    <Card className="w-4/12">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <Separator className="my-5" />
        <CardFooter className="flex items-center justify-center gap-x-1">
          Already signed up?{" "}
          <Link href="/login" className="text-primary text-sm">
            Log In
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
