import { MediaFormData } from "@/src/features/media/media.schema";
import { auth, prisma } from "@/src/lib/server";
import { Prisma } from "@prisma/client";

export interface MediaData {
  title: string;
  cat: string;
  type: "FILM" | "SERIE";
}

export const cleanDatabase = async () => {
  await prisma.watchList.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
};

export const createUserInDb = async () => {
  const uniqueId = Date.now() + Math.random().toString(36).substring(2, 7);
  const userCredentials = {
    email: `user-${uniqueId}@test.com`,
    name: `User ${uniqueId}`,
    password: "Password1234",
  };
  const { user } = await auth.api.signUpEmail({
    body: userCredentials,
  });
  if (!user) throw new Error("User Test creation failed");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: userCredentials.password,
  };
};

export const cleanUserInDb = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
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
  receiverId: string,
  senderId: string,
  status: "ACCEPTED" | "PENDING",
) => {
  return prisma.friendRequest.create({
    data: {
      senderId,
      receiverId,
      status,
    },
    select: { id: true },
  });
};

export const cleanFriendRequestsInDb = async (userId?: string) => {
  const where = userId
    ? {
        OR: [{ senderId: userId }, { receiverId: userId }],
      }
    : undefined;

  await prisma.friendRequest.deleteMany({ where });
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

export const createTestMedia = async (
  title = "Action film",
  cat = "Action",
  type: "FILM" | "SERIE" = "FILM",
) => {
  return prisma.watchList.create({
    data: { title, type, categories: [cat] },
  });
};

export const createTestMediaWithUser = async (
  userId: string,
  media?: MediaData,
) => {
  const newMedia = await createTestMedia(media?.title, media?.cat, media?.type);
  const userMedia = await prisma.usersWatchList.create({
    data: { userId, mediaId: newMedia.id },
    select: { media: true },
  });
  if (!userMedia) throw new Error("No media available");
  return userMedia;
};

export const cleanWatchlistInDb = async (userId: string) => {
  await prisma.usersWatchList.deleteMany({
    where: { userId },
  });
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
