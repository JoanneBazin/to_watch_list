import { ApiError } from "./ApiError";

export const handleActionError = (err: unknown, context?: string): never => {
  if (err instanceof ApiError) {
    console.error(`[${context}] ${err.status} : ${err.message}`);
    throw err;
  }

  console.error(`[${context}] Erreur inattendue : ${err}`);
  throw new ApiError(
    500,
    "Erreur inattendue, veuillez réessayer ultérieurement"
  );
};

export const handleError = (
  error: unknown,
  setError: (msg: string) => void
): void => {
  if (error instanceof ApiError) {
    setError(error.message);
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Une erreur inattendue est survenue");
  }
};
