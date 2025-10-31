"use client";

import { useSession } from "@/src/lib/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserHydratation } from "@/src/features/user/hooks";
import { useMediaHydratation } from "@/src/features/media/hooks";
import { Footer, PrivateHeader } from "@/src/components/layout";
import { Loader } from "@/src/components/ui";

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

  if (isPending) return <Loader size="large" />;

  if (!session?.user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <PrivateHeader />
      {children}
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
