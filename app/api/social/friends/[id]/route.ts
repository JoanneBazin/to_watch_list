import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = requireAuth();
  const userId = (await session).user.id;
  const friendId = params.id;

  const friendshipStatus = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId, status: "ACCEPTED" },
        { senderId: friendId, receiverId: userId, status: "ACCEPTED" },
      ],
    },
    select: { id: true },
  });

  if (!friendshipStatus) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const friend = await prisma.user.findUnique({
    where: {
      id: friendId,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  const friendData = await Promise.allSettled([
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: friendId },
          {
            OR: [
              {
                suggestions: {
                  none: {},
                },
              },
              {
                suggestions: {
                  some: {
                    status: "ACCEPTED",
                  },
                },
              },
            ],
          },
        ],
      },
      select: {
        media: true,
        watched: true,
      },
      orderBy: {
        watched: "asc",
      },
    }),
    prisma.friendRequest.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ senderId: friendId }, { receiverId: friendId }],
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
    }),
  ]);

  const friendWatchList =
    friendData[0].status === "fulfilled" ? friendData[0].value : [];
  const friendContacts =
    friendData[1].status === "fulfilled" ? friendData[1].value : [];

  const contacts = friendContacts.map((contact) => {
    if (contact.sender.id === friendId) {
      return {
        id: contact.receiver.id,
        name: contact.receiver.name,
        image: contact.receiver.image,
      };
    } else {
      return {
        id: contact.sender.id,
        name: contact.sender.name,
        image: contact.sender.image,
      };
    }
  });

  const friendProfile = {
    ...friend,
    watchlist: friendWatchList.map((item) => ({
      ...item,
      ...item.media,
      media: undefined,
    })),
    contacts,
  };

  return NextResponse.json(friendProfile);
}
