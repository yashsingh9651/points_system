import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const adminPath = path === "/admin" || path.slice(0,7) === "/studio";
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/resetPass";
  const token = request.cookies.get("token")?.value || "";
  // Admin Role Protected Route
  function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }

    return new TextEncoder().encode(secret);
  }
  if (token && adminPath) {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    if (!payload.isAdmin) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
  // Public Protected Routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile",
    "/studio/:path*",
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/resetPass",
    "/admin",
  ],
};
