"use client";

import { Loader } from "@/src/components/ui";
import { useFetchSuggestions } from "../hooks";
import { SuggestionCard } from "./SuggestionCard";

export const SuggestionsList = () => {
  const { suggestions, isLoading, error } = useFetchSuggestions();

  return (
    <section>
      <h2 className="sr-only">Suggestions reçues</h2>
      {isLoading && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isLoading && !error && suggestions.length < 1 && (
        <p className="my-10 info-message">Pas de suggestions en attente</p>
      )}

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard media={suggestion} key={suggestion.id} />
          ))}
        </div>
      )}
    </section>
  );
};
