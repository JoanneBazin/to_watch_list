import { ApiError } from "./ApiError";
import { handleSignOut } from "./handleSignOut";

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
    if (error.status === 401) {
      handleSignOut();
      setError("Session expirée, veuillez vous reconnecter");
      return;
    }
    setError(error.message);
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Une erreur inattendue est survenue");
  }
};
