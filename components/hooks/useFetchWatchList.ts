"use client";
import { Item } from "@/lib/types";
import { useEffect, useState } from "react";

export const useFetchWatchList = () => {
  const [films, setFilms] = useState<Item[]>([]);
  const [series, setSeries] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchList = async () => {
    try {
      const response = await fetch("/api/media");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();

      const { films, series } = result;

      setFilms(films);
      setSeries(series);
      console.log(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchWatchList();
  };

  return { films, series, loading, error, refetch };
};
