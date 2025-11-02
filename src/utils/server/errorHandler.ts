import { ApiError } from "../shared/ApiError";

export const handleActionError = (
  err: unknown,
  context?: string
): { success: false; status: number; error: string } => {
  let message = "Erreur inattendue, veuillez réessayer ultérieurement";
  let status = 500;

  if (err instanceof ApiError) {
    console.error(`[${context}] ${err.status} : ${err.message}`);
    message = err.message;
    status = err.status;
  } else if (err instanceof Error) {
    console.error(`[${context}] Unexpected error : ${err.message}`);
  } else {
    console.error(`[${context}] Unknown error : ${err}`);
  }

  return { success: false, status, error: message };
};
