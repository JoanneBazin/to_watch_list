"use server";

import { prisma } from "@/src/lib/server";
import { EntryType } from "@/src/types";
import { getMediaDBFormat, strictValidateSchema } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { MediaFormData, mediaServerSchema } from "./media.schema";
import { Prisma } from "@prisma/client";

type PrismaClient = typeof prisma | Omit<Prisma.TransactionClient, symbol>;

export const fetchMediaFromTMDB = async (mediaId: number, entry: EntryType) => {
  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits,watch/providers&language=fr-FR`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Erreur lors de la récupération TMDB");
  }

  const TMDBMedia = await response.json();
  return getMediaDBFormat(TMDBMedia, entry);
};

export const getMedia = async (mediaId: number, entry: EntryType) => {
  const existingMedia = await prisma.watchList.findFirst({
    where: { tmdbId: mediaId },
  });

  if (existingMedia) {
    return { source: "database" as const, media: existingMedia };
  }

  const formattedMedia = await fetchMediaFromTMDB(mediaId, entry);

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
  return { ...userMedia, ...userMedia.media, media: undefined };
};
