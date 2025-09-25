"use client";
import { FriendProfile } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchFriendProfile } from "../social.api";
import { ApiError } from "next/dist/server/api-utils";

export const useFetchFriendProfile = (id: string) => {
  const [friendProfile, setFriendProfile] = useState<FriendProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriend = async () => {
      setIsLoading(true);

      try {
        setFriendProfile(await fetchFriendProfile(id));
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
    fetchFriend();
  }, [id]);

  return { friendProfile, isLoading, error };
};
