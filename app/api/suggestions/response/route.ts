import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/utils/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

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
          avatar: true,
        },
      },
    },
  });

  const messages = receivedMessages.map((message) => ({
    ...message,
    receiver: {
      name: message.receiver.name,
      avatar: message.receiver.avatar
        ? message.receiver.avatar.toString("base64")
        : null,
    },
  }));

  return NextResponse.json(messages);
}
