import { EntryType, MediaItem } from "./media";
import { Contact } from "./social";
import { User } from "./user";

export interface SuggestionsProps {
  id: string;
  senderId: string;
  receiverId: string;
  mediaId: string;
  senderComment: string;
  receiverComment: string;
  sender: User;
  receiver: User;
  media: MediaItem;
}

export interface SendSuggestionProps {
  contactId: string;
  mediaId: string;
}

export interface PendingSuggestions {
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
  suggestions: {
    id: string;
    senderComment: string | null;
    sender: {
      id: string;
      name: string;
      image?: string | null;
    };
  }[];
}

export type SuggestionsStatus = "ACCEPTED" | "REFUSED";

export interface MessageProps {
  id: string;
  receiverComment: string | null;
  receiver: Contact;
  media: {
    title: MediaItem["title"];
  };
}
