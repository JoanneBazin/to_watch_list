import { Contact } from "./social";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface SessionUser extends User {
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
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

export interface AvatarProps {
  size?: "small" | "medium" | "large";
  img?: string | null;
  alt?: string;
}
