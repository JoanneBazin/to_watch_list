export const fetchWatchlist = async () => {
  const response = await fetch("/api/media");

  if (!response.ok) {
    throw new Error("Error network");
  }

  return response.json();
};
