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
import {
  ActionResponse,
  EntryType,
  MediaItem,
  MediaType,
  SuggestionResponseType,
} from "@/src/types";
import {
  createMediaWithUser,
  getMedia,
  getMediaDetailsFromDB,
  linkMediaToUser,
} from "./media.helpers";

export const addSearchedMediaToWatchlist = async (
  mediaId: number,
  entry: EntryType
): Promise<ActionResponse<MediaItem>> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;
    let formattedMedia: MediaItem;

    const { source, media } = await getMedia(mediaId, entry);

    if (source === "database") {
      const result = await linkMediaToUser(media.id, userId);
      const { media: nestedMedia, ...rest } = result;
      formattedMedia = { ...rest, ...(nestedMedia ?? {}) };
    } else {
      const newMedia = await createMediaWithUser(media, userId);
      formattedMedia = await getMediaDetailsFromDB(userId, newMedia.id);
    }

    return { success: true, data: formattedMedia };
  } catch (error) {
    return handleActionError(error, "Add TMDB media");
  }
};

export const createCustomMedia = async (
  media: MediaFormData,
  userId?: string
): Promise<ActionResponse<MediaType>> => {
  try {
    const session = await requireAuth();
    const targetUserId = userId || session.user.id;

    const data = await createMediaWithUser(media, targetUserId);
    return { success: true, data };
  } catch (error) {
    return handleActionError(error, "Create media");
  }
};

export const addExistantMediaToWatchlist = async (
  mediaId: string
): Promise<ActionResponse<MediaItem>> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;
    const result = await linkMediaToUser(mediaId, userId);
    const { media: nestedMedia, ...rest } = result;
    const data = { ...rest, ...(nestedMedia ?? {}) };
    return { success: true, data };
  } catch (error) {
    return handleActionError(error, "Add existant media");
  }
};

export const suggestSearchedMedia = async (
  mediaId: number,
  receiverId: string,
  entry: EntryType,
  senderComment?: string
): Promise<ActionResponse<SuggestionResponseType>> => {
  try {
    const session = await requireAuth();
    const { source, media } = await getMedia(mediaId, entry);

    const suggestion = await prisma.$transaction(async (tx) => {
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
        include: {
          media: {
            select: { tmdbId: true },
          },
        },
      });
    });
    return { success: true, data: suggestion };
  } catch (error) {
    return handleActionError(error, "Suggest TMDB media");
  }
};

export const suggestCustomMedia = async (
  media: MediaFormData,
  receiverId: string,
  senderComment?: string
): Promise<ActionResponse<Omit<SuggestionResponseType, "media">>> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const suggestion = await prisma.$transaction(async (tx) => {
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
    return { success: true, data: suggestion };
  } catch (error) {
    return handleActionError(error, "Suggest custom media");
  }
};

export const suggestExistantMedia = async (
  mediaId: string,
  receiverId: string,
  senderComment?: string
): Promise<ActionResponse<SuggestionResponseType>> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const suggestion = await prisma.$transaction(async (tx) => {
      const { media } = await linkMediaToUser(mediaId, receiverId, tx, false);

      return await tx.suggestion.create({
        data: {
          senderId: userId,
          receiverId,
          mediaId: media.id,
          senderComment,
        },
        include: {
          media: {
            select: { tmdbId: true },
          },
        },
      });
    });
    return { success: true, data: suggestion };
  } catch (error) {
    return handleActionError(error, "Suggest existant media");
  }
};

export const updateMedia = async (
  mediaId: string,
  media: UpdateMediaFormData
): Promise<ActionResponse<MediaType>> => {
  try {
    const { data: validatedMedia } = strictValidateSchema(
      updateMediaServerSchema,
      media
    );

    if (!mediaId) throw new ApiError(400, "Media ID manquant");

    await requireAuth();

    const updatedMedia = await prisma.watchList.update({
      where: {
        id: mediaId,
      },
      data: validatedMedia,
    });
    return { success: true, data: updatedMedia };
  } catch (error) {
    return handleActionError(error, "Update media");
  }
};

export const updateWatched = async (
  mediaId: string
): Promise<ActionResponse<{ mediaId: string; watched: boolean }>> => {
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

    const updatedMedia = await prisma.usersWatchList.update({
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
      },
    });
    return { success: true, data: updatedMedia };
  } catch (error) {
    return handleActionError(error, "Update media");
  }
};

export const deleteFromWatchlist = async (
  mediaId: string
): Promise<ActionResponse<{ mediaId: string }>> => {
  try {
    if (!mediaId) throw new ApiError(400, "Media ID manquant");
    const session = await requireAuth();

    const userId = session.user.id;

    const deletedMedia = await prisma.usersWatchList.delete({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
      select: { mediaId: true },
    });
    return { success: true, data: deletedMedia };
  } catch (error) {
    return handleActionError(error, "Delete media");
  }
};
