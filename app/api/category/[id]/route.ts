import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/utils/script";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const categoryId = params.id;

  const userId = session.user.id;

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
