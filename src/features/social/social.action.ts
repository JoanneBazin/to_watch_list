"use server";

import { prisma } from "@/src/lib/prisma";
import { FriendRequestStatus } from "@/src/types";
import { ApiError } from "@/src/utils/ApiError";
import { requireAuth } from "@/src/utils/requireAuth";

export const addFriendRequest = async (receiverId: string) => {
  const session = await requireAuth();
  const userId = session.user.id;

  if (userId === receiverId) {
    throw new ApiError(400, "Comptes identiques");
  }

  const receiver = await prisma.user.findUnique({
    where: { id: receiverId },
    select: { id: true },
  });

  if (!receiver) {
    throw new ApiError(404, "Utilisateur introuvable");
  }

  const existing = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
      status: "PENDING",
    },
  });

  if (existing) {
    throw new ApiError(409, "Une demande est déjà en attente");
  }

  return await prisma.friendRequest.create({
    data: {
      senderId: userId,
      receiverId,
      status: "PENDING",
    },
  });
};

export const updateFriendRequestStatus = async (
  requestId: string,
  status: FriendRequestStatus
) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId, receiverId: userId },
    select: { id: true },
  });

  if (!request) {
    throw new ApiError(404, "Demande introuvable");
  }

  return await prisma.friendRequest.update({
    where: {
      id: request.id,
    },
    data: { status },
    select: {
      id: true,
      status: true,
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

export const deleteFriend = async (friendId: string) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const friendshipStatus = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
      status: "ACCEPTED",
    },
    select: {
      id: true,
    },
  });

  if (!friendshipStatus) {
    throw new ApiError(404, "Relation introuvable");
  }

  await prisma.friendRequest.deleteMany({
    where: {
      OR: [
        {
          AND: [{ senderId: userId }, { receiverId: friendId }],
        },
        {
          AND: [{ senderId: friendId }, { receiverId: userId }],
        },
      ],
    },
  });
};
