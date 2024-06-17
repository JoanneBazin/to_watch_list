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
}

export interface CategoryProps {
  name: string;
  id: string;
}

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}
export interface FriendsProps {
  id: string;
  name: string;
  avatar: string;
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
