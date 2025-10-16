import { createSectionContext } from "@/src/utils";

export type SocialSection = "contacts" | "requests" | "search";

export const [CommunautyProvider, useCommunauty] =
  createSectionContext<SocialSection>();
