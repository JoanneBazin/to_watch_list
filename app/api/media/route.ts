import { prisma } from "@/src/lib";
import { handleApiRoute, requireAuth } from "@/src/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return handleApiRoute(async () => {
    const session = await requireAuth(req);
    const userId = session.user.id;

    const medias = await prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: userId },
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
        addedAt: true,
        watched: true,
        suggestions: {
          select: {
            id: true,
            senderComment: true,
            receiverComment: true,
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          watched: "asc",
        },
        {
          addedAt: "desc",
        },
      ],
    });

    const watchlist = medias.map((item) => ({
      ...item,
      ...item.media,
      media: undefined,
    }));

    return NextResponse.json(watchlist);
  });
}
