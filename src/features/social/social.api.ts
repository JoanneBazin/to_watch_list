export const fetchContactList = async () => {
  const response = await fetch("/api/social/friends");
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};

export const fetchUserSearch = async (query: string) => {
  const response = await fetch(`/api/search/${query}`);
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};

export const fetchFriendRequests = async () => {
  const response = await fetch("/api/social/requests");
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};

export const fetchFriendProfile = async (id: string) => {
  const response = await fetch(`/api/social/friends/${id}`);
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};
