import { ApiError } from "@/src/utils/ApiError";

export const fetchContactList = async () => {
  const response = await fetch("/api/social/friends");
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};

export const fetchUserSearch = async (query: string) => {
  const response = await fetch(`/api/search/${query}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};

export const fetchFriendRequests = async () => {
  const response = await fetch("/api/social/requests");
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};

export const fetchFriendProfile = async (id: string) => {
  const response = await fetch(`/api/social/friends/${id}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.message ?? "Erreur inconnue");
  }
  return response.json();
};
