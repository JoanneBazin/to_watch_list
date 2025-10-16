import { ApiError } from "../shared";
import { handleSignOut } from "./handleSignOut";

export const handleError = (
  error: unknown,
  setError: (msg: string) => void
): void => {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      setError("Session expirée, veuillez vous reconnecter");
      handleSignOut();
      return;
    }
    setError(error.message);
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError("Une erreur inattendue est survenue");
  }
};
