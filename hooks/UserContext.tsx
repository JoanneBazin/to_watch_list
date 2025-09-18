import { UserProps } from "@/lib/types";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { signOut, useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const userId = session?.user?.id || null;
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasSignOut = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      setLoading(false);
      return;
    }

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          if (response.status === 401 && !hasSignOut.current) {
            hasSignOut.current = true;
            signOut();
          }

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
  }, [session, userId, status]);

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
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
