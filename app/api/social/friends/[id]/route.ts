import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const friend = await Promise.allSettled([
    prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    }),
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: id },
          {
            media: {
              type: "FILM",
            },
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
    }),
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: id },
          {
            media: {
              type: "SERIE",
            },
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
    }),
    prisma.friendRequest.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ senderId: id }, { receiverId: id }],
      },
      select: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    }),
  ]);

  const profile = friend[0].status === "fulfilled" ? friend[0].value : [];
  const films = friend[1].status === "fulfilled" ? friend[1].value : [];
  const series = friend[2].status === "fulfilled" ? friend[2].value : [];
  const friends = friend[3].status === "fulfilled" ? friend[3].value : [];

  const friendFilms = films.map((film) => ({
    ...film,
    ...film.media,
    media: undefined,
  }));
  const friendSeries = series.map((film) => ({
    ...film,
    ...film.media,
    media: undefined,
  }));

  const userFriends = friends.map((request) => {
    if (request.sender.id === id) {
      return {
        id: request.receiver.id,
        name: request.receiver.name,
        avatar: request.receiver.avatar,
      };
    } else {
      return {
        id: request.sender.id,
        name: request.sender.name,
        avatar: request.sender.avatar,
      };
    }
  });

  return NextResponse.json({ profile, friendFilms, friendSeries, userFriends });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const friendId = params.id;

  const deleteContact = await prisma.friendRequest.deleteMany({
    where: {
      OR: [
        {
          AND: [{ senderId: userId }, { receiverId: friendId }],
        },
        {
          AND: [{ senderId: friendId }, { receiverId: userId }],
        },
      ],
    },
  });

  return NextResponse.json(deleteContact);
}
