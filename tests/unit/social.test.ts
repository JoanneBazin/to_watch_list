import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { setupTestEnv } from "../helpers/setup";
import { prisma } from "@/src/lib/server/prisma";
import { requireAuth } from "@/src/utils/server";
import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "@/src/features/social/social.action";
import {
  createContactWithFriendRequest,
  createUserIntoDb,
} from "../helpers/social-helpers";
import { cleanDatabase } from "../helpers/db-helpers";

describe("Social actions", () => {
  let userId: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    userId = await setupTestEnv();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("Add a contact", () => {
    it("should send a new friend request", async () => {
      const contactId = await createUserIntoDb();
      const result = await addFriendRequest(contactId);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.receiverId).toBe(contactId);
      expect(result?.status).toBe("PENDING");

      const inDb = await prisma.friendRequest.findFirst({
        where: { senderId: userId, receiverId: contactId, status: "PENDING" },
      });
      expect(inDb).not.toBeNull();
    });
  });

  describe("Respond to a friend request", () => {
    it("should update friendship status", async () => {
      const request = await createContactWithFriendRequest(userId, "PENDING");

      const newFriendshipStatus = "ACCEPTED";

      const result = await updateFriendRequestStatus(
        request.id,
        newFriendshipStatus
      );

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.status).toBe(newFriendshipStatus);

      const inDb = await prisma.friendRequest.findFirst({
        where: {
          receiverId: userId,
          senderId: request.senderId,
          status: newFriendshipStatus,
        },
      });
      expect(inDb).not.toBeNull();
    });
  });

  describe("Delete a contact", () => {
    it("should delete a relation", async () => {
      const request = await createContactWithFriendRequest(userId, "ACCEPTED");
      const friendId = request.senderId;

      await deleteFriend(friendId);

      expect(requireAuth).toHaveBeenCalledTimes(1);

      const inDb = await prisma.friendRequest.findFirst({
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
      expect(inDb).toBeNull();
    });
  });
});
