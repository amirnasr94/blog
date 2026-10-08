import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./features/auth/lib/session";

const protectedRoutes = ["/create-blog"];
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const { isAuth } = await verifySession();

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
