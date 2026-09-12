import { Login } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
};

export default function Loginpage() {
  return <Login />;
}
