import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await requireAuth(req);
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
            image: true,
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
            image: true,
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
      avatar: req.receiver.image,
    },
  }));

  const requestReceived = received.map((req) => ({
    id: req.id,
    sender: {
      id: req.sender.id,
      name: req.sender.name,
      avatar: req.sender.image,
    },
  }));

  return NextResponse.json({ requestSent, requestReceived });
}
