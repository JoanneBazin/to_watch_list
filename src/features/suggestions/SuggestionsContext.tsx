import { createSectionContext } from "@/src/utils/createSectionContext";

export type SuggestionsSection = "suggestions" | "messages";

export const [SuggestionsProvider, useSuggestions] =
  createSectionContext<SuggestionsSection>();
