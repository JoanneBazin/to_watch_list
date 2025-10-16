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
} from "../helpers/setup";
import { prisma } from "@/src/lib/server/prisma";
import { requireAuth } from "@/src/utils/server";
import {
  shareMediaSuggestion,
  updateReceivedSuggestions,
  updateSuggestionResponse,
} from "@/src/features/suggestions/suggestions.actions";
import { MediaItem } from "@/src/types";

vi.mock("@/src/utils/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));

describe("Suggestions actions", () => {
  let userId: string;

  beforeAll(async () => {
    await cleanDatabase();
    userId = await createTestUser({ email: "user@test.com" });
    vi.mocked(requireAuth).mockResolvedValue(createMockSession(userId));
  });
  beforeEach(async () => {
    vi.clearAllMocks();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  describe("manageSuggestionsExchange", () => {
    let contactId: string;
    let media: MediaItem;

    it("should share a media as suggestion", async () => {
      const newContact = await createTestContact(userId, "sender@test.com");
      contactId = newContact.receiverId;

      media = await createTestMedia();

      const result = await shareMediaSuggestion(media.id, contactId);

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.mediaId).toBe(media.id);

      const inDb = await prisma.suggestion.findFirst({
        where: {
          id: result?.id,
          senderId: userId,
          receiverId: contactId,
          status: "PENDING",
        },
      });
      expect(inDb).not.toBeNull();
    });

    it("should update received suggestion status", async () => {
      const newSuggestionStatus = "ACCEPTED";

      await prisma.$transaction([
        prisma.usersWatchList.create({
          data: {
            userId,
            mediaId: media.id,
          },
        }),
        prisma.suggestion.create({
          data: {
            senderId: contactId,
            receiverId: userId,
            mediaId: media.id,
          },
        }),
      ]);

      const result = await updateReceivedSuggestions(
        media.id,
        newSuggestionStatus
      );

      expect(requireAuth).toHaveBeenCalledTimes(1);

      const inDb = await prisma.suggestion.findMany({
        where: {
          receiverId: userId,
          mediaId: media.id,
          status: newSuggestionStatus,
        },
      });
      expect(inDb).not.toBeNull();
    });

    it("should send a response message", async () => {
      const userMessage = "Test message";
      const receivedSuggestion = await prisma.suggestion.findFirst({
        where: {
          receiverId: userId,
          status: "ACCEPTED",
        },
      });
      if (!receivedSuggestion) throw new Error("Suggestion not found");

      const result = await updateSuggestionResponse(
        receivedSuggestion.id,
        userMessage
      );

      expect(requireAuth).toHaveBeenCalledTimes(1);
      expect(result?.receiverComment).toBe(userMessage);

      const inDb = await prisma.suggestion.findFirst({
        where: {
          id: receivedSuggestion.id,
          receiverComment: userMessage,
        },
      });
      expect(inDb).not.toBeNull();
    });
  });
});
