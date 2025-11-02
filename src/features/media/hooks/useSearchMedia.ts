"use client";

import { useState } from "react";
import { handleError } from "@/src/utils/client";
import { EntryType, TMDBMedia } from "@/src/types";
import { ApiError } from "@/src/utils/shared";

export const useSearchMedia = () => {
  const [mediaResults, setMediaResults] = useState<TMDBMedia[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, entry: EntryType) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setMediaResults([]);

    try {
      const response = await fetch(
        `/api/search/media?q=${encodeURIComponent(query)}&type=${entry}`
      );
      const body = await response.json();
      if (!response.ok) {
        throw new ApiError(
          response.status,
          body.message ?? "Erreur inconnue lors de la recherche"
        );
      }
      setMediaResults(body);
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return { mediaResults, isLoading, error, search };
};
