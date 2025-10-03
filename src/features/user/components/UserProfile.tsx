"use client";

import { Avatar, Button } from "@/src/components/ui";
import Link from "next/link";
import { useUserStore } from "../user.store";
import EditProfile from "./EditProfile";
import DeleteProfile from "./DeleteProfile";

const UserProfile = () => {
  const user = useUserStore((s) => s.user);

  return (
    <>
      {user ? (
        <div>
          <div className="flex flex-col gap-6 justify-center items-center">
            <span className="text-3xl">Welcome back {user.name}</span>
            {user.image ? (
              <Avatar size="large" img={user.image} />
            ) : (
              <Avatar size="large" img="/avatar.svg" />
            )}

            <div>
              <EditProfile user={user} />
            </div>

            <div>
              <DeleteProfile />
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
