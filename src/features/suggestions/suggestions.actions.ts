"use server";

import { prisma } from "@/src/lib/server";
import { SuggestionsStatus } from "@/src/types";
import { handleActionError, requireAuth } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";

export const shareMediaSuggestion = async (
  mediaId: string,
  friendId: string,
  comment?: string
) => {
  try {
    const session = await requireAuth();
    const senderId = session.user.id;

    let userLinkWithMedia = await prisma.usersWatchList.findUnique({
      where: {
        userId_mediaId: {
          userId: friendId,
          mediaId: mediaId,
        },
      },
    });

    if (!userLinkWithMedia) {
      userLinkWithMedia = await prisma.usersWatchList.create({
        data: {
          userId: friendId,
          mediaId: mediaId,
        },
      });
    }

    return await prisma.suggestion.create({
      data: {
        senderId,
        receiverId: friendId,
        mediaId: mediaId,
        senderComment: comment,
      },
      select: { id: true, mediaId: true },
    });
  } catch (error) {
    handleActionError(error, "Share media");
  }
};

export const updateReceivedSuggestions = async (
  mediaId: string,
  status: SuggestionsStatus
) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const suggestion = await prisma.suggestion.findFirst({
      where: { mediaId, receiverId: userId },
      select: { id: true },
    });

    if (!suggestion) {
      throw new ApiError(404, "Suggestion introuvable");
    }

    await prisma.suggestion.updateMany({
      where: {
        mediaId,
        receiverId: userId,
      },
      data: { status },
    });

    return prisma.usersWatchList.update({
      where: { userId_mediaId: { userId, mediaId } },
      data: { addedAt: new Date() },
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
  } catch (error) {
    handleActionError(error, "Update suggestion status");
  }
};

export const updateSuggestionResponse = async (
  suggestionId: string,
  comment: string
) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const suggestion = await prisma.suggestion.findFirst({
      where: { id: suggestionId, receiverId: userId },
      select: { id: true },
    });

    if (!suggestion) {
      throw new ApiError(404, "Suggestion introuvable");
    }

    return await prisma.suggestion.update({
      where: {
        id: suggestion.id,
      },
      data: { receiverComment: comment },
      select: {
        id: true,
        mediaId: true,
        receiverComment: true,
      },
    });
  } catch (error) {
    handleActionError(error, "Send suggestion response");
  }
};
