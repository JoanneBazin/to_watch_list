import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await requireAuth(req);
  const userId = session.user.id;

  const receivedMessages = await prisma.suggestion.findMany({
    where: {
      AND: [
        { senderId: userId },
        {
          receiverComment: {
            not: null,
          },
        },
      ],
    },
    select: {
      id: true,
      receiverComment: true,
      media: {
        select: {
          title: true,
        },
      },
      receiver: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const messages = receivedMessages.map((message) => ({
    ...message,
    receiver: {
      name: message.receiver.name,
      avatar: message.receiver.image,
    },
  }));

  return NextResponse.json(messages);
}
