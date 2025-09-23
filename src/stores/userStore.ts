import { create } from "zustand";
import { UserStore } from "../types";

const useUserStore = create<UserStore>((set) => ({
  user: null,
  pendingFriendRequests: null,
  pendingSuggestions: null,

  reset: () => {
    set({
      user: null,
      pendingFriendRequests: null,
      pendingSuggestions: null,
    });
  },
}));
