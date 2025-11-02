import { requireAuth } from "@/src/utils/server";
import { vi } from "vitest";
import { createTestUser } from "./auth-helpers";
import { cleanDatabase } from "./db-helpers";
import { ActionResponse } from "@/src/types";

export const setupTestEnv = async () => {
  await cleanDatabase();
  const userId = await createTestUser();

  vi.mocked(requireAuth).mockResolvedValue(createMockSession(userId));
  return userId;
};

export function assertSuccess<T>(
  result: ActionResponse<T>
): asserts result is { success: true; data: T } {
  if (!result.success) {
    throw new Error(`Expected success, got error: ${result.error}`);
  }
}

export const createMockSession = (userId: string) => ({
  user: {
    id: userId,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    email: "test@test.com",
    emailVerified: false,
    name: "Test User",
  },
  session: {
    id: "1",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    userId: userId,
    token: "mock-token",
    expiresAt: new Date(Date.now() + 3600000),
  },
});
