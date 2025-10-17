import { MediaFormData } from "@/src/features/media/media.schema";
import { prisma } from "@/src/lib/server";

export const createTestCategory = async (overrides = {}) => {
  await prisma.category.create({
    data: { name: "Action", ...overrides },
  });
};

export const createTestMedia = async () => {
  const media = await prisma.watchList.create({
    data: { title: "Film title", type: "FILM", categoryName: "Action" },
  });
  return { ...media, addedAt: new Date(), watched: false };
};

export const getTestMediaIdFromWatchlist = async (userId: string) => {
  const mediaId = await prisma.usersWatchList.findFirst({
    where: { userId: userId },
    select: {
      mediaId: true,
      watched: true,
    },
  });
  if (!mediaId) throw new Error("No media available");
  return mediaId;
};

export const createTestSuggestion = async (
  senderId: string,
  receiverId: string,
  media: MediaFormData,
  receiverComment?: string
) => {
  return await prisma.$transaction(async (tx) => {
    const newMedia = await tx.watchList.create({
      data: {
        title: media.title,
        type: media.type,
        categoryName: media.categoryName,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: receiverId,
                },
              },
            },
          ],
        },
      },
    });

    return await tx.suggestion.create({
      data: {
        senderId,
        receiverId,
        mediaId: newMedia.id,
        senderComment: "This is a great comment",
        receiverComment: receiverComment,
      },
      select: {
        sender: true,
        media: true,
        senderComment: true,
        receiverComment: true,
      },
    });
  });
};
