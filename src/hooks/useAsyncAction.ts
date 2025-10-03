"use client";

import { useState } from "react";
import { handleError } from "../utils/errorHandlers";

export const useAsyncAction = <TArgs extends any[], TResult>(
  action: (...args: TArgs) => Promise<TResult>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (...args: TArgs) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await action(...args);
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return { run, isLoading, error };
};
