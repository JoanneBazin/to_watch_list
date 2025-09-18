"use client";
import { UserProvider } from "../hooks/UserContext";
import { Loader } from "@/components/layout/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <UserProvider>{children}</UserProvider>;
};
