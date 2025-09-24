"use client";
import { useEffect, useState } from "react";
import { fetchWatchlist } from "../media.api";
import { useMediaStore } from "../media.store";

export const useFetchWatchList = () => {
  const { setFilms, setSeries } = useMediaStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { films, series } = await fetchWatchlist();
        setFilms(films);
        setSeries(series);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setFilms, setSeries]);

  return { isLoading, error };
};
