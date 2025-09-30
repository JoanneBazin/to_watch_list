import { Contact } from "./social";

export interface SuggestionsProps {
  id: string;
  senderComment: string | null;
  receiverComment: string | null;
  sender: {
    id: string;
    name: string;
    image?: string | null;
  };
}

export interface SendSuggestionProps {
  contactId: string;
  mediaId: string;
}

export type SuggestionsStatus = "ACCEPTED" | "REFUSED";

export interface MessageProps {
  id: string;
  receiverComment: string | null;
  receiver: Contact;
  media: {
    title: string;
  };
}
