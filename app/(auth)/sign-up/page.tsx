import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignUpForm from "@/features/auth/components/SignUpForm";
import Link from "next/link";

export default function Page() {
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
