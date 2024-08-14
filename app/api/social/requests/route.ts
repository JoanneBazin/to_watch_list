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

  const requestSent = sent.map((req) => ({
    id: req.id,
    sender: {
      id: req.receiver.id,
      name: req.receiver.name,
      avatar: req.receiver.avatar
        ? req.receiver.avatar.toString("base64")
        : null,
    },
  }));

  const requestReceived = received.map((req) => ({
    id: req.id,
    sender: {
      id: req.sender.id,
      name: req.sender.name,
      avatar: req.sender.avatar ? req.sender.avatar.toString("base64") : null,
    },
  }));

  return NextResponse.json({ requestSent, requestReceived });
}
