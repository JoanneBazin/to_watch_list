"use server";

import { prisma } from "@/src/lib/server";
import {
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

export const createMedia = async (media: MediaFormData) => {
  try {
    const { data } = strictValidateSchema(mediaServerSchema, media);

    const session = await requireAuth();
    const userId = session.user.id;

    return await prisma.watchList.create({
      data: {
        title: data.title,
        type: data.type,
        synopsis: data.synopsis,
        year: data.year,
        real: data.real,
        platform: data.platform,
        categoryName: data.categoryName,
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
          type: data.type,
          synopsis: data.synopsis,
          year: data.year,
          real: data.real,
          platform: data.platform,
          categoryName: data.categoryName,
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
