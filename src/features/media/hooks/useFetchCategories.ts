"use client";
import { CategoryProps } from "@/src/lib/types";
import { useEffect, useState } from "react";
import { fetchMediaCategories } from "../media.api";
import { handleError } from "@/src/utils/errorHandlers";

export function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      setCategories(await fetchMediaCategories());
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}
