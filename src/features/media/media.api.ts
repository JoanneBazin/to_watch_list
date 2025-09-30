import { ApiError } from "@/src/utils/ApiError";

export const fetchWatchlist = async () => {
  const response = await fetch("/api/media");

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }

  return response.json();
};

export const fetchMediaCategories = async () => {
  const response = await fetch("/api/category");

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }

  return response.json();
};
