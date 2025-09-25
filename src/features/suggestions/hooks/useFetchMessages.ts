"use client";
import { MessageProps } from "@/src/types";
import { useEffect, useState } from "react";
import { fetchResponseMessages } from "../suggestions.api";
import { ApiError } from "@/src/utils/ApiError";

export const useFetchMessages = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessagesFromSuggestions = async () => {
      setIsLoading(true);
      try {
        setMessages(await fetchResponseMessages());
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

    fetchMessagesFromSuggestions();
  }, []);

  return { messages, isLoading, error };
};
