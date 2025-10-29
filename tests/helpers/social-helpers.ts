import { prisma } from "@/src/lib/server";
import { createTestUser } from "./auth-helpers";

export const createUserIntoDb = async (overrides = {}) => {
  return createTestUser({
    email: "contact@test.com",
    name: "Contact User",
    password: "password1234",
    ...overrides,
  });
};

export const createContactWithFriendRequest = async (
  userId: string,
  status: "ACCEPTED" | "PENDING"
) => {
  const contactUser = await createUserIntoDb();
  return prisma.friendRequest.create({
    data: {
      senderId: contactUser,
      receiverId: userId,
      status,
    },
    include: { sender: true },
  });
};
