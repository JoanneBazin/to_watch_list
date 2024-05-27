"use client";
import { Item } from "@/lib/types";
import { useEffect, useState } from "react";

export const useFetchFilms = () => {
  const [films, setFilms] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = async () => {
    try {
      const response = await fetch("/api/films");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();
      setFilms(result);
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
    fetchFilms();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchFilms();
  };

  return { films, loading, error, refetch };
};
