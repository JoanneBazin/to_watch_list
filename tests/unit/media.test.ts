import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { assertSuccess, setupTestEnv } from "../helpers/setup";
import {
  addExistantMediaToWatchlist,
  addSearchedMediaToWatchlist,
  createCustomMedia,
  deleteFromWatchlist,
  updateWatched,
} from "@/src/features/media/media.actions";
import { prisma } from "@/src/lib/server";
import { requireAuth } from "@/src/utils/server";
import {
  createTestMedia,
  createTestMediaWithUser,
  customMediaTest,
  mockTMDBFilmData,
  mockTMDBSerieData,
} from "../helpers/media-helpers";
import { fetchMediaFromTMDB } from "@/src/lib/server/tmdbService";
import { cleanDatabase } from "../helpers/db-helpers";

vi.mock("@/src/lib/server/tmdbService", () => ({
  fetchMediaFromTMDB: vi.fn(),
}));

describe("Media actions", () => {
  let userId: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    userId = await setupTestEnv();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("Add to Watchlist", () => {
    beforeEach(async () => {
      vi.clearAllMocks();
    });

    it("should create a custom media into user watchlist", async () => {
      const mediaData = customMediaTest;
      const result = await createCustomMedia(mediaData);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.title).toBe("Test Media");

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: data.id },
      });
      expect(inDb).not.toBeNull();
    });

    it("should add a tmdb film into user watchlist", async () => {
      const tmdbFilmId = 1234;
      vi.mocked(fetchMediaFromTMDB).mockResolvedValue(
        mockTMDBFilmData(tmdbFilmId)
      );

      const result = await addSearchedMediaToWatchlist(tmdbFilmId, "FILM");
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.title).toBe("TMDB Film");
      expect(data.tmdbId).toBe(tmdbFilmId);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: data.id },
      });
      expect(inDb).not.toBeNull();
    });

    it("should add a tmdb serie into user watchlist", async () => {
      const tmdbSerieId = 4567;
      vi.mocked(fetchMediaFromTMDB).mockResolvedValue(
        mockTMDBSerieData(tmdbSerieId)
      );

      const result = await addSearchedMediaToWatchlist(tmdbSerieId, "SERIE");
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.title).toBe("TMDB Serie");
      expect(data.tmdbId).toBe(tmdbSerieId);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: data.id },
      });
      expect(inDb).not.toBeNull();
    });

    it("should add an existant media into user watchlist", async () => {
      const existantMedia = await createTestMedia();

      const result = await addExistantMediaToWatchlist(existantMedia.id);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.id).toBe(existantMedia.id);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: existantMedia.id },
      });
      expect(inDb).not.toBeNull();
    });
  });

  describe("Update Media", () => {
    it("should toggle watched", async () => {
      const { mediaId, watched } = await createTestMediaWithUser(userId);
      const result = await updateWatched(mediaId);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.mediaId).toBe(mediaId);
      expect(data.watched).toBe(!watched);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: mediaId },
        select: { watched: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.watched).toBe(!watched);
    });
  });

  describe("Delete Media", () => {
    it("should delete a media from user watchlist", async () => {
      const { mediaId } = await createTestMediaWithUser(userId);
      const result = await deleteFromWatchlist(mediaId);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.mediaId).toBe(mediaId);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: mediaId },
      });
      expect(inDb).toBeNull();
    });
  });
});
