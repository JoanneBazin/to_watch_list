import { UserStore } from "@/src/types";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  contacts: [],
  counts: {
    friendRequests: 0,
    suggestions: 0,
  },
  isPending: false,
  error: null,
  setUser: (user) => set({ user }),
  setContacts: (contacts) => set({ contacts }),
  setCounts: (counts) => set({ counts }),
  setIsPending: (isPending) => set({ isPending }),
  setError: (error) => set({ error }),
  reset: () => {
    set({
      user: null,
      contacts: [],
      counts: {
        friendRequests: 0,
        suggestions: 0,
      },
      isPending: false,
      error: null,
    });
  },
}));
