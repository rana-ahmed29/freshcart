import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// pages that need login
const protectedRoutes = ["/orders", "/profile", "/checkout"];

// pages a logged-in user should not see
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // server actions are POST requests to the current page: never redirect them
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }

  // reads and decrypts the NextAuth cookie
  const jwt = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // not logged in -> go to login (and remember where he wanted to go)
  if (!jwt && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // already logged in -> no need for login or register
  if (jwt && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// run only on these paths
export const config = {
  matcher: [
    "/orders/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};
