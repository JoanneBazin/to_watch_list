"use client";
import { useUser } from "@/hooks/UserContext";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const { setUser } = useUser();
  const handleLogOut = () => {
    signOut({ callbackUrl: "/", redirect: true });
    setUser(null);
  };

  return (
    <Button variant="outline" className=" px-2" onClick={handleLogOut}>
      Déconnexion
    </Button>
  );
};

export default SignOutBtn;
