"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import LogoIcon from "./LogoIcon";

type Props = {};

const Header = (props: Props) => {
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
