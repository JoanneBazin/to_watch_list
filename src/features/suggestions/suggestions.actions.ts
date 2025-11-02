"use server";

import { prisma } from "@/src/lib/server";
import {
  ActionResponse,
  MediaItem,
  SuggestionResponseType,
  SuggestionsStatus,
} from "@/src/types";
import { handleActionError, requireAuth } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";

export const updateReceivedSuggestions = async (
  mediaId: string,
  status: SuggestionsStatus
): Promise<ActionResponse<MediaItem>> => {
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

    const userMedia = await prisma.usersWatchList.update({
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
    const { media: nestedMedia, ...rest } = userMedia;
    const data = { ...rest, ...(nestedMedia ?? {}) };
    return { success: true, data };
  } catch (error) {
    return handleActionError(error, "Update suggestion status");
  }
};

export const updateSuggestionResponse = async (
  suggestionId: string,
  comment: string
): Promise<
  ActionResponse<
    Pick<SuggestionResponseType, "id" | "mediaId" | "receiverComment">
  >
> => {
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

    const updated = await prisma.suggestion.update({
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

    return { success: true, data: updated };
  } catch (error) {
    return handleActionError(error, "Send suggestion response");
  }
};
