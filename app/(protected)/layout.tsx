"use client";

import { useSession } from "@/src/lib/auth-client";
import { useUserStore } from "@/src/features/user/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchContactList } from "@/src/features/social/social.api";
import { fetchUserCounts } from "@/src/features/user/user.api";
import Header from "@/src/components/layout/Header";
import { fetchWatchlist } from "@/src/features/media/media.api";
import { useMediaStore } from "@/src/features/media/media.store";
import { ApiError } from "@/src/utils/ApiError";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    setUser,
    setContacts,
    setCounts,
    setIsPending: setIsUserPending,
    setError: setUserError,
  } = useUserStore();
  const {
    setWatchlist,
    setIsPending: setIsMediaPending,
    setError: setMediaError,
  } = useMediaStore();

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

    const fetchUserData = async () => {
      setIsUserPending(true);
      try {
        setContacts(await fetchContactList());
        const counts = await fetchUserCounts();
        setCounts({
          friendRequests: counts._count.friendRequestReceived ?? 0,
          suggestions: counts._count.suggestionsReceived ?? 0,
        });
      } catch (error) {
        if (error instanceof ApiError) {
          setUserError(error.message);
        }
      } finally {
        setIsUserPending(false);
      }
    };
    fetchUserData();
  }, [
    session,
    setUser,
    setContacts,
    setCounts,
    setUserError,
    setIsUserPending,
  ]);

  useEffect(() => {
    const fetchMediaData = async () => {
      setIsMediaPending(true);

      try {
        setWatchlist(await fetchWatchlist());
      } catch (error) {
        if (error instanceof ApiError) {
          setMediaError(error.message);
        }
      } finally {
        setIsMediaPending(false);
      }
    };
    fetchMediaData();
  }, [session, setWatchlist, setMediaError, setIsMediaPending]);

  if (!session?.user) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedLayout;
