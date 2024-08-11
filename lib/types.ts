export interface Item {
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
  suggestions?: SuggestionsProps[];
}
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
  avatar: string | null;
  email?: string;
}
export interface FriendsProps {
  id: string;
  name: string;
  avatar: string | null;
  films: {
    film: Item[];
  };
  series: {
    serie: Item[];
  };
}

export interface ReceiverRequestsProps {
  id: string;
  receiver: FriendsProps;
}
export interface SenderRequestsProps {
  id: string;
  sender: FriendsProps;
}

export interface SuggestionsProps {
  id: string;
  senderId: string;
  receiverId: string;
  mediaId: string;
  senderComment: string;
  receiverComment: string;
  media: Item;
  sender: UserProps;
  receiver: UserProps;
}
