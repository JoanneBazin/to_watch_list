"use server";

import { prisma } from "@/src/lib/server";
import {
  getMediaDBFormat,
  handleActionError,
  requireAuth,
  strictValidateSchema,
} from "@/src/utils/server";
import {
  MediaFormData,
  mediaServerSchema,
  UpdateMediaFormData,
  updateMediaServerSchema,
} from "./media.schema";
import { ApiError } from "@/src/utils/shared";
import { EntryType, TMDBMedia, TMDBMediaDetails, TMDBSerie } from "@/src/types";
import { shareMediaSuggestion } from "../suggestions/suggestions.actions";

export const fetchMediaQuery = async (
  query: string,
  entry: EntryType
): Promise<TMDBMedia[]> => {
  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&language=fr-FR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  };

  const response = await fetch(url, options);

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

const getTMDBMediaDetails = async (mediaId: number, entry: EntryType) => {
  const mediaInDb = await prisma.watchList.findFirst({
    where: { tmdbId: mediaId },
  });

  if (mediaInDb) {
    return { alreadyInDb: true, media: mediaInDb };
  }

  const mediaType = entry === "FILM" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=credits,watch/providers&language=fr-FR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const media = await response.json();
  return { alreadyInDb: false, media };
};

export const addSearchedMedia = async (mediaId: number, entry: EntryType) => {
  try {
    const { alreadyInDb, media } = await getTMDBMediaDetails(mediaId, entry);

    if (alreadyInDb) {
      const newUserMedia = await addToWatchlist(media.id);
      return newUserMedia?.media;
    }

    const newMedia = getMediaDBFormat(media, entry);
    return await createMedia(newMedia);
  } catch (error) {
    handleActionError(error, "Add TMDB media");
  }
};

export const createMedia = async (media: MediaFormData) => {
  try {
    const { data } = strictValidateSchema(mediaServerSchema, media);

    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.watchList.create({
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
  } catch (error) {
    handleActionError(error, "Add media");
  }
};

export const addToWatchlist = async (mediaId: string) => {
  try {
    if (!mediaId) throw new ApiError(400, "Media ID manquant");

    const session = await requireAuth();
    const userId = session.user.id;

    const existantMedia = await prisma.usersWatchList.findUnique({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
      include: {
        media: true,
      },
    });

    if (existantMedia) {
      const suggestions = await prisma.suggestion.updateMany({
        where: {
          AND: [{ receiverId: userId }, { mediaId: mediaId }],
        },
        data: {
          status: "ACCEPTED",
        },
      });

      if (suggestions.count === 0) {
        throw new ApiError(409, "Le titre est déjà dans ta liste");
      }

      return existantMedia;
    } else {
      return await prisma.usersWatchList.create({
        data: {
          userId: userId,
          mediaId: mediaId,
        },
        include: {
          media: true,
        },
      });
    }
  } catch (error) {
    handleActionError(error, "Add to watchlist");
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

export const addSearchedMediaToContactWatchlist = async (
  mediaId: number,
  receiverId: string,
  entry: EntryType
) => {
  try {
    const { alreadyInDb, media } = await getTMDBMediaDetails(mediaId, entry);

    if (alreadyInDb) {
      return shareMediaSuggestion(media.id, receiverId);
    }

    return addToContactWatchlist(media, receiverId);
  } catch (error) {
    handleActionError(error, "Add TMDB media");
  }
};

export const addToContactWatchlist = async (
  media: MediaFormData,
  receiverId: string
) => {
  try {
    const { data } = strictValidateSchema(mediaServerSchema, media);

    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.$transaction(async (tx) => {
      const newMedia = await tx.watchList.create({
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
                    id: receiverId,
                  },
                },
              },
            ],
          },
        },
      });

      return await tx.suggestion.create({
        data: {
          senderId: userId,
          receiverId: receiverId,
          mediaId: newMedia.id,
          senderComment: data.senderComment,
        },
      });
    });
  } catch (error) {
    handleActionError(error, "Add media");
  }
};
