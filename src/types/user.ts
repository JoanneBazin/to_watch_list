export interface User {
  id: string;
  name: string;
  email?: string;
  image?: string;
  createdAt: Date;
}

export interface UserStore {
  user: User | null;
  pendingFriendRequests: number | null;
  pendingSuggestions: number | null;
  reset: () => void;
}
