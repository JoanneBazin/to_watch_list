"use client";

import { useUser } from "@/app/UserContext";
import DeleteProfile from "@/components/actions/profile/DeleteProfile";
import EditProfile from "@/components/actions/profile/EditProfile";
import { Avatar } from "@/components/layout/Avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserProfile = () => {
  const { user, loading, setUser } = useUser();

  if (loading) {
    return <span className="italic">...loading</span>;
  }

  return (
    <>
      {user ? (
        <div>
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6">
          <span>Pas de session connectée</span>
          <Button variant="outline">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
