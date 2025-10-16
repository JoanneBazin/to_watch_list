import { createSectionContext } from "@/src/utils/client";

export type SuggestionsSection = "suggestions" | "messages";

export const [SuggestionsProvider, useSuggestions] =
  createSectionContext<SuggestionsSection>();
