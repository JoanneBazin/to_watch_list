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
  const { data: session, status } = useSession();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/">TO WATCH LIST</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LogoIcon />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/films">Films</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/series">Series</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/overview">Overview</Link>
        </NavigationMenuItem>
        {session ? (
          <NavigationMenuItem className="flex items-center px-16">
            <p>Hello {session.user.name}</p>
            <Button className="mx-4" onClick={() => signOut()}>
              Sign out
            </Button>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Inscription</Button>
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
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
