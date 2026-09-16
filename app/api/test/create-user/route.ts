import { auth } from "@/src/lib/server";
import { handleApiRoute } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { NextResponse } from "next/server";

export async function POST() {
  return handleApiRoute(async () => {
    const isProd =
      process.env.VERCEL_ENV === "production" ||
      (process.env.NODE_ENV === "production" &&
        process.env.VERCEL_ENV !== "preview");

    if (isProd) {
      throw new ApiError(404, "Not found");
    }

    const uniqueId = Date.now() + Math.random().toString(36).substring(2, 7);
    const userCredentials = {
      email: `user-${uniqueId}@test.com`,
      name: `User ${uniqueId}`,
      password: "Password1234",
    };
    const { user } = await auth.api.signUpEmail({
      body: userCredentials,
    });
    if (!user) throw new ApiError(500, "User Test creation failed");

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: userCredentials.password,
    });
  });
}
