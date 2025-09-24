export const fetchContactList = async () => {
  const response = await fetch("/api/social/friends");
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};
