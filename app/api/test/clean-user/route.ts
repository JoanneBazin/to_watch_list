import { prisma } from "@/src/lib/server";
import { handleApiRoute } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return handleApiRoute(async () => {
    const isProd =
      process.env.VERCEL_ENV === "production" ||
      (process.env.NODE_ENV === "production" &&
        process.env.VERCEL_ENV !== "preview");

    if (isProd) {
      throw new ApiError(404, "Not found");
    }
    const body = await req.json();
    const { email } = body;

    await prisma.user.delete({
      where: { email },
    });
    return NextResponse.json({ success: true });
  });
}
