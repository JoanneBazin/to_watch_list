import { create } from "zustand";
import { MediaStore } from "../types";

export const useMediaStore = create<MediaStore>()((set) => ({
  films: [],
  series: [],
  sentSuggestions: [],
  receivedSuggestions: [],
  setFilms: (films) => set({ films }),
  setSeries: (series) => set({ series }),
  setSentsuggestions: (suggestions) => set({ sentSuggestions: suggestions }),
  setReceivedsuggestions: (suggestions) =>
    set({ receivedSuggestions: suggestions }),
  reset: () => {
    set({
      films: [],
      series: [],
      sentSuggestions: [],
      receivedSuggestions: [],
    });
  },
}));
