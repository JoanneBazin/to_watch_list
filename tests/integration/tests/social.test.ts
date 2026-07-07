import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { prisma } from "@/src/lib/server/prisma";
import { requireAuth } from "@/src/utils/server";
import {
  addFriendRequest,
  deleteFriend,
  updateFriendRequestStatus,
} from "@/src/features/social/social.action";
import { assertSuccess, setupTestEnv } from "../helpers/setup";
import {
  cleanFriendRequestsInDb,
  cleanUserInDb,
  createFriendRequest,
  createUserInDb,
} from "@/tests/shared-helpers/db-helpers";

describe("Social actions", () => {
  let userId: string;
  let contactId: string;

  beforeAll(async () => {
    const user = await setupTestEnv();
    userId = user.id;
    const contact = await createUserInDb();
    contactId = contact.id;
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    await cleanFriendRequestsInDb();
  });

  afterAll(async () => {
    await cleanUserInDb(userId);
    await cleanUserInDb(contactId);
  });

  it("should send a new friend request", async () => {
    const result = await addFriendRequest(contactId);
    expect(requireAuth).toHaveBeenCalledTimes(1);

    assertSuccess(result);

    const inDb = await prisma.friendRequest.findFirst({
      where: { senderId: userId, receiverId: contactId, status: "PENDING" },
    });
    expect(inDb).not.toBeNull();
  });

  it("should update friendship status", async () => {
    const request = await createFriendRequest(userId, contactId, "PENDING");

    const newFriendshipStatus = "ACCEPTED";

    const result = await updateFriendRequestStatus(
      request.id,
      newFriendshipStatus,
    );
    expect(requireAuth).toHaveBeenCalledTimes(1);

    assertSuccess(result);
    const { data } = result;

    expect(data).toBeDefined();
    expect(data.status).toBe(newFriendshipStatus);

    const inDb = await prisma.friendRequest.findFirst({
      where: {
        receiverId: userId,
        senderId: contactId,
        status: newFriendshipStatus,
      },
    });
    expect(inDb).not.toBeNull();
  });

  it("should delete a relation", async () => {
    const request = await createFriendRequest(userId, contactId, "ACCEPTED");

    const result = await deleteFriend(contactId);
    expect(requireAuth).toHaveBeenCalledTimes(1);

    assertSuccess(result);
    const { data } = result;

    expect(data).toBe(contactId);

    const inDb = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          {
            AND: [{ senderId: userId }, { receiverId: contactId }],
          },
          {
            AND: [{ senderId: contactId }, { receiverId: userId }],
          },
        ],
      },
    });
    expect(inDb).toBeNull();
  });
});
