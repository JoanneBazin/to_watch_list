"use server";

import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";

export const updateUserName = async (name: string) => {
  const session = await requireAuth();
  const userId = session.user.id;

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: { name },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
};

export const deleteUserAccount = async () => {
  const session = await requireAuth();
  const userId = session.user.id;

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
