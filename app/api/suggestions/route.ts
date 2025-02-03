import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/utils/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

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
              avatar: true,
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
        avatar: suggest.sender.avatar
          ? suggest.sender.avatar.toString("base64")
          : null,
      },
    })),
  }));
  return NextResponse.json(receivedSuggestions);
}

// const suggestion = await prisma.suggestion.findMany({
//   where: {
//     receiverId: userId,
//     status: "PENDING",
//   },
//   select: {
//     id: true,
//     senderComment: true,
//     media: true,
//     sender: {
//       select: {
//         name: true,
//         avatar: true,
//       },
//     },
//   },
// });

// const receivedSuggestions = suggestion.map((suggest) => ({
//   ...suggest,
//   sender: {
//     name: suggest.sender.name,
//     avatar: suggest.sender.avatar
//       ? suggest.sender.avatar.toString("base64")
//       : null,
//   },
// }));

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
