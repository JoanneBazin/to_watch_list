import { MediaFormData } from "@/src/features/media/media.schema";
import { auth, prisma } from "@/src/lib/server";
import { Prisma } from "@prisma/client";

type MediaType = "FILM" | "SERIE";

type CreateMediaOptions = {
  type?: MediaType;
  cat?: string;
};

type CreateSuggestionOptions = {
  type?: MediaType;
  senderComment?: string;
  receiverComment?: string;
};

type UpdateUserOptions = {
  name?: string;
  image?: string | null;
};

export const cleanDatabase = async () => {
  await prisma.watchList.deleteMany({});
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

export const createTestMedia = async (options: CreateMediaOptions = {}) => {
  const { type = "FILM", cat = "Cat01" } = options;
  const uniqueId = Date.now() + Math.random().toString(36).substring(2, 7);

  return prisma.watchList.create({
    data: { title: `Media ${uniqueId}`, type, categories: [cat] },
  });
};

export const createTestMediaWithUser = async (
  userId: string,
  options: CreateMediaOptions = {},
) => {
  const newMedia = await createTestMedia(options);
  const userMedia = await prisma.usersWatchList.create({
    data: { userId, mediaId: newMedia.id },
    select: {
      watched: true,
      mediaId: true,
      media: true,
    },
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
  options: CreateSuggestionOptions = {},
) => {
  const { type = "FILM", senderComment, receiverComment } = options;
  const media = await createTestMedia({ type });

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
        senderComment,
        receiverComment,
      },
      select: {
        id: true,
        media: {
          select: { id: true, title: true },
        },
      },
    });
  });
};

export const cleanSuggestionsInDb = async (userId?: string) => {
  const where = userId
    ? {
        OR: [{ senderId: userId }, { receiverId: userId }],
      }
    : undefined;

  await prisma.suggestion.deleteMany({ where });
};

export const updateUserProfile = async (
  userId: string,
  options: UpdateUserOptions = {},
) => {
  await prisma.user.update({
    where: { id: userId },
    data: options,
  });
};
