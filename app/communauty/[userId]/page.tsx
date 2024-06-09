"use client";
import Error from "@/app/error";
import { Loader } from "@/components/layout/Loader";
import { FriendsProps } from "@/lib/types";
import React, { useEffect, useState } from "react";

const FriendProfile = ({ params }: { params: { userId: string } }) => {
  const [profile, setProfile] = useState<FriendsProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/social/friends/${params.userId}`);
        if (!response.ok) {
          return <Error />;
        }
        const result = await response.json();
        setProfile(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.userId]);

  if (!profile) {
    return <Error />;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <h2 className="text-3xl text-center m-12">{profile.name}</h2>
      )}
    </div>
  );
};

export default FriendProfile;
