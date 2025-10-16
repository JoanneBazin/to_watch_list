"use client";

import { useCommunauty } from "@/src/features/social/CommunautyContext";
import {
  FriendRequests,
  FriendsList,
  UserSearch,
} from "@/src/features/social/components";

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
