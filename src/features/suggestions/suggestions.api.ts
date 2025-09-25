export const fetchPendingSuggestions = async () => {
  const response = await fetch("/api/suggestions");
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};

export const fetchResponseMessages = async () => {
  const response = await fetch("/api/suggestions/response");
  if (!response.ok) {
    throw new Error("Error network");
  }
  return response.json();
};
