"use client";
import { MediaItem } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchPendingSuggestions } from "../suggestions.api";
import { ApiError } from "@/src/utils/ApiError";

export const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceivedSuggestions = async () => {
      setIsLoading(true);

      try {
        setSuggestions(await fetchPendingSuggestions());
      } catch (error) {
        if (error instanceof ApiError) {
          setError(error.message);
        } else {
          setError("Erreur inattendue");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceivedSuggestions();
  }, []);

  return { suggestions, isLoading, error };
};
