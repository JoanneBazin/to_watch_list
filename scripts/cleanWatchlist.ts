import { prisma } from "@/src/lib/server";

export const cleanWatchlist = async () => {
  const deleted = await prisma.watchList.deleteMany({
    where: {
      users: { none: {} },
    },
  });
  console.log(`${deleted.count} media without users deleted from Watchlist`);
};
