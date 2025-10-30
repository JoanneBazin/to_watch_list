"use server";

import { prisma } from "@/src/lib/server";
import { ApiError } from "@/src/utils/shared";

export const validateAuthData = async (username: string, email: string) => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ name: username }, { email }] },
  });
  if (existingUser) {
    throw new ApiError(
      409,
      existingUser.email === email
        ? "Adresse mail déjà utilisée"
        : "Ce nom d'utilisateur est déjà utilisé"
    );
  }
};
