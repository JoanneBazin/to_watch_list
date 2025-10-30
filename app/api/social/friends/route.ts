import { prisma } from "@/src/lib/server";
import { handleApiRoute, requireAuth } from "@/src/utils/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return handleApiRoute(async () => {
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
                media: {
                  select: { id: true, tmdbId: true },
                },
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
                media: {
                  select: { id: true, tmdbId: true },
                },
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
        suggestionsFromUser: {
          dbId: friend.suggestionsReceived.map((r) => r.media.id),
          tmdbId: friend.suggestionsReceived
            .map((r) => r.media.tmdbId)
            .filter((id) => id !== null),
        },
      };
    });

    return NextResponse.json(userFriends);
  });
}
