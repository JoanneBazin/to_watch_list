"use client";
import AddSuggestion from "@/src/features/suggestions/components/AddSuggestion";
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

import { FriendsProps, Item, UserProps } from "@/src/lib/types";
import { useEffect, useState } from "react";

const FriendProfile = ({ params }: { params: { userId: string } }) => {
  const [profile, setProfile] = useState<FriendsProps>();
  const [loading, setLoading] = useState(true);
  const [userFilms, setUserFilms] = useState<Item[]>([]);
  const [userSeries, setUserSeries] = useState<Item[]>([]);
  const [userFriends, setUserFriends] = useState<UserProps[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/social/friends/${params.userId}`);

        const result = await response.json();
        setProfile(result.friend);
        setUserFilms(result.friendFilms);
        setUserSeries(result.friendSeries);
        setUserFriends(result.userFriends);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.userId]);

  if (!profile) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-10 my-4 mx-20">
            {profile.avatar ? (
              <Avatar
                img={`data:image/*;base64,${profile.avatar}`}
                size="large"
              />
            ) : (
              <Avatar size="large" img="/avatar.svg" />
            )}
            <h2 className="text-4xl text-center m-12">{profile.name}</h2>
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
                        <DialogTitle>Film pour {profile.name}</DialogTitle>
                      </DialogHeader>
                      <AddSuggestion entry="FILM" receiverId={profile.id} />
                    </DialogContent>
                  </Dialog>
                </div>
                <FriendsWatchlist medias={userFilms} />
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
                        <DialogTitle>Série pour {profile.name}</DialogTitle>
                      </DialogHeader>
                      <AddSuggestion entry="SERIE" receiverId={profile.id} />
                    </DialogContent>
                  </Dialog>
                </div>
                <FriendsWatchlist medias={userSeries} />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold my-6">Amis</h4>
              <ul>
                {userFriends ? (
                  userFriends.map((friend) => (
                    <li key={friend.id}>{friend.name}</li>
                  ))
                ) : (
                  <li>Pas de contacts</li>
                )}
              </ul>
            </div>
          </div>

          <div>
            <DeleteFriend friendId={profile.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
