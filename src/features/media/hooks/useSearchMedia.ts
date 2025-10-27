"use client";

import { useState } from "react";
import { fetchMediaQuery } from "../media.actions";
import { handleError } from "@/src/utils/client";
import { EntryType, TMDBMedia } from "@/src/types";

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
      const queryResult = await fetchMediaQuery(query, entry);
      setMediaResults(queryResult);
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return { mediaResults, isLoading, error, search };
};
