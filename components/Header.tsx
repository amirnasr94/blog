import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Suspense } from "react";
import { UserInfo } from "@/features/auth";

export default function Header() {
  return (
    <header className="h-16 sticky flex items-center justify-center">
      <div className="container grid grid-cols-3 items-center justify-between">
        <Link href="/" className="text-primary text-4xl font-extrabold italic">
          BLOG
        </Link>
        <nav>
          <ul className="flex items-center gap-x-4 justify-center">
            <li>
              <Link
                href="/"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/create-blog"
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Create Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-x-2 justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfo />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
