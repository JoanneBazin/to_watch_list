"use client";

import FriendsList from "@/src/features/social/components/FriendsList";
import UserSearch from "@/src/features/social/components/UserSearch";
import FriendRequests from "@/src/features/social/components/requests/FriendRequests";
import { useCommunauty } from "@/src/features/social/CommunautyContext";

const CommunautyPage = () => {
  const { section } = useCommunauty();

  return (
    <main>
      <h1 className="sr-only">Communauté</h1>
      {section === "contacts" && <FriendsList />}
      {section === "requests" && <FriendRequests />}
      {section === "search" && <UserSearch />}
    </main>
  );
};

export default CommunautyPage;
