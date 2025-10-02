"use client";

import { useEffect } from "react";
import { useMediaStore } from "../media.store";
import { fetchWatchlist } from "../media.api";
import { handleError } from "@/src/utils/errorHandlers";

export const useMediaHydratation = (enabled: boolean = true) => {
  const { setWatchlist, setIsPending, setError } = useMediaStore();

  useEffect(() => {
    if (!enabled) return;

    const hydrateStore = async () => {
      setIsPending(true);
      try {
        const watchlist = await fetchWatchlist();
        setWatchlist(watchlist);
      } catch (error) {
        handleError(error, setError);
      } finally {
        setIsPending(false);
      }
    };

    hydrateStore();
  }, [enabled, setWatchlist, setError, setIsPending]);
};
