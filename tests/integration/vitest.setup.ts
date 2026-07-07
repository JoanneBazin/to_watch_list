import { vi } from "vitest";

vi.mock("@/src/utils/server/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));
