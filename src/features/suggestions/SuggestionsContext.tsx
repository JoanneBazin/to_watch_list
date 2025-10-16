import { createSectionContext } from "@/src/utils";

export type SuggestionsSection = "suggestions" | "messages";

export const [SuggestionsProvider, useSuggestions] =
  createSectionContext<SuggestionsSection>();
