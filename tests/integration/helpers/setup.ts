import { requireAuth } from "@/src/utils/server";
import { vi } from "vitest";
import { createUserInDb } from "../../shared-helpers/db-helpers";
import { ActionResponse } from "@/src/types";

interface User {
  id: string;
  email: string;
  name: string;
}

export const setupTestEnv = async () => {
  const user = await createUserInDb();

  vi.mocked(requireAuth).mockResolvedValue(createMockSession(user));
  return user;
};

export function assertSuccess<T>(
  result: ActionResponse<T>,
): asserts result is { success: true; data: T } {
  if (!result.success) {
    throw new Error(`Expected success, got error: ${result.error}`);
  }
}

export const createMockSession = (user: User) => ({
  user: {
    id: user.id,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    email: user.email,
    emailVerified: false,
    name: user.name,
  },
  session: {
    id: "1",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    userId: user.id,
    token: "mock-token",
    expiresAt: new Date(Date.now() + 3600000),
  },
});
