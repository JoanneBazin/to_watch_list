import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
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
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const messages = receivedMessages.map((message) => ({
    ...message,
    receiver: {
      id: message.receiver.id,
      name: message.receiver.name,
      image: message.receiver.image,
    },
  }));

  return NextResponse.json(messages);
}
