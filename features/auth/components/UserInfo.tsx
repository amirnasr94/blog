import { getUser } from "@/features/auth/actions/getUserAction";
import Link from "next/link";
import { buttonVariants } from "../../../components/ui/button";
import { Avatar } from "@/features/auth";

export async function UserInfo() {
  const response = await getUser();

  if (response?.status === 200 && response?.data) {
    return <Avatar user={response.data.name} />;
  }

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
