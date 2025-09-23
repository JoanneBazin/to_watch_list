"use client";
import { CategoryProps } from "@/src/lib/types";
import { useEffect, useState } from "react";

export function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();
      setCategories(result);
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
    fetchCategories();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchCategories();
  };

  return { categories, loading, error, refetch };
}
