import { MediaItem } from "./media";
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
