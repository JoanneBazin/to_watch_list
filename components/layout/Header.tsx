"use client";

import Link from "next/link";
import { GiFilmStrip } from "react-icons/gi";
import SignOutBtn from "../actions/auth/SignOutBtn";
import SignUpBtn from "../actions/auth/SignUpBtn";
import SignInBtn from "../actions/auth/SignInBtn";
import { useUser } from "@/app/UserContext";
import { Avatar } from "./Avatar";

const Header = () => {
  const { user } = useUser();

  if (!user.isLoggedIn) {
    return (
      <header className="flex justify-between items-center mx-2">
        <div className="flex">
          <Link href="/" className="text-3xl font-bold m-4">
            Watchers
          </Link>
          <GiFilmStrip className="size-10 mt-3" />
        </div>
        <div className="mx-4">
          <SignUpBtn />

          <SignInBtn />
          <SignOutBtn />
        </div>
      </header>
    );
  }

  return (
    <header>
      <nav className="flex my-4 items-center justify-between">
        <div className="flex mx-2">
          <Link href="/" className="text-3xl font-bold m-4">
            Watchers
          </Link>
          <GiFilmStrip className="size-10 mt-3" />
        </div>

        <div className="flex gap-4 ml-8">
          <Link href="/watchlist">Watch List</Link>

          <Link href="/communauty">Communauté</Link>
        </div>

        <div className="flex gap-4 pl-8 items-center">
          {user.avatar ? (
            <Avatar img={`data:image/*;base64,${user.avatar}`} size="small" />
          ) : (
            <Avatar size="small" img="/avatar.svg" />
          )}
          <p>
            Hello
            <Link className="font-bold" href="/account">{` ${user.name}`}</Link>
          </p>
          <SignOutBtn />
        </div>
      </nav>
    </header>
  );
};

export default Header;
