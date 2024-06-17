import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const medias = await Promise.allSettled([
    prisma.watchList.findMany({
      where: {
        type: "FILM",
        users: {
          some: {},
          every: {
            userId: userId,
          },
        },
      },
      orderBy: {
        watched: "asc",
      },
    }),
    prisma.watchList.findMany({
      where: {
        type: "SERIE",
        users: {
          some: {},
          every: {
            userId: userId,
          },
        },
      },
      orderBy: {
        watched: "asc",
      },
    }),
  ]);

  const films = medias[0].status === "fulfilled" ? medias[0].value : [];
  const series = medias[1].status === "fulfilled" ? medias[1].value : [];

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

  return new NextResponse(JSON.stringify(addEntry), { status: 201 });
}
