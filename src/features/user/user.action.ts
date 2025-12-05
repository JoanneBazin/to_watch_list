"use server";

import { prisma } from "@/src/lib/server";
import { ActionResponse } from "@/src/types";
import {
  handleActionError,
  requireAuth,
  uploadImages,
} from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";

export const updateUserName = async (
  name: string
): Promise<ActionResponse<{ name: string }>> => {
  if (name.length > 20) throw new ApiError(400, "Le nom est trop long");
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const existantUser = await prisma.user.findFirst({
      where: {
        AND: [{ id: { not: userId } }, { name }],
      },
    });

    if (existantUser)
      throw new ApiError(409, "Ce nom d'utilisateur est déjà utilisé");

    const username = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { name },
      select: {
        name: true,
      },
    });
    return { success: true, data: username };
  } catch (error) {
    return handleActionError(error, "Update username");
  }
};

export const updateUserAvatar = async (
  formData: FormData
): Promise<ActionResponse<{ image: string | null }>> => {
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

    const userAvatar = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { image: imageUrl },
      select: {
        image: true,
      },
    });
    return { success: true, data: userAvatar };
  } catch (error) {
    return handleActionError(error, "Update user avatar");
  }
};

export const deleteUserAccount = async (): Promise<
  ActionResponse<"deleted">
> => {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return { success: true, data: "deleted" };
  } catch (error) {
    return handleActionError(error, "Delete account");
  }
};
