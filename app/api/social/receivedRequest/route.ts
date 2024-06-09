import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.name;

  const receivedRequest = await prisma.friendRequest.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    select: {
      id: true,
      sender: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return NextResponse.json(receivedRequest);
}
