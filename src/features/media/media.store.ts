import { MediaStore } from "@/src/types";
import { create } from "zustand";

export const useMediaStore = create<MediaStore>()((set) => ({
  watchlist: [],
  isPending: false,
  error: null,
  setWatchlist: (watchlist) => set({ watchlist }),
  setIsPending: (isPending) => set({ isPending }),
  setError: (error) => set({ error }),
  reset: () => {
    set({
      watchlist: [],
      isPending: false,
      error: null,
    });
  },
}));
