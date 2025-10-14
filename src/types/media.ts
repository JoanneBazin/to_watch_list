import { SuggestionsProps } from "./suggestion";

export interface MediaItem {
  id: string;
  title: string;
  synopsis: string | null;
  year: number | null;
  real: string | null;
  platform: string | null;
  categoryName: string;
  addedAt: Date;
  watched: boolean;
  type: EntryType;
  suggestions?: SuggestionsProps[];
}

export interface MediaTableColumn extends MediaItem {
  className: string;
}

export interface MediaStore {
  watchlist: MediaItem[];
  isPending: boolean;
  error: string | null;
  setWatchlist: (watchlist: MediaItem[]) => void;
  setIsPending: (isPending: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export interface AddEntryFormProps {
  entry: EntryType;
  isSuggestedMedia: boolean;
  onSuccess: () => void;
  receiverId?: string;
}

export interface EditMediaFormProps {
  media: MediaItem;
  onSuccess: () => void;
}

export interface MediaCardProps {
  media: MediaItem;
  children?: React.ReactNode;
}

export type EntryType = "FILM" | "SERIE";

export interface MediaOptionButtonProps {
  mediaId: string;
  watched: boolean;
  setError: (error: string | null) => void;
  mobile?: boolean;
}

export interface MediaDialogProps {
  media: MediaItem;
  mobile?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface MediaOptionsProps {
  media: MediaItem;
  onError: (error: string | null) => void;
}

export type MobileDialogType = "share" | "edit" | null;
