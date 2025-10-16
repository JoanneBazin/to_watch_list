"use client";

import {
  ReceivedMessages,
  SuggestionsList,
} from "@/src/features/suggestions/components";
import { useSuggestions } from "@/src/features/suggestions/SuggestionsContext";

export default function SuggestionsPage() {
  const { section } = useSuggestions();

  return (
    <main>
      <h1 className="sr-only">Suggestions de titres</h1>
      {section === "suggestions" && <SuggestionsList />}
      {section === "messages" && <ReceivedMessages />}
    </main>
  );
}
