import { ApiError } from "@/src/utils/shared";

export const fetchPendingSuggestions = async () => {
  const response = await fetch("/api/suggestions");
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};

export const fetchResponseMessages = async () => {
  const response = await fetch("/api/suggestions/response");
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};
