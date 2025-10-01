import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanDatabase,
  createMockSession,
  createTestUser,
} from "../helpers/setup";
import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "@/src/features/social/social.action";

vi.mock("@/src/utils/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));

describe("Social actions", () => {
  let userId: string;

  beforeAll(async () => {
    await cleanDatabase();
    userId = await createTestUser();
    vi.mocked(requireAuth).mockResolvedValue(createMockSession(userId));
  });
  beforeEach(async () => {
    vi.clearAllMocks();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("manageFriendRequest", () => {
    let requestId: string;
    let friendId: string;

    it("should send a new friend request", async () => {
      const contactUser = await createTestUser({
        email: "receiver@test.com",
        name: "Test Contact",
        password: "password1234",
      });
      const result = await addFriendRequest(contactUser);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result.receiverId).toBe(contactUser);
      expect(result.status).toBe("PENDING");

      const inDb = await prisma.friendRequest.findFirst({
        where: { senderId: userId, receiverId: contactUser, status: "PENDING" },
      });
      expect(inDb).not.toBeNull();
    });

    it("should update friendship status", async () => {
      const senderId = await createTestUser({
        email: "sender@test.com",
        name: "Test Sender",
        password: "password1234",
      });
      const receivedRequest = await prisma.friendRequest.create({
        data: {
          senderId,
          receiverId: userId,
          status: "PENDING",
        },
        select: { id: true },
      });
      const newFriendshipStatus = "ACCEPTED";

      const result = await updateFriendRequestStatus(
        receivedRequest.id,
        newFriendshipStatus
      );

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result.status).toBe(newFriendshipStatus);

      const inDb = await prisma.friendRequest.findFirst({
        where: {
          receiverId: userId,
          senderId: senderId,
          status: newFriendshipStatus,
        },
      });
      expect(inDb).not.toBeNull();

      requestId = result.id;
      friendId = result.sender.id;
    });

    it("should delete a relation", async () => {
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
