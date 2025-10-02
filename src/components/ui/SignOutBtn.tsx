"use client";
import { Button } from "@/src/components/ui/button";
import { handleSignOut } from "@/src/utils/handleSignOut";

const SignOutBtn = () => {
  return (
    <Button variant="outline" className=" px-2" onClick={handleSignOut}>
      Déconnexion
    </Button>
  );
};

export { SignOutBtn };
