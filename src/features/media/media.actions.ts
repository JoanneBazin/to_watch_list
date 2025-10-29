"use server";

import { prisma } from "@/src/lib/server";
import {
  handleActionError,
  requireAuth,
  strictValidateSchema,
} from "@/src/utils/server";
import {
  MediaFormData,
  UpdateMediaFormData,
  updateMediaServerSchema,
} from "./media.schema";
import { ApiError } from "@/src/utils/shared";
import { EntryType, TMDBMedia, TMDBSerie } from "@/src/types";
import {
  createMediaWithUser,
  getMedia,
  getMediaDetailsFromDB,
  linkMediaToUser,
} from "./media.helpers";
import { cleanWatchlist } from "@/scripts/cleanWatchlist";

export const fetchMediaQuery = async (
  query: string,
  entry: EntryType
): Promise<TMDBMedia[]> => {
  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&language=fr-FR`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }

  const result = await response.json();

  if (entry === "SERIE") {
    const resultList: TMDBSerie[] = result.results;
    return resultList.map((s) => ({
      id: s.id,
      title: s.name,
      original_title: s.original_name,
      overview: s.overview,
      release_date: s.first_air_date,
      poster_path: s.poster_path,
    }));
  }
  return result.results;
};

export const addSearchedMediaToWatchlist = async (
  mediaId: number,
  entry: EntryType
) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const { source, media } = await getMedia(mediaId, entry);

    if (source === "database") {
      const result = await linkMediaToUser(media.id, userId);
      return { ...result, ...result.media, media: undefined };
    }

    const newMedia = await createMediaWithUser(media, userId);
    return getMediaDetailsFromDB(userId, newMedia.id);
  } catch (error) {
    handleActionError(error, "Add TMDB media");
  }
};

export const createCustomMedia = async (
  media: MediaFormData,
  userId?: string
) => {
  try {
    const session = await requireAuth();
    const targetUserId = userId || session.user.id;

    return createMediaWithUser(media, targetUserId);
  } catch (error) {
    handleActionError(error, "Create media");
  }
};

export const addExistantMediaToWatchlist = async (mediaId: string) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const result = await linkMediaToUser(mediaId, userId);
    return { ...result, ...result.media, media: undefined };
  } catch (error) {
    handleActionError(error, "Add existant media");
  }
};

export const suggestSearchedMedia = async (
  mediaId: number,
  receiverId: string,
  entry: EntryType,
  senderComment?: string
) => {
  try {
    const session = await requireAuth();
    const { source, media } = await getMedia(mediaId, entry);

    return await prisma.$transaction(async (tx) => {
      let dbMediaId: string;

      if (source === "database") {
        dbMediaId = media.id;
        await linkMediaToUser(dbMediaId, receiverId, tx, false);
      } else {
        const newMedia = await createMediaWithUser(media, receiverId, tx);
        dbMediaId = newMedia.id;
      }

      return await tx.suggestion.create({
        data: {
          senderId: session.user.id,
          receiverId,
          mediaId: dbMediaId,
          senderComment,
        },
      });
    });
  } catch (error) {
    handleActionError(error, "Suggest TMDB media");
  }
};

export const suggestCustomMedia = async (
  media: MediaFormData,
  receiverId: string,
  senderComment?: string
) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.$transaction(async (tx) => {
      const newMedia = await createMediaWithUser(media, receiverId, tx);

      return await tx.suggestion.create({
        data: {
          senderId: userId,
          receiverId,
          mediaId: newMedia.id,
          senderComment,
        },
      });
    });
  } catch (error) {
    handleActionError(error, "Suggest custom media");
  }
};

export const suggestExistantMedia = async (
  mediaId: string,
  receiverId: string,
  senderComment?: string
) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.$transaction(async (tx) => {
      const { media } = await linkMediaToUser(mediaId, receiverId, tx, false);

      return await tx.suggestion.create({
        data: {
          senderId: userId,
          receiverId,
          mediaId: media.id,
          senderComment,
        },
      });
    });
  } catch (error) {
    handleActionError(error, "Suggest existant media");
  }
};

export const updateMedia = async (
  mediaId: string,
  media: UpdateMediaFormData
) => {
  try {
    const { data } = strictValidateSchema(updateMediaServerSchema, media);

    if (!mediaId) throw new ApiError(400, "Media ID manquant");

    await requireAuth();

    return await prisma.watchList.update({
      where: {
        id: mediaId,
      },
      data,
    });
  } catch (error) {
    handleActionError(error, "Update media");
  }
};

export const updateWatched = async (mediaId: string) => {
  try {
    if (!mediaId) throw new ApiError(400, "Media ID manquant");

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
      select: {
        mediaId: true,
        watched: true,
        media: { select: { type: true } },
      },
    });
  } catch (error) {
    handleActionError(error, "Update media");
  }
};

export const deleteFromWatchlist = async (mediaId: string) => {
  try {
    if (!mediaId) throw new ApiError(400, "Media ID manquant");
    const session = await requireAuth();

    const userId = session.user.id;

    return await prisma.usersWatchList.delete({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
      select: { mediaId: true, media: { select: { type: true } } },
    });
  } catch (error) {
    handleActionError(error, "Delete media");
  }
};
