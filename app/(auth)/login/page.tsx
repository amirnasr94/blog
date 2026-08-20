import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function page() {
  return (
    <Card className="w-4/12">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
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
