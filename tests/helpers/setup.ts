import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

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

export const createTestContact = async (userId: string, email: string) => {
  const contactUser = await createTestUser({
    email,
    name: "Test Contact",
    password: "password1234",
  });

  return prisma.friendRequest.create({
    data: {
      senderId: userId,
      receiverId: contactUser,
      status: "ACCEPTED",
    },
    select: { receiverId: true },
  });
};

export const createMockSession = (userId: string) => ({
  user: {
    id: userId,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    email: "test@test.com",
    emailVerified: false,
    name: "Test User",
  },
  session: {
    id: "1",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    userId: userId,
    token: "mock-token",
    expiresAt: new Date(Date.now() + 3600000),
  },
});

export const createTestCategory = async () => {
  await prisma.category.create({
    data: { name: "Action" },
  });
};

export const createTestMedia = async () => {
  const media = await prisma.watchList.create({
    data: { title: "Film title", type: "FILM", categoryName: "Action" },
  });
  return { ...media, addedAt: new Date(Date.now()), watched: false };
};

export const getTestMediaIdFromWatchlist = async (userId: string) => {
  const mediaId = await prisma.usersWatchList.findFirst({
    where: { userId: userId },
    select: {
      mediaId: true,
      watched: true,
    },
  });
  if (!mediaId) throw new Error("No media available");
  return mediaId;
};

export const cleanDatabase = async () => {
  await prisma.user.deleteMany({});
  await prisma.watchList.deleteMany({});
};
