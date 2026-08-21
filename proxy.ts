import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const protectedRoutes = ["/create-blog"];
// const publicRoutes = ["/sign-up", "/login", "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(req.nextUrl);

  const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);

  const { isAuth } = await verifySession();

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
