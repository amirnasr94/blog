import { SignUp } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign-up",
};

export default function SignUpPage() {
  return <SignUp />;
}
