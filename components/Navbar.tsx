import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { navLinks } from "./nav-links";

export default function Navbar() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center justify-center gap-x-2">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={buttonVariants({ variant: "ghost" })}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
