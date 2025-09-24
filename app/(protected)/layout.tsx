"use client";

import { useSession } from "@/src/lib/auth-client";
import { useUserStore } from "@/src/features/user/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchContactList } from "@/src/features/social/social.api";
import { fetchUserCounts } from "@/src/features/user/user.api";
import Header from "@/src/components/layout/Header";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { setUser, setContacts, setCounts } = useUserStore();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth");
    }
  }, [session, router, isPending]);

  useEffect(() => {
    if (!session?.user) return;

    setUser({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image ?? null,
    });

    Promise.all([fetchContactList(), fetchUserCounts()])
      .then(([contacts, counts]) => {
        setContacts(contacts);
        const userCounts = {
          friendRequests: counts._count.friendRequestReceived ?? 0,
          suggestions: counts._count.suggestionsReceived,
        };

        setCounts(userCounts);
      })
      .catch(console.error);
  }, [session, setUser, setContacts, setCounts]);

  if (!session?.user) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedLayout;
