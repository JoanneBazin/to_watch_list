"use client";
import DeleteFriend from "@/src/features/social/components/DeleteFriend";
import { Avatar } from "@/src/components/ui/Avatar";
import { Loader } from "@/src/components/ui/Loader";
import FriendsWatchlist from "@/src/features/social/components/FriendsWatchlist";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useFetchFriendProfile } from "@/src/features/social/hooks/useFetchFriendProfile";
import AddEntryForm from "@/src/features/media/components/AddEntryForm";

const FriendProfile = ({ params }: { params: { userId: string } }) => {
  const { friendProfile, isLoading, error } = useFetchFriendProfile(
    params.userId
  );

  const friendFilms =
    friendProfile?.watchlist.filter((item) => item.type === "FILM") ?? [];
  const friendSeries =
    friendProfile?.watchlist.filter((item) => item.type === "SERIE") ?? [];

  if (!friendProfile) {
    return <div>Profil introuvable</div>;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-10 my-4 mx-20">
            {friendProfile.image ? (
              <Avatar img={friendProfile.image} size="large" />
            ) : (
              <Avatar size="large" img="/avatar.svg" />
            )}
            <h2 className="text-4xl text-center m-12">{friendProfile.name}</h2>
          </div>

          <div className="flex justify-between m-10 ">
            <div>
              <div>
                <div className="flex justify-between items-center gap-4">
                  <h4 className="text-lg font-semibold my-6">Films</h4>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        Envoyer une suggestion de film
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Film pour {friendProfile.name}
                        </DialogTitle>
                      </DialogHeader>
                      <AddEntryForm
                        entry="FILM"
                        isSuggestedMedia={true}
                        receiverId={friendProfile.id}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                {friendFilms.length > 0 && (
                  <FriendsWatchlist medias={friendFilms} />
                )}
              </div>

              <div>
                <div className="flex justify-between items-center gap-4">
                  <h4 className="text-lg font-semibold my-6">Séries</h4>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        Envoyer une suggestion de série
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Série pour {friendProfile.name}
                        </DialogTitle>
                      </DialogHeader>
                      {/* <AddSuggestion entry="SERIE" receiverId={friendProfile.id} /> */}
                    </DialogContent>
                  </Dialog>
                </div>
                {friendSeries.length > 0 && (
                  <FriendsWatchlist medias={friendSeries} />
                )}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold my-6">Amis</h4>
              <ul>
                {friendProfile.contacts.length > 0 ? (
                  friendProfile.contacts.map((friend) => (
                    <li key={friend.id}>{friend.name}</li>
                  ))
                ) : (
                  <li>Pas de contacts</li>
                )}
              </ul>
            </div>
          </div>

          <div>
            <DeleteFriend friendId={friendProfile.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
