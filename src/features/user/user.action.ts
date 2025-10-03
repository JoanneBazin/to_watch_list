"use server";

import { prisma } from "@/src/lib/prisma";
import { ApiError } from "@/src/utils/ApiError";
import { requireAuth } from "@/src/utils/requireAuth";
import { uploadImages } from "@/src/utils/uploadImages";

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

export const updateUserAvatar = async (formData: FormData) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const image = formData.get("avatar") as File;

  if (!image) throw new ApiError(400, "Aucun fichier fourni");

  if (image.size > 5 * 1024 * 1024) {
    throw new ApiError(400, "Le fichier est trop volumineux (max 5MB)");
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    throw new ApiError(400, "Format de fichier non supporté");
  }

  const imageUrl = await uploadImages(image, userId);

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: { image: imageUrl },
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
