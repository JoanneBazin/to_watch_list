import { SuggestionsProps } from "./suggestion";

export interface MediaItem {
  id: string;
  tmdbId: number | null;
  title: string;
  originalTitle: string | null;
  synopsis: string | null;
  year: number | null;
  real: string | null;
  platform: string | null;
  categories: string[];
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

export interface CategoryType {
  name: string;
  id: string;
}

export interface SearchMediaCardProps {
  media: TMDBMedia;
  entry: EntryType;
  children: React.ReactNode;
}

export interface MediaModalNavProps {
  views: {
    id: string;
    label: string;
  }[];
  activeView: string;
  setView: (view: string) => void;
}

// TMDB types

export interface TMDBMedia {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface TMDBSerie {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBCreditPerson {
  id: number;
  name: string;
  job?: string;
  character?: string;
}

export interface TMDBSerieCreator {
  id: number;
  name: string;
}

export interface TMDBWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export type TMDBMediaDetails<T extends TMDBMedia | TMDBSerie> = T & {
  genres: TMDBGenre[];
  credits?: {
    cast: TMDBCreditPerson[];
    crew: TMDBCreditPerson[];
  };
  ["watch/providers"]?: {
    results: {
      [countryCode: string]: {
        flatrate?: TMDBWatchProvider[];
      };
    };
  };
  created_by?: TMDBSerieCreator[];
};
