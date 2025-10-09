"use client";

import Link from "next/link";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { Avatar, Button, Logo, SignOutBtn, Skeleton } from "../ui";
import { useUserStore } from "@/src/features/user/user.store";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import clsx from "clsx";

const PrivateHeader = () => {
  const { user, counts, isPending, error } = useUserStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuRef = useClickOutside(() => setIsMenuOpen(false));
  const profileRef = useClickOutside(() => setIsProfileOpen(false));

  if (isPending)
    return (
      <header className="bg-zinc-900 p-2 md:p-1">
        <Skeleton className="md:h-4 h-3 md:w-60 w-24" />
      </header>
    );

  if (!isPending && !user) {
    return <p>No user</p>;
  }

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-zinc-900 relative p-2 md:p-3 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Logo size="medium" />

        <div ref={menuRef}>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <ImCross /> : <LuMenu />}
          </Button>

          <nav
            className={clsx(
              "bg-zinc-900",
              "flex-col absolute top-20 right-0 px-4 py-2 gap-3 rounded-md shadow-md z-50",
              "md:flex-row md:gap-8 md:static",
              isMenuOpen ? "flex" : "hidden md:flex"
            )}
          >
            <Link
              href="/dashboard"
              onClick={closeMenus}
              className="hover:text-zinc-600"
            >
              <p className="mr-2">Watchlist</p>
            </Link>

            <Link
              href="/communauty"
              onClick={closeMenus}
              className="hover:text-zinc-600"
            >
              <div className="relative mr-2">
                <p>Communauté</p>
                {counts.friendRequests > 0 && (
                  <span className="absolute bg-gray-400 top-0 right-[-2px] md:top-[-4px] md:right-[-12px] h-2 w-2 rounded-full"></span>
                )}
              </div>
            </Link>

            <Link
              href="/suggestions"
              onClick={closeMenus}
              className="hover:text-zinc-600"
            >
              <div className="relative mr-2">
                <p>Suggestions</p>
                {counts.suggestions > 0 && (
                  <span className="absolute bg-gray-400 top-0 right-[-2px] md:top-[-4px] md:right-[-12px] h-2 w-2 rounded-full"></span>
                )}
              </div>
            </Link>

            <div ref={profileRef} className="hidden md:block">
              <button
                className="font-bold hover:text-zinc-600 flex items-center gap-3"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Avatar img={user?.image} size="small" />
                {user?.name}
              </button>

              {isProfileOpen && (
                <div className="absolute top-16 right-0 w-40 bg-zinc-900 p-5 rounded-md shadow-md flex flex-col gap-3">
                  <Link
                    href="/account"
                    className="text-center px-4 py-2 hover:bg-zinc-700 rounded"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profil
                  </Link>
                  <SignOutBtn />
                </div>
              )}
            </div>
            <div className="md:hidden flex flex-col mt-3 gap-4">
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className=" hover:bg-zinc-700 rounded"
              >
                Profil
              </Link>
              <SignOutBtn />
            </div>
            <div></div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;
