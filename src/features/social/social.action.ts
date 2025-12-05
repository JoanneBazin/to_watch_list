"use server";

import { prisma } from "@/src/lib/server";
import {
  ActionResponse,
  FriendRequestStatus,
  UpdatedContactType,
} from "@/src/types";
import { handleActionError, requireAuth } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";

export const addFriendRequest = async (
  receiverId: string
): Promise<ActionResponse<string>> => {
  try {
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

    const request = await prisma.friendRequest.create({
      data: {
        senderId: userId,
        receiverId,
        status: "PENDING",
      },
      select: { id: true },
    });
    return { success: true, data: request.id };
  } catch (error) {
    return handleActionError(error, "Add friend request");
  }
};

export const updateFriendRequestStatus = async (
  requestId: string,
  status: FriendRequestStatus
): Promise<ActionResponse<UpdatedContactType>> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId, receiverId: userId },
      select: { id: true },
    });

    if (!request) {
      throw new ApiError(404, "Demande introuvable");
    }

    const contact = await prisma.friendRequest.update({
      where: {
        id: request.id,
      },
      data: { status },
      select: {
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
    return { success: true, data: contact };
  } catch (error) {
    return handleActionError(error, "Update friend request");
  }
};

export const deleteFriend = async (
  friendId: string
): Promise<ActionResponse<string>> => {
  try {
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

    return { success: true, data: friendId };
  } catch (error) {
    return handleActionError(error, "Delete friend");
  }
};
