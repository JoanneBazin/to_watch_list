import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/script";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

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
          avatar: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const userFriends = friends.map((request) => {
    if (request.sender.id === userId) {
      return {
        id: request.receiver.id,
        name: request.receiver.name,
        avatar: request.receiver.avatar,
      };
    } else {
      return {
        id: request.sender.id,
        name: request.sender.name,
        avatar: request.sender.avatar,
      };
    }
  });

  return NextResponse.json(userFriends);
}
