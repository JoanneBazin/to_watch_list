"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import LogoIcon from "./Icons/LogoIcon";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SignUp from "../actions/Auth/SignUp";
import SignIn from "../actions/Auth/SignIn";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();
  return (
    <nav className="flex my-4 items-center">
      <div className="flex mx-4">
        <Link href="/" className="text-3xl font-bold m-4">
          Watchers
        </Link>
        <LogoIcon />
      </div>

      {session ? (
        <div className="flex gap-4">
          <Link href="/films">Films</Link>

          <Link href="/series">Series</Link>

          <Link href="/overview">Overview</Link>
        </div>
      ) : null}

      {session ? (
        <div className="flex px-16 items-center">
          <p>Hello {session.user.name}</p>
          <Button className="mx-4" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      ) : (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mx-4">Inscription</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Incription</DialogTitle>
              </DialogHeader>

              <SignUp />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Connexion</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connexion</DialogTitle>
              </DialogHeader>
              <SignIn />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </nav>
  );
};

export default Header;
