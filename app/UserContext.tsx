"use client";
import { UserProps } from "@/lib/types";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: UserProps;
  setUser: React.Dispatch<SetStateAction<UserProps>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    avatar: "",
    id: "",
    email: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Error network");
        }
        const userData = await response.json();

        setUser({
          name: userData.name,
          avatar: userData.avatar,
          id: userData.id,
          email: userData.email,
          isLoggedIn: true,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (user.isLoggedIn) {
      fetchUser();
    }
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
