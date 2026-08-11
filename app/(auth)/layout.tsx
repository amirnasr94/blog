import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="absolute left-5 top-5">
        <Link
          href="/"
          className={`flex gap-2 ${buttonVariants({ variant: "secondary" })}`}
        >
          <ArrowLeft className="h-6 w-6" /> Go Back
        </Link>
      </div>
      {children}
    </section>
  );
}
