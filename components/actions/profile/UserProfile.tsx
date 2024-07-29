"use client";

import DeleteProfile from "@/components/actions/profile/DeleteProfile";
import EditProfile from "@/components/actions/profile/EditProfile";
import { Avatar } from "@/components/layout/Avatar";
import { Loader } from "@/components/layout/Loader";
import { UserProps } from "@/lib/types";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Error network");
        }
        const result = await response.json();

        setUser(result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="flex flex-col gap-6 justify-center items-center">
          <span className="text-3xl">Welcome back {user.name}</span>
          {user.avatar ? (
            <Avatar size="large" img={`data:image/*;base64,${user.avatar}`} />
          ) : (
            <Avatar size="large" img="/avatar.svg" />
          )}

          <div>
            <EditProfile user={user} updateUser={setUser} />
          </div>

          <div>
            <DeleteProfile userId={user.id} />
          </div>
        </div>
      ) : (
        <span className="italic">Pas de session connectée</span>
      )}
    </div>
  );
};

export default UserProfile;
