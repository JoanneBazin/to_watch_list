import { getServerSession } from "next-auth";
import { AuthOptions } from "./auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  console.log("GET API", session);
  return NextResponse.json({ authenticated: !!session });
}
