import { prisma } from "@/src/lib/server";
import { ApiError } from "@/src/utils/shared";

export const cleanWatchlist = async () => {
  try {
    const deleted = await prisma.watchList.deleteMany({
      where: {
        users: { none: {} },
      },
    });
    console.log(`${deleted.count} media without users deleted from Watchlist`);
    return {
      success: true,
      status: 200,
      message: `${deleted.count} media without users deleted from Watchlist`,
    };
  } catch (error) {
    console.log(error);
    const status = error instanceof ApiError ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Erreur inattendue";
    return { success: false, status, message };
  }
};
