"use server";

import { prisma } from "@/src/lib/server";
import {
  handleActionError,
  requireAuth,
  uploadImages,
} from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";

export const updateUserName = async (name: string) => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    if (name.length > 20) throw new ApiError(400, "Le nom est trop long");

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: { name },
      select: {
        name: true,
      },
    });
  } catch (error) {
    handleActionError(error, "Update username");
  }
};

export const updateUserAvatar = async (formData: FormData) => {
  try {
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
        image: true,
      },
    });
  } catch (error) {
    handleActionError(error, "Update user avatar");
  }
};

export const deleteUserAccount = async () => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    handleActionError(error, "Delete account");
  }
};
