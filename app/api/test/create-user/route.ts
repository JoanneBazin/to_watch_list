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
    const { headers, response } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: userCredentials,
    });

    if (!response) throw new ApiError(500, "User Test creation failed");

    const rawCookie = headers.getSetCookie()[0];
    const [nameValue] = rawCookie.split(";");
    const [cookieName, cookieValue] = nameValue.split("=");

    return NextResponse.json({
      id: response.user.id,
      name: userCredentials.name,
      email: userCredentials.email,
      password: userCredentials.password,
      cookieName,
      cookieValue,
    });
  });
}
