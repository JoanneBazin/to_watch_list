"use client";
import { ReceiverRequestsProps, SenderRequestsProps } from "@/lib/types";
import { useEffect, useState } from "react";

export const useFetchRequests = () => {
  const [sentRequests, setSentRequests] = useState<ReceiverRequestsProps[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<
    SenderRequestsProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/social/requests");
      if (!response.ok) {
        throw new Error("Error network");
      }
      const result = await response.json();
      const { requestSent, requestReceived } = result;

      setSentRequests(requestSent);
      setReceivedRequests(requestReceived);
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
    fetchRequests();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchRequests();
  };

  return { sentRequests, receivedRequests, loading, error, refetch };
};
