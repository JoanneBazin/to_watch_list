"use client";
import { FriendsProps } from "@/src/lib/types";
import { useEffect, useState } from "react";

export const useFetchFriends = () => {
  const [friends, setFriends] = useState<FriendsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = async () => {
    try {
      const response = await fetch("/api/social/friends");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();

      setFriends(result);
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
    fetchFriends();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchFriends();
  };

  return { friends, loading, error, refetch };
};
