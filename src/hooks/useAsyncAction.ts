"use client";

import { useState } from "react";
import { handleError } from "../utils";

export const useAsyncAction = <TArgs extends any[], TResult>(
  action: (...args: TArgs) => Promise<TResult>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (...args: TArgs) => {
    setIsLoading(true);
    setError(null);

    try {
      await action(...args);
      return { success: true as const };
    } catch (error) {
      handleError(error, setError);
      return { success: false as const };
    } finally {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { run, isLoading, error };
};
