"use server";

import { prisma } from "@/src/lib/prisma";
import { AddEntryFormValue, MediaItem } from "@/src/types";
import { ApiError } from "@/src/utils/ApiError";
import { handleActionError } from "@/src/utils/errorHandlers";
import { requireAuth } from "@/src/utils/requireAuth";

export const createMedia = async (media: AddEntryFormValue) => {
  try {
    if (!media.title || !media.type || !media.categoryName) {
      throw new ApiError(400, "Champs requis manquants");
    }
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
          userId: userId,
          mediaId: mediaId,
        },
      },
      include: {
        media: true,
      },
    });

    if (existantMedia) {
      await prisma.suggestion.updateMany({
        where: {
          AND: [{ receiverId: userId }, { mediaId: mediaId }],
        },
        data: {
          status: "ACCEPTED",
        },
      });
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

export const updateMedia = async (mediaId: string, data: MediaItem) => {
  try {
    if (!mediaId) throw new ApiError(400, "Media ID manquant");

    await requireAuth();

    const { suggestions, ...mediaData } = data;

    return await prisma.watchList.update({
      where: {
        id: mediaId,
      },
      data: mediaData,
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

export const addToContactWatchlist = async (
  media: AddEntryFormValue,
  receiverId: string
) => {
  try {
    if (!media.title || !media.type || !media.categoryName) {
      throw new ApiError(400, "Champs requis manquants");
    }

    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.$transaction(async (tx) => {
      const newMedia = await tx.watchList.create({
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
          senderComment: media.senderComment,
        },
      });
    });
  } catch (error) {
    handleActionError(error, "Add media");
  }
};
