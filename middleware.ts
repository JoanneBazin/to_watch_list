import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isPublicPath =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/auth" ||
    pathname.startsWith("/api/auth/");

  if (isPublicPath) return NextResponse.next();

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const authUrl = new URL("/auth", request.url);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
