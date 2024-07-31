"use client";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./UserContext";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      <SessionProvider>
        <UserProvider>{children}</UserProvider>
      </SessionProvider>
    </>
  );
};
