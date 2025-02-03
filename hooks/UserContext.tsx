import { UserProps } from "@/utils/types";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUserId } from "./useUserId";

interface UserContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<SetStateAction<UserProps | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userId = useUserId();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);

      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error("Error network");
        }

        const userData = await response.json();

        setUser({
          name: userData.name,
          avatar: userData.avatar,
          id: userData.id,
          friendRequests: userData._count.friendRequestReceived,
          suggestions: userData._count.suggestionsReceived,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading } as UserContextProps}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
