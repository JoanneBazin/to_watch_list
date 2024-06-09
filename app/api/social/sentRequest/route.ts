import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.name;

  const sentRequest = await prisma.friendRequest.findMany({
    where: {
      senderId: userId,
      status: "PENDING",
    },
    select: {
      receiver: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return NextResponse.json(sentRequest);
}
