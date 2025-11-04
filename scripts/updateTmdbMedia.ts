import { prisma } from "@/src/lib/server";
import { fetchMediaFromTMDB } from "@/src/lib/server/tmdbService";
import { getMediaDBFormat } from "@/src/utils/server";

export const updateTmdbMedia = async () => {
  const sixMonthAgo = new Date();
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

  const medias = await prisma.watchList.findMany({
    where: {
      tmdbId: {
        not: null,
      },
      OR: [{ lastTmdbUpdate: null }, { lastTmdbUpdate: { lt: sixMonthAgo } }],
    },
    select: { id: true, tmdbId: true, title: true, type: true },
    orderBy: { lastTmdbUpdate: "asc" },
  });

  console.log(`${medias.length} TMDB media will be updated`);

  for (const media of medias) {
    if (!media.tmdbId) return;
    try {
      const updated = await fetchMediaFromTMDB(media.tmdbId, media.type);
      const data = getMediaDBFormat(updated, media.type);
      await prisma.watchList.update({
        where: { id: media.id },
        data: { ...data, year: Number(data.year), lastTmdbUpdate: new Date() },
      });
      console.log(`✅ ${media.title} updated`);
    } catch (error) {
      console.log(`❌ ${media.title}: ${error}`);
    }
  }

  return { success: true, total: medias.length };
};
