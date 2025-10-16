"use client";

import { SessionUser } from "@/src/types";
import { useUserStore } from "../user.store";
import { useEffect } from "react";
import { fetchContactList } from "../../social/social.api";
import { fetchUserCounts } from "../user.api";
import { handleError } from "@/src/utils";

export const useUserHydratation = (user: SessionUser | undefined) => {
  const { setUser, setContacts, setCounts, setIsPending, setError } =
    useUserStore();

  useEffect(() => {
    if (!user) return;

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ? `${user.image}?t=${Date.now()}` : null,
    });

    const hydrateStore = async () => {
      setIsPending(true);
      try {
        const [contacts, counts] = await Promise.all([
          fetchContactList(),
          fetchUserCounts(),
        ]);

        setContacts(contacts);
        setCounts({
          friendRequests: counts._count.friendRequestReceived ?? 0,
          suggestions: counts._count.suggestionsReceived ?? 0,
        });
      } catch (error) {
        handleError(error, setError);
      } finally {
        setIsPending(false);
      }
    };

    hydrateStore();
  }, [user, setUser, setContacts, setCounts, setError, setIsPending]);
};
