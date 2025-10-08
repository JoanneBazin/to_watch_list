"use client";

import ReceivedMessages from "@/src/features/social/components/ReceivedMessages";
import SuggestionsList from "@/src/features/suggestions/components/SuggestionsList";
import { useSuggestions } from "@/src/features/suggestions/SuggestionsContext";

export default function SuggestionsPage() {
  const { section } = useSuggestions();

  if (section === "messages") {
    return (
      <section>
        <ReceivedMessages />
      </section>
    );
  }
  return (
    <section>
      <SuggestionsList />
    </section>
  );
}
