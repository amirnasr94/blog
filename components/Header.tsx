import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Suspense } from "react";
import Navbar from "./Navbar";
import { AuthSection } from "@/features/auth";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-3 z-50 mx-auto max-w-6xl rounded-2xl border border-border/50 bg-background/40 shadow-lg shadow-black/5 backdrop-blur-xl sm:top-5">
      <div className="flex h-16 items-center justify-between px-4 lg:grid lg:h-18 lg:grid-cols-3 lg:px-6">
        <Link
          href="/"
          className="text-3xl font-extrabold italic text-primary sm:text-4xl"
        >
          BLOG
        </Link>

        {/* Desktop */}
        <Navbar />
        <div className="hidden items-center justify-end gap-x-2 lg:flex">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthSection />
          </Suspense>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <MobileMenu
          authSlot={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthSection />
            </Suspense>
          }
          themeSlot={<ThemeToggle />}
        />
      </div>
    </header>
  );
}
