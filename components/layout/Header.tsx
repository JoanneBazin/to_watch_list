"use client";

import Link from "next/link";
import SignOutBtn from "../actions/auth/SignOutBtn";
import SignUpBtn from "../actions/auth/SignUpBtn";
import SignInBtn from "../actions/auth/SignInBtn";
import { useUser } from "@/hooks/UserContext";
import { Avatar } from "./Avatar";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";
import { Logo } from "./Logo";
import Image from "next/image";
import ReceivedMessages from "@/app/components/ReceivedMessages";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

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

          {user ? (
            isOpen && (
              <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                <nav
                  className={`block space-y-4 absolute top-16 right-2 w-auto bg-zinc-900 opacity-90 p-4 z-10 rounded-md`}
                >
                  <div className="flex items-center justify-around">
                    <Avatar
                      img={`data:image/*;base64,${user.avatar}`}
                      size="small"
                    />
                    <Link href="/account" onClick={() => setIsOpen(false)}>
                      {user.name}
                    </Link>
                  </div>

                  <Link
                    href="/communauty"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-zinc-600"
                  >
                    <div className="relative">
                      <p>Communauté</p>
                      {user.friendRequests && user.friendRequests > 0 ? (
                        <span className="absolute top-2 right-7 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 bg-transparent rounded-full">
                          {user.friendRequests}
                        </span>
                      ) : null}
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
              </OutsideClickHandler>
            )
          ) : (
            <nav
              className={`${
                isOpen ? "block" : "hidden"
              } space-y-4 absolute top-16 right-2 w-auto  bg-zinc-900 opacity-90p-4 md:p-2 z-10 rounded-md`}
            >
              <SignUpBtn />
              <SignInBtn />
            </nav>
          )}
        </div>

        {/* Nav. PC */}

        <div className="hidden md:block">
          {loading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="md:h-12 h-8 md:w-12 w-8 rounded-full" />
              <Skeleton className="md:h-4 h-3 md:w-60 w-24" />
            </div>
          ) : user ? (
            <nav className="md:flex md:items-center md:space-y-0 md:space-x-3 md:relative md:w-auto md:top-0 md:bg-transparent md:p-2">
              <Link href="/" className="md:flex hover:text-zinc-600">
                <p className="relative md:mr-2">Accueil</p>
              </Link>

              <Link href="/communauty" className="md:flex hover:text-zinc-600">
                <div className="relative md:mr-2">
                  <p>Communauté</p>
                  {user.friendRequests && user.friendRequests > 0 ? (
                    <span className="absolute md:top-0 md:right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 md:border md:border-zinc-400 bg-transparent rounded-full">
                      {user.friendRequests}
                    </span>
                  ) : null}
                </div>
              </Link>

              <div className="md:flex">
                <button onClick={() => setIsMessageOpen(!isMessageOpen)}>
                  <Image
                    src="/icon_message.svg"
                    alt="message icon"
                    width={30}
                    height={30}
                    className="md:block md:relative md:mr-2"
                  />
                </button>

                {isMessageOpen && (
                  <OutsideClickHandler
                    onOutsideClick={() => setIsMessageOpen(false)}
                  >
                    <div className="absolute top-10 right-12 w-40 bg-zinc-900 opacity-90 p-2 rounded-md shadow-md flex flex-col z-10">
                      <ReceivedMessages />
                    </div>
                  </OutsideClickHandler>
                )}
              </div>

              <div className="md:flex items-center relative">
                <button
                  className="font-bold hover:text-zinc-600 flex items-center gap-2"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <Avatar
                    img={`data:image/*;base64,${user.avatar}`}
                    size="small"
                  />
                  {user.name}
                </button>

                {isProfileOpen && (
                  <OutsideClickHandler
                    onOutsideClick={() => setIsProfileOpen(false)}
                  >
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
                  </OutsideClickHandler>
                )}
              </div>
            </nav>
          ) : (
            <nav className="md:flex md:items-center md:space-y-0 md:space-x-2 md:relative right-2 w-auto md:w-auto md:top-0 bg-zinc-900 opacity-90 md:bg-transparent md:p-2 z-10 rounded-md">
              <SignUpBtn />
              <SignInBtn />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
