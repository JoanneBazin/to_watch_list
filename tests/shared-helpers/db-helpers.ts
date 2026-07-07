import { MediaFormData } from "@/src/features/media/media.schema";
import { auth, prisma } from "@/src/lib/server";
import { Prisma } from "@prisma/client";

export const cleanDatabase = async () => {
  await prisma.watchList.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
};

export const cleanUserInDb = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};

export const createUserInDb = async () => {
  const uniqueId = Date.now() + Math.random().toString(36).substring(2, 7);
  const userData = await auth.api.signUpEmail({
    body: {
      email: `user-${uniqueId}@test.com`,
      name: `User ${uniqueId}`,
      password: "Password1234",
    },
  });
  if (!userData) throw new Error("User Test creation failed");

  return userData.user;
};

export const createTestUser = async (overrides = {}) => {
  const userData = await auth.api.signUpEmail({
    body: {
      email: "test@test.com",
      name: "Test User",
      password: "password1234",
      ...overrides,
    },
  });
  if (!userData) throw new Error("User Test creation failed");

  return userData.user.id;
};

export const createFriendRequest = async (
  userId: string,
  contactId: string,
  status: "ACCEPTED" | "PENDING",
) => {
  return prisma.friendRequest.create({
    data: {
      senderId: contactId,
      receiverId: userId,
      status,
    },
    select: { id: true },
  });
};

export const cleanFriendRequestsInDb = async () => {
  await prisma.friendRequest.deleteMany({});
};

export const customMediaTest: MediaFormData = {
  title: "Test Media",
  originalTitle: "Test Media",
  synopsis: "Synopsis",
  year: "2020",
  real: "Real",
  platform: "Platform",
  type: "FILM",
  categories: ["Action"],
};

export const createTestCategory = async (overrides = {}) => {
  return prisma.category.create({
    data: { name: "Action", ...overrides },
    select: { name: true },
  });
};

export const createTestMedia = async () => {
  return prisma.watchList.create({
    data: { title: "Film title", type: "FILM", categories: ["Action"] },
  });
};

export const createTestMediaWithUser = async (userId: string) => {
  const media = await createTestMedia();
  const userMedia = await prisma.usersWatchList.create({
    data: { userId, mediaId: media.id },
    include: { media: true },
  });
  if (!userMedia) throw new Error("No media available");
  return userMedia;
};

export const createTestMediaSuggestion = async (
  senderId: string,
  receiverId: string,
  comment?: string,
) => {
  const media = await createTestMedia();

  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.usersWatchList.create({
      data: {
        mediaId: media.id,
        userId: receiverId,
      },
    });

    return await tx.suggestion.create({
      data: {
        senderId,
        receiverId,
        mediaId: media.id,
        receiverComment: comment,
      },
      include: { media: true, sender: true },
    });
  });
};
