"use client";
import { Loader } from "@/components/layout/Loader";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { FriendsProps, Item } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface UserFilmsProps {
  film: Item;
}
interface UserSeriesProps {
  serie: Item;
}

const FriendProfile = ({ params }: { params: { userId: string } }) => {
  const [profile, setProfile] = useState<FriendsProps>();
  const [loading, setLoading] = useState(true);
  const [userFilms, setUserFilms] = useState<UserFilmsProps[]>([]);
  const [userSeries, setUserSeries] = useState<UserSeriesProps[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/social/friends/${params.userId}`);

        const result = await response.json();
        setProfile(result);
        // setUserFilms(result);
        // setUserSeries(result);
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

          <div className="flex gap-20 m-10 ">
            <div>
              <h4 className="text-lg font-semibold my-6">Films</h4>
              <ul>
                {userFilms &&
                  userFilms.map((el) => (
                    <HoverCard key={el.film.id}>
                      <HoverCardTrigger asChild>
                        <li className="my-3">{el.film.title}</li>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-1">
                          <h5 className="font-bold my-1 relative">
                            {el.film.title}
                          </h5>
                          <span className="bg-zinc-700 p-2 rounded absolute right-2 top-2">
                            {el.film.categoryName}
                          </span>
                          {el.film.real ? (
                            <p className="font-semibold">{el.film.real}</p>
                          ) : null}
                          {el.film.year ? (
                            <p className="text-xs">{el.film.year}</p>
                          ) : null}
                          {el.film.synopsis ? (
                            <p className="text-gray-500">{el.film.synopsis}</p>
                          ) : null}
                          {el.film.platform ? (
                            <p className="mt-2 italic">
                              Disponible sur {el.film.platform}
                            </p>
                          ) : null}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold my-6">Séries</h4>
              <ul>
                {userSeries &&
                  userSeries.map((el) => (
                    <HoverCard key={el.serie.id}>
                      <HoverCardTrigger asChild>
                        <li className="my-3">{el.serie.title}</li>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-1">
                          <h5 className="font-bold my-1">{el.serie.title}</h5>
                          <span className="bg-zinc-700 p-2 rounded absolute right-2 top-2">
                            {el.serie.categoryName}
                          </span>
                          {el.serie.real ? (
                            <p className="text-sm font-semibold">
                              {el.serie.real}
                            </p>
                          ) : null}
                          {el.serie.year ? (
                            <p className="text-xs">{el.serie.year}</p>
                          ) : null}
                          {el.serie.synopsis ? (
                            <p className="text-gray-500">{el.serie.synopsis}</p>
                          ) : null}
                          {el.serie.platform ? (
                            <p className="mt-2 italic">
                              Disponible sur {el.serie.platform}
                            </p>
                          ) : null}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
