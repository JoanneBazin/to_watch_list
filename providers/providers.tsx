"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { UserProvider } from "../hooks/UserContext";
import { Loader } from "@/components/layout/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DebugSession from "@/app/components/DebugSession";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <DebugSession />
      <AuthWrapper>
        <UserProvider>{children}</UserProvider>
      </AuthWrapper>
    </SessionProvider>
  );
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  if (status === "loading") return <Loader />;

  return <>{children}</>;
};
