import { ApiError } from "../shared/ApiError";

export const handleActionError = (err: unknown, context?: string): never => {
  if (err instanceof ApiError) {
    console.error(`[${context}] ${err.status} : ${err.message}`);
    throw err;
  }

  console.error(`[${context}] Unexpected error : ${err}`);
  throw new ApiError(
    500,
    "Erreur inattendue, veuillez réessayer ultérieurement"
  );
};
