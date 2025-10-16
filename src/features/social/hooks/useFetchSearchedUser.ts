"use client";
import { SearchContact } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchUserSearch } from "../social.api";
import { handleError } from "@/src/utils";

export const useFetchSearchedUser = (query: string) => {
  const [users, setUsers] = useState<SearchContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      setError(null);
      return;
    }
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      setUsers([]);
      try {
        setUsers(await fetchUserSearch(query));
      } catch (error) {
        handleError(error, setError);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchUsers, 800);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return { users, isLoading, error };
};
