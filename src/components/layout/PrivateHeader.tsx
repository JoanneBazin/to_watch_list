"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Logo, SignOutBtn, Skeleton } from "../ui";
import { useUserStore } from "@/src/features/user/user.store";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useClickOutside } from "@/src/hooks";

export const PrivateHeader = () => {
  const { user, counts, isPending, error } = useUserStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuRef = useClickOutside(() => setIsMenuOpen(false));
  const profileRef = useClickOutside(() => setIsProfileOpen(false));

  if (error) {
    return null;
  }

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-accent-dark relative p-2 md:p-3 w-full">
      <div className="relative container mx-auto px-2 sm:px-4 flex justify-between items-center">
        <Logo size="medium" img="/watchers_logo.svg" alt="Logo Watchers" />

        {isPending ? (
          <Skeleton className="h-14 w-18" />
        ) : (
          <div className="flex items-center gap-1">
            <div className="md:hidden">
              <Avatar img={user?.image} size="small" />
            </div>
            <div ref={menuRef}>
              <Button
                variant="ghost"
                aria-label="Ouvrir le menu"
                className="relative px-5 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {(counts.friendRequests > 0 || counts.suggestions > 0) && (
                  <span
                    className={clsx(
                      "absolute bg-accent-foreground top-0 right-0 h-2 w-2 rounded-full",
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    )}
                  ></span>
                )}
                <X
                  className={clsx(
                    "absolute opacity-0 rotate-90 scale-0 transition-all duration-300",
                    isMenuOpen && "opacity-100 rotate-0 scale-100"
                  )}
                />
                <Menu
                  className={clsx(
                    "absolute transition-all duration-300",
                    isMenuOpen
                      ? "opacity-0 rotate-90 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                  )}
                />
              </Button>

              <nav
                className={clsx(
                  "bg-accent-dark",
                  "flex-col text-end text-sm sm:text-base absolute top-13 right-0 px-4 py-4 gap-3 rounded-md shadow-md z-50",
                  "md:flex-row md:items-center md:gap-8 md:static md:shadow-none md:px-0",
                  isMenuOpen ? "flex" : "hidden md:flex"
                )}
              >
                <Link
                  href="/dashboard"
                  onClick={closeMenus}
                  className="hover:text-accent"
                >
                  <p>Watchlist</p>
                </Link>

                <Link
                  href="/communauty"
                  onClick={closeMenus}
                  className="hover:text-accent"
                >
                  <div className="relative">
                    <p>Communauté</p>
                    {counts.friendRequests > 0 && (
                      <span className="absolute bg-accent-foreground top-0 -right-2 md:-top-1 md:-right-3 h-1 w-1 sm:h-2 sm:w-2 rounded-full"></span>
                    )}
                  </div>
                </Link>

                <Link
                  href="/suggestions"
                  onClick={closeMenus}
                  className="hover:text-accent"
                >
                  <div className="relative">
                    <p>Suggestions</p>
                    {counts.suggestions > 0 && (
                      <span className="absolute bg-accent-foreground top-0 -right-2 md:-top-1 md:-right-3 h-1 w-1 sm:h-2 sm:w-2 rounded-full"></span>
                    )}
                  </div>
                </Link>

                <div ref={profileRef} className="hidden md:block">
                  <button
                    className="font-bold hover:text-accent flex items-center gap-3"
                    aria-label="Ouvrir le menu utilisateur"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    data-testid="open-profile-menu"
                  >
                    <Avatar img={user?.image} size="small" />
                    {user?.name}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute top-16 right-0 w-40 bg-accent-dark p-5 rounded-md shadow-md flex flex-col gap-3">
                      <Link
                        href="/account"
                        className="text-center px-4 py-2 hover:text-accent rounded"
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
                    className=" hover:bg-accent rounded"
                  >
                    Profil
                  </Link>
                  <SignOutBtn />
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
