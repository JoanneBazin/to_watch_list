import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await requireAuth(req);
  const userId = session.user.id;

  const suggestion = await prisma.usersWatchList.findMany({
    where: {
      AND: [
        {
          userId: userId,
        },
        {
          suggestions: {
            some: {
              status: "PENDING",
            },
          },
        },
      ],
    },
    select: {
      media: true,
      suggestions: {
        select: {
          id: true,
          senderComment: true,

          sender: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const receivedSuggestions = suggestion.map((result) => ({
    media: result.media,
    suggestions: result.suggestions.map((suggest) => ({
      id: suggest.id,
      senderComment: suggest.senderComment,
      sender: {
        name: suggest.sender.name,
        avatar: suggest.sender.image,
      },
    })),
  }));
  return NextResponse.json(receivedSuggestions);
}

export async function POST(req: Request) {
  const session = await requireAuth(req);
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
