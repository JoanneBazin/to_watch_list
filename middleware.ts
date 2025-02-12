import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated =
    token &&
    typeof token.accessTokenExpires === "number" &&
    Date.now() < token.accessTokenExpires;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/communauty/:path*", "/account:path*", "/messages"],
};
