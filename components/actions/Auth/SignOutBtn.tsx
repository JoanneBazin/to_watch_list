"use client";
import { useUser } from "@/app/UserContext";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const { setUser } = useUser();

  const handleLogOut = () => {
    signOut({ callbackUrl: "/", redirect: true });
    setUser({
      name: "",
      avatar: "",
      id: "",
      email: "",
      isLoggedIn: false,
    });
  };

  return (
    <Button className="mx-4" onClick={handleLogOut}>
      Déconnexion
    </Button>
  );
};

export default SignOutBtn;
