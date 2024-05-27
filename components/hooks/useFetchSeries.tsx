"use client";
import { Item } from "@/lib/types";
import { useEffect, useState } from "react";

export const useFetchSeries = () => {
  const [series, setSeries] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeries = async () => {
    try {
      const response = await fetch("/api/series");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();
      setSeries(result);
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
    fetchSeries();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchSeries();
  };

  return { series, loading, error, refetch };
};
