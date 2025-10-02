"use client";

import { useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/src/components/layout/Header";
import { useUserHydratation } from "@/src/features/user/hooks/useUserHydratation";
import { useMediaHydratation } from "@/src/features/media/hooks/useMediaHydratation";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useUserHydratation(session?.user);
  useMediaHydratation(!!session?.user);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth");
    }
  }, [session, router, isPending]);

  if (isPending) return null;

  if (!session?.user) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedLayout;
