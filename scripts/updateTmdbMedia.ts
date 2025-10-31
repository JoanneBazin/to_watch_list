import { mediaServerSchema } from "@/src/features/media/media.schema";
import { prisma } from "@/src/lib/server";
import { fetchMediaFromTMDB } from "@/src/lib/server/tmdbService";
import { strictValidateSchema } from "@/src/utils/server";

export const updateTmdbMedia = async () => {
  const allMedia = await prisma.watchList.findMany({
    where: {
      tmdbId: {
        not: null,
      },
    },
    select: { id: true, tmdbId: true, type: true },
  });

  for (const media of allMedia) {
    if (!media.tmdbId) return;
    const updated = await fetchMediaFromTMDB(media.tmdbId, media.type);
    const { data } = strictValidateSchema(mediaServerSchema, updated);
    await prisma.watchList.update({
      where: { id: media.id },
      data,
    });
  }
  console.log(`${allMedia.length} TMDB media updated`);
};
