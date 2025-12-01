import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { assertSuccess, setupTestEnv } from "../helpers/setup";
import { prisma } from "@/src/lib/server/prisma";
import { requireAuth } from "@/src/utils/server";
import {
  updateReceivedSuggestions,
  updateSuggestionResponse,
} from "@/src/features/suggestions/suggestions.actions";
import {
  createTestMedia,
  createTestMediaSuggestion,
  customMediaTest,
  mockTMDBFilmData,
  mockTMDBSerieData,
} from "../helpers/media-helpers";
import { createContactWithFriendRequest } from "../helpers/social-helpers";
import {
  suggestCustomMedia,
  suggestExistantMedia,
  suggestSearchedMedia,
} from "@/src/features/media/media.actions";
import { fetchMediaFromTMDB } from "@/src/lib/server/tmdbService";
import { cleanDatabase } from "../helpers/db-helpers";

vi.mock("@/src/lib/server/tmdbService", () => ({
  fetchMediaFromTMDB: vi.fn(),
}));

describe("Suggestions actions", () => {
  let userId: string;
  let contactId: string;

  beforeEach(async () => {
    vi.clearAllMocks();
    userId = await setupTestEnv();
    const request = await createContactWithFriendRequest(userId, "ACCEPTED");
    contactId = request.senderId;
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("Send a suggestion", () => {
    it("should create a custom media into contact watchlist", async () => {
      const mediaData = customMediaTest;
      const result = await suggestCustomMedia(mediaData, contactId);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId: contactId, mediaId: data.mediaId },
        include: { suggestions: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.suggestions).toContainEqual(
        expect.objectContaining({ id: data.id })
      );
    });

    it("should add a tmdb film into contact watchlist", async () => {
      const tmdbFilmId = 1234;
      vi.mocked(fetchMediaFromTMDB).mockResolvedValueOnce(
        mockTMDBFilmData(tmdbFilmId)
      );

      const result = await suggestSearchedMedia(tmdbFilmId, contactId, "FILM");
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId: contactId, mediaId: data.mediaId },
        include: { suggestions: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.suggestions).toContainEqual(
        expect.objectContaining({ id: data.id })
      );
    });

    it("should add a tmdb serie into contact watchlist", async () => {
      const tmdbSerieId = 4567;
      vi.mocked(fetchMediaFromTMDB).mockResolvedValueOnce(
        mockTMDBSerieData(tmdbSerieId)
      );

      const result = await suggestSearchedMedia(
        tmdbSerieId,
        contactId,
        "SERIE"
      );
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();

      const inDb = await prisma.usersWatchList.findFirst({
        where: { userId: contactId, mediaId: data.mediaId },
        include: { suggestions: true },
      });
      expect(inDb).not.toBeNull();
      expect(inDb?.suggestions).toContainEqual(
        expect.objectContaining({ id: data.id })
      );
    });

    it("should add an existant media into contact watchlist", async () => {
      const media = await createTestMedia();

      const result = await suggestExistantMedia(media.id, contactId);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.mediaId).toBe(media.id);

      const inDb = await prisma.suggestion.findFirst({
        where: {
          mediaId: media.id,
          senderId: userId,
          receiverId: contactId,
          status: "PENDING",
        },
      });
      expect(inDb).not.toBeNull();
    });
  });

  describe("Update received suggestions", () => {
    let mediaId: string;
    let suggestionId: string;

    beforeEach(async () => {
      const suggestion = await createTestMediaSuggestion(contactId, userId);
      mediaId = suggestion.mediaId;
      suggestionId = suggestion.id;
    });
    it("should update suggestion status", async () => {
      const newSuggestionStatus = "ACCEPTED";

      const result = await updateReceivedSuggestions(
        mediaId,
        newSuggestionStatus
      );
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();

      const inDb = await prisma.suggestion.findMany({
        where: {
          receiverId: userId,
          mediaId: mediaId,
          status: newSuggestionStatus,
        },
      });
      expect(inDb).not.toBeNull();
    });

    it("should send a response message", async () => {
      const userMessage = "Test message";

      const result = await updateSuggestionResponse(suggestionId, userMessage);
      expect(requireAuth).toHaveBeenCalledTimes(1);

      assertSuccess(result);
      const { data } = result;

      expect(data).toBeDefined();
      expect(data.receiverComment).toBe(userMessage);

      const inDb = await prisma.suggestion.findFirst({
        where: {
          id: suggestionId,
          receiverComment: userMessage,
        },
      });
      expect(inDb).not.toBeNull();
    });
  });
});
