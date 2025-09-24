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
