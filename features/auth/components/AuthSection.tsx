import Link from "next/link";
import { getUser } from "../actions";
import { buttonVariants } from "../../../components/ui/button";
import { Avatar } from "./Avatar";

export async function AuthSection() {
  const user = await getUser();

  if (!user) {
    return (
      <>
        <Link
          href="/sign-up"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Sign In
        </Link>
        <Link
          href="/login"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Log In
        </Link>
      </>
    );
  }
  return <Avatar userName={user.name} />;
}
