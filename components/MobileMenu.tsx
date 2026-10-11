"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { navLinks } from "./nav-links";

type Props = {
  authSlot: ReactNode;
  themeSlot: ReactNode;
};

const emptySubscribe = () => () => {};

export default function MobileMenu({ authSlot, themeSlot }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // false on server/hydration, true on the client (needed for the portal)
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  console.log({ mounted });

  // close the drawer when the route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // close if resized up to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const drawer = (
    <div className="lg:hidden">
      {/* overlay */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        inert={!open}
        className={`fixed inset-y-0 left-0 z-70 flex w-72 max-w-[85vw] flex-col border-r border-border/50 bg-background/60 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl font-extrabold italic text-primary">
            BLOG
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col gap-y-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`${buttonVariants({ variant: "ghost" })} w-full justify-start text-base`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-y-2 border-t border-border/50 pt-5 [&>a]:w-full">
          {authSlot}
          <div className="flex justify-end">{themeSlot}</div>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <Button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        size="icon"
        variant="ghost"
        className="lg:hidden"
      >
        <Menu className="size-7 text-foreground" />
      </Button>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
