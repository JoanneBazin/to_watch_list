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
}

export interface CategoryProps {
  name: string;
  id: string;
}

export interface UserProps {
  id: string;
  email: string;
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
