"use client";

import { useSession } from "@/src/lib/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserHydratation } from "@/src/features/user/hooks";
import { useMediaHydratation } from "@/src/features/media/hooks";
import { PrivateHeader } from "@/src/components/layout";

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
    <div className="flex flex-col min-h-screen">
      <PrivateHeader />
      {children}
    </div>
  );
};

export default ProtectedLayout;
