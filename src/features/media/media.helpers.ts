"use server";

import { prisma } from "@/src/lib/server";
import { EntryType } from "@/src/types";
import { getMediaDBFormat, strictValidateSchema } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { MediaFormData, mediaServerSchema } from "./media.schema";
import { Prisma } from "@prisma/client";
import { fetchMediaFromTMDB } from "@/src/lib/server/tmdbService";

type PrismaClient = typeof prisma | Omit<Prisma.TransactionClient, symbol>;

export const getMedia = async (mediaId: number, entry: EntryType) => {
  const existingMedia = await prisma.watchList.findFirst({
    where: { tmdbId: mediaId },
  });

  if (existingMedia) {
    return { source: "database" as const, media: existingMedia };
  }

  const mediaDetails = await fetchMediaFromTMDB(mediaId, entry);
  const formattedMedia = getMediaDBFormat(mediaDetails, entry);

  return { source: "tmdb" as const, media: formattedMedia };
};

export const createMediaWithUser = async (
  media: MediaFormData,
  userId: string,
  tx: PrismaClient = prisma
) => {
  const { data } = strictValidateSchema(mediaServerSchema, media);

  return await tx.watchList.create({
    data: {
      title: data.title,
      originalTitle: data.originalTitle,
      tmdbId: data.tmdbId,
      type: data.type,
      synopsis: data.synopsis,
      year: data.year,
      real: data.real,
      platform: data.platform,
      categories: data.categories,
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

export const linkMediaToUser = async (
  mediaId: string,
  userId: string,
  tx: PrismaClient = prisma,
  shouldUpdateSuggestions = true
) => {
  const existingMedia = await tx.usersWatchList.findUnique({
    where: { userId_mediaId: { userId, mediaId } },
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
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (existingMedia) {
    if (shouldUpdateSuggestions) {
      const suggestions = await tx.suggestion.updateMany({
        where: {
          receiverId: userId,
          mediaId,
        },
        data: { status: "ACCEPTED" },
      });

      if (suggestions.count === 0) {
        throw new ApiError(409, "Le titre est déjà dans ta liste");
      }
    }

    return existingMedia;
  }

  return await tx.usersWatchList.create({
    data: { userId, mediaId },
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
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

export const getMediaDetailsFromDB = async (
  userId: string,
  mediaId: string
) => {
  const userMedia = await prisma.usersWatchList.findUnique({
    where: { userId_mediaId: { userId, mediaId } },
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
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  if (!userMedia)
    throw new ApiError(404, "Erreur lors de la récupération du média");
  const { media: nestedMedia, ...rest } = userMedia;
  return { ...rest, ...(nestedMedia ?? {}) };
};
