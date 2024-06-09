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
  const series = await prisma.series.findMany({
    where: {
      users: {
        every: {
          userId: userId,
        },
      },
    },
    orderBy: {
      watched: "asc",
    },
  });

  return NextResponse.json(series);
}

export async function POST(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const data = await req.json();

  const addSerie = await prisma.series.create({
    data: {
      title: data.title,
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
  return new NextResponse(JSON.stringify(addSerie), { status: 201 });
}
