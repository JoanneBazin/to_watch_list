import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const suggestion = await prisma.suggestion.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    select: {
      id: true,
      senderComment: true,
      media: true,
      sender: true,
    },
  });
  return NextResponse.json(suggestion);
}

export async function POST(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const data = await req.json();

  const addSuggestion = await prisma.watchList.create({
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
                id: data.receiverId,
              },
            },
          },
        ],
      },
    },
  });

  const addNewSuggestion = await prisma.suggestion.create({
    data: {
      senderId: userId,
      receiverId: data.receiverId,
      mediaId: addSuggestion.id,
      senderComment: data.comment,
    },
  });
  return NextResponse.json(addSuggestion);
}
