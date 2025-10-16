import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  cleanDatabase,
  createMockSession,
  createTestContact,
  createTestMedia,
  createTestUser,
  getTestMediaIdFromWatchlist,
} from "../helpers/setup";
import {
  addToContactWatchlist,
  addToWatchlist,
  createMedia,
  deleteFromWatchlist,
  updateWatched,
} from "@/src/features/media/media.actions";
import { prisma } from "@/src/lib/server";
import { requireAuth } from "@/src/utils/server";
import { MediaFormData } from "@/src/features/media/media.schema";

vi.mock("@/src/utils/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));

describe("Media actions", () => {
  let userId: string;

  beforeAll(async () => {
    await cleanDatabase();
    userId = await createTestUser();
    vi.mocked(requireAuth).mockResolvedValue(createMockSession(userId));
  });
  beforeEach(async () => {
    vi.clearAllMocks();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("addToWatchlist", () => {
    const mediaData: MediaFormData = {
      title: "Film test",
      type: "FILM",
      synopsis: "Synopsis test",
      year: "2025",
      real: "Real test",
      platform: "Netflix",
      categoryName: "Action",
    };

    it("should create a new entry into user watchlist", async () => {
      const result = await createMedia(mediaData);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.title).toBe("Film test");

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: result?.id },
      });
      expect(inDb).not.toBeNull();
    });

    it("should add an existant entry into user watchlist", async () => {
      const existantMedia = await createTestMedia();

      const result = await addToWatchlist(existantMedia.id);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.userId).toBe(userId);
      expect(result?.mediaId).toBe(existantMedia.id);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: existantMedia.id },
      });
      expect(inDb).not.toBeNull();
    });

    it("should create a new entry into contact watchlist", async () => {
      const { receiverId: contactId } = await createTestContact(
        userId,
        "contact@test.com"
      );

      const result = await addToContactWatchlist(mediaData, contactId);

      expect(requireAuth).toHaveBeenCalledTimes(1);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId: contactId, mediaId: result?.mediaId },
        include: { suggestions: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.suggestions).toContainEqual(
        expect.objectContaining({ id: result?.id })
      );
    });
  });

  describe("updateMedia", () => {
    it("should toggle watched", async () => {
      const { mediaId, watched } = await getTestMediaIdFromWatchlist(userId);
      const result = await updateWatched(mediaId);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.mediaId).toBe(mediaId);
      expect(result?.watched).toBe(!watched);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: mediaId },
        select: { watched: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.watched).toBe(!watched);
    });
  });

  describe("deleteMedia", () => {
    it("should delete a media from user watchlist", async () => {
      const { mediaId } = await getTestMediaIdFromWatchlist(userId);
      const result = await deleteFromWatchlist(mediaId);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.mediaId).toBe(mediaId);

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId, mediaId: mediaId },
      });
      expect(inDb).toBeNull();
    });
  });
});
