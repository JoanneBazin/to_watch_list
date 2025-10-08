"use client";

import { Loader } from "@/src/components/ui";
import { useFetchSuggestions } from "../hooks/useFetchSuggestions";
import { SuggestionCard } from "./SuggestionCard";

const SuggestionsList = () => {
  const { suggestions, isLoading, error } = useFetchSuggestions();

  return (
    <section>
      <h2 className="sr-only">Suggestions reçues</h2>
      {isLoading && <Loader />}
      {error && <p className="error-message text-center my-16">{error}</p>}
      {!isLoading && !error && suggestions.length < 1 && (
        <p className="my-16 italic text-gray-500 text-center">
          Pas de suggestions en attente
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mx-4 my-10">
          {suggestions.map((suggestion) => (
            <SuggestionCard media={suggestion} key={suggestion.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SuggestionsList;
