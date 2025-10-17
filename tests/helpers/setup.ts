import { auth, prisma } from "@/src/lib/server";

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

export const createTestContact = async (userId: string, overrides = {}) => {
  const contactUser = await createTestUser({
    email: "contactTest@test.com",
    name: "Test Contact",
    password: "password1234",
    ...overrides,
  });

  return prisma.friendRequest.create({
    data: {
      senderId: userId,
      receiverId: contactUser,
      status: "ACCEPTED",
    },
    select: { receiver: true },
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

export const cleanDatabase = async () => {
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.watchList.deleteMany({});
  await prisma.category.deleteMany({});
};
