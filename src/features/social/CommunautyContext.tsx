import { createSectionContext } from "@/src/utils/client";

export type SocialSection = "contacts" | "requests" | "search";

export const [CommunautyProvider, useCommunauty] =
  createSectionContext<SocialSection>();
