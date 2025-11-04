"use server";

import { prisma } from "@/src/lib/server";

export const validateAuthData = async (
  username: string,
  email: string
): Promise<{ success: true } | { success: false; message: string }> => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ name: username }, { email }] },
  });
  if (existingUser) {
    return {
      success: false,
      message:
        existingUser.email === email
          ? "Adresse mail déjà utilisée"
          : "Ce nom d'utilisateur est déjà utilisé",
    };
  }
  return { success: true };
};
