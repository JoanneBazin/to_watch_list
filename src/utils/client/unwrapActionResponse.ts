import { ActionResponse } from "@/src/types";
import { ApiError } from "../shared";

export const unwrapActionResponse = <T>(result: ActionResponse<T>) => {
  if (!result.success) throw new ApiError(result.status, result.error);
  if (!result.data) throw new ApiError(500, "Réponse invalide du serveur");
  return result.data;
};
