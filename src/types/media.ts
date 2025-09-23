import { SuggestionsProps } from "./suggestion";

export interface MediaItem {
  title: string;
  synopsis: string | null;
  year: number | null;
  real: string | null;
  platform: string | null;
  categoryName: string;
  addedAt: Date;
  watched: boolean;
  id: string;
  type: EntryType;
  suggestions?: SuggestionsProps[];
}

export interface MediaStore {
  films: MediaItem[];
  series: MediaItem[];
  sentSuggestions: SuggestionsProps[];
  receivedSuggestions: SuggestionsProps[];
  setFilms: (medias: MediaItem[]) => void;
  setSeries: (medias: MediaItem[]) => void;
  setSentsuggestions: (suggestions: SuggestionsProps[]) => void;
  setReceivedsuggestions: (suggestions: SuggestionsProps[]) => void;
  reset: () => void;
}

export interface MediaTableProps {
  data: MediaItem[];
  type: EntryType;
}

export type EntryType = "FILM" | "SERIE";
