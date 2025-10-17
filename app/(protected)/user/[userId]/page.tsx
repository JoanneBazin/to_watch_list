"use client";

import { Avatar, Loader } from "@/src/components/ui";
import {
  DeleteFriend,
  FriendWatchlist,
} from "@/src/features/social/components";
import { useFetchFriendProfile } from "@/src/features/social/hooks";

const FriendProfilePage = ({ params }: { params: { userId: string } }) => {
  const { friendProfile, isLoading, error } = useFetchFriendProfile(
    params.userId
  );

  return (
    <main className="flex-1 flex flex-col items-center w-full max-w-[768px]">
      <h1 className="sr-only">Profil utilisateur</h1>
      {isLoading && <Loader />}
      {error && <p className="error-message text-center mt-12">{error}</p>}

      {friendProfile && (
        <>
          <section className="my-12" data-testid="contact-profile">
            <div className="flex gap-6 sm:gap-10 items-center justify-center">
              <Avatar img={friendProfile.image} size="large" />
              <h2 className="text-2xl sm:text-4xl text-center">
                {friendProfile.name}
              </h2>
            </div>
          </section>

          <section className="w-full flex flex-col items-center sm:items-start gap-10 sm:flex-row sm:justify-around p-0">
            <h3 className="sr-only">Watchlist utilisateur</h3>
            <FriendWatchlist user={friendProfile} entry="FILM" />
            <FriendWatchlist user={friendProfile} entry="SERIE" />
          </section>
          <div className="w-full flex-1 flex items-end">
            <DeleteFriend friendId={friendProfile.id} />
          </div>
        </>
      )}
    </main>
  );
};

export default FriendProfilePage;
