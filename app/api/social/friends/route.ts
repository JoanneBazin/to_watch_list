import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireAuth(req);
  const userId = session.user.id;

  const friends = await prisma.friendRequest.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    select: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
          suggestionsReceived: {
            where: { senderId: userId },
            select: {
              mediaId: true,
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          image: true,
          suggestionsReceived: {
            where: { senderId: userId },
            select: {
              mediaId: true,
            },
          },
        },
      },
    },
  });

  const userFriends = friends.map((request) => {
    const friend =
      request.sender.id === userId ? request.receiver : request.sender;

    return {
      id: friend.id,
      name: friend.name,
      image: friend.image,
      suggestionsFromUser: friend.suggestionsReceived.map((r) => r.mediaId),
    };
  });

  return NextResponse.json(userFriends);
}
