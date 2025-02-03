import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/options";
import prisma from "@/utils/script";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

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

export async function POST(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const data = await req.json();

  const addEntry = await prisma.watchList.create({
    data: {
      title: data.title,
      type: data.type,
      synopsis: data.synopsis,
      year: data.year,
      real: data.real,
      platform: data.platform,
      categoryName: data.categoryName,
      users: {
        create: [
          {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        ],
      },
    },
  });

  return NextResponse.json(addEntry);
}
