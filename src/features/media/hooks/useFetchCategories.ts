"use client";
import { CategoryProps } from "@/src/lib/types";
import { useEffect, useState } from "react";
import { fetchMediaCategories } from "../media.api";
import { ApiError } from "@/src/utils/ApiError";

export function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      setCategories(await fetchMediaCategories());
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
