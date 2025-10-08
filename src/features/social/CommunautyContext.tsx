import { createSectionContext } from "@/src/utils/createSectionContext";

export type SocialSection = "contacts" | "requests" | "search";

export const [CommunautyProvider, useCommunauty] =
  createSectionContext<SocialSection>();
