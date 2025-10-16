"use client";
import { ReceivedRequests } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchFriendRequests } from "../social.api";
import { handleError } from "@/src/utils";

export const useFetchRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState<ReceivedRequests[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);

      try {
        setReceivedRequests(await fetchFriendRequests());
      } catch (error) {
        handleError(error, setError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { receivedRequests, isLoading, error };
};
