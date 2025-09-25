"use server";

import { prisma } from "@/src/lib/prisma";
import { SuggestionsStatus } from "@/src/types";
import { ApiError } from "@/src/utils/ApiError";
import { requireAuth } from "@/src/utils/requireAuth";

export const shareMediaSuggestion = async (
  mediaId: string,
  friendId: string,
  comment?: string
) => {
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
    select: { mediaId: true },
  });
};

export const updateReceivedSuggestions = async (
  mediaId: string,
  status: SuggestionsStatus
) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const suggestion = await prisma.suggestion.findFirst({
    where: { mediaId: mediaId, receiverId: userId },
    select: { media: true },
  });

  if (!suggestion) {
    throw new ApiError(404, "Suggestion introuvable");
  }

  await prisma.suggestion.updateMany({
    where: {
      mediaId: mediaId,
      receiverId: userId,
    },
    data: { status },
  });

  return { ...suggestion.media };
};

export const updateSuggestionResponse = async (
  suggestionId: string,
  comment: string
) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const suggestion = await prisma.suggestion.findFirst({
    where: { id: suggestionId, receiverId: userId },
    select: { id: true },
  });

  if (!suggestion) {
    throw new ApiError(404, "Suggestion introuvable");
  }

  await prisma.suggestion.update({
    where: {
      id: suggestion.id,
    },
    data: { receiverComment: comment },
  });
};
