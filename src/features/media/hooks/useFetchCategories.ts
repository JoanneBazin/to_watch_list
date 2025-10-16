"use client";
import { useEffect, useState } from "react";
import { fetchMediaCategories } from "../media.api";
import { handleError } from "@/src/utils";
import { CategoryType } from "@/src/types";

export function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
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
