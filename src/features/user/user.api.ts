export const fetchUserCounts = async () => {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Error network");
  }

  return response.json();
};
