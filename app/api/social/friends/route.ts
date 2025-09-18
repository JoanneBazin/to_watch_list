import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/utils/requireAuth";
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

  const userFriends = friends.map((request) => {
    if (request.sender.id === userId) {
      return {
        id: request.receiver.id,
        name: request.receiver.name,
        avatar: request.receiver.image,
      };
    } else {
      return {
        id: request.sender.id,
        name: request.sender.name,
        avatar: request.sender.image,
      };
    }
  });

  return NextResponse.json(userFriends);
}
