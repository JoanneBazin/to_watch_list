import { Contact } from "./social";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface UserStore {
  user: User | null;
  contacts: Contact[];
  counts: {
    friendRequests: number;
    suggestions: number;
  };
  setUser: (user: User) => void;
  setContacts: (contacts: Contact[]) => void;
  setCounts: (counts: UserStore["counts"]) => void;
  reset: () => void;
}
