"use server";

import { prisma } from "@/src/lib/prisma";
import { MediaItem } from "@/src/types";
import { requireAuth } from "@/src/utils/requireAuth";

export const addToWatchlist = async (media: MediaItem) => {
  const session = requireAuth();

  const userId = (await session).user.id;
  const addEntry = await prisma.watchList.create({
    data: {
      title: media.title,
      type: media.type,
      synopsis: media.synopsis,
      year: media.year,
      real: media.real,
      platform: media.platform,
      categoryName: media.categoryName,
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

  return addEntry;
};

export const updateWatched = async (mediaId: string) => {
  const session = requireAuth();

  const userId = (await session).user.id;
  const current = await prisma.usersWatchList.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
    select: { watched: true },
  });

  await prisma.usersWatchList.update({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
    data: {
      watched: !current?.watched,
    },
  });
};

export const deleteFromWatchlist = async (mediaId: string) => {
  const session = requireAuth();

  const userId = (await session).user.id;

  await prisma.usersWatchList.delete({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });
};
