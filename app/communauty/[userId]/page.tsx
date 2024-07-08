"use client";
import AddSuggestion from "@/components/actions/forms/AddSuggestion";
import { Loader } from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { FriendsProps, Item, UserProps } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
        setProfile(result.profile);
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
            <Image src={profile.avatar} alt="avatar" width={130} height={80} />
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
                <ul className="ml-6 mb-6">
                  {userFilms.length > 0 ? (
                    userFilms.map((film) => (
                      <HoverCard key={film.id}>
                        <HoverCardTrigger asChild>
                          <li className="my-3">{film.title}</li>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-1">
                            <h5 className="font-bold my-1 relative">
                              {film.title}
                            </h5>
                            <span className="bg-zinc-700 p-2 rounded absolute right-2 top-2">
                              {film.categoryName}
                            </span>
                            {film.real ? (
                              <p className="font-semibold">{film.real}</p>
                            ) : null}
                            {film.year ? (
                              <p className="text-xs">{film.year}</p>
                            ) : null}
                            {film.synopsis ? (
                              <p className="text-gray-500">{film.synopsis}</p>
                            ) : null}
                            {film.platform ? (
                              <p className="mt-2 italic">
                                Disponible sur {film.platform}
                              </p>
                            ) : null}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))
                  ) : (
                    <span className="italic text-sm text-zinc-500">
                      Pas de film dans la watch-list
                    </span>
                  )}
                </ul>
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
                <ul className="ml-6">
                  {userSeries.length > 0 ? (
                    userSeries.map((serie) => (
                      <HoverCard key={serie.id}>
                        <HoverCardTrigger asChild>
                          <li className="my-3">{serie.title}</li>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-1">
                            <h5 className="font-bold my-1">{serie.title}</h5>
                            <span className="bg-zinc-700 p-2 rounded absolute right-2 top-2">
                              {serie.categoryName}
                            </span>
                            {serie.real ? (
                              <p className="text-sm font-semibold">
                                {serie.real}
                              </p>
                            ) : null}
                            {serie.year ? (
                              <p className="text-xs">{serie.year}</p>
                            ) : null}
                            {serie.synopsis ? (
                              <p className="text-gray-500">{serie.synopsis}</p>
                            ) : null}
                            {serie.platform ? (
                              <p className="mt-2 italic">
                                Disponible sur {serie.platform}
                              </p>
                            ) : null}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))
                  ) : (
                    <span className="italic text-sm text-zinc-500">
                      Pas de série dans la watch-list
                    </span>
                  )}
                </ul>
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
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
