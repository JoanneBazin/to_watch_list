import { MediaStore } from "@/src/types";
import { create } from "zustand";

export const useMediaStore = create<MediaStore>()((set) => ({
  watchlist: [],
  sentSuggestions: [],
  receivedSuggestions: [],
  setWatchlist: (watchlist) => set({ watchlist }),
  setSentsuggestions: (suggestions) => set({ sentSuggestions: suggestions }),
  setReceivedsuggestions: (suggestions) =>
    set({ receivedSuggestions: suggestions }),
  reset: () => {
    set({
      watchlist: [],
      sentSuggestions: [],
      receivedSuggestions: [],
    });
  },
}));
