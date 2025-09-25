import { MediaItem, SuggestionsProps } from "../types";

export interface SuggestionItem {
  title: string;
  synopsis: string | null;
  year: number | null;
  real: string | null;
  platform: string | null;
  categoryName: string;
  addedAt: Date;
  watched: boolean;
  id: string;
  type: string;
  receiverId: string;
  comment: string | null;
}

export interface CategoryProps {
  name: string;
  id: string;
}

export interface UserProps {
  id: string;
  name: string;
  image?: string | null;
  email?: string;
  friendRequests?: number | null;
  suggestions?: number | null;
}

export interface SuggestionsListProps {
  media: MediaItem;
  suggestions: SuggestionsProps[];
}
