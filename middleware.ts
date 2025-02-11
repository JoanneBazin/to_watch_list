import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<NextResponse | null> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || Date.now() > (token.accessTokenExpires as number)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const reqWithAuth = req as NextRequest & {
    nextauth: { token: typeof token };
  };
  return withAuth(reqWithAuth) as unknown as NextResponse | null;
}

export const config = {
  matcher: ["/communauty/:path*", "/account:path*", "/messages"],
};
