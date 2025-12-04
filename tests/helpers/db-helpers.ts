import { prisma } from "@/src/lib/server";

export const cleanDatabase = async (userId?: string) => {
  await prisma.watchList.deleteMany({});
  await prisma.category.deleteMany({});

  if (userId) {
    await prisma.user.deleteMany({
      where: {
        id: {
          not: userId,
        },
      },
    });
    await prisma.friendRequest.deleteMany({});
    await prisma.suggestion.deleteMany({});
  } else {
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});
  }
};
