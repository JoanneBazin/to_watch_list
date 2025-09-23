import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const friend = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  const friendProfile = await Promise.allSettled([
    prisma.usersWatchList.findMany({
      where: {
        AND: [
          { userId: id },
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
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
  ]);

  const films =
    friendProfile[0].status === "fulfilled" ? friendProfile[0].value : [];
  const series =
    friendProfile[1].status === "fulfilled" ? friendProfile[1].value : [];
  const friends =
    friendProfile[2].status === "fulfilled" ? friendProfile[2].value : [];

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
        avatar: request.receiver.image,
      };
    } else {
      return {
        id: request.sender.id,
        name: request.sender.name,
        avatar: request.sender.image,
      };
    }
  });

  return NextResponse.json({ friend, friendFilms, friendSeries, userFriends });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth(req);
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

  return NextResponse.json({ success: true });
}
