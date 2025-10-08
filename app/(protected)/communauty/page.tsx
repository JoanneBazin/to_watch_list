"use client";

import FriendsList from "@/src/features/social/components/FriendsList";
import UserSearch from "@/src/features/social/components/UserSearch";
import FriendRequests from "@/src/features/social/components/requests/FriendRequests";
import { useCommunauty } from "@/src/features/social/CommunautyContext";

const CommunautyPage = () => {
  const { section } = useCommunauty();

  if (section === "requests") {
    return (
      <section>
        <FriendRequests />
      </section>
    );
  }

  if (section === "search") {
    return (
      <section>
        <UserSearch />
      </section>
    );
  }
  return (
    <section>
      <h2 className="m-10 p-8 text-3xl border rounded-md">Communauté</h2>

      <FriendsList />
    </section>
  );
};

export default CommunautyPage;
