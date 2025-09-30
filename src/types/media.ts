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
  watchlist: MediaItem[];
  sentSuggestions: SuggestionsProps[];
  receivedSuggestions: SuggestionsProps[];
  setWatchlist: (watchlist: MediaItem[]) => void;
  setSentsuggestions: (suggestions: SuggestionsProps[]) => void;
  setReceivedsuggestions: (suggestions: SuggestionsProps[]) => void;
  reset: () => void;
}

export interface MediaTableProps {
  data: MediaItem[];
  type: EntryType;
}

export interface AddEntryFormProps {
  entry: EntryType;
  isSuggestedMedia: boolean;
  receiverId?: string;
}

export interface MediaCardProps {
  media: MediaItem;
  children?: React.ReactNode;
}

export type EntryType = "FILM" | "SERIE";

export type AddEntryFormValue = Omit<
  MediaItem,
  "id" | "addedAt" | "watched"
> & {
  senderComment?: string;
};
