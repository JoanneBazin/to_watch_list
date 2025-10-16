"use client";

import { Avatar, Button, SignOutBtn } from "@/src/components/ui";
import DeleteProfile from "@/src/features/user/components/DeleteProfile";
import EditUserAvatar from "@/src/features/user/components/EditUserAvatar";
import { EditUserName } from "@/src/features/user/components/EditUserName";
import { useUserStore } from "@/src/features/user/user.store";
import Link from "next/link";

const Account = () => {
  const user = useUserStore((s) => s.user);

  if (!user) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="font-semibold text-gray-500">
            Pas de session connectée
          </p>
          <Button variant="outline">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center w-full max-w-[768px]">
      <h1 className="sr-only">Profil du compte</h1>
      <div className="flex gap-6 justify-center items-center my-12">
        <Avatar size="large" img={user.image} />
        <h2 className="text-xl sm:text-3xl">{user.name}</h2>
      </div>

      <section className="w-full flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 sm:gap-6 mx-auto my-4 border border-accent rounded-lg p-6">
          <h3 className="font-semibold text-lg sm:text-2xl mb-4">
            Modifier le profil
          </h3>
          <div className="flex flex-col gap-10">
            <EditUserName username={user.name} />
            <EditUserAvatar userAvatar={user.image} />
          </div>
        </div>

        <div className="flex flex-col justify-end items-end gap-2 sm:gap-4 py-3">
          <DeleteProfile />
          <SignOutBtn />
        </div>
      </section>
    </main>
  );
};

export default Account;
