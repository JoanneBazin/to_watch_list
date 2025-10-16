import { prisma } from "@/src/lib";
import { ApiError, handleApiRoute, requireAuth } from "@/src/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handleApiRoute(async () => {
    const session = await requireAuth();
    const userId = session.user.id;
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
      throw new ApiError(403, "Accès non autorisé");
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

    if (!friend) {
      throw new ApiError(404, "Profil introuvable");
    }

    const friendWatchList = await prisma.usersWatchList.findMany({
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
    });

    const friendProfile = {
      ...friend,
      watchlist: friendWatchList.map((item) => ({
        ...item,
        ...item.media,
        media: undefined,
      })),
    };

    return NextResponse.json(friendProfile);
  });
}
