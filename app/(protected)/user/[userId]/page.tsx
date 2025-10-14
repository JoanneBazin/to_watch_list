"use client";
import DeleteFriend from "@/src/features/social/components/DeleteFriend";
import { Avatar } from "@/src/components/ui/Avatar";
import { Loader } from "@/src/components/ui/Loader";
import { useFetchFriendProfile } from "@/src/features/social/hooks/useFetchFriendProfile";
import FriendFilmsList from "@/src/features/social/components/friendProfile/FriendFilmsList";
import FriendSeriesList from "@/src/features/social/components/friendProfile/FriendSeriesList";
import { FriendContactList } from "@/src/features/social/components/friendProfile/FriendContactList";

const FriendProfilePage = ({ params }: { params: { userId: string } }) => {
  const { friendProfile, isLoading, error } = useFetchFriendProfile(
    params.userId
  );

  return (
    <main>
      <h1 className="sr-only">Profil utilisateur</h1>
      {isLoading && <Loader />}
      {error && <p className="error-message text-center mt-12">{error}</p>}

      {friendProfile && (
        <>
          <section className="relative">
            <DeleteFriend friendId={friendProfile.id} />

            <div className="flex gap-6 my-12 items-center justify-center">
              <Avatar img={friendProfile.image} size="large" />
              <h2 className="text-4xl text-center m-12">
                {friendProfile.name}
              </h2>
            </div>
          </section>

          <section className="flex justify-center gap-16 mb-12">
            <h2 className="sr-only">Watchlist utilisateur</h2>
            <FriendFilmsList user={friendProfile} />
            <FriendSeriesList user={friendProfile} />
          </section>

          <section className="flex flex-col items-center">
            <h2 className="text-lg font-semibold my-6">Contacts</h2>
            <FriendContactList contacts={friendProfile.contacts} />
          </section>
        </>
      )}
    </main>
  );
};

export default FriendProfilePage;
