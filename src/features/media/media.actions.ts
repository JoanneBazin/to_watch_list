"use server";

import { prisma } from "@/src/lib/prisma";
import { MediaItem } from "@/src/types";
import { ApiError } from "@/src/utils/ApiError";
import { requireAuth } from "@/src/utils/requireAuth";

export const addToWatchlist = async (media: MediaItem) => {
  const session = await requireAuth();

  const userId = session.user.id;
  return await prisma.watchList.create({
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
};

export const updateMedia = async (mediaId: string, data: MediaItem) => {
  const session = await requireAuth();

  const { suggestions, ...mediaData } = data;

  return await prisma.watchList.update({
    where: {
      id: mediaId,
    },
    data: mediaData,
  });
};

export const updateWatched = async (mediaId: string) => {
  const session = await requireAuth();

  if (!mediaId) throw new ApiError(400, "Media ID manquant");

  const userId = session.user.id;
  const current = await prisma.usersWatchList.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
    select: { watched: true },
  });

  if (!current)
    throw new ApiError(404, "Elément introuvable dans la watchlist");

  return await prisma.usersWatchList.update({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
    data: {
      watched: !current?.watched,
    },
    select: { mediaId: true, watched: true },
  });
};

export const deleteFromWatchlist = async (mediaId: string) => {
  const session = await requireAuth();

  const userId = session.user.id;

  return await prisma.usersWatchList.delete({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
    select: { mediaId: true },
  });
};
