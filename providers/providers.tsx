"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { UserProvider } from "../hooks/UserContext";
import { Loader } from "@/components/layout/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <AuthWrapper>
        <UserProvider>{children}</UserProvider>
      </AuthWrapper>
    </SessionProvider>
  );
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router, hasMounted]);

  if (status === "loading") return <Loader />;

  if (status === "authenticated" && !session) {
    signOut();
    return <Loader />;
  }

  return <>{children}</>;
};
