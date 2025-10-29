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

export interface SuggestMediaToContactProps {
  contact: Contact;
  mediaId: string;
}

export interface SendSuggestionProps {
  onSubmit: (comment: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface AddSuggestionCommentProps {
  comment: string;
  setComment: (comment: string) => void;
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
