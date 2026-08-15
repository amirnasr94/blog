import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decript } from "./lib/session";

const protectedRoutes = ["create-blog"];
// const publicRoutes = ["sign-up", "login", "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decript(cookie);

  if (isProtectedRoute && !session?.useEmail) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
