import { prisma } from "@/src/lib/server";

export const cleanDatabase = async () => {
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.watchList.deleteMany({});
  await prisma.category.deleteMany({});
};
