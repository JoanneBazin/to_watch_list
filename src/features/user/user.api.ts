import { ApiError } from "@/src/utils/shared";

export const fetchUserCounts = async () => {
  const response = await fetch("/api/users");

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }

  return response.json();
};
