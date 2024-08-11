"use client";

import Link from "next/link";
import { GiFilmStrip } from "react-icons/gi";
import SignOutBtn from "../actions/auth/SignOutBtn";
import SignUpBtn from "../actions/auth/SignUpBtn";
import SignInBtn from "../actions/auth/SignInBtn";
import { useUser } from "@/app/UserContext";
import { Avatar } from "./Avatar";

const Header = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="italic">...loading</p>;
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
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex gap-4 ml-8">
              <Link href="/suggestions">Suggestions</Link>

              <Link href="/communauty">Communauté</Link>
            </div>

            <div className="flex gap-4 pl-8 items-center">
              <Avatar img={`data:image/*;base64,${user.avatar}`} size="small" />

              <p>
                Hello
                <Link
                  className="font-bold"
                  href="/account"
                >{` ${user.name}`}</Link>
              </p>
              <SignOutBtn />
            </div>
          </div>
        ) : (
          <div className="mx-4">
            <SignUpBtn />

            <SignInBtn />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
