import { MediaItem } from "./media";

export interface Contact {
  id: string;
  name: string;
  image?: string | null;
  suggestionsFromUser: string[];
}

export interface SearchContact extends Contact {
  friendshipStatus: "none" | "friends" | "pending_sent" | "pending_received";
  requestId: string;
}

export interface ValidateFriendRequestProps {
  requestId: string;
  senderId: string;
}

export type FriendRequestStatus = "ACCEPTED" | "REFUSED";

export interface ReceivedRequests {
  id: string;
  sender: Contact;
}

export interface FriendProfile {
  id: string;
  name: string;
  image: string | null;
  watchlist: MediaItem[];
  contacts: Contact[];
}
