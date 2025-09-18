import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireAuth } from "@/utils/requireAuth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth(req);
  const userId = session.user.id;

  const categoryId = params.id;

  const medias = await Promise.allSettled([
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: userId },
          {
            media: {
              type: "FILM",
            },
          },
          {
            media: {
              category: {
                id: categoryId,
              },
            },
          },
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
                name: true,
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
    }),
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: userId },
          {
            media: {
              type: "SERIE",
            },
          },
          {
            media: {
              category: {
                id: categoryId,
              },
            },
          },
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
                name: true,
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
    }),
  ]);

  const filmsList = medias[0].status === "fulfilled" ? medias[0].value : [];
  const seriesList = medias[1].status === "fulfilled" ? medias[1].value : [];

  const films = filmsList.map((film) => ({
    ...film,
    ...film.media,
    media: undefined,
  }));
  const series = seriesList.map((serie) => ({
    ...serie,
    ...serie.media,
    media: undefined,
  }));

  return NextResponse.json({ films, series });
}
