"use client";

import Link from "next/link";
import SignOutBtn from "../actions/auth/SignOutBtn";
import SignUpBtn from "../actions/auth/SignUpBtn";
import SignInBtn from "../actions/auth/SignInBtn";
import { useUser } from "@/app/UserContext";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-zinc-900 opacity-80 p-2 md:p-1">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold mr-2">
            Watchers
          </Link>
        </div>
        <Button
          variant="outline"
          className={`${loading ? "hidden" : "block"} md:hidden`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LuMenu />
        </Button>

        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="md:h-12 h-8 md:w-12 w-8 rounded-full" />
            <Skeleton className="md:h-4 h-3 md:w-60 w-24" />
          </div>
        ) : user ? (
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-3 absolute md:relative top-16 right-2 w-auto md:w-auto md:top-0 bg-zinc-900 opacity-90 md:bg-transparent p-4 md:p-2 z-10 rounded-md`}
          >
            <div className=" flex justify-center items-center gap-3 md:flex md:gap-4 border-b-2 md:border-none p-3">
              <Avatar img={`data:image/*;base64,${user.avatar}`} size="small" />

              <p>
                Hello
                <Link
                  className="font-bold hover:text-zinc-600"
                  href="/account"
                  onClick={() => setIsOpen(false)}
                >{` ${user.name}`}</Link>
              </p>
            </div>

            <Link
              href="/suggestions"
              onClick={() => setIsOpen(false)}
              className="block md:flex hover:text-zinc-600"
            >
              <div className="relative p-2">
                <p>Suggestions</p>
                {user.suggestions && user.suggestions > 0 ? (
                  <span className="absolute md:top-0 top-2 md:right-0 right-7 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 md:border md:border-zinc-400 bg-transparent rounded-full">
                    {user.suggestions}
                  </span>
                ) : null}
              </div>
            </Link>

            <Link
              href="/communauty"
              onClick={() => setIsOpen(false)}
              className="block md:flex hover:text-zinc-600"
            >
              <div className="relative p-2 md:mr-2">
                <p>Communauté</p>
                {user.friendRequests && user.friendRequests > 0 ? (
                  <span className="absolute md:top-0 top-2 md:right-0 right-7 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-zinc-500 transform translate-x-1/2 -translate-y-1/2 md:border md:border-zinc-400 bg-transparent rounded-full">
                    {user.friendRequests}
                  </span>
                ) : null}
              </div>
            </Link>

            <SignOutBtn />
          </nav>
        ) : (
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-2 absolute md:relative top-16 right-2 w-auto md:w-auto md:top-0 bg-zinc-900 opacity-90 md:bg-transparent p-4 md:p-2 z-10 rounded-md`}
          >
            <div className="block md:flex">
              <SignUpBtn />
            </div>
            <div className="block md:flex">
              <SignInBtn />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
