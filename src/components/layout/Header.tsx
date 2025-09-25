"use client";

import Link from "next/link";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import ReceivedMessages from "@/src/features/social/components/ReceivedMessages";
import { useSession } from "@/src/lib/auth-client";
import { Avatar, Button, Logo, SignOutBtn, Skeleton } from "../ui";
import { useUserStore } from "@/src/features/user/user.store";

const Header = () => {
  const { data: session, isPending } = useSession();
  const user = useUserStore((s) => s.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  if (isPending)
    return (
      <header className="bg-zinc-900 p-2 md:p-1">
        <Skeleton className="md:h-4 h-3 md:w-60 w-24" />
      </header>
    );

  if (!session)
    return (
      <header className="bg-zinc-900 p-2 md:p-1 h-24">
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } space-y-4 absolute top-16 right-2 w-auto  bg-zinc-900 opacity-90p-4 md:p-2 z-10 rounded-md`}
        >
          <Link href="/auth">Connexion</Link>
        </nav>
      </header>
    );

  return (
    <header className="bg-zinc-900 p-2 md:p-1">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Logo size="medium" />
        </div>

        {/* Nav. mobile */}

        <div className="md:hidden">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            <LuMenu />
          </Button>

          {isOpen && (
            <nav
              className={`block space-y-4 absolute top-16 right-2 w-auto bg-zinc-900 opacity-90 p-4 z-10 rounded-md`}
            >
              <div className="flex items-center justify-around">
                <Avatar
                  img={`data:image/*;base64,${session.user.image}`}
                  size="small"
                />
                <Link href="/account" onClick={() => setIsOpen(false)}>
                  {session.user.name}
                </Link>
              </div>

              <Link
                href="/communauty"
                onClick={() => setIsOpen(false)}
                className="block hover:text-zinc-600"
              >
                <div className="relative">
                  <p>Communauté</p>
                  {/* {user.friendRequests && user.friendRequests > 0 ? (
                    <span className="absolute top-2 right-7 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 bg-transparent rounded-full">
                      {user.friendRequests}
                    </span>
                  ) : null} */}
                </div>
              </Link>

              <Link
                href="/messages"
                onClick={() => setIsOpen(false)}
                className="block hover:text-zinc-600"
              >
                <p className="relative">Messages</p>
              </Link>

              <SignOutBtn />
            </nav>
          )}
        </div>

        {/* Nav. PC */}

        <div className="hidden md:block">
          <nav className="md:flex md:items-center md:space-y-0 md:space-x-3 md:relative md:w-auto md:top-0 md:bg-transparent md:p-2">
            <Link href="/dashboard" className="md:flex hover:text-zinc-600">
              <p className="relative md:mr-2">Watchlist</p>
            </Link>

            <Link href="/communauty" className="md:flex hover:text-zinc-600">
              <div className="relative md:mr-2">
                <p>Communauté</p>
                {/* {user.friendRequests && user.friendRequests > 0 ? (
                    <span className="absolute md:top-0 md:right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 md:border md:border-zinc-400 bg-transparent rounded-full">
                      {user.friendRequests}
                    </span>
                  ) : null} */}
              </div>
            </Link>

            <div className="md:flex">
              <Link href="/messages">
                <Image
                  src="/icon_message.svg"
                  alt="message icon"
                  width={30}
                  height={30}
                  className="md:block md:relative md:mr-2"
                />
              </Link>

              {isMessageOpen && (
                <div className="absolute top-10 right-12 w-40 bg-zinc-900 opacity-90 p-2 rounded-md shadow-md flex flex-col z-10">
                  <ReceivedMessages />
                </div>
              )}
            </div>

            <div className="md:flex items-center relative">
              <button
                className="font-bold hover:text-zinc-600 flex items-center gap-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {/* <Avatar
                    img={`data:image/*;base64,${user.avatar}`}
                    size="small"
                  /> */}
                {user?.name}
              </button>

              {isProfileOpen && (
                <div className="absolute top-10 right-0 w-40 bg-zinc-900 opacity-90 p-2 rounded-md shadow-md flex flex-col">
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-zinc-700 rounded"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profil
                  </Link>
                  <SignOutBtn />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
