"use client";
import { MediaItem } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchPendingSuggestions } from "../suggestions.api";
import { handleError } from "@/src/utils";

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
        handleError(error, setError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceivedSuggestions();
  }, []);

  return { suggestions, isLoading, error };
};
