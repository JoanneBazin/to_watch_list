import { MediaFormData } from "@/src/features/media/media.schema";
import { prisma } from "@/src/lib/server";

export const customMediaTest: MediaFormData = {
  title: "Test Media",
  originalTitle: "Test Media",
  synopsis: "Synopsis",
  year: "2020",
  real: "Real",
  platform: "Platform",
  type: "FILM",
  categories: ["Action"],
};

export const createTestCategory = async (overrides = {}) => {
  return prisma.category.create({
    data: { name: "Action", ...overrides },
    select: { name: true },
  });
};

export const createTestMedia = async () => {
  return prisma.watchList.create({
    data: { title: "Film title", type: "FILM", categories: ["Action"] },
  });
};

export const createTestMediaWithUser = async (userId: string) => {
  const media = await createTestMedia();
  const userMedia = await prisma.usersWatchList.create({
    data: { userId, mediaId: media.id },
    include: { media: true },
  });
  if (!userMedia) throw new Error("No media available");
  return userMedia;
};

export const createTestMediaSuggestion = async (
  senderId: string,
  receiverId: string,
  comment?: string
) => {
  const media = await createTestMedia();

  return await prisma.$transaction(async (tx) => {
    await tx.usersWatchList.create({
      data: {
        mediaId: media.id,
        userId: receiverId,
      },
    });

    return await tx.suggestion.create({
      data: {
        senderId,
        receiverId,
        mediaId: media.id,
        receiverComment: comment,
      },
      include: { media: true, sender: true },
    });
  });
};
