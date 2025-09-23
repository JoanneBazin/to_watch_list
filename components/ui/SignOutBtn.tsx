"use client";
import { Button } from "@/src/components/ui/button";
import { signOut } from "@/src/lib/auth-client";

const SignOutBtn = () => {
  const handleLogOut = () => {
    signOut();
  };

  return (
    <Button variant="outline" className=" px-2" onClick={handleLogOut}>
      Déconnexion
    </Button>
  );
};

export default SignOutBtn;
