import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/script";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.id;

  const requests = await Promise.allSettled([
    prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    }),
    prisma.friendRequest.findMany({
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
    }),
  ]);

  const sent = requests[0].status === "fulfilled" ? requests[0].value : [];
  const received = requests[1].status === "fulfilled" ? requests[1].value : [];

  return NextResponse.json({ sent, received });
}
