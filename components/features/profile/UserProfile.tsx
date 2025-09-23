"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const UserProfile = () => {
  // if (loading) {
  //   return <span className="italic">...loading</span>;
  // }

  return (
    <>
      {/* {user ? (
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
      )} */}
    </>
  );
};

export default UserProfile;
