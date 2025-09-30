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
  isPending: boolean;
  error: string | null;
  setUser: (user: User) => void;
  setContacts: (contacts: Contact[]) => void;
  setCounts: (counts: UserStore["counts"]) => void;
  setIsPending: (isPending: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
