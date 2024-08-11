"use client";
import { UserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<SetStateAction<UserProps | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}`);

        if (!response.ok) {
          throw new Error("Error network");
        }

        const userData = await response.json();

        setUser({
          name: userData.name,
          avatar: userData.avatar,
          id: userData.id,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (status === "authenticated") {
      fetchUser();
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [status, session]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
